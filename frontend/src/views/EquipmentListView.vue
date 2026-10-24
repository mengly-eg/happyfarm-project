<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { products } from '../data/products'
import type { ProductCategory } from '../types'

const CATEGORIES: (ProductCategory | 'All')[] = [
  'All',
  'Hand Tools',
  'Power Tools',
  'Irrigation',
  'Seeds & Fertilizers',
  'Pest Control',
  'Storage & Transport',
]

const search   = ref('')
const category = ref<ProductCategory | 'All'>('All')

const activeProducts = computed(() => products.filter((p) => p.isActive))

const visible = computed(() => {
  const term = search.value.toLowerCase()
  return activeProducts.value.filter((p) => {
    const matchesCat  = category.value === 'All' || p.category === category.value
    const matchesTerm = p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    return matchesCat && matchesTerm
  })
})
</script>

<template>
  <div class="page">
    <h1>Equipment Listings</h1>

    <!-- Filters -->
    <div class="filters">
      <input
        v-model="search"
        type="search"
        placeholder="Search tools by name or description…"
        aria-label="Search equipment"
      />
      <select v-model="category" aria-label="Filter by category">
        <option v-for="cat in CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>

    <p class="count">{{ visible.length }} of {{ activeProducts.length }} listings</p>

    <!-- Product grid -->
    <div v-if="visible.length > 0" class="grid">
      <ProductCard v-for="product in visible" :key="product.id" :product="product" />
    </div>
    <p v-else class="empty">No equipment matches your search.</p>
  </div>
</template>

<style scoped>
.page { max-width: 1000px; margin: 0 auto; padding: 24px 16px; }
h1 { font-size: 1.5rem; margin-bottom: 20px; }

.filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
.filters input { flex: 1; min-width: 220px; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.875rem; }
.filters select { padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 0.875rem; }

.count { color: #6b7280; font-size: 0.875rem; margin-bottom: 16px; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 16px;
}

.empty { padding: 40px; text-align: center; background: #fff; border-radius: 10px; color: #6b7280; }
</style>
