<script setup lang="ts">
import type { QualityCheck } from '../types'

defineProps<{ checks: QualityCheck[] }>()

function scoreClass(score: number): string {
  if (score >= 7) return 'score--good'
  if (score >= 4) return 'score--warn'
  return 'score--bad'
}
</script>

<template>
  <section class="qc-history">
    <h3>Quality Check History</h3>

    <p v-if="checks.length === 0" class="empty">No quality checks recorded yet.</p>

    <ul v-else class="qc-list">
      <li v-for="check in checks" :key="check.id" class="qc-item">
        <div class="qc-header">
          <span class="date">{{ check.inspectionDate }}</span>
          <span class="score" :class="scoreClass(check.qualityScore)">
            Score: {{ check.qualityScore }}/10
          </span>
        </div>
        <p class="condition">{{ check.condition }}</p>
        <p v-if="check.notes" class="notes">{{ check.notes }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.qc-history { margin-top: 24px; }
h3 { font-size: 1rem; margin-bottom: 12px; }
.empty { color: #6b7280; font-size: 0.875rem; }
.qc-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.qc-item {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
}
.qc-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
.date { font-size: 0.8rem; color: #6b7280; }
.score {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
}
.score--good { background: #dcfce7; color: #166534; }
.score--warn { background: #fef9c3; color: #854d0e; }
.score--bad  { background: #fee2e2; color: #991b1b; }
.condition { margin: 0; font-size: 0.875rem; font-weight: 500; }
.notes { margin: 4px 0 0; font-size: 0.8rem; color: #6b7280; }
</style>
