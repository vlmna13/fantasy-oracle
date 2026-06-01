<template>
  <div class="page">
    <div class="container">
      <OracleSigil />
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
        <button class="oracle-btn" type="submit">{{ isLogin ? 'Sign In' : 'Register' }}</button>
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

<style scoped>
.page {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 8vh 5vw 4vh;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.title {
  font-family: Cinzel, serif;
  font-size: clamp(1.3rem, 3vw, 1.9rem);
  font-weight: 600;
  color: var(--gold);
  letter-spacing: 0.05em;
  text-align: center;
  text-shadow:
    0 0 35px rgb(var(--gold-rgb) / 50%),
    0 2px 6px rgb(0 0 0 / 90%);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 380px;
}

.input {
  width: 100%;
  background: rgb(var(--gold-rgb) / 5%);
  border: 1px solid rgb(var(--gold-rgb) / 35%);
  color: #d4c9a8;
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 1rem;
  font-style: italic;
  padding: 0.75em 1.1em;
  outline: none;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
  caret-color: var(--gold);
}

.input::placeholder {
  color: rgb(255 255 255 / 25%);
  font-style: italic;
}

.input:focus {
  border-color: rgb(var(--gold-rgb) / 60%);
  box-shadow: 0 0 18px rgb(var(--gold-rgb) / 20%);
}

.error {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: 0.95rem;
  font-style: italic;
  color: rgb(220 80 80 / 90%);
  text-align: center;
}
</style>
