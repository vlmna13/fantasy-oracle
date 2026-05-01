<template>
  <div class="chat-wrapper">
    <div class="date-sep">
      <div class="date-sep-line"></div>
      <div class="date-sep-text">This Conversation</div>
      <div class="date-sep-line"></div>
    </div>

    <div ref="messagesReference" class="messages">
      <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
        {{ msg.text }}
      </div>
      <div v-if="isLoading" class="message oracle loading">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="input-bar">
      <div class="input-wrap">
        <input
          v-model="question"
          class="input-field"
          type="text"
          placeholder="Ask the Oracle..."
          autocomplete="off"
          @keydown.enter="sendMessage"
        />
      </div>
      <button class="send-btn" :disabled="isLoading" @click="sendMessage">✦</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const question = ref('');
const messages = ref<{ role: 'user' | 'oracle'; text: string }[]>([]);
const isLoading = ref(false);
const route = useRoute();
const universeId = route.params.id as string;

const messagesReference = ref<HTMLElement | undefined>(undefined);

watch(
  messages,
  async () => {
    await nextTick();
    if (messagesReference.value) {
      messagesReference.value.scrollTop = messagesReference.value.scrollHeight;
    }
  },
  { deep: true },
);

async function sendMessage() {
  if (!question.value.trim || isLoading.value) return;
  messages.value.push({ role: 'user', text: question.value });
  const userQuestion = question.value;
  question.value = '';
  isLoading.value = true;
  const data = await $fetch<{ answer: string }>('/api/chat', {
    method: 'POST',
    body: { question: userQuestion, universeId },
  });

  messages.value.push({ role: 'oracle', text: data.answer });
  isLoading.value = false;
}
</script>

<style scoped>
.chat-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.date-sep {
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0.35;
  padding: 2rem 1.5rem 0;
}

.date-sep-text {
  font-family: Cinzel, serif;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-text);
  white-space: nowrap;
}

.date-sep-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgb(var(--accent) / 50%), transparent);
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  scroll-behavior: smooth;
  height: 0;
}

.message {
  max-width: 75%;
  padding: 0.85em 1.2em;
  line-height: 1.7;
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1rem;
}

.message.user {
  align-self: flex-end;
  background: rgb(var(--accent) / 15%);
  border: 1px solid rgb(var(--accent) / 40%);
  color: var(--text);
}

.message.oracle {
  align-self: flex-start;
  background: rgb(var(--accent) / 8%);
  border: 1px solid rgb(var(--accent-glow) / 25%);
  color: var(--accent-text);
  box-shadow: 0 0 20px rgb(var(--accent) / 10%);
}

.messages::-webkit-scrollbar {
  width: 4px;
}

.messages::-webkit-scrollbar-track {
  background: transparent;
}

.messages::-webkit-scrollbar-thumb {
  background: rgb(var(--accent) / 40%);
  border-radius: 2px;
}

.messages::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--accent) / 70%);
}

.loading {
  display: flex;
  gap: 0.4em;
  align-items: center;
  padding: 0.85em 1.2em;
}

.loading span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-text);
  animation: pulse 1.2s ease-in-out infinite;
}

.loading span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.input-bar {
  flex-shrink: 0;
  border-top: 1px solid rgb(var(--accent) / 30%);
  background: var(--input-bg);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  gap: 0.75rem;
  position: relative;
}

.input-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 5%;
  right: 5%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgb(var(--gold-rgb) / 20%), transparent);
}

.input-wrap {
  flex: 1;
  position: relative;
}

.input-wrap::before,
.input-wrap::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  pointer-events: none;
  z-index: 1;
}

.input-wrap::before {
  top: 0;
  left: 0;
  border-top: 1px solid rgb(var(--gold-rgb) / 40%);
  border-left: 1px solid rgb(var(--gold-rgb) / 40%);
}

.input-wrap::after {
  bottom: 0;
  right: 0;
  border-bottom: 1px solid rgb(var(--gold-rgb) / 40%);
  border-right: 1px solid rgb(var(--gold-rgb) / 40%);
}

.input-field {
  width: 100%;
  background: rgb(var(--accent) / 8%);
  border: 1px solid rgb(var(--accent) / 45%);
  color: var(--text);
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  padding: 0.65em 1em;
  outline: none;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  caret-color: var(--gold);
}

.input-field::placeholder {
  color: rgb(var(--text-rgb) / 30%);
  font-style: italic;
  font-family: 'EB Garamond', Georgia, serif;
}

.input-field:focus {
  border-color: rgb(var(--gold-rgb) / 55%);
  box-shadow:
    0 0 0 1px rgb(var(--gold-rgb) / 10%),
    0 0 18px rgb(var(--accent) / 30%);
}

.send-btn {
  width: 46px;
  height: 46px;
  background: rgb(var(--accent) / 20%);
  border: 1px solid rgb(var(--gold-rgb) / 50%);
  color: var(--gold);
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
  position: relative;
  overflow: hidden;
}

.send-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgb(var(--gold-rgb) / 15%) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.send-btn:hover {
  border-color: rgb(var(--gold-rgb) / 85%);
  box-shadow:
    0 0 16px rgb(var(--gold-rgb) / 30%),
    0 0 4px rgb(var(--gold-rgb) / 15%);
}

.send-btn:hover::before {
  opacity: 1;
}

.send-btn:active {
  transform: scale(0.95);
}
</style>
