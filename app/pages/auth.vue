<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="nickname" type="text" />
    <input v-model="password" type="password" />
    <button type="submit">{{ isLogin ? 'Sign In' : 'Register' }}</button>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
const nickname = ref('');
const password = ref('');
const route = useRoute();
const isLogin = computed(() => route.query.mode === 'login');
async function handleSubmit() {
  try {
    await (isLogin.value
      ? authStore.login(nickname.value, password.value)
      : authStore.register(nickname.value, password.value));
    navigateTo('/');
  } catch (error) {
    console.error(error);
  }
}
</script>
