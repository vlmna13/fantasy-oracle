<template>
  <header :class="`oracle-header-${universe.id}`">
    <NuxtLink to="/" class="back">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      >
        <path d="M19 12H5M12 5l-7 7 7 7" />
      </svg>
      Worlds
    </NuxtLink>

    <div class="header-title">
      <div class="header-universe">{{ universe.name }}</div>
      <div class="header-sub">The Oracle awaits your question</div>
    </div>
    <div class="header-crest">
      <img :src="universe.crest" :alt="universe.name" />
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Universe } from '~/data/universes';
defineProps<{ universe: Universe }>();
</script>
<style scoped>
header {
  height: 68px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 1.5rem;
  border-bottom: 1px solid rgb(var(--accent) / 35%);
  background: var(--header-bg);
  backdrop-filter: blur(8px);
  position: relative;
}

header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 5%;
  right: 5%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgb(var(--gold-rgb) / 20%), transparent);
}

.back {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: Cinzel, serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: rgb(var(--accent-glow) / 65%);
  cursor: pointer;
  text-decoration: none;
  transition: color 0.25s;
  text-transform: uppercase;
}

.back:hover {
  color: var(--accent-text);
}

.back svg {
  width: 16px;
  height: 16px;
}

.header-title {
  text-align: center;
}

.header-universe {
  font-family: Cinzel, serif;
  font-size: clamp(0.85rem, 1.5vw, 1.05rem);
  font-weight: 600;
  color: var(--accent-text);
  letter-spacing: 0.12em;
  text-shadow: 0 0 20px rgb(var(--accent-glow) / 40%);
}

.header-sub {
  font-family: 'EB Garamond', serif;
  font-size: 0.72rem;
  font-style: italic;
  color: rgb(var(--text-rgb) / 55%);
  letter-spacing: 0.08em;
  margin-top: 0.1rem;
}

.header-crest {
  display: flex;
  justify-content: flex-end;
}
</style>
