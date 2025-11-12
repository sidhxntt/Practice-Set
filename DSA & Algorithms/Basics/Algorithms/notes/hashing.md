# 🧩 General Rule for Analyzing Data Structures

For almost every classical data structure — arrays, linked lists, stacks, queues, trees, heaps, graphs, etc. — we measure their time and space complexity in terms of:

**n = number of elements stored in that data structure.**

## Examples

| Data Structure | Typical Operation | Time Complexity | Depends on |
|---|---|---|---|
| Array | Access by index | O(1) | number of elements n |
| Linked List | Traverse / Search | O(n) | n nodes |
| Stack | Push / Pop | O(1) | (constant per element) |
| Queue | Enqueue / Dequeue | O(1) | n items |
| Binary Tree | Search | O(log n) | height depends on n |
| Heap | Insert / Delete | O(log n) | number of nodes n |
| Graph | Traverse (DFS/BFS) | O(V + E) | number of vertices/edges |

So, in almost every structure, performance depends on how many elements you're storing or processing.

---

## ⚙️ But Hashing is Different — Why?

Hashing doesn't depend only on **n** (number of elements). It also depends on the number of available slots (buckets) — typically denoted as **m**.

**For a hash table:** The time complexity depends on both **n** (elements inserted) and **m** (table size).

---

## 🔍 Hash Table Performance Depends on Load Factor

We define:

$$\alpha = \frac{n}{m}$$

Where:
- **n** = number of stored elements
- **m** = number of available buckets (table size)

### Why This Matters

| Operation | Average Case | Depends on |
|---|---|---|
| Insert | O(1) | if α is small |
| Search | O(1) | if α is small |
| Delete | O(1) | if α is small |
| | **Worst Case** | **O(n)** if all elements collide |

So, while other data structures' behavior depends solely on **n**, a hash table's efficiency depends on the ratio **n/m**, not just on **n**.

---

## 🧠 Analogy

Think of a restaurant (hash table) with **m** tables and **n** customers:
- If there are **few tables** (m small) and **many customers** (n large), they'll have to share tables — collisions increase — service slows down.
- If there are **plenty of tables**, each customer sits alone — lookups are fast.

**So, performance isn't about how many customers (n) exist, but how crowded the restaurant is (n/m).**

---

## 🔢 Hence

**For lists, trees, arrays, graphs** → complexity in terms of **n**

**For hashing** → complexity in terms of load factor **α = n/m**

**That's why we say:**

> "All data structures are analyzed based on number of elements — except hashing, which depends on load factor."

---

## 🧩 Quick Summary

| Concept | Depends On |
|---|---|
| Arrays, Lists, Trees, Heaps | Number of elements **n** |
| Graphs | Vertices & Edges **(V, E)** |
| Hash Table | Number of elements **n** and number of buckets **m** (i.e. load factor **α**) |
