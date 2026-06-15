<template>
  <div class="avatar">
    <svg class="avatar-ring" viewBox="0 0 132 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="66"
        cy="66"
        r="63"
        stroke="#c9a84c"
        stroke-width="0.7"
        stroke-dasharray="3 4"
        opacity="0.55"
      />
      <circle cx="66" cy="66" r="56" stroke="#c9a84c" stroke-width="0.4" opacity="0.3" />
      <line x1="66" y1="2" x2="66" y2="9" stroke="#c9a84c" stroke-width="1.2" />
      <line x1="66" y1="123" x2="66" y2="130" stroke="#c9a84c" stroke-width="1.2" />
      <line x1="2" y1="66" x2="9" y2="66" stroke="#c9a84c" stroke-width="1.2" />
      <line x1="123" y1="66" x2="130" y2="66" stroke="#c9a84c" stroke-width="1.2" />
    </svg>
    <div class="avatar-core">
      <svg
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="29" cy="29" rx="22" ry="13" stroke="#c9a84c" stroke-width="1.4" />
        <circle cx="29" cy="29" r="8" stroke="#c9a84c" stroke-width="1.4" />
        <circle cx="29" cy="29" r="3" fill="#c9a84c" opacity="0.85" />
        <path d="M29 8 L31 15 L29 13 L27 15 Z" fill="#c9a84c" opacity="0.6" />
        <path d="M29 50 L31 43 L29 45 L27 43 Z" fill="#c9a84c" opacity="0.6" />
      </svg>
    </div>
    <div class="avatar-badge">
      <span class="avatar-lvl">1</span>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  position: relative;
  width: 132px;
  height: 132px;
  flex-shrink: 0;
}

.avatar-ring {
  position: absolute;
  inset: 0;
  animation: spin-slow 50s linear infinite;
}

@keyframes spin-slow {
  to {
    transform: rotate(360deg);
  }
}

.avatar-core {
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 42% 38%, #241a0a 0%, #120c06 65%, #0a0704 100%);
  border: 1px solid rgb(var(--gold-rgb) / 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    inset 0 0 24px rgb(var(--gold-rgb) / 12%),
    0 0 28px rgb(var(--gold-rgb) / 18%);
}

.avatar-badge {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #2a1c08, #15100a);
  border: 1px solid rgb(var(--gold-rgb) / 70%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 14px rgb(0 0 0 / 70%);
  z-index: 2;
}

.avatar-lvl {
  font-family: Cinzel, serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--gold-bright);
  line-height: 1;
}
</style>
