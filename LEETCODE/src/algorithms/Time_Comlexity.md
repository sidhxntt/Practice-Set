```c
    for (int i = 0; i < n; i++) {   // O(n)
    }
```

```c
    for (int i = n; i > 0 ; i--) {   // O(n)
    }
```

```c
    for (int i = 0; i < n ; i+2) {   // O(n/2)    => O(n)
    }
```

- If you touch each element once or loop linearly with a fixed step, it’s O(n).
- It doesn’t matter if you skip every 2nd, 5th, or 100th element → constants vanish in Big-O.
- Constants don’t matter in Big-O (O(n/2), O(2n), O(5n) → all O(n)).
- If you increase or decrease the loop variable linearly (i += k, i--, i += c), the loop will usually be O(n).

---

```c
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {     //  // O(n^2)
        }
    }
```
```c
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {     //  O(n^2)
        }
    }
```


```c
p = 0;
for (i = 1; p <= n; i++) {
    p = p + i;
}
```

---

## 🔎 Step-by-step Execution

At each iteration:

* When `i = 1` → `p = 0 + 1 = 1`
* When `i = 2` → `p = 1 + 2 = 3`
* When `i = 3` → `p = 1 + 2 + 3`
* When `i = 4` → `p = 1 + 2 + 3 + 4`
* …
* When `i = k` → `p = 1 + 2 + 3 + … + k`

So after `k` iterations:

$$
p = \frac{k(k+1)}{2}
$$

---

## 📐 Loop Condition

The loop continues **while `p <= n`**.
So we stop when:

$$
\frac{k(k+1)}{2} > n
$$

Ignoring constants:

$$
k^2 > n
$$

$$
k > \sqrt{n}
$$

---

## ⏱️ Time Complexity

Therefore, the loop runs about **√n times**.

$$
\boxed{O(\sqrt{n})}
$$


