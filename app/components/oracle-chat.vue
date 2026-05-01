<template>
  <div class="chat-wrapper">
    <div class="date-sep">
      <div class="date-sep-line"></div>
      <div class="date-sep-text">This Conversation</div>
      <div class="date-sep-line"></div>
    </div>

    <div ref="messagesReference" class="messages">
      <template v-for="(msg, index) in messages" :key="index">
        <div v-if="msg.role === 'oracle'" class="msg-oracle">
          <div class="oracle-avatar">
            <img :src="avatarSource" width="22" height="22" alt="Oracle" />
          </div>
          <div class="oracle-content">
            <div class="oracle-label">The Oracle Speaks</div>
            <div class="oracle-bubble">
              <div class="oracle-text">{{ msg.text }}</div>
            </div>
          </div>
        </div>

        <div v-else class="msg-user">
          <div class="user-bubble">
            <div class="user-text">{{ msg.text }}</div>
          </div>
        </div>
      </template>

      <div v-if="isLoading" class="msg-oracle typing">
        <div class="oracle-avatar">
          <img :src="avatarSource" width="22" height="22" alt="Oracle" />
        </div>
        <div class="oracle-content">
          <div class="oracle-label">The Oracle Speaks</div>
          <div class="typing-text">
            Consulting the ancient tomes
            <span class="dots"> <span></span><span></span><span></span> </span>
          </div>
        </div>
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
import { universes } from '~/data/universes';

const question = ref('');
const messages = ref<{ role: 'user' | 'oracle'; text: string }[]>([]);
const isLoading = ref(false);

const route = useRoute();
const universeId = route.params.id as string;
const universe = universes.find((u) => u.id === universeId);
const avatarSource = universe?.avatar ?? '/avatars/avatar-hp.svg';

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
  if (!question.value.trim() || isLoading.value) return;
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
  height: 0;
  overflow-y: auto;
  padding: 1.5rem 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  scroll-behavior: smooth;
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

.msg-oracle {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  max-width: 82%;
  animation: msg-in 0.5s cubic-bezier(0.23, 1, 0.32, 1) both;
}

.oracle-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  flex-shrink: 0;
  background: radial-gradient(circle at 40% 40%, var(--bg-mid), var(--bg-start));
  border: 1px solid rgb(var(--accent-glow) / 50%);
  color: var(--accent-text);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 14px rgb(var(--accent) / 50%),
    0 0 4px rgb(var(--accent-glow) / 20%);
  position: relative;
  overflow: hidden;
  margin-top: 1.5rem;
}

.oracle-avatar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 30%, rgb(var(--accent-glow) / 8%) 0%, transparent 70%);
}

.oracle-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.oracle-label {
  font-family: Cinzel, serif;
  font-size: 0.55rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--accent-text);
  opacity: 0.65;
  padding-left: 0.1rem;
}

.oracle-bubble {
  background: linear-gradient(135deg, var(--bg-start) 0%, var(--bg-mid) 60%, var(--bg-start) 100%);
  border: 1px solid rgb(var(--accent) / 55%);
  border-left: 2px solid rgb(var(--accent-glow) / 50%);
  padding: 1.1rem 1.3rem;
  position: relative;
  box-shadow:
    0 4px 24px rgb(0 0 0 / 60%),
    inset 0 0 30px rgb(var(--accent) / 8%),
    0 0 0 1px rgb(var(--accent-glow) / 6%);
}

.oracle-bubble::before {
  content: '❝';
  position: absolute;
  top: 0.4rem;
  left: 0.6rem;
  font-size: 1.4rem;
  color: rgb(var(--accent-glow) / 12%);
  font-family: Georgia, serif;
  line-height: 1;
}

.oracle-bubble::after {
  content: '';
  position: absolute;
  top: -1px;
  right: -1px;
  width: 18px;
  height: 18px;
  border-top: 1px solid rgb(var(--accent-glow) / 35%);
  border-right: 1px solid rgb(var(--accent-glow) / 35%);
}

.oracle-text {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: clamp(0.95rem, 1.5vw, 1.08rem);
  font-style: italic;
  line-height: 1.75;
  color: var(--msg-oracle-color);
  position: relative;
  z-index: 1;
}

.msg-user {
  display: flex;
  justify-content: flex-end;
  animation: msg-in 0.4s cubic-bezier(0.23, 1, 0.32, 1) both;
}

.user-bubble {
  max-width: 65%;
  background: rgb(0 0 0 / 40%);
  border: 1px solid rgb(var(--text-rgb) / 18%);
  border-right: 2px solid rgb(var(--text-rgb) / 28%);
  padding: 0.75rem 1.1rem;
  box-shadow: 0 4px 20px rgb(0 0 0 / 50%);
  position: relative;
}

.user-bubble::before {
  content: '';
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 14px;
  height: 14px;
  border-bottom: 1px solid rgb(var(--text-rgb) / 22%);
  border-right: 1px solid rgb(var(--text-rgb) / 22%);
}

.user-text {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: clamp(0.95rem, 1.5vw, 1.05rem);
  color: var(--msg-user-color);
  line-height: 1.6;
}

.typing {
  opacity: 0.7;
}

.typing-text {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 0.9rem;
  font-style: italic;
  color: rgb(var(--accent-glow) / 55%);
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding-top: 0.25rem;
}

.dots {
  display: inline-flex;
  gap: 3px;
}

.dots span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gold);
  opacity: 0.4;
  animation: dot-pulse 1.4s infinite;
}

.dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-pulse {
  0%,
  80%,
  100% {
    opacity: 0.2;
    transform: scale(0.85);
  }

  40% {
    opacity: 0.9;
    transform: scale(1.15);
  }
}

@keyframes msg-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
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
  border-top: 1px solid rgb(var(--accent-glow) / 40%);
  border-left: 1px solid rgb(var(--accent-glow) / 40%);
}

.input-wrap::after {
  bottom: 0;
  right: 0;
  border-bottom: 1px solid rgb(var(--accent-glow) / 40%);
  border-right: 1px solid rgb(var(--accent-glow) / 40%);
}

.input-field {
  width: 100%;
  background: rgb(var(--accent) / 8%);
  border: 1px solid rgb(var(--accent) / 45%);
  color: var(--msg-user-color);
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
  border-color: rgb(var(--accent-glow) / 55%);
  box-shadow:
    0 0 0 1px rgb(var(--accent-glow) / 10%),
    0 0 18px rgb(var(--accent) / 30%);
}

.send-btn {
  width: 46px;
  height: 46px;
  background: rgb(var(--accent) / 20%);
  border: 1px solid rgb(var(--accent-glow) / 50%);
  color: var(--accent-text);
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
  background: radial-gradient(circle at 50% 50%, rgb(var(--accent-glow) / 15%) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.send-btn:hover {
  border-color: rgb(var(--accent-glow) / 85%);
  box-shadow:
    0 0 16px rgb(var(--accent-glow) / 30%),
    0 0 4px rgb(var(--accent-glow) / 15%);
}

.send-btn:hover::before {
  opacity: 1;
}

.send-btn:active {
  transform: scale(0.95);
}
</style>
