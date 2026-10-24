import type { ProduceBatch, QualityCheck, BatchCondition } from '../types'

/**
 * Compute the condition of a produce batch.
 *
 * Rules (Story 3):
 *  - Spoiled / Needs Attention: shelf life exceeded OR latest QC score < 4
 *  - Near Spoilage            : ≥ 80 % of shelf life elapsed
 *  - Fresh                    : < 80 % elapsed
 */
export function computeCondition(
  batch: ProduceBatch,
  latestCheck?: QualityCheck,
): BatchCondition {
  const today = new Date()
  const harvest = new Date(batch.harvestDate)
  const daysElapsed = Math.floor((today.getTime() - harvest.getTime()) / (1000 * 60 * 60 * 24))
  const pctElapsed = daysElapsed / batch.expectedShelfLifeDays

  if (pctElapsed > 1 || (latestCheck && latestCheck.qualityScore < 4)) {
    return 'Spoiled / Needs Attention'
  }
  if (pctElapsed >= 0.8) {
    return 'Near Spoilage'
  }
  return 'Fresh'
}

/** Return the latest quality check for a given batch (newest first). */
export function latestCheck(batchId: number, checks: QualityCheck[]): QualityCheck | undefined {
  return checks
    .filter((c) => c.batchId === batchId)
    .sort((a, b) => new Date(b.inspectionDate).getTime() - new Date(a.inspectionDate).getTime())[0]
}
