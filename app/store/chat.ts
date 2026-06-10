import { defineStore } from 'pinia';

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  setDoc,
  doc,
} from 'firebase/firestore';
import { useAuthStore } from '~/store/auth';
import { ref, computed } from 'vue';

interface Message {
  role: 'user' | 'oracle';
  text: string;
}

const dataBase = getFirestore();

export const useChatStore = defineStore('chat', () => {
  const authStore = useAuthStore();
  const uid = computed(() => authStore.user!.uid);
  const messages = ref<Message[]>([]);
  const currentUniverseId = ref('');
  const isLoading = ref(false);

  function messagesReference(universeId: string) {
    return collection(dataBase, 'users', uid.value, 'chats', universeId, 'messages');
  }

  async function loadMessages(universeId: string) {
    currentUniverseId.value = universeId;
    isLoading.value = true;
    try {
      const q = query(messagesReference(universeId), orderBy('createdAt', 'asc'));
      const snapshot = await getDocs(q);
      messages.value = snapshot.docs.map((document_) => document_.data() as Message);
    } finally {
      isLoading.value = false;
    }
  }

  async function addMessage(role: 'user' | 'oracle', text: string) {
    await addDoc(messagesReference(currentUniverseId.value), {
      role,
      text,
      createdAt: serverTimestamp(),
    });
    messages.value.push({ role, text });
    await setDoc(
      doc(dataBase, 'users', uid.value, 'chats', currentUniverseId.value),
      { lastMessage: text, lastMessageAt: serverTimestamp() },
      { merge: true },
    );
  }

  return { messages, isLoading, loadMessages, addMessage };
});
