# HappyFarm – Component Trees

> Week 4 deliverable for Part E. Each section lists the component tree for one screen, with props, events, and state ownership.

---

## Screen 1 – Produce Batch List (`/`)

**Route:** `BatchListView`

```
BatchListView          (owns state)
└── BatchCard × N      (display only)
```

| Component | Props | Events emitted | State owned |
|-----------|-------|---------------|-------------|
| `BatchListView` | — | — | `activeBatches` (from hard-coded data), `conditionOf(id)` computed per batch, summary counts (`total`, `fresh`, `near`, `spoiled`) |
| `BatchCard` | `batch: ProduceBatch`, `condition: BatchCondition` | `view(id: number)` | — |

**Data flow:**
- `BatchListView` reads `produceBatches` and `qualityChecks` from `src/data/produce.ts`.
- It calls `computeCondition(batch, latestCheck)` for each batch and passes the result down as `condition`.
- When the user clicks "View Details", `BatchCard` emits `view(id)` → `BatchListView` calls `router.push` to navigate to the detail screen.

---

## Screen 2 – Batch Detail + QC History (`/batches/:id`)

**Route:** `BatchDetailView`

```
BatchDetailView              (owns state)
└── QualityCheckHistory      (display only)
```

| Component | Props | Events emitted | State owned |
|-----------|-------|---------------|-------------|
| `BatchDetailView` | — (reads `route.params.id`) | — | `batch` (looked up from data), `batchChecks` (filtered + sorted), `condition` computed |
| `QualityCheckHistory` | `checks: QualityCheck[]` | — | — |

**Data flow:**
- `BatchDetailView` reads `id` from the route, finds the matching batch, filters quality checks for that batch (newest first), and computes the condition.
- All data is passed down to `QualityCheckHistory` as `checks`.

---

## Screen 3 – Equipment Listings (`/equipment`)

**Route:** `EquipmentListView`

```
EquipmentListView      (owns state)
└── ProductCard × N    (display only)
```

| Component | Props | Events emitted | State owned |
|-----------|-------|---------------|-------------|
| `EquipmentListView` | — | — | `search: string` (ref), `category: ProductCategory \| 'All'` (ref), `visible` computed from both |
| `ProductCard` | `product: Product` | — | — |

**Data flow:**
- `EquipmentListView` reads `products` from `src/data/products.ts` and owns the two filter refs `search` and `category`.
- `visible` is a computed that filters active products by both category and keyword (case-insensitive on name + description).
- `ProductCard` is purely presentational — it receives one product and renders its details.

---

## Utility

| File | Purpose |
|------|---------|
| `src/utils/condition.ts` | `computeCondition(batch, latestCheck?)` → `BatchCondition`; `latestCheck(batchId, checks[])` |
| `src/types.ts` | All TypeScript interfaces: `User`, `ProduceBatch`, `QualityCheck`, `Product`, enums |
| `src/data/produce.ts` | Hard-coded `produceBatches` and `qualityChecks` arrays |
| `src/data/products.ts` | Hard-coded `products` array |
| `src/data/users.ts` | Hard-coded sample `User` records |
