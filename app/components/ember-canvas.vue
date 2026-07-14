<template>
  <canvas ref="canvas" class="ember-canvas"></canvas>
</template>

<script lang="ts" setup>
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');

type Ember = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
};

let raf = 0;

onMounted(() => {
  if (!canvas.value) return;
  const context = canvas.value.getContext('2d') as CanvasRenderingContext2D;
  if (!context) return;

  const W = (canvas.value.width = window.innerWidth);
  const H = (canvas.value.height = window.innerHeight);

  context.globalCompositeOperation = 'lighter';

  function drawEmber(x: number, y: number, r: number, alpha: number) {
    const gradient = context.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, `rgba(255, 180, 80, ${0.9 * alpha})`);
    gradient.addColorStop(0.4, `rgba(220, 90, 30, ${0.5 * alpha})`);
    gradient.addColorStop(1, 'rgba(220, 90, 30, 0)');
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fill();
  }

  const embers: Ember[] = [];
  for (let index = 0; index < 90; index++) {
    embers.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 5 + Math.random() * 20,
      speed: 0.3 + Math.random() * 1,
      drift: 0.5 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    });
  }

  function loop(time: number) {
    context.clearRect(0, 0, W, H);

    for (const ember of embers) {
      ember.y -= ember.speed;
      ember.x += Math.sin(time * 0.001 + ember.phase) * ember.drift * 0.4;

      if (ember.y + ember.r < 0) {
        ember.y = H + ember.r;
        ember.x = Math.random() * W;
      }

      const flicker = 0.5 + 0.5 * Math.sin(time * 0.005 + ember.phase);
      drawEmber(ember.x, ember.y, ember.r, flicker);
    }

    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
});

onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>

<style scoped>
.ember-canvas {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
}
</style>
