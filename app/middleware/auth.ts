import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware(async () => {
  const auth = getAuth();
  await new Promise<void>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      unsubscribe();
      resolve();
    });
  });
  const authStore = useAuthStore();
  if (authStore.isLoggedIn) return navigateTo('/');
});
