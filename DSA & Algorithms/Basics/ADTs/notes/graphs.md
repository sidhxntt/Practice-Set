# Understanding Graphs: Types, Terminology & Real-World Applications

Graphs are one of the most powerful structures in computer science and mathematics. They help model relationships, solve optimization problems, analyze networks, and design algorithms used daily — in navigation systems, social networks, compilers, and networking.

This guide walks through essential graph types, key terminology, and practical use cases.

---

## What is a Graph?

A graph is represented as:

G = (V, E)

where:

- `V` = set of vertices (nodes)
- `E` = set of edges (connections)

Graphs can be directed or undirected, connected or disconnected, cyclic or acyclic, weighted or unweighted. Understanding these characteristics is essential to applying graph theory.

---

## 1. Non-Connected Graph

A non-connected graph contains multiple components; not all nodes are reachable from each other.

- **Connected component:** a set of nodes connected internally but not to other parts of the graph.
- **Articulation point:** a vertex whose removal increases the number of components — useful for finding network vulnerabilities.

Use cases:

- Network segmentation analysis
- Fault-tolerant system design
- Clustering in social networks

---

## 2. Self Loop & Parallel Edges

### Self Loop

A self loop is an edge where a node points to itself.

Use cases:

- Automata theory
- State machines (self-transitions)
- Modeling repetitive behaviors

### Parallel Edges

Parallel edges (multi-edges) are multiple edges connecting the same pair of vertices.

Use cases:

- Transportation networks (multiple roads between cities)
- Packet routing (multiple channels between routers)
- Biological multigraph models

### Degrees in Directed Graphs

- **In-degree:** number of incoming edges
- **Out-degree:** number of outgoing edges

Use case: algorithms like PageRank, social influence ranking, and dependency analysis rely on degrees.

---

## 3. Directed Graph (Digraph)

Edges have direction (arrows).

Use cases:

- Social networks (followers → following)
- Web link structure
- Task scheduling and workflows
- Recommendation systems

---

## 4. Strongly Connected Graph

A directed graph is strongly connected if every node can reach every other node via directed paths.

Use cases:

- Network robustness analysis
- Identifying tightly-knit groups in social networks
- Web crawling for tightly-linked clusters

---

## 5. Simple Directed Graph (Simple Digraph)

A digraph without self loops and without parallel edges. This is the typical graph model used in many algorithms.

Use cases:

- Shortest-path algorithms
- Dependency graphs
- Compiler internals

---

## 6. Directed Acyclic Graph (DAG)

A DAG is a directed graph with no cycles (you cannot start at a node and return by following directed edges). DAGs are central to many applications.

Use cases:

- Task/job scheduling (dependencies)
- Topological sorting
- Git commit history
- Course prerequisite graphs
- Build systems (make, CI pipelines)

---

## 7. Topological Ordering

A topological ordering is a linear ordering of vertices in a DAG such that if there is an edge `u → v`, then `u` appears before `v`.

Use cases:

- Build systems and makefiles
- Course scheduling
- Instruction scheduling in CPUs
- Resolving package or module dependencies

---

## 8. Undirected Graph

Edges have no direction — they simply connect two nodes.

- **Degree of a node:** the number of edges incident to it.

Use cases:

- Social networks (mutual friendships)
- Road maps (two-way streets)
- Electrical circuit modeling
- Undirected clustering algorithms

---

## Summary

| Graph Type / Term | Meaning | Use Cases |
|---|---|---|
| Non-connected graph | Multiple separate components | Clustering, network segmentation |
| Articulation point | Vertex whose removal increases components | Fault detection |
| Self loop | Node connected to itself | Automata, state machines |
| Parallel edges | Multiple edges between same nodes | Routing, multigraphs |
| Directed graph | Edges have direction | Web links, workflows |
| Strongly connected | Every node reaches every other node | Robustness analysis |
| Simple digraph | No loops, no parallel edges | Algorithms, compilers |
| DAG | Directed graph with no cycles | Scheduling, version control |
| Topological ordering | Linear order respecting edge direction | Build pipelines, prerequisites |
| Undirected graph | Edges without direction | Social networks, maps |

---

## Conclusion

Graphs form the backbone of many systems in computer science. Understanding their types, features, and use cases helps you design better algorithms, build more robust systems, and solve complex problems efficiently.

> NOTE
	Graph unweighted → BFS for shortest path
	•	Graph deep & long → DFS
	•	Need all possible solutions → DFS
	•	Need minimum number of steps → BFS
	•	Need to check if graph has a cycle → DFS
	•	Need to check bipartite → BFS
	•	Need topological order → DFS