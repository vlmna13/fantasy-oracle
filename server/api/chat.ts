export default defineEventHandler(async (event) => {
  const { question, universeId } = await readBody(event);
  const apiKey = process.env.DEEPSEEK_API_KEY;
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
    'You are a wise oracle of a fantasy world. Answer in the spirit of that world.Never break character. Answer in the same language in which the question was asked.';
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
  const data = await response.json();
  return { answer: data.choices[0].message.content };
});
