<template>
  <div class="page" :class="`universe-${universId}`">
    <OracleHeader v-if="universe" :universe="universe" subtitle="Prove your knowledge" />

    <section v-if="state === 'intro'" class="quiz-intro">
      <div class="crest">
        <img :src="quiz?.crest" alt="crest" />
      </div>
      <h2 class="eyebrow">{{ universe?.name }}</h2>
      <h1>{{ quiz?.title }}</h1>
      <DividerLine />
      <p class="rule">
        5 questions stand between you and the seal. Answer every one correctly - a single misstep,
        and the Oracle will turn you away.
      </p>
      <div class="meta-line">
        <div>
          <p class="gold">{{ quiz?.questions.length }}</p>
          <p>Questions</p>
        </div>
        <div>
          <p class="gold">{{ quiz?.questions.length }} / {{ quiz?.questions.length }}</p>
          <p>To Pass</p>
        </div>
        <div>
          <p class="gold">∞</p>
          <p>attempts</p>
        </div>
      </div>
      <button class="oracle-btn gem-btn" @click="state = 'playing'">
        <span class="gem"></span>
        Begin the Trial
        <span class="gem"></span>
      </button>
    </section>
    <section v-else-if="state === 'playing'" class="quiz-playing">
      <p>Question {{ currentIndex + 1 }} / {{ quiz?.questions.length }}</p>
      <h2>{{ currentQuestion?.question }}</h2>
      <div class="options">
        <button v-for="option in currentQuestion?.options" :key="option">
          {{ option }}
        </button>
      </div>
    </section>
    <section v-else class="quiz-result">
      <h2>5 / 5</h2>
      <p>Trial passed! +150 XP</p>
      <button @click="state = 'intro'">Return</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { quizzes } from '~/data/quizzes';
import { universes } from '~/data/universes';

const route = useRoute();
const universId = route.params.id as string;
const quiz = quizzes.find((q) => q.universeId === universId);
const universe = universes.find((u) => u.id === universId);
const state = ref<'intro' | 'playing' | 'result'>('intro');
const currentIndex = ref(0);
const currentQuestion = computed(() => quiz?.questions[currentIndex.value]);
</script>

<style scoped>
.page {
  position: relative;
  z-index: 2;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}

.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

.quiz-intro {
  position: relative;
  background: rgb(18 16 22 / 72%);
  border: 1px solid rgb(var(--accent-glow) / 25%);
  padding: 2.75rem 2.5rem 2.5rem;
  box-shadow:
    0 24px 70px rgb(0 0 0 / 55%),
    0 0 50px rgb(var(--accent-glow) / 7%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2.5rem 0.5rem;
}

.quiz-intro::before,
.quiz-intro::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.quiz-intro::before {
  top: -1px;
  left: -1px;
  border-top: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
}

.quiz-intro::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
}

.crest {
  width: 84px;
  height: 84px;
  margin: 0 auto 1.4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(var(--accent-bright) / 55%);
  background: radial-gradient(
    circle at 42% 38%,
    rgb(var(--accent-bright) / 18%),
    rgb(10 8 12 / 60%) 70%
  );
  box-shadow:
    inset 0 0 22px rgb(var(--accent-bright) / 14%),
    0 0 26px rgb(var(--accent-bright) / 16%);
}

.crest img {
  width: 40px;
  height: 40px;
}

.eyebrow {
  font-family: Cinzel, serif;
  font-size: 0.62rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgb(var(--accent-bright) / 90%);
  text-align: center;
  margin-bottom: 0.7rem;
}

h1 {
  font-family: 'Cinzel Decorative', Cinzel, serif;
  font-weight: 700;
  font-size: clamp(1.8rem, 4.5vw, 2.6rem);
  color: var(--gold);
  letter-spacing: 0.02em;
  text-align: center;
  line-height: 1.12;
  text-shadow: 0 0 30px rgb(var(--gold-rgb) / 35%);
}

.rule {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 1.08rem;
  line-height: 1.6;
  color: rgb(var(--text-rgb) / 55%);
  text-align: center;
  max-width: 46ch;
}

.meta-line {
  display: flex;
  justify-content: center;
  gap: 2.2rem;
  font-family: Cinzel, serif;
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgb(var(--text-rgb) / 55%);
}

.meta-line div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gold {
  font-size: 1.4rem;
  color: var(--gold);
  letter-spacing: 0.04em;
}

.gem-btn:hover {
  color: var(--gold-bright);
  box-shadow:
    0 0 12px rgb(var(--gold-rgb) / 35%),
    0 0 30px rgb(var(--gold-rgb) / 15%),
    inset 0 0 12px rgb(var(--gold-rgb) / 5%);
}

.gem {
  display: inline-block;
  width: 5px;
  height: 5px;
  background: var(--gold);
  transform: rotate(45deg);
  flex-shrink: 0;
  transition: box-shadow 0.35s;
}

.gem-btn:hover .gem {
  box-shadow:
    0 0 6px rgb(var(--gold-rgb) / 90%),
    0 0 12px rgb(var(--gold-rgb) / 50%);
}
</style>
