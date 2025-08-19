## 1️⃣ Number Pattern (Linear Loop)

```
i = 1 2 3 4
```

* Single line, increments by 1 each iteration
* O(n)

---

## 2️⃣ Triangular Number Pattern (Sum Stops at n)

```
i = 1 2 3 4
p = 1 3 6 10
```

* Loop stops when `p > n`
* Iterations ≈ √n
* O(√n)

---

## 3️⃣ Nested Loop (Full Grid)

```
Outer i: 0
   j: 0 1 2 3
Outer i: 1
   j: 0 1 2 3
Outer i: 2
   j: 0 1 2 3
Outer i: 3
   j: 0 1 2 3
```

* Each outer iteration has n inner iterations
* Total = n²
* O(n²)

---

## 4️⃣ Triangular Nested Loop (Triangular Sum)

```
Outer i: 0
   j: 0
Outer i: 1
   j: 0 1
Outer i: 2
   j: 0 1 2
Outer i: 3
   j: 0 1 2 3
```

* Inner loop grows with outer loop
* Total iterations = 1 + 2 + 3 + 4 = 10 ≈ n²/2
* O(n²)

---

### Quick Visual Table

| Pattern                   | Visual Fill             | Iterations | Complexity |
| ------------------------- | ----------------------- | ---------- | ---------- |
| Number Pattern            | 1 2 3 4                 | 4          | O(n)       |
| Triangular Number Pattern | 1 2 3 4 (sum p ≤ n)     | 2–3        | O(√n)      |
| Nested Loop               | Full 4×4 grid           | 16         | O(n²)      |
| Triangular Nested Loop    | 1, 2, 3, 4 growing rows | 10         | O(n²)      |

---

If you want, I can **draw a simple diagram showing all four patterns in “grid/block style”** to make it visually obvious which loops are linear, √n, and n². This is very helpful for memory.

Do you want me to do that?
