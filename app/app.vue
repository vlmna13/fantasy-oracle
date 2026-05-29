<template>
  <div>
    <NuxtRouteAnnouncer />
    <StarBackground />
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from './store/auth';
const authStore = useAuthStore();
onMounted(async () => {
  await authStore.initAnonymous();
});
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  min-height: 100%;
  background: #0a0a0f;
  color: #d4c9a8;
  font-family: 'EB Garamond', Georgia, serif;
  overflow-x: hidden;
}
</style>
