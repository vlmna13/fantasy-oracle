<template>
  <div>
    <NuxtRouteAnnouncer />
    <StarBackground />
    <NuxtPage />
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  width: 100%;
  min-height: 100%;
  background: #0a0a0f;
  color: #d4c9a8;
  font-family: 'EB Garamond', Georgia, serif;
  overflow-x: hidden;
}
</style>
