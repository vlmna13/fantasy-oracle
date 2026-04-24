<script setup lang="ts">
import type { Universe } from '~/data/universes';

defineProps<{
  universe: Universe;
}>();
</script>

<template>
  <div :class="`card card-${universe.id}`">
    <img :src="universe.frame" class="card-frame" aria-hidden="true" />

    <div class="card-art">
      <img v-if="universe.image" :src="universe.image" :alt="universe.name" class="card-art-img" />
      <slot v-else name="icon"></slot>
    </div>

    <div class="card-body">
      <p class="card-name">{{ universe.name }}</p>
      <p class="card-desc">{{ universe.description }}</p>
      <NuxtLink :to="universe.route" class="card-btn">
        <span class="card-btn-gem"></span>
        Visit The World
        <span class="card-btn-gem"></span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.45s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.45s;
}

.card:hover {
  transform: translateY(-8px) scale(1.012);
}

.card-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
}

.card-art {
  width: 100%;

  /* height: 200px; */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.card-art-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 1.4rem 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
}

.card-name {
  font-family: Cinzel, serif;
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
  font-weight: 600;
  letter-spacing: 0.1em;
}

.card-desc {
  font-family: 'EB Garamond', Georgia, serif;
  font-size: clamp(0.88rem, 1.2vw, 1rem);
  font-style: italic;
  line-height: 1.65;
  opacity: 0.68;
  flex: 1;
}

.card-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  margin-top: 0.8rem;
  padding: 0.6em 1.8em;
  align-self: flex-start;
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

.card-btn::before {
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

.card-btn:hover::before {
  transform: translateX(100%);
}

.card-btn:hover {
  color: var(--gold-bright);
  border-color: rgb(var(--gold-rgb) / 90%);
  background: rgb(var(--gold-rgb) / 7%);
  box-shadow:
    0 0 12px rgb(var(--gold-rgb) / 35%),
    0 0 30px rgb(var(--gold-rgb) / 15%),
    inset 0 0 12px rgb(var(--gold-rgb) / 5%);
}

.card-btn-gem {
  display: inline-block;
  width: 5px;
  height: 5px;
  background: var(--gold);
  transform: rotate(45deg);
  flex-shrink: 0;
  transition: box-shadow 0.35s;
}

.card-btn:hover .card-btn-gem {
  box-shadow:
    0 0 6px rgb(var(--gold-rgb) / 90%),
    0 0 12px rgb(var(--gold-rgb) / 50%);
}
</style>
