<script setup lang="ts">
import type { Product } from '../types'

defineProps<{ product: Product }>()
</script>

<template>
  <article class="product-card" :class="{ 'product-card--out': product.stock === 0 }">
    <header>
      <span class="category">{{ product.category }}</span>
      <span v-if="product.stock === 0" class="out-badge">Out of Stock</span>
      <span v-else-if="product.stock <= 5" class="low-badge">Low Stock</span>
    </header>

    <h2>{{ product.name }}</h2>
    <p class="description">{{ product.description }}</p>

    <div class="meta">
      <span class="price">\${{ product.price.toFixed(2) }}</span>
      <span class="stock">{{ product.stock }} in stock</span>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.product-card--out { opacity: 0.6; }
header { display: flex; justify-content: space-between; align-items: center; }
.category { font-size: 0.7rem; background: #f0fdf4; color: #166534; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
.out-badge { font-size: 0.7rem; background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
.low-badge { font-size: 0.7rem; background: #fef9c3; color: #854d0e; padding: 2px 8px; border-radius: 999px; font-weight: 600; }
h2 { font-size: 1rem; margin: 0; }
.description { font-size: 0.875rem; color: #4b5563; margin: 0; }
.meta { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
.price { font-size: 1.1rem; font-weight: 700; color: #16a34a; }
.stock { font-size: 0.8rem; color: #6b7280; }
</style>
