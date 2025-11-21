# Kruskal vs Prim

## Analogy (Super Simple)

Imagine building a treehouse network using wooden bridges.

### Kruskal’s Algorithm

- Lay out all wooden bridges on the ground, look at all their costs, sort them from cheapest to costliest, and pick bridges one by one globally.
- You may pick bridges from anywhere in the forest.
- Only rule: don’t form a cycle.
- Use a Disjoint Set Union (DSU) to detect cycles.

### Prim’s Algorithm

- Start from one treehouse and expand your network step by step, always choosing the cheapest bridge touching the existing network.
- You grow a single connected tree.
- Use a priority queue (min-heap) to pick the next edge.

---

## Very Short One-Line Difference

- **Kruskal:** Sort all edges globally → pick smallest edges → use DSU.
- **Prim:** Start from one vertex → always pick smallest outgoing edge → use heap.

---

## Comparison Table (Best for Exams)

| Feature | Kruskal’s Algorithm | Prim’s Algorithm |
|---|---|---|
| Strategy | Global greedy (pick smallest edge overall) | Local greedy (grow from a starting node) |
| Requires connected graph? | No — works for multiple components (builds MST forest) | Yes — builds MST for the connected component |
| Data structure needed | Disjoint Set (DSU) to detect cycles | Min-heap / priority queue to pick smallest outgoing edge |
| Edge handling | Considers all edges at once (sort globally) | Considers only edges from visited nodes |
| Start node needed? | ❌ No | ✅ Yes |
| Cycle control | Explicitly checked using DSU | Automatically avoided by skipping visited nodes |
| Works better for | Sparse graphs (fewer edges) or when edges are already sorted | Dense graphs (many edges), adjacency lists |
| Time complexity | O(E log E) (≈ O(E log V)) | O(E log V) (with binary heap) |
| Style of MST growth | Can join anywhere — builds many small trees and merges them | Grows one tree continuously |

---

## Visual Understanding

### Kruskal (stitching patches)

- Pick the smallest edge anywhere → connect.
- Pick the next smallest → connect.
- Skip the next if it forms a cycle.

It builds small components across the graph and then merges them.

### Prim (spreading ink)

- Start from a vertex (e.g., 0).
- Find the cheapest edge going out from the current tree.
- Add the new vertex and repeat.

It grows like a spreading blob from the start vertex.

---

## More Intuitive Difference

- **Kruskal** chooses the cheapest edge in the whole graph.
- **Prim** chooses the cheapest edge from the current tree.

---

## Why Prim Can’t Just Sort Edges (But Kruskal Can)

- **Kruskal needs:** all edges, sorted — a global view.
- **Prim needs:** only edges touching the current MST, with dynamic updates (heap push/pop).

Therefore:

- Kruskal = sort edges.
- Prim = priority queue with dynamic updates.

---

## When to Choose Which

**Use Kruskal when:**

- The graph is sparse.
- Edges are given as a list.
- Edges are (or can be) pre-sorted.
- You need to handle disconnected graphs (MST forest).

**Use Prim when:**

- The graph is dense.
- You have adjacency lists and cheap heap operations.
- You want a single MST starting from a chosen node.

---

## Quick Memory Trick

- **Kruskal = K** (Cut globally) → sort edges and pick.
- **Prim = P** (Point outward) → grow MST from a start vertex using a heap.
