## 1. **Node Class**

```python
class Node:
    def __init__(self, data):
        self.data = data   # Store actual value
        self.next = None   # Reference to the next node (initially None)
```

- A **node** is the building block of a linked list.
- Each node contains:

  - `data` → the value (like `10`, `20`, etc.).
  - `next` → a pointer to the **next node** in the list.

- When a node is first created, it has no next node, so `next = None`.

Example:
If we create `n1 = Node(5)`, it looks like:

```
[ 5 | next → None ]
```

---

## 2. **LinkedList Class**

```python
class LinkedList:
    def __init__(self):
        self.head = None
```

- `head` is a pointer to the **first node** of the list.
- Initially, the list is empty, so `head = None`.

---

## 3. **Appending a Node (Add to End)**

```python
def append(self, data):
    new_node = Node(data)
    if not self.head:   # If list is empty
        self.head = new_node
        return
    last = self.head
    while last.next:   # Traverse until last node
        last = last.next
    last.next = new_node
```

### Explanation:

- Create a new node with given `data`.
- If the list is empty (`head` is `None`), set `head` to this new node.
- Otherwise:

  - Start at the head.
  - Move (`while last.next`) until the last node is found (its `.next` is `None`).
  - Link the last node’s `.next` to the new node.

Example: After appending `10, 20`:

```
head → [10 | next] → [20 | next → None]
```

---

## 4. **Prepending a Node (Add to Beginning)**

```python
def prepend(self, data):
    new_node = Node(data)
    new_node.next = self.head
    self.head = new_node
```

### Explanation:

- Create a new node.
- Make it point to the current head.
- Move head to this new node.

Example: If list is `10 -> 20` and we prepend `5`:

```
head → [5 | next] → [10 | next] → [20 | next → None]
```

---

## 5. **Deleting a Node (By Value)**

```python
def delete(self, key):
    temp = self.head

    # Case 1: Deleting head node
    if temp and temp.data == key:
        self.head = temp.next
        temp = None
        return

    # Case 2: Searching for node
    prev = None
    while temp and temp.data != key:
        prev = temp
        temp = temp.next

    # Case 3: Not found
    if temp is None:
        return

    # Case 4: Found it, bypass node
    prev.next = temp.next
    temp = None
```

### Explanation:

- If the head node contains the `key`, delete it by moving head to `head.next`.
- Otherwise, traverse until the node with `key` is found.
- Once found, skip it by linking `prev.next = temp.next`.
- The unwanted node (`temp`) is deleted.

Example: Deleting `20` from:

```
5 → 10 → 20 → 30
```

becomes:

```
5 → 10 → 30
```

---

## 6. **Display the List**

```python
def display(self):
    current = self.head
    while current:
        print(current.data, end=" -> ")
        current = current.next
    print("None")
```

- Start at the head.
- Print each node’s `data`.
- Move to `current.next`.
- End when `current` becomes `None`.

Output for `5 → 10 → 30`:

```
5 -> 10 -> 30 -> None
```

---

## 7. **Example Usage**

```python
ll = LinkedList()
ll.append(10)   # 10
ll.append(20)   # 10 -> 20
ll.prepend(5)   # 5 -> 10 -> 20
ll.append(30)   # 5 -> 10 -> 20 -> 30

ll.display()    # 5 -> 10 -> 20 -> 30 -> None

ll.delete(20)   # 5 -> 10 -> 30
ll.display()    # 5 -> 10 -> 30 -> None
```

---

✅ So this code builds a **singly linked list** that supports:

- **append** (add at end),
- **prepend** (add at beginning),
- **delete** (remove by value),
- **display** (print the list).
