<template>
  <section class="section">
    <div class="section-head">
      <span class="section-title">Account</span>
      <span class="section-line"></span>
    </div>
    <div class="settings">
      <div class="setting-row">
        <div class="setting-left">
          <span class="setting-label">Seeker's Name</span>
          <span class="setting-val">Name</span>
        </div>
        <button class="oracle-btn setting-action">Change Name</button>
      </div>
      <div class="setting-row">
        <div class="setting-left">
          <span class="setting-label">Secret Incantation</span>
          <span class="setting-val">• • • • • • • •</span>
        </div>
        <button class="oracle-btn setting-action">Change Password</button>
      </div>
    </div>
    <div class="leave-wrap">
      <button class="leave-btn">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
        </svg>
        Leave the Sanctum
      </button>
    </div>
  </section>
</template>

<style scoped>
.section {
  margin-top: 2.75rem;
}

.section-head {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.section-title {
  font-family: Cinzel, serif;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  white-space: nowrap;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgb(var(--gold-rgb) / 30%), transparent);
}

.settings {
  display: flex;
  flex-direction: column;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: rgb(18 16 22 / 72%);
  border: 1px solid rgb(var(--gold-rgb) / 18%);
  padding: 1.1rem 1.3rem;
  border-bottom: none;
}

.setting-row:last-of-type {
  border-bottom: 1px solid rgb(var(--gold-rgb) / 18%);
}

.setting-left {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.setting-label {
  font-family: Cinzel, serif;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: var(--text);
}

.setting-val {
  font-family: 'EB Garamond', serif;
  font-size: 0.9rem;
  color: rgb(var(--text-rgb) / 55%);
}

.setting-action {
  font-size: 0.62rem;
  padding: 0.55em 1.2em;
  white-space: nowrap;
}

.leave-wrap {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

.leave-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: Cinzel, serif;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgb(180 90 90 / 80%);
  background: transparent;
  border: 1px solid rgb(139 26 26 / 45%);
  padding: 0.85em 2.2em;
  cursor: pointer;
  transition: all 0.3s;
}

.leave-btn:hover {
  color: #d88;
  border-color: rgb(139 26 26 / 85%);
  background: rgb(139 26 26 / 10%);
  box-shadow: 0 0 22px rgb(139 26 26 / 25%);
}

.leave-btn svg {
  width: 15px;
  height: 15px;
}

@media (width <= 720px) {
  .setting-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.8rem;
  }

  .setting-action {
    width: 100%;
  }
}
</style>
