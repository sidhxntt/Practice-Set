# 📊 **A Priori vs A Posteriori Analysis in DSA**

| Feature / Aspect                 | **A Priori Analysis** (Theoretical)                      | **A Posteriori Analysis** (Experimental)                    |
| -------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| **When done?**                   | Before executing the algorithm                           | After executing the algorithm                               |
| **Nature**                       | Mathematical & logical reasoning                         | Empirical / based on actual runs                            |
| **Focus**                        | Input size vs. steps & memory usage                      | Real-world runtime and resource usage                       |
| **Measures**                     | Time complexity (Big-O, Ω, Θ), Space complexity          | Execution time (ms/sec), Memory used (MB), CPU cycles       |
| **Hardware/Software dependent?** | No – independent of machine & OS                         | Yes – depends on machine, OS, compiler, dataset             |
| **Purpose in DSA**               | To estimate efficiency and compare algorithms abstractly | To validate performance in practice                         |
| **Example (Sorting)**            | Bubble Sort → O(n²), MergeSort → O(n log n)              | Bubble Sort took 2.3s, MergeSort took 0.05s on 10⁶ elements |
| **Use case**                     | Algorithm design & selection                             | Benchmarking, optimization, real testing                    |

---

# 🔹 **Frequency Count Method in DSA**

### ✅ Definition:

A **theoretical (a priori) technique** where we count how many times the **basic operation** of an algorithm executes as a function of input size `n`.
This gives a formula → simplified into **time complexity** using Big-O.

---

## 🔑 Steps

1. Identify the **basic operation**.
2. Count its **frequency** (loop iterations, comparisons, assignments).
3. Express it as a function of `n`.
4. Simplify → keep only dominant term → Big-O.

---

## 🔹 Example 1: Sum of Array

```c
function sum(arr, n){
    sum = 0;                 // (1)
    for (int i = 0; i < n; i++) {   // (n+1) comparisons + n increments
        sum += arr[i];       // (n)
    }
    return sum;              // (1)
}
```

### Frequency Count:

- Initialization (`sum=0`): 1
- Loop init (`i=0`): 1
- Comparisons (`i<n`): n+1
- Increments (`i++`): n
- Sum update (`sum+=arr[i]`): n
- Return: 1

**Total steps = 2n + 4 ≈ O(n)**
**Space Complexity = O(1)** (only variables, array given as input).

---

## 🔹 Example 2: Matrix Addition

```c
function addMatrix(arr1, arr2, n){
    for (int i = 0; i < n; i++) {         // (n+1) comparisons + n increments
        for (int j = 0; j < n; j++) {     // n*(n+1) comps + n*n increments
            arr3[i][j] = arr1[i][j] + arr2[i][j]; // (n²)
        }
    }
}
```

### Frequency Count:

- Outer loop: n+1 comparisons, n increments
- Inner loop: n\*(n+1) comparisons, n\*n increments
- Assignment: n²
- Total ≈ 2n² + 3n + 1 → **O(n²)**

**Space Complexity = O(n²)** (for arr3, output matrix).

---

## 🔹 Example 3: Matrix Multiplication

```c
function matMul(A, B, n){
    for (int i = 0; i < n; i++) {             // n+1 comparisons, n increments
        for (int j = 0; j < n; j++) {         // n*(n+1) comps, n*n increments
            C[i][j] = 0;                      // n²
            for (int k = 0; k < n; k++) {     // n²*(n+1) comps, n²*n increments
                C[i][j] += A[i][k] * B[k][j]; // n³ multiplications + n³ additions
            }
        }
    }
}
```

---

### 🔎 Frequency Count:

- **Outer loop (`i`)** → (n+1) comps + n increments
- **Middle loop (`j`)** → n\*(n+1) comps + n² increments
- **Inner loop (`k`)** → n²\*(n+1) comps + n³ increments
- **Initializations `C[i][j]=0`** → n²
- **Multiplications (`A[i][k]*B[k][j]`)** → n³
- **Additions (`+=`)** → n³

---

### ✅ Total Work

- Dominant terms: `~ 2n³` (multiplications + additions)
- Lower terms: `O(n²)` (loop controls, initializations)
- **Time Complexity:** **O(n³)**
- **Space Complexity:**

  - Extra array `C` → O(n²)
  - If overwriting allowed → O(1) extra
