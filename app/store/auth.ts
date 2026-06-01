import { defineStore } from 'pinia';
import { getAuth, signInAnonymously } from 'firebase/auth';

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
  return { user, isAnonymous, isLoggedIn, displayName, initAnonymous };
});
