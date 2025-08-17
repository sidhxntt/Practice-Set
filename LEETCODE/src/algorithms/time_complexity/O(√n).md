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

