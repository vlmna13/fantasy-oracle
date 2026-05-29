<template>
  <div class="hero">
    <img src="/sigil.svg" class="sigil" alt="sigil" />
    <h1 class="hero-title">Fantasy Oracle</h1>
    <DividerLine />
    <p class="hero-sub">Choose your world. Ask the Oracle.</p>

    <div class="auth-panel">
      <p class="auth-greeting">
        Welcome, <span class="auth-name">{{ authStore.displayName }}</span>
      </p>
      <div class="auth-actions">
        <template v-if="authStore.isLoggedIn">
          <button class="auth-btn">Cabinet</button>
          <button class="auth-btn auth-btn-ghost">Leave</button>
        </template>
        <template v-else>
          <button class="auth-btn">Register</button>
          <button class="auth-btn auth-btn-ghost">Sign In</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
const authStore = useAuthStore();
</script>
<style scoped>
.hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.1rem;
}

.sigil {
  width: 80px;
  height: 80px;
  margin-bottom: 0.25rem;
  animation: spin-slow 60s linear infinite;
  opacity: 0.75;
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

@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
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

.auth-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  padding: 0.6em 1.8em;
  font-family: Cinzel, serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid rgb(var(--gold-rgb) / 55%);
  background: transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    background 0.35s,
    box-shadow 0.35s,
    color 0.35s,
    border-color 0.35s;
}

.auth-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgb(var(--gold-rgb) / 6%) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.auth-btn:hover::before {
  transform: translateX(100%);
}

.auth-btn:hover {
  border-color: rgb(var(--gold-rgb) / 90%);
  background: rgb(var(--gold-rgb) / 7%);
  box-shadow:
    0 0 12px rgb(var(--gold-rgb) / 35%),
    0 0 30px rgb(var(--gold-rgb) / 15%);
}

.auth-btn-ghost {
  border-color: rgb(var(--text-rgb) / 25%);
  color: rgb(var(--text-rgb) / 60%);
}

.auth-btn-ghost::before {
  display: none;
}

.auth-btn-ghost:hover {
  background: rgb(var(--text-rgb) / 5%);
  box-shadow: none;
  border-color: rgb(var(--text-rgb) / 45%);
  color: rgb(var(--text-rgb) / 80%);
}
</style>
