### 🔹 Python `list` (dynamic array)

* Backed by **contiguous memory**.
* Fast **random access** → `mylist[i]` is **O(1)**.
* Appending at the end (amortized) is **O(1)**.
* But inserting/removing in the **middle or beginning** is **O(n)** (because everything has to shift).

---

### 🔹 Linked List

* Backed by **nodes** with pointers.
* No contiguous memory requirement.
* **Insertions/deletions** at the beginning or middle (if you already have a reference to the node) are **O(1)**.
* But **random access is slow** → finding the `i`-th element requires **O(n)** traversal.

---

### ✅ So why use a linked list in Python?

* **Educational reasons** → to understand data structures and how they work under the hood.
* **When you expect lots of insertions/deletions** in the middle or front of a sequence, and random access is not needed.
* **Memory flexibility** → avoids resizing that Python lists do behind the scenes.
* **Custom structures** → you can extend it (e.g., building stacks, queues, LRU caches, adjacency lists for graphs, etc.).
* In **low-level systems (like C)**, linked lists are more crucial because arrays have fixed size — but in Python, built-in lists already cover most needs.

---

👉 In short:

* Use Python’s `list` for **general purpose** — it’s optimized and fast.
* Use a linked list mainly for **learning, special cases, or custom structures**.

