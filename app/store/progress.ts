import { defineStore } from 'pinia';
import { getFirestore, doc, getDoc, setDoc, increment, arrayUnion } from 'firebase/firestore';
import { useAuthStore } from './auth';
import { ref, computed } from 'vue';

export const useProgressStore = defineStore('progress', () => {
  const dataBase = getFirestore();
  const authStore = useAuthStore();
  const uid = computed(() => authStore.user!.uid);
  const xp = ref(0);
  const questionsAsked = ref(0);
  const completedQuizzes = ref<string[]>([]);
  const streak = ref(0);
  const lastActiveDate = ref<string | undefined>(undefined);

  const level = computed(() => Math.floor(xp.value / 100) + 1);
  const levelProgress = computed(() => xp.value % 100);
  const rank = computed(() => {
    if (level.value >= 10) return 'Oracle Ascendant';
    if (level.value >= 5) return 'Adept Seeker';
    return 'Novice Seeker';
  });

  function progressReference() {
    return doc(dataBase, 'users', uid.value);
  }

  function dateKey(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async function checkIn() {
    const today = dateKey(new Date());
    if (lastActiveDate.value === today) return;

    const yesterday = dateKey(new Date(Date.now() - 86_400_000));
    streak.value = lastActiveDate.value === yesterday ? streak.value + 1 : 1;
    lastActiveDate.value = today;

    await setDoc(
      progressReference(),
      { streak: streak.value, lastActiveDate: today },
      { merge: true },
    );
  }

  async function load() {
    await getCurrentUser();
    const snapshot = await getDoc(progressReference());
    const data = snapshot.data();
    xp.value = data?.xp ?? 0;
    questionsAsked.value = data?.questionsAsked ?? 0;
    completedQuizzes.value = data?.completedQuizzes ?? [];
    streak.value = data?.streak ?? 0;
    lastActiveDate.value = data?.lastActiveDate;
    await checkIn();
  }

  async function addQuestionXp() {
    xp.value += 5;
    questionsAsked.value += 1;
    await setDoc(
      progressReference(),
      { xp: increment(5), questionsAsked: increment(1) },
      { merge: true },
    );
  }

  async function completeQuiz(universeId: string) {
    if (completedQuizzes.value.includes(universeId)) return;
    xp.value += 150;
    completedQuizzes.value.push(universeId);
    await setDoc(
      progressReference(),
      { xp: increment(150), completedQuizzes: arrayUnion(universeId) },
      { merge: true },
    );
  }

  return {
    xp,
    questionsAsked,
    completedQuizzes,
    streak,
    level,
    levelProgress,
    rank,
    load,
    addQuestionXp,
    completeQuiz,
  };
});
