<template>
  <NuxtLink to="/" class="back-btn">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
    >
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
    Worlds
  </NuxtLink>
</template>

<style scoped>
.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: Cinzel, serif;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-decoration: none;
  color: rgb(var(--gold-rgb) / 60%);
  transition: color 0.25s;
}

.back-btn:hover {
  color: var(--gold);
}

.back-btn svg {
  width: 16px;
  height: 16px;
}
</style>
