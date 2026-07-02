<template>
  <div class="page">
    <header class="header-container">
      <BackButton />
      <h2 class="header-title">The Seeker's Sanctum</h2>
    </header>

    <section class="hero">
      <ProfileAvatar />
      <div class="identity">
        <h1 class="seeker-name" :style="{ visibility: authStore.isLoading ? 'hidden' : 'visible' }">
          {{ authStore.isLoading ? 'Seeker' : authStore.displayName }}
        </h1>
        <p class="rank-title">
          Rank — <span class="rank-name">{{ progress.rank }}</span>
        </p>
        <div class="progress-wrap">
          <div class="progress-meta">
            <span>Level {{ progress.level }} · {{ progress.rank }}</span>
            <span class="xp">{{ progress.levelProgress }} / 100 XP</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: progress.levelProgress + '%' }"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <span class="section-title">Seeker's Record</span>
        <span class="section-line"></span>
      </div>
      <div class="stats">
        <div class="stat">
          <span class="stat-num">{{ progress.questionsAsked }}</span
          ><span class="stat-label">Questions Asked</span>
        </div>
        <div class="stat">
          <span class="stat-num">{{ progress.completedQuizzes.length }}</span
          ><span class="stat-label">Quizzes Won</span>
        </div>
        <div class="stat">
          <span class="stat-num">{{ chats.length }}</span
          ><span class="stat-label">Worlds Explored</span>
        </div>
        <div class="stat">
          <span class="stat-num">0</span><span class="stat-label">Day Streak</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <span class="section-title">Trials &amp; Achievements</span>
        <span class="section-line"></span>
        <span class="section-count"
          >{{ unlockedCount }} / {{ achievementList.length }} unlocked</span
        >
      </div>
      <div class="ach-grid">
        <component
          :is="ach.quizUniverseId && !ach.unlocked ? NuxtLink : 'div'"
          v-for="ach in achievementList"
          :key="ach.name"
          :to="
            ach.quizUniverseId && !ach.unlocked ? `/oracle/${ach.quizUniverseId}/quiz` : undefined
          "
          class="ach"
          :class="{
            locked: !ach.unlocked,
            unlocked: ach.unlocked,
            playable: ach.quizUniverseId && !ach.unlocked,
          }"
        >
          <div class="ach-medal">
            <svg
              v-if="ach.unlocked"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              stroke-width="1.8"
            >
              <circle cx="12" cy="9" r="6" />
              <path d="M9 9l2 2 4-4" />
              <path d="M9 14l-2 6 5-3 5 3-2-6" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="#9a9aa2" stroke-width="1.6">
              <rect x="5" y="11" width="14" height="10" rx="1" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <div class="ach-body">
            <div class="ach-name">{{ ach.name }}</div>
            <div class="ach-desc">{{ ach.desc }}</div>
          </div>
        </component>
      </div>
    </section>

    <section class="section">
      <div class="section-head">
        <span class="section-title">Your Conversations</span>
        <span class="section-line"></span>
      </div>
      <p v-if="chats.length === 0" class="empty-chats">
        No conversations yet. Choose a world and ask the Oracle.
      </p>
      <div v-else class="chats-list">
        <NuxtLink
          v-for="chat in chats"
          :key="chat.universeId"
          :to="`/oracle/${chat.universeId}`"
          class="chat-card"
        >
          <img :src="chat.avatar" :alt="chat.name" class="chat-avatar" />
          <div class="chat-info">
            <div class="chat-name">{{ chat.name }}</div>
            <div class="chat-last">{{ chat.lastMessage }}</div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <ProfileAccount />
  </div>
</template>

<script setup lang="ts">
import { achievements } from '~/data/achievements';
import { universes } from '~/data/universes';
import { useAuthStore } from '~/store/auth';
import { useChatStore } from '~/store/chat';
import { storeToRefs } from 'pinia';
import { useProgressStore } from '~/store/progress';

const authStore = useAuthStore();
const chatStore = useChatStore();
const { chatSummaries } = storeToRefs(chatStore);
const NuxtLink = resolveComponent('NuxtLink');
const progress = useProgressStore();

onMounted(async () => {
  await chatStore.loadChatSummaries();
  await progress.load();
});

const achievementList = computed(() =>
  achievements.map((ach) => ({
    ...ach,
    unlocked: ach.unlock({
      questionsAsked: progress.questionsAsked,
      level: progress.level,
      completedQuizzes: progress.completedQuizzes,
    }),
  })),
);

const unlockedCount = computed(() => achievementList.value.filter((a) => a.unlocked).length);

const chats = computed(() =>
  chatSummaries.value.flatMap((s) => {
    const universe = universes.find((u) => u.id === s.universeId);
    if (!universe) return [];
    return [
      {
        universeId: s.universeId,
        lastMessage: s.lastMessage,
        name: universe.name,
        avatar: universe.avatar,
      },
    ];
  }),
);
</script>

<style scoped>
.page {
  position: relative;
  z-index: 2;
  max-width: 920px;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

.header-container {
  height: 72px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgb(10 10 15 / 92%) 0%,
    rgb(10 10 15 / 55%) 70%,
    transparent 100%
  );
  backdrop-filter: blur(6px);
  margin: 0 -1.5rem;
  padding: 0 1.5rem;
}

.header-title {
  font-family: Cinzel, serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  text-align: center;
  opacity: 0.85;
}

