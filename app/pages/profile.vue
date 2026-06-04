<template>
  <div class="page">
    <header class="header-container">
      <BackButton />
      <h2 class="header-title">The Seeker's Sanctum</h2>
    </header>
    <section class="hero">
      <ProfileAvatar />
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page {
  position: relative;
  z-index: 2;
  max-width: 920px;
  margin: 0 auto;
  padding: 0 1.5rem 5rem;
}

.header-container {
  height: 72px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  background: linear-gradient(
    180deg,
    rgb(10 10 15 / 92%) 0%,
    rgb(10 10 15 / 55%) 70%,
    transparent 100%
  );
  backdrop-filter: blur(6px);
  margin: 0 -1.5rem;
  padding: 0 1.5rem;
}

.header-title {
  font-family: Cinzel, serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  text-align: center;
  opacity: 0.85;
}

.hero {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem 0 2rem;
}
</style>
