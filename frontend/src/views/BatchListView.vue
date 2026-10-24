<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BatchCard from '../components/BatchCard.vue'
import { produceBatches, qualityChecks } from '../data/produce'
import { computeCondition, latestCheck } from '../utils/condition'
import type { BatchCondition } from '../types'

const router = useRouter()

const activeBatches = computed(() =>
  produceBatches.filter((b) => !b.isArchived),
)

function conditionOf(batchId: number): BatchCondition {
  const lc = latestCheck(batchId, qualityChecks)
  return computeCondition(
    produceBatches.find((b) => b.id === batchId)!,
    lc,
  )
}

// Dashboard summary counts
const total   = computed(() => activeBatches.value.length)
const fresh   = computed(() => activeBatches.value.filter((b) => conditionOf(b.id) === 'Fresh').length)
const near    = computed(() => activeBatches.value.filter((b) => conditionOf(b.id) === 'Near Spoilage').length)
const spoiled = computed(() => activeBatches.value.filter((b) => conditionOf(b.id) === 'Spoiled / Needs Attention').length)

function viewBatch(id: number) {
  router.push({ name: 'batch-detail', params: { id } })
}
</script>

<template>
  <div class="page">
    <h1>My Produce Batches</h1>

    <!-- Dashboard summary -->
    <div class="summary">
      <div class="stat">
        <span class="stat-value">{{ total }}</span>
        <span class="stat-label">Total Batches</span>
      </div>
      <div class="stat stat--fresh">
        <span class="stat-value">{{ fresh }}</span>
        <span class="stat-label">Fresh</span>
      </div>
      <div class="stat stat--warn">
        <span class="stat-value">{{ near }}</span>
        <span class="stat-label">Near Spoilage</span>
      </div>
      <div class="stat stat--danger">
        <span class="stat-value">{{ spoiled }}</span>
        <span class="stat-label">Needs Attention</span>
      </div>
    </div>

    <!-- Batch grid -->
    <div class="grid">
      <BatchCard
        v-for="batch in activeBatches"
        :key="batch.id"
        :batch="batch"
        :condition="conditionOf(batch.id)"
        @view="viewBatch"
      />
    </div>
  </div>
</template>

<style scoped>
.page { max-width: 1000px; margin: 0 auto; padding: 24px 16px; }
h1 { font-size: 1.5rem; margin-bottom: 20px; }

.summary {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}
.stat {
  flex: 1;
  min-width: 120px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
}
.stat-value { display: block; font-size: 2rem; font-weight: 700; }
.stat-label { font-size: 0.8rem; color: #6b7280; }
.stat--fresh  { border-color: #86efac; background: #f0fdf4; }
.stat--warn   { border-color: #fde047; background: #fefce8; }
.stat--danger { border-color: #fca5a5; background: #fef2f2; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 16px;
}
</style>
