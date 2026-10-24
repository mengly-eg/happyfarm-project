// ─── Shared ────────────────────────────────────────────────────────────────

export type Role = 'farmer' | 'seller';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
  location: string;
}

// ─── Produce ───────────────────────────────────────────────────────────────

/** Condition is computed from harvest date, shelf life, and latest QC score. */
export type BatchCondition = 'Fresh' | 'Near Spoilage' | 'Spoiled / Needs Attention';

export interface ProduceBatch {
  id: number;
  farmerId: number;
  name: string;
  quantity: number;
  unit: string;
  harvestDate: string;          // ISO date string, e.g. "2026-10-10"
  expectedShelfLifeDays: number;
  storageLocation?: string;
  isArchived: boolean;
  createdAt: string;            // ISO date string
}

export interface QualityCheck {
  id: number;
  batchId: number;
  inspectionDate: string;       // ISO date string
  qualityScore: number;         // 1–10
  condition: string;
  notes?: string;
}

// ─── Equipment ─────────────────────────────────────────────────────────────

export type ProductCategory =
  | 'Hand Tools'
  | 'Power Tools'
  | 'Irrigation'
  | 'Seeds & Fertilizers'
  | 'Pest Control'
  | 'Storage & Transport';

export interface Product {
  id: number;
  sellerId: number;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  stock: number;
  usageInstructions: string;
  isActive: boolean;
  createdAt: string;            // ISO date string
}