.hero {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem 0 2rem;
}

.identity {
  flex: 1;
  min-width: 0;
}

.seeker-name {
  font-family: 'Cinzel Decorative', Cinzel, serif;
  font-size: clamp(1.6rem, 4vw, 2.3rem);
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.02em;
  line-height: 1.1;
  text-shadow: 0 0 28px rgb(var(--gold-rgb) / 40%);
  margin-bottom: 0.3rem;
}

.rank-title {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 1.05rem;
  color: rgb(var(--text-rgb) / 55%);
  letter-spacing: 0.05em;
  margin-bottom: 1.1rem;
}

.rank-name {
  color: rgb(var(--gold-rgb) / 85%);
  font-style: normal;
}

.progress-wrap {
  max-width: 420px;
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: Cinzel, serif;
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgb(var(--gold-rgb) / 55%);
  margin-bottom: 0.45rem;
}

.xp {
  color: rgb(var(--text-rgb) / 60%);
  letter-spacing: 0.1em;
}

.progress-track {
  height: 8px;
  background: rgb(var(--gold-rgb) / 8%);
  border: 1px solid rgb(var(--gold-rgb) / 20%);
  position: relative;
  overflow: hidden;
}

.progress-fill {
  position: absolute;
  inset: 0;
  width: 0%;
  background: linear-gradient(90deg, #8a6f24, var(--gold) 60%, var(--gold-bright));
  box-shadow: 0 0 14px rgb(var(--gold-rgb) / 50%);
}

.section {
  margin-top: 2.75rem;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.section-title {
  font-family: Cinzel, serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  white-space: nowrap;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgb(var(--gold-rgb) / 30%), transparent);
}

.section-count {
  font-family: Cinzel, serif;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: rgb(var(--text-rgb) / 45%);
}

.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat {
  background: rgb(18 16 22 / 72%);
  border: 1px solid rgb(var(--gold-rgb) / 18%);
  padding: 1.1rem 1rem;
  position: relative;
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
}

.stat::before,
.stat::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  pointer-events: none;
}

.stat::before {
  top: 0;
  left: 0;
  border-top: 1px solid rgb(var(--gold-rgb) / 40%);
  border-left: 1px solid rgb(var(--gold-rgb) / 40%);
}

.stat::after {
  bottom: 0;
  right: 0;
  border-bottom: 1px solid rgb(var(--gold-rgb) / 40%);
  border-right: 1px solid rgb(var(--gold-rgb) / 40%);
}

.stat-num {
  font-family: Cinzel, serif;
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}

.stat-label {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 0.78rem;
  color: rgb(var(--text-rgb) / 55%);
  margin-top: 0.4rem;
}

.ach-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.ach {
  background: rgb(18 16 22 / 72%);
  border: 1px solid rgb(var(--gold-rgb) / 18%);
  padding: 1.25rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.ach.locked {
  opacity: 0.5;
  filter: grayscale(0.7);
}

.ach.unlocked {
  border-color: rgb(var(--gold-rgb) / 55%);
  box-shadow:
    0 0 18px rgb(var(--gold-rgb) / 20%),
    inset 0 0 24px rgb(var(--gold-rgb) / 6%);
}

.ach-medal {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(160 160 170 / 30%);
  background: radial-gradient(circle at 40% 38%, #1a1a1e, #0f0f12);
}

.ach-medal svg {
  width: 24px;
  height: 24px;
}

.ach-name {
  font-family: Cinzel, serif;
  font-size: 0.82rem;
  font-weight: 600;
  color: #9a9aa2;
  letter-spacing: 0.04em;
  margin-bottom: 0.25rem;
}

.ach.unlocked .ach-medal {
  border-color: rgb(var(--gold-rgb) / 60%);
  background: radial-gradient(circle at 40% 38%, #2a2416, #14110a);
  box-shadow: 0 0 14px rgb(var(--gold-rgb) / 25%);
}

.ach.unlocked .ach-name {
  color: var(--gold);
}

.ach.playable {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.3s,
    opacity 0.3s;
}

.ach.playable:hover {
  opacity: 0.75;
  border-color: rgb(var(--gold-rgb) / 45%);
}

.ach-desc {
  font-family: 'EB Garamond', serif;
  font-size: 0.85rem;
  font-style: italic;
  line-height: 1.45;
  color: rgb(var(--text-rgb) / 55%);
}

.empty-chats {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 0.95rem;
  color: rgb(var(--text-rgb) / 40%);
  text-align: center;
  padding: 2rem 0;
}

.chats-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.chat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgb(18 16 22 / 72%);
  border: 1px solid rgb(var(--gold-rgb) / 18%);
  padding: 1rem 1.25rem;
  text-decoration: none;
  transition:
    border-color 0.3s,
    background 0.3s;
}

.chat-card:hover {
  border-color: rgb(var(--gold-rgb) / 40%);
  background: rgb(18 16 22 / 90%);
}

.chat-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgb(var(--gold-rgb) / 30%);
  flex-shrink: 0;
}

.chat-name {
  font-family: Cinzel, serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--gold);
  margin-bottom: 0.3rem;
}

.chat-last {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 0.9rem;
  color: rgb(var(--text-rgb) / 50%);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 500px;
}

@media (width <= 720px) {
  .hero {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .progress-wrap {
    margin: 0 auto;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .ach-grid {
    grid-template-columns: 1fr;
  }
}
</style>
