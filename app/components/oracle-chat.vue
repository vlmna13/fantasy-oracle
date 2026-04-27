<template>
  <div class="chat-wrapper">
    <div class="date-sep">
      <div class="date-sep-line"></div>
      <div class="date-sep-text">This Conversation</div>
      <div class="date-sep-line"></div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.chat-wrapper {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  scroll-behavior: smooth;
}

.date-sep {
  display: flex;
  align-items: center;
  gap: 1rem;
  opacity: 0.35;
}

.date-sep-text {
  font-family: Cinzel, serif;
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent-text);
}

.date-sep-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, rgb(var(--accent) / 50%), transparent);
}
</style>
