<script setup lang="ts">
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');

onMounted(() => {
  if (!canvas.value) return;

  const context = canvas.value.getContext('2d') as CanvasRenderingContext2D;
  if (!context) return;

  let W = 0;
  let H = 0;
  let stars: {
    x: number;
    y: number;
    r: number;
    alpha: number;
    speed: number;
    phase: number;
    gold: boolean;
  }[] = [];

  function resize() {
    if (!canvas.value) return;
    W = canvas.value.width = window.innerWidth;
    H = canvas.value.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    const count = Math.floor((W * H) / 2800);
    for (let index = 0; index < count; index++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.7 + 0.15,
        speed: Math.random() * 0.005 + 0.001,
        phase: Math.random() * Math.PI * 2,
        gold: Math.random() < 0.08,
      });
    }
  }

  function drawStars(t: number) {
    context.clearRect(0, 0, W, H);
    for (const s of stars) {
      const a = s.alpha * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      context.beginPath();
      context.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      context.fillStyle = s.gold ? `rgba(201,168,76,${a})` : `rgba(220,215,240,${a})`;
      context.fill();
    }
  }

  function loop(t: number) {
    drawStars(t);
    requestAnimationFrame(loop);
  }

  resize();
  initStars();
  window.addEventListener('resize', () => {
    resize();
    initStars();
  });
  requestAnimationFrame(loop);
});
</script>

<template>
  <canvas ref="canvas" class="stars"></canvas>
</template>

<style scoped>
.stars {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
