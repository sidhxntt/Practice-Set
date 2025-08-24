### 🔹 Case 1: Simple `if` condition (no loops inside)

```c
if (x > 0) {
    // some constant work
}
```

* Here, the `if` just decides whether to run or skip a **constant amount of work**.
* Complexity = **O(1)** ✅

---

### 🔹 Case 2: `if` + loop inside

```c
if (x > 0) {
    for (int i = 0; i < n; i++) {
        // O(n)
    }
}
```

* If condition is **true → O(n)**
* If condition is **false → O(1)**
* In **worst case analysis**, we take the branch with maximum cost → **O(n)**

---

### 🔹 Case 3: `if` + two branches with different loops

```c
if (x > 0) {
    for (int i = 0; i < n; i++) {  // O(n)
    }
} else {
    for (int j = 0; j < n * n; j++) {  // O(n²)
    }
}
```

* Best case: **O(n)** (if first branch runs)
* Worst case: **O(n²)** (if second branch runs)
* Big-O usually means **worst case** → **O(n²)**

---

### 🔹 Case 4: `if` used *inside* a loop

```c
for (int i = 0; i < n; i++) {
    if (i % 2 == 0) {
        // O(1)
    }
}
```

* Loop runs **n times**
* Each iteration does constant work (with or without condition) → **O(n)**

---

### 🔹 Case 5: Uneven work inside `if`

```c
for (int i = 0; i < n; i++) {
    if (i % 2 == 0) {
        for (int j = 0; j < n; j++) {  // O(n)
        }
    }
}
```

* Outer loop = **n iterations**
* Inner loop runs only for \~n/2 times (half of i’s are even).
* Total work ≈ (n/2) × n = **O(n²)** ✅

---

✅ **Key Rule**:

* `if/else` by itself doesn’t increase complexity — it just selects a branch.
* What matters is the **most expensive branch** (worst case).
* When inside loops, it just modifies how many times inner code executes.

