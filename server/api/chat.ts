import { getAdminAuth } from '../utils/firebase-admin';

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization');
  const idToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
  if (!idToken) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }
  try {
    await getAdminAuth().verifyIdToken(idToken);
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
  }

  const { question, universeId } = await readBody(event);
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Oracle is not configured' });
  }
  if (typeof question !== 'string' || question.trim().length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'Question is required' });
  }
  if (question.length > 2000) {
    throw createError({ statusCode: 400, statusMessage: 'Question is too long' });
  }

  const systemPrompts: Record<string, string> = {
    'harry-potter':
      'You are an ancient oracle of the Harry Potter world. You respond as a wise wizard, using the terminology of that world. Never exit the cutscenes. Answer in the same language in which the question was asked.',
    'lord-of-the-rings':
      "You are an ancient oracle of Middle-earth. Answer as a wise elf or wizard, using the terminology of Tolkien's world. Never break character. Answer in the same language in which the question was asked.",
    witcher:
      'You are the ancient oracle of the Continent. Answer as a wise witcher or sorcerer, using the terminology of the Witcher world. Never break character. Answer in the same language in which the question was asked.',
  };
  const systemPrompt =
    systemPrompts[universeId] ??
    'You are a wise oracle of a fantasy world. Answer in the spirit of that world. Never break character. Answer in the same language in which the question was asked.';
  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question },
      ],
    }),
  });
  if (!response.ok) {
    throw createError({ statusCode: 502, statusMessage: 'The Oracle is silent. Try again later' });
  }

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content;
  if (!answer) {
    throw createError({ statusCode: 502, statusMessage: 'The Oracle gave no answer' });
  }

  return { answer };
});
