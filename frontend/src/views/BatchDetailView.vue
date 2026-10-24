<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QualityCheckHistory from '../components/QualityCheckHistory.vue'
import { produceBatches, qualityChecks } from '../data/produce'
import { computeCondition, latestCheck } from '../utils/condition'

const route  = useRoute()
const router = useRouter()

const batchId = computed(() => Number(route.params.id))

const batch = computed(() => produceBatches.find((b) => b.id === batchId.value))

const batchChecks = computed(() =>
  qualityChecks
    .filter((c) => c.batchId === batchId.value)
    .sort((a, b) => new Date(b.inspectionDate).getTime() - new Date(a.inspectionDate).getTime()),
)

const condition = computed(() => {
  if (!batch.value) return 'Fresh' as const
  const lc = latestCheck(batchId.value, qualityChecks)
  return computeCondition(batch.value, lc)
})

const conditionClass = computed(() => ({
  'badge--fresh':  condition.value === 'Fresh',
  'badge--warn':   condition.value === 'Near Spoilage',
  'badge--danger': condition.value === 'Spoiled / Needs Attention',
}))
</script>

<template>
  <div class="page">
    <button class="back" @click="router.back()">← Back to Batches</button>

    <div v-if="!batch" class="not-found">
      <p>Batch not found.</p>
    </div>

    <template v-else>
      <header class="batch-header">
        <div>
          <h1>{{ batch.name }}</h1>
          <p class="meta">Harvested on {{ batch.harvestDate }} · {{ batch.storageLocation ?? 'No storage specified' }}</p>
        </div>
        <span class="badge" :class="conditionClass">{{ condition }}</span>
      </header>

      <section class="info-grid">
        <div class="info-item">
          <span class="label">Quantity</span>
          <span class="value">{{ batch.quantity }} {{ batch.unit }}</span>
        </div>
        <div class="info-item">
          <span class="label">Expected Shelf Life</span>
          <span class="value">{{ batch.expectedShelfLifeDays }} days</span>
        </div>
        <div class="info-item">
          <span class="label">Created</span>
          <span class="value">{{ batch.createdAt }}</span>
        </div>
        <div class="info-item">
          <span class="label">Status</span>
          <span class="value">{{ batch.isArchived ? 'Archived' : 'Active' }}</span>
        </div>
      </section>

      <QualityCheckHistory :checks="batchChecks" />
    </template>
  </div>
</template>

<style scoped>
.page { max-width: 760px; margin: 0 auto; padding: 24px 16px; }
.back { background: none; border: none; color: #16a34a; cursor: pointer; font-size: 0.875rem; margin-bottom: 16px; padding: 0; }
.back:hover { text-decoration: underline; }

.batch-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
}
h1 { font-size: 1.4rem; margin: 0 0 4px; }
.meta { font-size: 0.875rem; color: #6b7280; margin: 0; }

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}
.info-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.label { font-size: 0.75rem; color: #6b7280; }
.value { font-size: 0.95rem; font-weight: 600; }

.badge {
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 600;
  white-space: nowrap;
}
.badge--fresh  { background: #dcfce7; color: #166534; }
.badge--warn   { background: #fef9c3; color: #854d0e; }
.badge--danger { background: #fee2e2; color: #991b1b; }

.not-found { color: #6b7280; font-size: 0.9rem; }
</style>
