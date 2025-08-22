
## Problem 1: Simple Nested Loop

```c
for(int i = 0; i < n; i++) {
    for(int j = 0; j < n; j++) {
        // O(1) work
    }
}
```

**Analysis:**

* Outer loop runs n times
* Inner loop runs n times for **each iteration of outer loop**
* Total iterations = n \* n = n²

**Time Complexity:** O(n²) ✅

---

## Problem 2: Triangular Nested Loop

```c
for(int i = 0; i < n; i++) {
    for(int j = 0; j <= i; j++) {
        // O(1) work
    }
}
```

**Analysis:**

* Outer loop runs n times (i = 0 → n-1)
* Inner loop runs 1 + 2 + 3 + … + n ≈ n(n+1)/2 times
* Total iterations ≈ n² / 2 → **O(n²)**

**Time Complexity:** O(n²) ✅

**Why it’s still O(n²):** Big O ignores constants/factors like 1/2.

---

## Problem 3: Nested Loops with Different Bounds

```c
for(int i = 0; i < n; i++) {
    for(int j = 0; j < m; j++) {
        // O(1) work
    }
}
```

**Analysis:**

* Outer loop runs n times

* Inner loop runs m times

* Total iterations = n \* m → **O(n\*m)**

* If n = m, then O(n\*m) = O(n²)

---

## Problem 4: Matrix Operations

```c
int matrix[n][n];
for(int i = 0; i < n; i++) {
    for(int j = 0; j < n; j++) {
        matrix[i][j] = i + j; // O(1)
    }
}
```

* Filling an n×n matrix → n² assignments → **O(n²)**

---

## Key Patterns for O(n²)

| Loop Pattern                       | Total Iterations | Time Complexity |
| ---------------------------------- | ---------------- | --------------- |
| Two nested loops, both 0 → n       | n²               | O(n²)           |
| Triangular nested loops (j ≤ i)    | n(n+1)/2         | O(n²)           |
| Nested loops with different bounds | n\*m             | O(n\*m)         |
| Matrix traversal (n×n)             | n²               | O(n²)           |

---

✅ **Rule of Thumb:**

* Any **nested loop** where both loops depend on `n` → **O(n²)**
* Even if inner loop runs fewer times (triangular sum), it’s still **O(n²)**

---