## 🔹 What is Divide and Conquer?

**Divide and Conquer** is a problem-solving technique where we break a problem into smaller subproblems, solve them independently, and then combine their solutions to get the final result.

It is widely used in **algorithm design** because it reduces complex problems into manageable parts.

---

## 🔹 Steps in Divide and Conquer

1. **Divide** – Split the problem into smaller subproblems.
2. **Conquer** – Solve each subproblem (recursively, if needed).
3. **Combine** – Merge the solutions of subproblems to form the overall solution.

---

## 🔹 Examples in DSA

Here are some classic algorithms that use Divide and Conquer:

1. **Binary Search**

   - Divide: Split the array in half.
   - Conquer: Check if the target is in the left or right half.
   - Combine: Return the correct position (if found).
     **Time Complexity:** `O(log n)`

2. **Merge Sort**

   - Divide: Split the array into two halves.
   - Conquer: Recursively sort both halves.
   - Combine: Merge the two sorted halves.
     **Time Complexity:** `O(n log n)`

3. **Quick Sort**

   - Divide: Choose a pivot and partition the array around it.
   - Conquer: Recursively sort left and right partitions.
   - Combine: No extra combining (since it’s sorted in place).
     **Time Complexity (avg):** `O(n log n)`

4. **Strassen’s Matrix Multiplication**

   - Divide: Split matrices into submatrices.
   - Conquer: Multiply submatrices recursively.
   - Combine: Add results together.
     **Time Complexity:** Better than naive `O(n^3)`.

5. **Maximum and Minimum in an Array**

   - Divide: Split array into two halves.
   - Conquer: Find min/max in both halves.
   - Combine: Compare results.
     **Time Complexity:** `O(n)`

---

## 🔹 Advantages

- Efficient for large problems.
- Recursive nature makes it elegant.
- Often reduces time complexity compared to brute force.

## 🔹 Disadvantages

- Recursive calls require **extra space (stack memory)**.
- Sometimes overhead of recursion is more than iterative solutions.
- Not always the best choice if combining step is expensive.

---

✅ In short:
**Divide and Conquer = Break → Solve → Merge**
It’s the backbone of many efficient algorithms in DSA.
