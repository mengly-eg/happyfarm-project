<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <span class="brand">🌱 HappyFarm</span>
      <div class="links">
        <RouterLink to="/">My Batches</RouterLink>
        <RouterLink to="/equipment">Equipment</RouterLink>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #f3f4f6; color: #111827; }
</style>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #16a34a;
  color: #fff;
}
.brand { font-size: 1.1rem; font-weight: 700; letter-spacing: -0.5px; }
.links { display: flex; gap: 20px; }
.links a { color: #fff; text-decoration: none; font-size: 0.9rem; opacity: 0.85; }
.links a:hover, .links a.router-link-active { opacity: 1; text-decoration: underline; }
</style>
