# Dijkstra's Algorithm - Complete Explanation

## 🚌 Think of a City With Houses and Roads

- Every **vertex** is a house.
- Every **edge** is a road between two houses.
- The **weight** on an edge is the distance or petrol cost to travel that road.

You want to start from one house (start vertex) and find the cheapest path (shortest distance) to every other house.

**Dijkstra's algorithm does exactly this.**

---

## ✅ Full Code Explanation (Line-By-Line)

```python
def Dijsktra(self, graph, start_vertex):
```

This simply defines a function named `Dijsktra`.

---

## 🧱 Understanding the Graph Shape

The graph looks like this:

```python
graph = {
    'A': [('B', 5), ('C', 2)],
    'B': [('C', 1)],
    'C': [('D', 7)],
    ...
}
```

- Each **key** is a house (vertex).
- Each **value** is a list of `(neighbor, weight)` pairs.

---

## 🔹 Step 1 — Create a Distance Dictionary

```python
dist = {vertex: float('inf') for vertex in graph}
dist[start_vertex] = 0
```

- `dist` keeps the minimum petrol needed to reach each house.
- Initially, we don't know anything, so we set every distance to ∞ (infinity).
- The starting house has distance 0 because we are already there.

**Example:**

```
A: 0
B: inf
C: inf
D: inf
```

---

## 🔹 Step 2 — Create a Min-Heap (Priority Queue)

```python
heap = [(0, start_vertex)]
heapq.heapify(heap)
```

- A **min-heap** always pops the **smallest number** first.
- We insert `(0, start_vertex)` to say: "We are at start_vertex with cost 0."

This heap decides **which house to explore next**.

---

## 🔹 Step 3 — Extract the Shortest Path Candidate

```python
curr_dist, u = heapq.heappop(heap)
```

- This pops the house with the current smallest distance.
- At the start, `u` will be `start_vertex`.

---

## 🔹 Step 4 — Skip Stale Entries

```python
if curr_dist > dist[u]:
    continue
```

**Why?**  
Because sometimes you may push **older (worse)** distances into the heap.

**Example:**
- First you think B = 10
- Later you find a better route B = 4
- But 10 is still sitting inside the heap

When 10 comes out:
- You skip it because 10 > 4 (current best).

This prevents processing outdated values.

---

## 🔹 Step 5 — Explore Neighbors ("Relaxation Step")

```python
for v, weight in graph[u]:
    new_dist = curr_dist + weight
```

For every neighbor `v`:
- `curr_dist` = cost to reach `u`
- `weight` = cost from `u` to `v`
- `new_dist` = potential new cost to reach `v`

---

## 🔹 Step 6 — Check if We Found a Better Path

```python
if new_dist < dist[v]:
    dist[v] = new_dist
    heapq.heappush(heap, (new_dist, v))
```

If the new route is better:
- Update the shortest known distance to `v`
- Push this updated pair into the heap
- Print the change (for debugging)

This step is called **relaxation**.  
It's the heart of Dijkstra's algorithm.

---

## 🔹 Step 7 — Return Final Distances

```python
return dist
```

After the heap is empty (no more houses to explore), you return the dictionary of shortest distances.

---

## 🧠 Visual Story of How It Works

Imagine:
1. You always pick the closest house you haven't finalized yet.
2. From that house, you try to improve the distances to its neighbors.
3. You keep repeating this until all houses have been processed.

**Dijkstra works like ripples in water:**  
The waves travel outward, discovering the cheapest paths first.

---

## ⭐ Final Summary in Simple Words

Dijkstra's algorithm:
- Starts from one house.
- Uses a special queue (heap) that always picks the closest house first.
- Checks if going through that house gives shorter paths to its neighbors.
- Updates distances when better routes are found.
- Continues until all houses are processed.

---

# 🚀 Complete Working Trace

Below is the exact working trace, shown exactly the way your code runs it, step-by-step, with:
- heap contents
- popped values
- relaxation steps
- updated distances
- final result

---

## ⭐ Graph Used

```python
graph = {
    'A': [('B', 5), ('C', 2)],
    'B': [('C', 1), ('D', 3)],
    'C': [('D', 7)],
    'D': []
}
```

**Start vertex** → `'A'`

---

## 🧠 Initial State

```python
dist = { 'A': 0, 'B': inf, 'C': inf, 'D': inf }

heap = [ (0, 'A') ]
```

---

## 📌 Iteration 1

**Heap before pop:**
```
[(0, 'A')]
```

**Pop:**
```
curr_dist = 0
u = 'A'
```

**Neighbors of 'A':**
- `('B', 5)`
- `('C', 2)`

**Relax B:**
```
new_dist = 0 + 5 = 5
5 < inf → update dist['B'] = 5
push (5, 'B') into heap
PRINT: Updated distance for vertex B: 5
```

**Relax C:**
```
new_dist = 0 + 2 = 2
2 < inf → update dist['C'] = 2
push (2, 'C') into heap
PRINT: Updated distance for vertex C: 2
```

**Heap now:**
```
[(2, 'C'), (5, 'B')]
```

---

## 📌 Iteration 2

**Heap before pop:**
```
[(2, 'C'), (5, 'B')]
```

**Pop:**
```
curr_dist = 2
u = 'C'
```

**Neighbors of 'C':**
- `('D', 7)`

**Relax D:**
```
new_dist = 2 + 7 = 9
9 < inf → update dist['D'] = 9
push (9, 'D') into heap
PRINT: Updated distance for vertex D: 9
```

**Heap now:**
```
[(5, 'B'), (9, 'D')]
```

---

## 📌 Iteration 3

**Heap before pop:**
```
[(5, 'B'), (9, 'D')]
```

**Pop:**
```
curr_dist = 5
u = 'B'
```

**Neighbors of 'B':**
- `('C', 1)`
- `('D', 3)`

**Relax C:**
```
new_dist = 5 + 1 = 6
6 < current dist[C]=2? NO → skip
```

**Relax D:**
```
new_dist = 5 + 3 = 8
8 < current dist[D]=9 → YES update!
dist['D'] = 8
push (8, 'D')
PRINT: Updated distance for vertex D: 8
```

**Heap now:**
```
[(8, 'D'), (9, 'D')]
```

---

## 📌 Iteration 4

**Heap before pop:**
```
[(8, 'D'), (9, 'D')]
```

**Pop:**
```
curr_dist = 8
u = 'D'
```

D has no neighbors, so nothing happens.

---

## 📌 Iteration 5

**Heap before pop:**
```
[(9, 'D')]
```

**Pop:**
```
curr_dist = 9
u = 'D'
```

**Check stale:**
```
curr_dist(9) > dist['D'](8) → stale → continue
```

Nothing added.

**Heap empty → algorithm ends.**

---

## 🎉 Final dist Dictionary (Returned by Code)

```python
{
    'A': 0,
    'B': 5,
    'C': 2,
    'D': 8
}
```