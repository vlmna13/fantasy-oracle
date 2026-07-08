<template>
  <canvas ref="canvas" class="frost-canvas"></canvas>
</template>

<script lang="ts" setup>
const canvas = useTemplateRef<HTMLCanvasElement>('canvas');

type Tip = {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  depth: number;
};

onMounted(() => {
  if (!canvas.value) return;
  const context = canvas.value.getContext('2d') as CanvasRenderingContext2D;
  if (!context) return;

  let W = 0;
  let H = 0;
  let frontier: Tip[] = [];

  function grow() {
    const next: Tip[] = [];

    for (const t of frontier) {
      const endX = t.x + Math.cos(t.angle) * t.length;
      const endY = t.y + Math.sin(t.angle) * t.length;

      context.beginPath();
      context.moveTo(t.x, t.y);
      context.lineTo(endX, endY);
      context.lineWidth = t.width;
      context.strokeStyle = 'rgba(220, 240, 255, 0.75)';
      context.stroke();

      if (t.depth <= 0) continue;

      next.push({
        x: endX,
        y: endY,
        angle: t.angle + (Math.random() - 0.5) * 0.12,
        length: t.length * (0.82 + Math.random() * 0.06),
        width: t.width * 0.86,
        depth: t.depth - 1,
      });

      if (Math.random() < 0.7) {
        next.push({
          x: endX,
          y: endY,
          angle: t.angle - (0.55 + Math.random() * 0.2),
          length: t.length * (0.42 + Math.random() * 0.1),
          width: t.width * 0.5,
          depth: t.depth - 1,
        });
      }
      if (Math.random() < 0.7) {
        next.push({
          x: endX,
          y: endY,
          angle: t.angle + (0.55 + Math.random() * 0.2),
          length: t.length * (0.42 + Math.random() * 0.1),
          width: t.width * 0.5,
          depth: t.depth - 1,
        });
      }
    }

    frontier = next;
  }
  function resize() {
    if (!canvas.value) return;
    W = canvas.value.width = window.innerWidth;
    H = canvas.value.height = window.innerHeight;
  }
  function sprout(x: number, y: number) {
    const toCenter = Math.atan2(H / 2 - y, W / 2 - x);
    const angle = toCenter + (Math.random() - 0.5) * 0.6;
    frontier.push({ x, y, angle, length: 35 + Math.random() * 30, width: 2, depth: 8 });
  }

  resize();

  const step = 50;
  for (let x = 0; x < W; x += step) {
    sprout(x + Math.random() * step, 0);
    sprout(x + Math.random() * step, H);
  }
  for (let y = 0; y < H; y += step) {
    sprout(0, y + Math.random() * step);
    sprout(W, y + Math.random() * step);
  }

  let frame = 0;
  function loop() {
    frame += 1;
    if (frame % 8 === 0) grow();
    if (frontier.length > 0) requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
});
</script>

<style scoped>
.frost-canvas {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
}
</style>
