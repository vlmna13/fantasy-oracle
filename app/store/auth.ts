import { defineStore } from 'pinia';
import {
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  linkWithCredential,
  EmailAuthProvider,
  updateProfile,
  signOut,
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const auth = getAuth();
  const user = useCurrentUser();

  const isAnonymous = computed<boolean>(() => user.value?.isAnonymous ?? true);
  const isLoggedIn = computed<boolean>(() => !!user.value && !user.value.isAnonymous);
  const displayName = computed(() => user.value?.displayName ?? 'Nomad');

  async function initAnonymous() {
    if (!user.value) {
      await signInAnonymously(auth);
    }
  }

  async function register(nickname: string, password: string) {
    const email = `${nickname}@fantasy-oracle.app`;
    if (user.value?.isAnonymous) {
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user.value, credential);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
    await updateProfile(user.value!, { displayName: nickname });
  }

  async function login(nickname: string, password: string) {
    const email = `${nickname}@fantasy-oracle.app`;
    await signInWithEmailAndPassword(auth, email, password);
  }
  async function logout() {
    await signOut(auth);
  }
  return { user, isAnonymous, isLoggedIn, displayName, initAnonymous, register, login, logout };
});
