<template>
  <div class="divider">
    <div class="divider-line"></div>
    <div class="divider-gem"></div>
    <div class="divider-line"></div>
  </div>
</template>

<style scoped>
.divider {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: min(380px, 80vw);
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgb(var(--gold-rgb) / 60%), transparent);
}

.divider-gem {
  width: 6px;
  height: 6px;
  background: var(--gold);
  transform: rotate(45deg);
  box-shadow: 0 0 8px rgb(var(--gold-rgb) / 80%);
}
</style>
