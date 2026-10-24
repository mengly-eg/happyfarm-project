import type { ProduceBatch, QualityCheck } from '../types'

export const produceBatches: ProduceBatch[] = [
  {
    id: 1,
    farmerId: 1,
    name: 'Jasmine Rice – Batch A',
    quantity: 200,
    unit: 'kg',
    harvestDate: '2026-10-01',
    expectedShelfLifeDays: 30,
    storageLocation: 'Barn 1',
    isArchived: false,
    createdAt: '2026-10-01',
  },
  {
    id: 2,
    farmerId: 1,
    name: 'Cherry Tomatoes',
    quantity: 50,
    unit: 'kg',
    harvestDate: '2026-10-15',
    expectedShelfLifeDays: 14,
    storageLocation: 'Cold Room A',
    isArchived: false,
    createdAt: '2026-10-15',
  },
  {
    id: 3,
    farmerId: 1,
    name: 'Long Beans',
    quantity: 80,
    unit: 'kg',
    harvestDate: '2026-10-05',
    expectedShelfLifeDays: 10,
    storageLocation: 'Barn 2',
    isArchived: false,
    createdAt: '2026-10-05',
  },
  {
    id: 4,
    farmerId: 1,
    name: 'Chilli Peppers',
    quantity: 30,
    unit: 'kg',
    harvestDate: '2026-10-18',
    expectedShelfLifeDays: 20,
    storageLocation: 'Shed A',
    isArchived: false,
    createdAt: '2026-10-18',
  },
  {
    id: 5,
    farmerId: 1,
    name: 'Cassava Root',
    quantity: 300,
    unit: 'kg',
    harvestDate: '2026-09-20',
    expectedShelfLifeDays: 14,
    storageLocation: 'Barn 3',
    isArchived: false,
    createdAt: '2026-09-20',
  },
]

export const qualityChecks: QualityCheck[] = [
  // Batch 1 – Jasmine Rice
  { id: 1, batchId: 1, inspectionDate: '2026-10-08', qualityScore: 9, condition: 'Good', notes: 'No signs of mold.' },
  { id: 2, batchId: 1, inspectionDate: '2026-10-15', qualityScore: 8, condition: 'Good', notes: 'Slight moisture detected.' },
  // Batch 2 – Cherry Tomatoes
  { id: 3, batchId: 2, inspectionDate: '2026-10-17', qualityScore: 7, condition: 'Acceptable', notes: 'Minor bruising on a few.' },
  // Batch 3 – Long Beans
  { id: 4, batchId: 3, inspectionDate: '2026-10-09', qualityScore: 3, condition: 'Poor', notes: 'Yellowing visible.' },
  // Batch 5 – Cassava Root
  { id: 5, batchId: 5, inspectionDate: '2026-10-01', qualityScore: 5, condition: 'Acceptable', notes: 'Firm, no rot.' },
]
