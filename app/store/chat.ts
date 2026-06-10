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

interface ChatSummary {
  universeId: string;
  lastMessage: string;
}

const dataBase = getFirestore();

export const useChatStore = defineStore('chat', () => {
  const authStore = useAuthStore();
  const uid = computed(() => authStore.user!.uid);
  const messages = ref<Message[]>([]);
  const currentUniverseId = ref('');
  const isLoading = ref(false);
  const chatSummaries = ref<ChatSummary[]>([]);

  let nextOrder = 0;

  function messagesReference(universeId: string) {
    return collection(dataBase, 'users', uid.value, 'chats', universeId, 'messages');
  }

  async function loadMessages(universeId: string) {
    currentUniverseId.value = universeId;
    isLoading.value = true;
    try {
      const q = query(messagesReference(universeId), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      messages.value = snapshot.docs.map((document_) => {
        const data = document_.data();
        return { role: data.role, text: data.text } as Message;
      });
      nextOrder = snapshot.size;
    } finally {
      isLoading.value = false;
    }
  }

  async function loadChatSummaries() {
    const snapshot = await getDocs(collection(dataBase, 'users', uid.value, 'chats'));
    chatSummaries.value = snapshot.docs.map((d) => ({
      universeId: d.id,
      lastMessage: d.data().lastMessage as string,
    }));
  }

  async function addMessage(role: 'user' | 'oracle', text: string) {
    const universeId = currentUniverseId.value;
    if (!universeId) {
      throw new Error('addMessage called before a chat was loaded (currentUniverseId is empty)');
    }

    const order = nextOrder;
    await addDoc(messagesReference(universeId), {
      role,
      text,
      order,
      createdAt: serverTimestamp(),
    });
    nextOrder += 1;
    messages.value.push({ role, text });

    await setDoc(
      doc(dataBase, 'users', uid.value, 'chats', universeId),
      { lastMessage: text, lastMessageAt: serverTimestamp() },
      { merge: true },
    );
  }

  return { messages, isLoading, chatSummaries, loadMessages, loadChatSummaries, addMessage };
});
