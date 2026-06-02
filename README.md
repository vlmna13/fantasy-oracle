# Fantasy Oracle

**Live demo:** https://fantasy-oracle-nu.vercel.app

An AI-powered oracle for fantasy universe fans. Choose your world and ask the Oracle anything — it answers in character, using the language and lore of that universe.

---

## Universes

- **Harry Potter** - the Oracle speaks as a wise wizard within the halls of Hogwarts
- **The Lord of the Rings** - answers from the depths of ancient Middle-earth
- **The Witcher** - the Oracle of the Continent knows all paths, even the darkest ones

---

## Features

- AI chat with universe-specific personas - powered by DeepSeek API
- Unique visual theme per universe - color schemes, typography, atmosphere
- Anonymous session on first visit - no sign-up required
- Firebase authentication - register with a nickname and password to sync history across devices
- Chat history persisted in Firestore
- GSAP animations - card entrances, message transitions, star field background
- Fully responsive

---

## Stack

| Layer      | Technology                           |
| ---------- | ------------------------------------ |
| Framework  | Nuxt 4 + TypeScript                  |
| State      | Pinia                                |
| Styles     | CSS custom properties, Tailwind CSS  |
| Animations | GSAP                                 |
| AI         | DeepSeek API (via Nuxt server route) |
| Auth       | Firebase Authentication              |
| Database   | Firebase Firestore                   |
| Hosting    | Vercel                               |

---

## Local setup

```bash
npm install
```

Create a `.env` file in the project root:

```
DEEPSEEK_API_KEY=your_key
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project
FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_id
FIREBASE_APP_ID=your_app_id
```

```bash
npm run dev
```
