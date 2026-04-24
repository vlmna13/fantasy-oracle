<template>
  <div class="hero">
    <img src="/sigil.svg" class="sigil" alt="sigil" />
    <h1 class="hero-title">Fantasy Oracle</h1>
    <DividerLine />
    <p class="hero-sub">Choose your world. Ask the Oracle.</p>
  </div>
</template>

<script setup lang="ts"></script>
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
</style>
