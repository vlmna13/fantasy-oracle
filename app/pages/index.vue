<script setup lang="ts">
import { universes } from '~/data/universes';

const heroReference = useTemplateRef<HTMLElement>('hero');
const cardsReference = useTemplateRef<HTMLElement>('cards');

const { animateHero, animateCards } = usePageAnimations();

onMounted(() => {
  if (heroReference.value) animateHero(heroReference.value);
  if (cardsReference.value) {
    const cards = [...cardsReference.value.children] as HTMLElement[];
    animateCards(cards);
  }
});
</script>

<template>
  <section class="page">
    <div ref="hero">
      <HeroSection />
    </div>
    <div ref="cards" class="cards-wrapper">
      <UniverseCard v-for="u in universes" :key="u.id" :universe="u" />
    </div>
    <p class="footer-rune">✦ Omnia fata revelat ✦</p>
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2vw, 1.75rem);
  width: 100%;
  max-width: 1140px;
}

.footer-rune {
  opacity: 0.8;
  font-family: Cinzel, serif;
  font-size: 0.65rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
}

@media (width <= 760px) {
  .cards-wrapper {
    grid-template-columns: 1fr;
    max-width: 420px;
  }
}
</style>
