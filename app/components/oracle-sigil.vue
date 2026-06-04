<template>
  <svg class="sigil" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" stroke="#c9a84c" stroke-width="0.8" stroke-dasharray="4 3" />
    <circle cx="50" cy="50" r="38" stroke="#c9a84c" stroke-width="0.4" opacity="0.5" />
    <polygon
      points="50,10 59,36 87,36 65,54 73,80 50,63 27,80 35,54 13,36 41,36"
      stroke="#c9a84c"
      stroke-width="0.8"
      fill="none"
      opacity="0.7"
    />
    <circle cx="50" cy="50" r="5" stroke="#c9a84c" stroke-width="0.8" fill="none" />
    <circle cx="50" cy="50" r="1.5" fill="#c9a84c" opacity="0.8" />
    <line x1="50" y1="2" x2="50" y2="8" stroke="#c9a84c" stroke-width="1.2" />
    <line x1="50" y1="92" x2="50" y2="98" stroke="#c9a84c" stroke-width="1.2" />
    <line x1="2" y1="50" x2="8" y2="50" stroke="#c9a84c" stroke-width="1.2" />
    <line x1="92" y1="50" x2="98" y2="50" stroke="#c9a84c" stroke-width="1.2" />
  </svg>
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
