<template>
  <div class="hero">
    <OracleSigil />
    <h1 class="hero-title">Fantasy Oracle</h1>
    <DividerLine />
    <p class="hero-sub">Choose your world. Ask the Oracle.</p>

    <div :style="authPanelStyle" class="auth-panel">
      <p class="auth-greeting">
        Welcome, <span class="auth-name">{{ authStore.displayName }}</span>
      </p>
      <div class="auth-actions">
        <template v-if="authStore.isLoggedIn">
          <button class="oracle-btn">Sanctum</button>
          <button class="oracle-btn oracle-btn-ghost" @click="authStore.logout()">Leave</button>
        </template>
        <template v-else>
          <NuxtLink to="/auth?mode=register" class="oracle-btn">Register</NuxtLink>
          <NuxtLink to="/auth?mode=login" class="oracle-btn oracle-btn-ghost">Sign In</NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
const authPanelStyle = computed((): { opacity: number; visibility: 'hidden' | 'visible' } => ({
  opacity: authStore.isLoading ? 0 : 1,
  visibility: authStore.isLoading ? 'hidden' : 'visible',
}));
</script>
<style scoped>
.hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
}

.hero-title {
  font-family: 'Cinzel Decorative', Cinzel, serif;
  font-size: clamp(2.4rem, 6.5vw, 5.2rem);
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.05em;
  line-height: 1.1;
  text-shadow:
    0 0 35px rgb(var(--gold-rgb) / 65%),
    0 0 80px rgb(var(--gold-rgb) / 22%),
    0 2px 6px rgb(0 0 0 / 90%);
}

.hero-sub {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: clamp(1rem, 2vw, 1.28rem);
  font-style: italic;
  letter-spacing: 0.14em;
  color: rgb(var(--text-rgb) / 72%);
}

.auth-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  margin-top: 0.5rem;
  transition: opacity 0.4s ease;
}

.auth-greeting {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  font-style: italic;
  color: rgb(var(--text-rgb) / 60%);
  letter-spacing: 0.08em;
}

.auth-name {
  color: var(--gold);
  font-style: normal;
}

.auth-actions {
  display: flex;
  gap: 0.75rem;
}
</style>
