<template>
  <div class="page" :class="`universe-${universId}`">
    <OracleHeader v-if="universe" :universe="universe" subtitle="Prove your knowledge" />
    <Intro
      v-if="ready && state === 'intro'"
      :universe-name="universe?.name"
      :title="quiz?.title"
      :crest="quiz?.crest"
      :question-count="quiz?.questions.length"
      @begin="startTrial"
    ></Intro>
    <Playing
      v-else-if="ready && state === 'playing'"
      :current-index="currentIndex"
      :total="quiz?.questions.length"
      :current-question="currentQuestion"
      @next="handleNext"
      @fail="handleFail"
      @win="handleWin"
    ></Playing>
    <Result v-if="outcome !== 'none'" :won="outcome === 'win'" :universe-id="universId" />
  </div>
</template>

<script setup lang="ts">
import Intro from '~/components/quiz/intro.vue';
import Playing from '~/components/quiz/playing.vue';
import Result from '~/components/quiz/result.vue';
import { quizzes } from '~/data/quizzes';
import { universes } from '~/data/universes';
import { useProgressStore } from '~/store/progress';

const route = useRoute();
const universId = route.params.id as string;
const quiz = quizzes.find((q) => q.universeId === universId);
const universe = universes.find((u) => u.id === universId);
const progress = useProgressStore();
const state = ref<'intro' | 'playing'>('intro');
const currentIndex = ref(0);
const currentQuestion = computed(() => quiz?.questions[currentIndex.value]);
const ready = ref(false);
const outcome = ref<'none' | 'win' | 'fail'>('none');

onMounted(async () => {
  if (!quiz || !universe) {
    return navigateTo('/');
  }
  await progress.load();
  if (progress.completedQuizzes.includes(universId)) {
    return navigateTo('/profile');
  }
  ready.value = true;
});

function startTrial() {
  currentIndex.value = 0;
  state.value = 'playing';
}

function handleNext() {
  currentIndex.value++;
}

function handleFail() {
  outcome.value = 'fail';
}

function handleWin() {
  progress.completeQuiz(universId);
  outcome.value = 'win';
}
</script>

<style scoped>
.page {
  position: relative;
  z-index: 2;
  min-height: 100vh;
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
</style>
