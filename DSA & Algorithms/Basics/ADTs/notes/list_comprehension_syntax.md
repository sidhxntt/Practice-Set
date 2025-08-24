The general form is:

```python
[expression for item in iterable if condition]
```

---

### 🟢 Breaking yours down:

```python
[matrix[i][j] for i in range(n) for j in range(n) if i == j]
```

* **`matrix[i][j]`** → the **expression** (what goes into the new list).
* **`for i in range(n)`** → first loop (outer loop).
* **`for j in range(n)`** → second loop (inner loop).
* **`if i == j`** → filter condition (only keep when row index == column index).

---

### 🔄 Equivalent long-form code:

```python
diag = []
for i in range(n):
    for j in range(n):
        if i == j:
            diag.append(matrix[i][j])
```

So the comprehension is just a **compact one-liner** version of nested loops with a filter.

---

⚡In short:

* The syntax **layers loops inside out** (`for i ... for j ... if ...`).
* It’s a shorthand way to build lists without writing multiple `for` loops + `.append()`.

---

## 1. **Basic comprehension**

```python
nums = [1, 2, 3, 4]
squares = [x * x for x in nums]
print(squares)  
```

**Equivalent long form:**

```python
squares = []
for x in nums:
    squares.append(x * x)
```

✅ Output:

```
[1, 4, 9, 16]
```

---

## 2. **With condition**

```python
nums = [1, 2, 3, 4, 5, 6]
evens = [x for x in nums if x % 2 == 0]
print(evens)
```

**Equivalent:**

```python
evens = []
for x in nums:
    if x % 2 == 0:
        evens.append(x)
```

✅ Output:

```
[2, 4, 6]
```

---

## 3. **Nested loops (Cartesian product)**

```python
pairs = [(i, j) for i in [1, 2, 3] for j in ['a', 'b']]
print(pairs)
```

**Equivalent:**

```python
pairs = []
for i in [1, 2, 3]:
    for j in ['a', 'b']:
        pairs.append((i, j))
```

✅ Output:

```
[(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b'), (3, 'a'), (3, 'b')]
```

---

## 4. **Nested loops with condition**

```python
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

diag = [matrix[i][j] for i in range(3) for j in range(3) if i == j]
print(diag)
```

**Equivalent:**

```python
diag = []
for i in range(3):
    for j in range(3):
        if i == j:
            diag.append(matrix[i][j])
```

✅ Output:

```
[1, 5, 9]
```

---

⚡ So the syntax is just:
`[expression for ... in ... for ... in ... if ...]`
and it collapses multiple loops + filters into **one line**.

---

## ✅ Where you *can* use comprehensions

* **Building a new list** from existing iterables.
* **Applying a transformation** (like squaring numbers).
* **Filtering values** with `if`.
* **Flattening simple nested loops**.
* **Readability stays okay** if it’s just 1–2 loops + 1 filter.

---

## ❌ Where you *shouldn’t/can’t* use them

| Case                                                                    | Why it’s a bad fit                                                                                                               |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **When you need complex logic** (multiple `if/else`, breaks, continues) | Comprehensions don’t support `break` or `continue`. Too much logic makes them unreadable.                                        |
| **When you need side effects** (e.g., logging, printing, DB writes)     | Comprehensions are for *building lists*, not executing steps. Use a `for` loop instead.                                          |
| **When you don’t need the list**                                        | A comprehension always creates a list → wastes memory. If you just need iteration, use a `for` loop or generator (`(...)`).      |
| **Deeply nested loops**                                                 | You *can* technically write 3–4 nested `for`s in a comprehension, but it becomes unreadable. Better to expand into normal loops. |
| **When readability suffers**                                            | If the one-liner looks confusing → expand to normal loops for clarity.                                                           |

---

## 🔎 Example of misuse

```python
# ❌ hard to read and has side effects
[print(x) for x in range(10) if x % 2 == 0]
```

Better:

```python
for x in range(10):
    if x % 2 == 0:
        print(x)
```

---

## ⚡ Alternatives

* If you want the **same syntax but without building a list** → use a **generator expression**:

  ```python
  (x*x for x in range(10))  # returns a generator, lazy evaluated
  ```

* If you need more complex logic → use **normal loops**.
