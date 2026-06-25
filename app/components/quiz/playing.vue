<template>
  <section class="quiz-intro">
    <div class="chaplet">
      <div
        v-for="gem in total"
        :key="gem"
        class="bead"
        :class="{
          current: gem - 1 === currentIndex,
          done: gem - 1 < currentIndex,
        }"
      ></div>
    </div>
    <p class="q-counter">Question {{ currentIndex + 1 }} of {{ total }}</p>
    <h2 class="question">{{ currentQuestion?.question }}</h2>
    <div class="options">
      <button
        v-for="(option, index) in currentQuestion?.options"
        :key="option"
        class="option"
        :class="{
          correct: isCorrect && option === currentQuestion?.correct,
          wrong: selected === option && !isCorrect,
        }"
        :disabled="!!selected"
        @click="choose(option)"
      >
        <span class="option-mark">
          <span class="letter">{{ String.fromCharCode(65 + index) }}</span>
        </span>
        {{ option }}
      </button>
    </div>
    <div class="result">
      <button v-if="selected && isCorrect" class="oracle-btn" @click="next">
        {{ isLast ? 'Claim the Seal' : 'Next Question' }}
      </button>
      <p v-else-if="selected && !isCorrect" class="vision-fail">
        ✧ The vision darkens — that path was false.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { QuizQuestion } from '~/data/quizzes';

const properties = defineProps<{
  currentIndex: number;
  total?: number;
  currentQuestion?: QuizQuestion;
}>();

const emit = defineEmits<{ next: []; fail: [] }>();

const selected = ref<string | undefined>(undefined);

const isCorrect = computed(() => selected.value === properties.currentQuestion?.correct);
const isLast = computed(() => properties.currentIndex + 1 === properties.total);

function choose(option: string) {
  if (selected.value) return;
  selected.value = option;
  if (option !== properties.currentQuestion?.correct) {
    emit('fail');
  }
}

function next() {
  selected.value = undefined;
  emit('next');
}
</script>

<style scoped>
.chaplet {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
}

.bead {
  width: 13px;
  height: 13px;
  transform: rotate(45deg);
  border: 1px solid rgb(201 168 76 / 35%);
  background: transparent;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
}

.bead.current {
  border-color: var(--gold);
  box-shadow: 0 0 12px rgb(201 168 76 / 70%);
  background: rgb(201 168 76 / 15%);
}

.bead.done {
  border-color: var(--gold);
  background: var(--gold);
  box-shadow: 0 0 10px rgb(201 168 76 / 60%);
}

.q-counter {
  font-family: Cinzel, serif;
  font-size: 0.64rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgb(var(--accent-bright) / 80%);
  text-align: center;
}

.question {
  font-family: Cinzel, serif;
  font-weight: 600;
  font-size: clamp(1.15rem, 2.4vw, 1.45rem);
  line-height: 1.4;
  color: var(--text);
  text-align: center;
  text-wrap: balance;
  margin-bottom: 2rem;
  min-height: 2.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.option {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  text-align: left;
  font-family: 'EB Garamond', serif;
  font-size: 1.06rem;
  color: var(--text);
  background: rgb(10 8 12 / 40%);
  border: 1px solid rgb(201 168 76 / 20%);
  padding: 1rem 1.2rem;
  cursor: pointer;
  transition:
    transform 0.25s,
    border-color 0.25s,
    background 0.25s,
    opacity 0.35s,
    color 0.25s;
}

.option:not(:disabled):hover {
  transform: translateX(5px);
  border-color: rgb(var(--accent-bright) / 60%);
  background: rgb(var(--accent-bright) / 7%);
}

.option:disabled:not(.correct, .wrong) {
  opacity: 0.4;
  cursor: default;
}

.option.correct {
  border-color: var(--gold);
  background: rgb(201 168 76 / 10%);
  color: var(--gold-bright);
  box-shadow: 0 0 18px rgb(201 168 76 / 18%);
}

.option.wrong {
  border-color: rgb(190 60 60);
  background: rgb(190 60 60 / 12%);
  color: rgb(220 120 120);
  box-shadow: 0 0 18px rgb(190 60 60 / 20%);
}

.option-mark {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(201 168 76 / 40%);
  transform: rotate(45deg);
  font-family: Cinzel, serif;
  font-size: 0.7rem;
  color: rgb(201 168 76 / 85%);
  transition: all 0.3s;
}

.letter {
  transform: rotate(-45deg);
  display: block;
}

.result {
  display: flex;
  justify-content: center;
  margin-top: 1.4rem;
  min-height: 3.2em;
  align-items: center;
}
</style>
