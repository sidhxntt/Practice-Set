## Problem 1: `for(i = 1; i < n; i *= 2)`

**Analysis:**

* i = 1 → runs
* i = 2 → runs
* i = 4 → runs
* i = 8 → runs
* …
* i = 2^k (where 2^k < n)

**Total iterations:** k ≈ log₂(n)
**Loop runs:** log₂(n) times
**Time Complexity:** O(log n)

**Why:** We multiply i by 2 each iteration, so it takes log₂(n) steps to reach n.

---

## Problem 2: `for(i = n; i > 1; i /= 2)`

**Analysis:**

* i = n → runs
* i = n/2 → runs
* i = n/4 → runs
* i = n/8 → runs
* …
* i = n / 2^k > 1

**Total iterations:** k ≈ log₂(n)
**Loop runs:** log₂(n) times
**Time Complexity:** O(log n)

**Why:** Dividing by 2 each iteration reduces the search space exponentially.

---

## Problem 3: `for(i = 1; i < n; i *= 3)`

**Analysis:**

* i = 1 → runs
* i = 3 → runs
* i = 9 → runs
* i = 27 → runs
* …
* i = 3^k < n

**Total iterations:** k ≈ log₃(n)
**Loop runs:** log₃(n) times
**Time Complexity:** O(log n)

**Why:** Multiplying i by 3 each iteration → logarithmic growth.

---

## Problem 4: `for(i = n; i > 1; i /= 3)`

**Analysis:**

* i = n → runs
* i = n/3 → runs
* i = n/9 → runs
* …
* i = n / 3^k > 1

**Total iterations:** k ≈ log₃(n)
**Loop runs:** log₃(n) times
**Time Complexity:** O(log n)

---

## Problem 5: `for(i = 1; i < n; i *= 10)`

**Analysis:**

* i = 1 → runs
* i = 10 → runs
* i = 100 → runs
* i = 1000 → runs
* …
* i = 10^k < n

**Total iterations:** k ≈ log₁₀(n)
**Loop runs:** log₁₀(n) times
**Time Complexity:** O(log n)

**Why:** Each iteration multiplies i by 10 → logarithmic in base 10.

---


## Real-World Examples of O(log n)

| Algorithm/Pattern    | Description                      | Base   |
| -------------------- | -------------------------------- | ------ |
| Binary Search        | Search in a sorted array         | 2      |
| Binary Tree Height   | Height of a balanced binary tree | 2      |
| Merge Sort (levels)  | Number of merge levels           | 2      |
| Counting Digits in n | while(n){ n /= 10; count++; }    | 10     |
| Euclidean GCD        | gcd(a,b) using repeated division | varies |

---

## Key Insights for O(log n)

### Multiplicative/Divisive Loops

Loops that **multiply** or **divide** a variable by a constant factor each iteration have **O(log n)** time complexity:

* `for(i = 1; i < n; i *= 2)` → O(log n)
* `for(i = n; i > 1; i /= 2)` → O(log n)
* `for(i = 1; i < n; i *= 3)` → O(log n)
* `for(i = n; i > 1; i /= k)` → O(log n)

### Why All Logarithmic Bases Are Equivalent in Big O

* log₂(n) = log₃(n) / log₃(2)
* The ratio log₃(2) is a constant
* Big O ignores constants
* Therefore: O(log₂ n) = O(log₃ n) = O(log n)

---

## Summary Table

| Loop Pattern          | Iterations Count | Time Complexity |
| --------------------- | ---------------- | --------------- |
| `for(i=1; i<n; i*=2)` | log₂(n)          | O(log n)        |
| `for(i=n; i>1; i/=2)` | log₂(n)          | O(log n)        |
| `for(i=1; i<n; i*=3)` | log₃(n)          | O(log n)        |
| `for(i=n; i>1; i/=k)` | logₖ(n)          | O(log n)        |
| Binary Search         | log₂(n)          | O(log n)        |

---
