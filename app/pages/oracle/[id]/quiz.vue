<template>
  <div class="quiz-page">
    <section v-if="state === 'intro'" class="quiz-intro">
      <h1>{{ quiz?.title }}</h1>
      <p>5 questions · one trial</p>
      <button @click="state = 'playing'">Begin the Trial</button>
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

const route = useRoute();
const universId = route.params.id as string;
const quiz = quizzes.find((q) => q.universeId === universId);
const state = ref<'intro' | 'playing' | 'result'>('playing');
const currentIndex = ref(0);
const currentQuestion = computed(() => quiz?.questions[currentIndex.value]);
</script>

<style scoped>
.quiz-page {
  position: relative;
  z-index: 2;
  max-width: 720px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  text-align: center;
}

.options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}
</style>
