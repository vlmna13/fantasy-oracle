<template>
  <img :src="src" class="sigil" alt="sigil" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ src?: string }>(), {
  src: '/sigil.svg',
});
</script>

<style scoped>
.sigil {
  width: 80px;
  height: 80px;
  opacity: 0.75;
  animation: spin-slow 60s linear infinite;
}

@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
}
</style>
