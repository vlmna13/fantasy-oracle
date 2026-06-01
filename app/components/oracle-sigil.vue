<template>
  <img src="/sigil.svg" class="sigil" alt="sigil" />
</template>

<style scoped>
.sigil {
  width: 80px;
  height: 80px;
  opacity: 0.75;
  animation: spin-slow 60s linear infinite;
}

@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
}
</style>
