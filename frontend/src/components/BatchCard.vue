<script setup lang="ts">
import type { ProduceBatch, BatchCondition } from '../types'

const props = defineProps<{
  batch: ProduceBatch
  condition: BatchCondition
}>()
defineEmits<{ (e: 'view', id: number): void }>()

const conditionClass: Record<BatchCondition, string> = {
  Fresh: 'badge--fresh',
  'Near Spoilage': 'badge--warn',
  'Spoiled / Needs Attention': 'badge--danger',
}
</script>

<template>
  <article class="batch-card" :class="{ 'batch-card--danger': condition === 'Spoiled / Needs Attention' }">
    <header>
      <h2>{{ batch.name }}</h2>
      <span class="badge" :class="conditionClass[condition]">{{ condition }}</span>
    </header>

    <ul class="details">
      <li><strong>Quantity:</strong> {{ batch.quantity }} {{ batch.unit }}</li>
      <li><strong>Harvested:</strong> {{ batch.harvestDate }}</li>
      <li><strong>Shelf life:</strong> {{ batch.expectedShelfLifeDays }} days</li>
      <li v-if="batch.storageLocation"><strong>Storage:</strong> {{ batch.storageLocation }}</li>
    </ul>

    <button @click="$emit('view', batch.id)">View Details →</button>
  </article>
</template>

<style scoped>
.batch-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.batch-card--danger { border-color: #ef4444; }
header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
h2 { font-size: 1rem; margin: 0; }
.details { list-style: none; padding: 0; margin: 0; font-size: 0.875rem; color: #374151; }
.details li { margin-bottom: 4px; }
button {
  align-self: flex-start;
  margin-top: auto;
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  background: #16a34a;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
}
button:hover { background: #15803d; }
.badge {
  font-size: 0.7rem;
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
  font-weight: 600;
}
.badge--fresh   { background: #dcfce7; color: #166534; }
.badge--warn    { background: #fef9c3; color: #854d0e; }
.badge--danger  { background: #fee2e2; color: #991b1b; }
</style>
