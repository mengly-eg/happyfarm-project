# HappyFarm

## Problem

Small-scale farmers lose produce to unexpected spoilage because tracking harvests on paper makes it hard to monitor batch shelf lives. At the same time, farmers struggle to locate necessary agricultural tools across fragmented sellers to keep their operations running smoothly.

## Users and roles

- **Farmer:** Records produce batches, monitors batch spoilage condition based on harvest date, logs quality checks, browses tool catalog listings, and directly contacts sellers to buy equipment.
- **Tool Seller:** Pre-selects a product category when listing agricultural tools, manages pricing, stock, and contact details, and browses farmer produce listings to offer relevant tools.

*(Note: Product categories are predefined system values selected by Sellers during tool creation, avoiding the need for a separate Admin role.)*

## User stories

1. As a **farmer or tool seller**, I want to register and log in so that my farm records and product listings are protected.
   Accepted when: users can register as Farmer or Tool Seller only (no other role can be chosen) and log in with correct credentials; passwords are stored hashed (bcrypt or argon2), never in plain text; each account has one assigned role that the API uses for access control.

2. As a **farmer**, I want to create and manage produce batches so that I can keep an organized record of what I harvest.
   Accepted when: a farmer can create a batch with name, quantity, unit, harvest date, expected shelf life (in days), and storage location; a farmer can view, update, and archive their own batches; a request to modify another farmer's batch is rejected with 403.

3. As a **farmer**, I want to monitor the condition of each produce batch so that I can identify produce that is fresh, approaching spoilage, or requires attention.
   Accepted when: each batch shows one condition status, calculated (not stored) from harvest date, expected shelf life, and the latest quality check:
   - **Fresh:** less than 80% of the shelf life has elapsed.
   - **Near Spoilage:** 80% or more of the shelf life has elapsed, but not yet exceeded.
   - **Spoiled / Needs Attention:** the shelf life is exceeded, or the latest quality check scored below 4.

   The farmer can list the batches that need inspection (Near Spoilage or Spoiled / Needs Attention).

4. As a **farmer**, I want to record quality-control checks for my produce so that I can keep a history of its condition and quality.
   Accepted when: a farmer can record inspection date, quality score (integer from 1 to 10), condition, and notes; each check is linked to one of the farmer's own batches; a farmer can view the previous checks of their own batches, newest first.

5. As a **tool seller**, I want to browse farmer produce listings so that I can understand local crop availability and offer targeted agricultural tools.
   Accepted when: tool sellers can view public produce batches, their general location, and computed condition.

6. As a **farmer**, I want to browse the equipment that tool sellers have available so that I can see what I can get for my farm.
   Accepted when: a farmer can see all active listings; each listing shows product name, description, category, price, stock, and usage instructions; inactive listings are not shown to farmers; out-of-stock listings are clearly marked as unavailable.

7. As a **farmer**, I want to see how to contact the seller of a listing so that I can arrange the purchase directly.
   Accepted when: each listing shows the seller's name, phone, email, and location; seller contact details are visible only to logged-in farmers; a farmer can open a seller's profile page to see all of that seller's active listings.

8. As a **tool seller**, I want to create and manage equipment listings so that farmers can see accurate product information and availability.
   Accepted when: a seller can create, update, and deactivate their own listings (selecting from predefined categories); a seller can update price and stock; a seller can update their own contact details; a request to modify another seller's listing is rejected with 403.

9. As a **farmer**, I want to search, filter, and paginate equipment listings so that I can find products that match my needs.
   Accepted when: keyword search filters tool titles and descriptions case-insensitively; filtering by category returns matching active products; results are paginated at 10 items per page with total count provided in the response metadata.

## MVP scope

### Must Have
Essential features required for the core application to work.

- Story 1: Registration, login, and role-based access.
- Story 2: Produce batch creation and management.
- Story 3: Produce condition monitoring using harvest date, shelf life, and latest quality score.
- Story 4: Quality-control records and inspection history.
- Story 5: Sellers browse farmer produce listings (shared flow).
- Story 6: Browse available equipment listings.
- Story 7: See seller contact details so farmers can buy directly.
- Story 8: Tool sellers manage their own listings.
- Story 9: Search, filtering, and pagination of equipment listings (required stretch feature).

### Should Have
Important features that add value.

- Farmer dashboard showing total batches, fresh batches, batches near spoilage, and batches needing attention.
- Produce filters by condition and harvest date.
- Low-stock indicator for tool sellers.

### Could Have
Optional features if time allows.

- Search for produce batches.
- Product and produce image uploads.
- Export of produce records or quality-check history.
- Simple notifications for batches approaching their shelf-life limit.
- Farmers can save favorite listings.

### Won't Have
Explicitly excluded to keep the scope manageable.

- Orders, shopping cart, or any in-app purchase flow (farmers contact sellers directly).
- Online payment processing.
- AI or camera-based spoilage detection.
- IoT sensors for temperature and humidity.
- Real-time chat between farmers and tool sellers.
- A separate buyer/consumer role for purchasing produce.
- GPS delivery tracking or third-party logistics integration.

## Entities

| Entity | Main attributes | Relations |
|---|---|---|
| User | name, email, phone, passwordHash, role (Farmer or Tool Seller), location | A farmer has many ProduceBatches; a tool seller has many Products |
| ProduceBatch | name, quantity, unit, harvestDate, expectedShelfLifeDays, storageLocation(optional), isArchived, createdAt | Belongs to a farmer; has many QualityChecks. Condition is computed, not stored |
| QualityCheck | inspectionDate, qualityScore (1–10), condition, notes | Belongs to a ProduceBatch (the owner is the batch's farmer) |
| Product | name, description, category (predefined enum/string), price, stock, usageInstructions, isActive, createdAt | Belongs to a tool seller |

## Stretch feature

**Search, filtering, and pagination.**
Farmers can search equipment listings by keyword in the product name or description, filter by category and availability, and move through results 10 per page. *(Promoted to Must-Have as required by M4).*

## Design decisions

### Which story did you cut from the MVP, and why?

I cut the ordering workflow: placing orders and the seller updating order and delivery status. It would have added two entities (Order and OrderItem), a status lifecycle, stock validation, and extra authorization rules, which is a second app on top of produce tracking. Farmers still need to find equipment and reach sellers, so HappyFarm now shows what is available and the seller's contact details, and the farmer and seller arrange the purchase directly.

### How does spoilage monitoring work?

HappyFarm does not claim to determine food safety. Condition is calculated on request from the harvest date, the expected shelf life, and the latest farmer-recorded quality score, using the thresholds in story 3. It is an estimate to support record-keeping and inspections, not a guarantee that produce is safe or spoiled. It is computed instead of stored so that it can never become out of date.

### How do farmers buy equipment without orders?

Sellers maintain price, stock, and contact details; farmers browse and contact the seller by phone or email. Stock is updated manually by the seller, so it shows availability but is not reduced automatically. Contact details are shown only to logged-in farmers to avoid exposing them publicly.

## Repository

https://github.com/mengly-eg/happyfarm-project