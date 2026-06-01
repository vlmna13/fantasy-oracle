<template>
  <div class="page">
    <div class="container">
      <img src="/sigil.svg" class="sigil" alt="sigil" />
      <h1 class="title">{{ isLogin ? 'Welcome back, seeker' : 'Your legend begins here' }}</h1>
      <DividerLine />
      <form class="form" @submit.prevent="handleSubmit">
        <input
          v-model="nickname"
          class="input"
          type="text"
          placeholder="Nickname"
          autocomplete="off"
        />
        <input
          v-model="password"
          class="input"
          type="password"
          placeholder="Password"
          autocomplete="off"
        />
        <p v-if="error" class="error">{{ error }}</p>
        <button class="btn" type="submit">{{ isLogin ? 'Sign In' : 'Register' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { FirebaseError } from 'firebase/app';
const authStore = useAuthStore();
const nickname = ref('');
const password = ref('');
const route = useRoute();
const isLogin = computed(() => route.query.mode === 'login');
const error = ref('');
async function handleSubmit() {
  try {
    await (isLogin.value
      ? authStore.login(nickname.value, password.value)
      : authStore.register(nickname.value, password.value));
    navigateTo('/');
  } catch (firebaseError) {
    if (firebaseError instanceof FirebaseError) {
      switch (firebaseError.code) {
        case 'auth/weak-password': {
          error.value = 'Password must be at least 6 characters';

          break;
        }
        case 'auth/email-already-in-use': {
          error.value = 'This nickname is already taken';

          break;
        }
        case 'auth/invalid-credential': {
          error.value = 'Invalid nickname or password';

          break;
        }
        default: {
          error.value = 'Something went wrong. Try again';
        }
      }
    }
  }
}
</script>
