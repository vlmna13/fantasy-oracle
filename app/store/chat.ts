import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
  const messages = ref<{ role: 'user' | 'oracle'; text: string }[]>([]);
  const currentUniverseId = ref('');

  function loadMessages(universeId: string) {
    currentUniverseId.value = universeId;
    const saved = localStorage.getItem(`chat-${universeId}`);
    messages.value = saved ? JSON.parse(saved) : [];
  }

  function addMessage(role: 'user' | 'oracle', text: string) {
    messages.value.push({ role, text });
    localStorage.setItem(`chat-${currentUniverseId.value}`, JSON.stringify(messages.value));
  }

  return { messages, loadMessages, addMessage };
});
