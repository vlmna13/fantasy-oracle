<template>
  <div class="outcome" :class="[won ? 'is-win' : 'is-fail', `u-${universeId}`]">
    <div ref="veil" class="veil"></div>
    <template v-if="isFrost">
      <div ref="haze" class="frost-haze"></div>
      <FrostCanvas />
    </template>
    <template v-if="isShadow">
      <div ref="haze" class="shadow-haze"></div>
      <EmberCanvas />
    </template>
    <template v-if="isPoison">
      <div ref="haze" class="poison-haze"></div>
      <SporeCanvas />
    </template>
    <div ref="content" class="content">
      <p class="eyebrow">{{ won ? 'The Trial is Won' : 'The Trial is Lost' }}</p>
      <h1 class="verdict">{{ won ? 'Victory' : 'Failure' }}</h1>
      <p class="sub">{{ won ? '+150 XP - the seal is yours.' : defeatLine }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
const veil = ref();
const content = ref();
const haze = ref();
const properties = defineProps<{ won: boolean; universeId: string }>();

const isFrost = computed(() => !properties.won && properties.universeId === 'harry-potter');
const isShadow = computed(() => !properties.won && properties.universeId === 'lord-of-the-rings');
const isPoison = computed(() => !properties.won && properties.universeId === 'witcher');

const defeatLines: Record<string, string> = {
  'harry-potter': 'A cold dread creeps in. You are turned away.',
  'lord-of-the-rings': 'The embers fade to ash. You are cast into the dark.',
  witcher: 'The venom takes hold. Your trial ends here.',
};

const defeatLine = computed(
  () => defeatLines[properties.universeId] ?? 'The vision darkens. You are turned away.',
);

onMounted(() => {
  const tl = gsap.timeline();

  tl.from(veil.value, { scale: 1.6, opacity: 0, duration: 2, ease: 'power2.out' }, 0);

  if (haze.value) {
    tl.fromTo(haze.value, { opacity: 0 }, { opacity: 0.55, duration: 2.4, ease: 'power2.in' }, 0);
  }

  tl.from(content.value, { opacity: 0, y: 14, duration: 0.8, ease: 'power3.out' }, '-=1.4');
  tl.add(() => navigateTo('/profile'), '+=1');
});
</script>

<style scoped>
.outcome {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fade-in 0.5s ease both;
}

.veil {
  position: absolute;
  inset: 0;
}

.is-win .veil {
  background: radial-gradient(
    circle at center,
    rgb(10 8 4 / 20%) 0%,
    rgb(var(--gold-rgb) / 15%) 55%,
    rgb(var(--gold-rgb) / 55%) 100%
  );
}

.u-harry-potter.is-fail .veil {
  background: radial-gradient(
    circle at center,
    rgb(8 12 20 / 30%) 0%,
    rgb(150 190 220 / 20%) 55%,
    rgb(210 235 250 / 92%) 100%
  );
  backdrop-filter: blur(2px);
}

.u-lord-of-the-rings.is-fail .veil {
  background: radial-gradient(
    circle at center,
    rgb(34 10 5 / 50%) 0%,
    rgb(64 20 9 / 40%) 52%,
    rgb(14 6 4 / 92%) 100%
  );
  backdrop-filter: blur(1.5px);
}

.u-witcher.is-fail .veil {
  background: radial-gradient(
    circle at center,
    rgb(8 16 8 / 50%) 0%,
    rgb(20 40 18 / 42%) 52%,
    rgb(6 12 6 / 92%) 100%
  );
  backdrop-filter: blur(1.5px);
}

.frost-haze {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgb(226 238 248);
  pointer-events: none;
}

.shadow-haze {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgb(12 5 4);
  pointer-events: none;
}

.poison-haze {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: rgb(6 12 6);
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 41;
  text-align: center;
}

.eyebrow {
  font-family: Cinzel, serif;
  font-size: 0.66rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  margin-bottom: 0.9rem;
  color: rgb(var(--text-rgb) / 70%);
}

.is-win .eyebrow {
  color: rgb(var(--gold-rgb) / 85%);
}

.verdict {
  font-family: 'Cinzel Decorative', Cinzel, serif;
  font-weight: 700;
  font-size: clamp(2.6rem, 8vw, 4.5rem);
  letter-spacing: 0.04em;
  line-height: 1;
  color: #e6e6ee;
}

.is-win .verdict {
  color: var(--gold-bright);
  text-shadow: 0 0 40px rgb(var(--gold-rgb) / 60%);
}

.u-harry-potter.is-fail .verdict {
  color: #dbeaf5;
  text-shadow: 0 0 40px rgb(180 215 240 / 70%);
}

.u-lord-of-the-rings.is-fail .verdict {
  color: #ffc38a;
  text-shadow: 0 0 40px rgb(230 110 40 / 70%);
}

.u-witcher.is-fail .verdict {
  color: #d3ecab;
  text-shadow: 0 0 40px rgb(120 190 90 / 65%);
}

.sub {
  margin-top: 1.1rem;
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 1.05rem;
  color: rgb(var(--text-rgb) / 70%);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
