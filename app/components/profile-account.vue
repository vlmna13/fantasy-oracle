<template>
  <section class="section">
    <div class="section-line"></div>
    <div class="leave-wrap">
      <button class="leave-btn" @click="handleLeave">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
        Leave the Sanctum
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();

async function handleLeave() {
  await authStore.logout();
  navigateTo('/');
}
</script>

<style scoped>
.section {
  margin-top: 2.75rem;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgb(var(--gold-rgb) / 30%), transparent);
}

.leave-wrap {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

.leave-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: Cinzel, serif;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgb(180 90 90 / 80%);
  background: transparent;
  border: 1px solid rgb(139 26 26 / 45%);
  padding: 0.85em 2.2em;
  cursor: pointer;
  transition: all 0.3s;
}

.leave-btn:hover {
  color: #d88;
  border-color: rgb(139 26 26 / 85%);
  background: rgb(139 26 26 / 10%);
  box-shadow: 0 0 22px rgb(139 26 26 / 25%);
}

.leave-btn svg {
  width: 15px;
  height: 15px;
}
</style>
