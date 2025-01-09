1. **Users:**
-   Users can place multiple orders (one-to-many relationship with Orders).
- Users can have optional personal details.
---
2. **Products:**
- Each product can appear in multiple orders (one-to-many relationship with Orders).
---
3. **Orders:**
- Orders act as a join table between Users and Products, representing the many-to-many relationship.