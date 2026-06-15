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
  onAuthStateChanged,
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const auth = getAuth();
  const user = useCurrentUser();

  const isLoggedIn = computed<boolean>(() => !!user.value && !user.value.isAnonymous);
  const displayName = computed(() => user.value?.displayName ?? 'Nomad');
  const isLoading = computed(() => user.value === undefined);

  async function initAnonymous() {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        signInAnonymously(auth);
      }
    });
  }

  function nicknameToEmail(nickname: string) {
    return `${nickname.trim().toLowerCase()}@fantasy-oracle.app`;
  }

  async function register(nickname: string, password: string) {
    const email = nicknameToEmail(nickname);
    const credential = user.value?.isAnonymous
      ? await linkWithCredential(user.value, EmailAuthProvider.credential(email, password))
      : await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: nickname.trim() });
  }

  async function login(nickname: string, password: string) {
    const email = nicknameToEmail(nickname);
    await signInWithEmailAndPassword(auth, email, password);
  }
  async function logout() {
    await signOut(auth);
  }

  return { user, isLoggedIn, isLoading, displayName, initAnonymous, register, login, logout };
});
