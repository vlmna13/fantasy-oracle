<template>
  <div :class="`page universe-${universe?.id}`">
    <OracleHeader v-if="universe" :universe="universe" />
    <OracleChat />
  </div>
</template>

<script setup lang="ts">
import { universes } from '~/data/universes';
const route = useRoute();
const universe = universes.find((u) => u.id === route.params.id);
if (!universe) navigateTo('/');
</script>
<style scoped>
.page {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
}
</style>
