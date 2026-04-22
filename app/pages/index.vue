<script setup lang="ts">
import { universes } from '~/data/universes';
</script>

<template>
  <section class="page">
    <HeroSection />
    <div class="flex gap-8 p-8 cards-wrapper">
      <UniverseCard v-for="u in universes" :key="u.id" :universe="u" />
    </div>
  </section>
</template>

<style scoped>
.page {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6vh 5vw 8vh;
  gap: clamp(2.5rem, 5vh, 4.5rem);
}

.cards-wrapper {
  width: 100%;
  max-width: 1140px;
}
</style>
