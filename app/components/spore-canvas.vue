<template>
  <canvas ref="canvas" class="spore-canvas"></canvas>
</template>

<script setup lang="ts">
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');
type Spore = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
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

  function drawSpore(x: number, y: number, r: number, alpha: number) {
    const gradient = context.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, `rgba(120, 190, 70, ${0.2 * alpha})`);
    gradient.addColorStop(0.5, `rgba(70, 140, 55, ${0.1 * alpha})`);
    gradient.addColorStop(1, 'rgba(70, 140, 55, 0)');
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fill();
  }

  const spores: Spore[] = [];
  for (let index = 0; index < 55; index++) {
    spores.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 45 + Math.random() * 90,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
    });
  }
  function loop(time: number) {
    context.clearRect(0, 0, W, H);

    for (const spore of spores) {
      spore.vx += (Math.random() - 0.5) * 0.02;
      spore.vy += (Math.random() - 0.5) * 0.02;
      spore.vx = Math.max(-0.4, Math.min(0.4, spore.vx));
      spore.vy = Math.max(-0.4, Math.min(0.4, spore.vy));

      spore.x += spore.vx;
      spore.y += spore.vy;

      if (spore.x < -spore.r) spore.x = W + spore.r;
      if (spore.x > W + spore.r) spore.x = -spore.r;
      if (spore.y < -spore.r) spore.y = H + spore.r;
      if (spore.y > H + spore.r) spore.y = -spore.r;

      const glow = 0.8 + 0.35 * Math.sin(time * 0.002 + spore.phase);
      drawSpore(spore.x, spore.y, spore.r, glow);
    }

    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
});
onBeforeUnmount(() => cancelAnimationFrame(raf));
</script>

<style scoped>
.spore-canvas {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
}
</style>
