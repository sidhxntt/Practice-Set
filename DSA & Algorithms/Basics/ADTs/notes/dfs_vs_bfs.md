# TREES

# 1️⃣ DFS – Depth First Search (Go Deep First)

DFS explores as far down a branch as possible before backtracking.

There are **3 types** in trees:

### a) Preorder (Root → Left → Right)

```python
def preorder(root):
    if not root:
        return
    print(root.val)
    preorder(root.left)
    preorder(root.right)
```

### b) Inorder (Left → Root → Right)

```python
def inorder(root):
    if not root:
        return
    inorder(root.left)
    print(root.val)
    inorder(root.right)
```

### c) Postorder (Left → Right → Root)

```python
def postorder(root):
    if not root:
        return
    postorder(root.left)
    postorder(root.right)
    print(root.val)
```

---

# 2️⃣ BFS – Breadth First Search (Level by Level)

BFS uses a **queue** and visits nodes level by level.

```python
from collections import deque

def bfs(root):
    if not root:
        return
    q = deque([root])

    while q:
        node = q.popleft()
        print(node.val)

        if node.left:
            q.append(node.left)
        if node.right:
            q.append(node.right)
```

---

# Visual Example

Tree:

```
        1
      /   \
     2     3
    / \     \
   4   5     6
```

### DFS Orders:

| Type      | Output        |
| --------- | ------------- |
| Preorder  | `1 2 4 5 3 6` |
| Inorder   | `4 2 5 1 3 6` |
| Postorder | `4 5 2 6 3 1` |

### BFS Order:

```
1 2 3 4 5 6
```

---

# Key Differences (Interview Gold)

| DFS                    | BFS                     |
| ---------------------- | ----------------------- |
| Uses stack / recursion | Uses queue              |
| Goes deep              | Goes wide               |
| Less memory (usually)  | More memory             |
| Good for path problems | Good for level problems |

---

# When to Use What?

### Use DFS when:

* You need to explore paths
* You care about structure
* Problems like: *same tree, symmetric, max depth, balanced*

### Use BFS when:

* You care about **levels**
* Shortest path in tree
* Problems like: *level order traversal, right view, zigzag*

---

# GRAPHS 

**BFS and DFS in graphs** are very similar to trees — with one **critical difference**:

> **Graphs can have cycles, so you MUST track visited nodes.**

Let’s go step by step.

---

# 1️⃣ DFS in Graph (Depth First Search)

### Recursive DFS

```python
def dfs(graph, node, visited):
    if node in visited:
        return

    visited.add(node)
    print(node)

    for neighbor in graph[node]:
        dfs(graph, neighbor, visited)
```

Call it like:

```python
visited = set()
dfs(graph, start_node, visited)
```

---

### Iterative DFS (Using Stack)

```python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()

        if node in visited:
            continue

        visited.add(node)
        print(node)

        for neighbor in graph[node]:
            stack.append(neighbor)
```

---

# 2️⃣ BFS in Graph (Breadth First Search)

Uses **queue** and visits level by level.

```python
from collections import deque

def bfs(graph, start):
    visited = set()
    q = deque([start])
    visited.add(start)

    while q:
        node = q.popleft()
        print(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                q.append(neighbor)
```

---

# Graph Example

```python
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
}
```

### DFS from A (one possible order):

```
A B D E F C
```

### BFS from A:

```
A B C D E F
```

---

# 🚨 Why Visited is Mandatory in Graphs

Consider:

```
A -- B
|    |
D -- C
```

Without `visited`, DFS/BFS would loop forever:

```
A → B → C → D → A → B → ...
```

So always:

```python
visited = set()
```

---

# Key Differences: Tree vs Graph

| Trees             | Graphs               |
| ----------------- | -------------------- |
| No cycles         | Can have cycles      |
| No visited needed | Visited is mandatory |
| Single root       | May be disconnected  |

---

# Interview Patterns to Recognize

### Use DFS for:

* Path existence
* Connected components
* Cycle detection
* Topological sort
* Backtracking problems

### Use BFS for:

* Shortest path (unweighted)
* Minimum steps problems
* Level traversal
* Bipartite check

---

# Super Important Pattern 🧠

### DFS Template

```python
def dfs(node):
    visited.add(node)
    for nei in graph[node]:
        if nei not in visited:
            dfs(nei)
```

### BFS Template

```python
q = deque([start])
visited.add(start)

while q:
    node = q.popleft()
    for nei in graph[node]:
        if nei not in visited:
            visited.add(nei)
            q.append(nei)
```


