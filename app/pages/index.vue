<script setup lang="ts">
import { universes } from '~/data/universes';
</script>

<template>
  <div class="flex gap-8 p-8">
    <UniverseCard v-for="u in universes" :key="u.id" :universe="u" />
  </div>
</template>
