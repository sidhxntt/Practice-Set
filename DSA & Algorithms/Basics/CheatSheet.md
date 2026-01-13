
## Heap

**What it is**

A binary tree where parent ≤ children (min-heap) or parent ≥ children (max-heap).

**When to use**
- Get the minimum or maximum quickly
- Implement priority queues and schedulers
- Find top-K or smallest-K elements

**Time complexity**
- Insert: `O(log n)`
- Remove min/max: `O(log n)`
- Peek min/max: `O(1)`

---

## Array / List

**What it is**

A continuous block of memory storing elements in order.

**When to use**
- Fast random access (`arr[i]`) and sequential scans
- Store collections for iteration and indexing

**Time complexity**
- Access: `O(1)`
- Insert/delete at end: `O(1)` (amortized for dynamic arrays)
- Insert/delete in middle: `O(n)`

---

## Linked List

**What it is**

Nodes linked by pointers (`next`, optionally `prev`).

**When to use**
- Frequent insertions/deletions at arbitrary positions
- Implement queues, stacks, or LRU caches when pointer-based sequences help

**Time complexity**
- Insert/delete at known node: `O(1)`
- Search: `O(n)`

---

## Stack

**What it is**

Last-In, First-Out (LIFO) structure.

**When to use**
- Undo operations, function call stacks, recursion
- Reversal for arrays/linkedlist due to FIFO
- Depth-first search (DFS), expression parsing

**Time complexity**
- Push / Pop: `O(1)`

---

## Queue

**What it is**

First-In, First-Out (FIFO) structure.

**When to use**
- Breadth-first search (BFS)
- Task scheduling and buffering (message queues, print queues)

**Time complexity**
- Enqueue / Dequeue: `O(1)`

---

## Priority Queue

Usually implemented with a heap.

**When to use**
- Choose the most important job next
- Dijkstra’s shortest path, event simulation, CPU scheduling

---

## Hash Table / Hash Map / Dictionary

**What it is**

Key → Value mapping using hashing.

**When to use**
- Fast lookups by key, counting, caching
- Implement sets (keys only)

**Time complexity**
- Average insert/search/delete: `O(1)`
- Worst-case: `O(n)` (rare, depends on collisions)

---

## Set

**What it is**

Collection of unique elements (often a hash table without values).

**When to use**
- Fast membership tests and deduplication

**Time complexity**
- Add / Check / Remove: `O(1)` average

---

## Graph

**What it is**

Nodes (vertices) connected by edges.

**When to use**
- Routes, maps, social networks, recommendation systems
- Network flow, shortest paths, connectivity

**Representations**
- Adjacency list: good for sparse graphs
- Adjacency matrix: good for dense graphs

---

## Tree

**What it is**

Hierarchical structure with parent → child relationships.

**When to use**
- Filesystems, XML/HTML parsing, hierarchical data
- Search trees and heaps

---

## Binary Search Tree (BST)

**When to use**
- Store sorted data with fast search/insert/delete
- In-order traversal yields sorted order

**Balanced BSTs (AVL, Red-Black Tree)**
- Operations: `O(log n)`
- Used in language libraries (e.g., Java’s `TreeMap`, C++ `std::map`)

---

## Trie (Prefix Tree)

**When to use**
- Autocomplete, spell checking, fast prefix searches, word dictionaries

**Complexity**
- Search / Insert: `O(length of word)`

---

## Dynamic Programming Table

**When to use**
- Store results of overlapping subproblems (memoization / tabulation)
- Optimization problems: knapsack, string DP, tree DP

---

## Matrix

**When to use**
- Graphs (adjacency matrix), dynamic programming tables, linear algebra, image processing

---

## Quick Comparison Table

| Data Structure | Best At | Complexity Highlights |
|---|---:|---|
| Heap | Min/Max lookup | `O(1)` peek, `O(log n)` ops |
| Array / List | Fast indexing | `O(1)` access |
| Linked List | Insert/delete mid | `O(1)` insert/delete (given node) |
| Stack | LIFO operations | `O(1)` push/pop |
| Queue | FIFO operations | `O(1)` enqueue/dequeue |
| Hash Map | Fast lookup | `O(1)` average |
| Set | Membership test | `O(1)` average |
| BST (balanced) | Sorted data | `O(log n)` |
| Trie | Prefix search | `O(length of word)` |
| Graph | Relationships & paths | Varies by algorithm |
| Matrix | Numerical ops, DP | Varies |

---

## Want more?

- Visual chart of all structures
- A cheat sheet PDF
- Real code examples for each structure
- Interview-style Q&A about data structure choices

Tell me which of the above you'd like next.