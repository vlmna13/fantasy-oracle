# 🔮 Fantasy Oracle

> _"Ask, and the veil parts. But know this - the Oracle answers in the tongue of its own world, and never in yours."_

Somewhere between Hogwarts, Middle-earth and the Continent there is a chamber where three oracles keep watch. Each one speaks only in the voice of its own world. Each one remembers every question you have ever asked. Step into the wrong chamber and you will get an answer - just not the one you were expecting.

### 🕯️ [Enter the Chamber](https://fantasy-oracle-nu.vercel.app)

---

## The Three Chambers

**⚡ Harry Potter** - a wise wizard answers from within the halls of Hogwarts, in the language of wands, houses and half-blood princes.

**💍 The Lord of the Rings** - an elf out of ancient Middle-earth, speaking from the Shire to the fires of Mordor.

**🐺 The Witcher** - the Oracle of the Continent knows every path, including the ones you should not walk.

Each chamber has its own colours, its own typography, its own atmosphere. The Oracle never breaks character, and it replies in whatever language you ask it in.

---

## The Rites

**The Summoning** - ask anything. The question travels to a server-side route that seals your identity, chooses the mask the Oracle will wear, and returns the answer in character. Every question asked is **+5 XP**.

**The Trials** - three lore quizzes, five questions each, sudden death. One wrong answer and the trial is lost; you may try again, but there is no partial credit. Survive all five and the seal is yours: **+150 XP**, claimable once per world. Victory and defeat are rendered on canvas - frost for Hogwarts, embers for Mordor, spores for the Continent.

**The Ascent** - 100 XP to a level. **Novice Seeker** until level 5, **Adept Seeker** until level 10, then **Oracle Ascendant**. A daily check-in tracks your streak; miss a day and it resets to one.

**The Seals** - six achievements that unlock themselves from your record: the first question ever asked, one seal per world's trial, level 10, and 250 questions for the Keeper of Secrets.

**The Sanctum** - your profile. Rank, level, XP bar, questions asked, quizzes won, worlds explored, day streak, and every conversation you have ever started, one card per world.

---

## The Pact

You are let in without a name. On the first visit the app signs you in anonymously, and your history starts saving from the very first question - no sign-up wall, no empty state.

Should you later choose a nickname, the anonymous soul is not discarded. `linkWithCredential` upgrades that _same_ Firebase user into a permanent account, and everything you asked as a stranger comes with you. Firebase demands an email; the Oracle asks only for a nickname and quietly keeps the mapping to itself.

---

## Sources of Power

| The craft         | The instrument                                    |
| ----------------- | ------------------------------------------------- |
| **Nuxt 4** (SPA)  | the chamber itself                                |
| **TypeScript**    | keeping the prophecies well-typed                 |
| **Pinia**         | three vessels - auth, chat, progress              |
| **GSAP**          | entrances, and the timeline that seals a trial    |
| **Canvas API**    | the star field, the frost, the embers, the spores |
| **CSS variables** | one theme per world, swapped by a single class    |
| **DeepSeek API**  | the voice behind the veil                         |
| **Firebase Auth** | anonymous souls and named ones                    |
| **Firestore**     | the memory that outlives the session              |
| **Vercel**        | the ground it all stands on                       |

---

## Where the Secrets Are Kept

**The key never leaves the temple.** The browser never sees the DeepSeek key. It calls the internal `/api/chat` route, which runs server-side, verifies your Firebase ID token with the Admin SDK, selects the system prompt for the requested world, and only then speaks to DeepSeek. An unsigned request gets a 401 and nothing else.

**The archive.** Messages are namespaced per seeker and per world, with a summary document one level up so the Sanctum can list your conversations without reading a single message:

```
users/{uid}                                  → { xp, questionsAsked, completedQuizzes, streak, lastActiveDate }
users/{uid}/chats/{universeId}               → { lastMessage, lastMessageAt }
users/{uid}/chats/{universeId}/messages/{id} → { role, text, order, createdAt }
```

---

## The Map

```
app/
  components/    chat, cards, quiz trials, canvas effects, profile blocks
  composables/   GSAP entrance animations
  data/          universes, quizzes, achievement unlock rules
  middleware/    turns signed-in seekers away from the gate
  pages/         index · auth · profile · oracle/[id] · oracle/[id]/quiz
  store/         auth · chat · progress
server/
  api/chat.ts             the sealed door to DeepSeek
  utils/firebase-admin.ts the Admin SDK, initialized once
```

---

## Begin the Ritual

Requires Node.js 20 or newer.

```bash
npm install
```

Create a `.env` in the project root and fill it with your own offerings:

```env
# platform.deepseek.com
DEEPSEEK_API_KEY=your_key

# Firebase console -> Project settings -> Your apps -> SDK setup and configuration
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project
FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_id
FIREBASE_APP_ID=your_app_id

# Firebase console -> Project settings -> Service accounts -> Generate new private key
FIREBASE_SERVICE_ACCOUNT=your_base64_encoded_service_account_json
```

The service account is the downloaded JSON key, base64-encoded. Without it `/api/chat` cannot verify a single token and the Oracle stays silent:

```bash
base64 -i serviceAccountKey.json | pbcopy
```

Then open the chamber:

```bash
npm run dev
```

---

## The Discipline

| Incantation        | Effect                            |
| ------------------ | --------------------------------- |
| `npm run dev`      | dev server at `localhost:3000`    |
| `npm run build`    | production build                  |
| `npm run preview`  | preview the production build      |
| `npm run lint`     | ESLint (`lint:fix` to autofix)    |
| `npm run lint:css` | Stylelint (`lint:css:fix`)        |
| `npm run format`   | Prettier (`format:check` to test) |

Husky runs `lint-staged` before every commit, and no message passes the gate unless it obeys [Conventional Commits](https://www.conventionalcommits.org/).

---

<p align="center">✦ <em>Omnia fata revelat</em> ✦</p>
