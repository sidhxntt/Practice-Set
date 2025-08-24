## Problem 1: `for(i = 1; i*i <= n; i++)`

**Analysis:**

* i = 1 → runs (1² ≤ n)
* i = 2 → runs (2² ≤ n)
* i = 3 → runs (3² ≤ n)
* …
* i = √n → stops (because (√n)² = n)

**Total iterations:** k ≈ √n
**Loop runs:** √n times
**Time Complexity:** O(√n) ✅

**Why:** We stop when i² > n, so i goes from 1 to about √n.

---

### Example 2: Nested Loop (Classic Factor Checking)

```cpp
for(int i = 1; i*i <= n; i++) {
    if(n % i == 0) {
        // do something
    }
}
```

* This loop only runs up to √n instead of n.
* Checking all factors of n can be done in **O(√n)** instead of O(n).

---

### Key Pattern for O(√n)

* Loops that **increment i** but **stop at i\*i ≤ n**
* Typical use: **factorization**, **prime checking**, **square root iterations**

---

### Example Table

| Loop Pattern                     | Iterations Count | Time Complexity     |
| -------------------------------- | ---------------- | ------------------- |
| `for(i=1; i*i <= n; i++)`        | √n               | O(√n)               |
| Factor checking                  | √n               | O(√n)               |
| Sieve of Eratosthenes inner loop | √n               | O(√n) per iteration |


---

### Code:

```c
p = 0;
for(i = 1; p <= n; i++) {
    p += i;
}
```

---

### Step-by-step Analysis

1. **Initial values:**

   * i = 1
   * p = 0

2. **Loop update:**

   * Each iteration: `p = p + i`
   * i increases by 1 (`i++`)

3. **Pattern of `p`:**

   * Iteration 1 → i = 1 → p = 0 + 1 = 1
   * Iteration 2 → i = 2 → p = 1 + 2 = 3
   * Iteration 3 → i = 3 → p = 3 + 3 = 6
   * Iteration 4 → i = 4 → p = 6 + 4 = 10
   * Iteration 5 → i = 5 → p = 10 + 5 = 15
   * …

4. **General formula:**
   After k iterations:

   $$
   p = 1 + 2 + 3 + ... + k = \frac{k(k+1)}{2}
   $$

5. **Stop condition:** `p > n`

   * So loop stops when:

   $$
   \frac{k(k+1)}{2} > n
   $$

6. **Solve for k:**

   * Approximate: $k^2 ≈ 2n → k ≈ √(2n) = O(√n)$

---

### Conclusion

* **Number of iterations:** k ≈ √n
* **Time Complexity:** O(√n) ✅

---

### Key Insight

Even though `i` increases linearly, the **sum `p` grows quadratically**, so the loop only runs about √n times.

---
Great question 👍 Let’s extend your analysis to **the case with 2 variables in one loop** (e.g., `i=0, j=0`).

---

## ✅ Case: Two Initializations in the Same Loop

### Example Code

```c
for(int i = 0, j = 0; i*i <= n && j*j <= n; i++, j++) {
    // do something
}
```

---

### Step-by-Step Analysis

1. **Initial values:**

   * i = 0, j = 0

2. **Condition:** loop continues while **both**:

   * i² ≤ n
   * j² ≤ n

3. **Update rule:**

   * `i++`
   * `j++`

4. **Iteration behavior:**

   * Iteration 1 → i=0, j=0
   * Iteration 2 → i=1, j=1
   * Iteration 3 → i=2, j=2
   * Iteration 4 → i=3, j=3
   * …

   So effectively, **i and j increase together**.

5. **Stop condition:**

   * Stops when either `i² > n` **or** `j² > n`.
   * Since i and j grow equally, **both reach √n around the same time**.

6. **Iterations count:**

   * Loop runs about √n times.

---

### ✅ Time Complexity

* **Number of iterations:** √n
* **Time Complexity:** **O(√n)**

---

## ⚡ Another Variation: Different Growth Speeds

If **one variable grows faster**, the complexity is dominated by the faster one.

### Example 1

```c
for(int i = 0, j = 0; i*i <= n && j <= n; i++, j++) {
}
```

* i → up to √n
* j → up to n
* Since both increment equally, loop stops when **i hits √n first**.
  👉 **O(√n)**

---

### Example 2

```c
for(int i = 0, j = 0; i <= n && j*j <= n; i++, j++) {
}
```

* i → up to n
* j → up to √n
* Both increment equally, so **j hits √n first**.
  👉 **O(√n)**

---

### Example 3 (Independent Updates)

```c
for(int i = 0, j = 0; i <= n && j <= n; i++, j+=2) {
}
```

* i grows as O(n)
* j grows as O(n/2)
* Loop stops when **i reaches n first**.
  👉 **O(n)**

---

## 🔑 Key Rule

* If **both variables increase at the same rate** → the **tightest stopping condition dominates** (often O(√n) if squared terms are involved).
* If **they grow differently** → whichever variable hits its stop condition **first** dictates complexity.

---

👉 Do you want me to make a **summary table** (like you did earlier) for **common two-variable initialization cases** with their complexities?
