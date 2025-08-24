
## ✅ Sequential Combinations (loops one after another → ADD) (always take higher order)

```c
// O(n) + O(n) = O(n)
for(int i=0; i<n; i++) {}  
for(int j=0; j<n; j++) {}  
```

```c
// O(n) + O(log n) = O(n)
for(int i=0; i<n; i++) {}  
for(int j=1; j<n; j=j*2) {}  
```

```c
// O(n) + O(√n) = O(n)
for(int i=0; i<n; i++) {}  
for(int j=0; j*j<n; j++) {}  
```

```c
// O(n²) + O(n) = O(n²)
for(int i=0; i<n; i++) {  
  for(int j=0; j<n; j++) {}  
}  
for(int k=0; k<n; k++) {}  
```

---

## ✅ Nested Combinations (loops inside → MULTIPLY) (always take higher order)

```c
// O(n) * O(n) = O(n²)
for(int i=0; i<n; i++) {  
  for(int j=0; j<n; j++) {}  
}  
```

```c
// O(n) * O(log n) = O(n log n)
for(int i=0; i<n; i++) {  
  for(int j=1; j<n; j=j*2) {}  
}  
```

```c
// O(n) * O(√n) = O(n√n)
for(int i=0; i<n; i++) {  
  for(int j=0; j*j<n; j++) {}  
}  
```

```c
// O(√n) * O(log n) = O(√n log n)
for(int i=0; i*i<n; i++) {  
  for(int j=1; j<n; j=j*2) {}  
}  
```

```c
// O(log n) * O(log n) = O((log n)²)
for(int i=1; i<n; i=i*2) {  
  for(int j=1; j<n; j=j*2) {}  
}  
```

---

## ✅ Mixed with 3 loops

```c
// O(n²) + O(√n) = O(n²)
for(int i=0; i<n; i++) {  
  for(int j=0; j<n; j++) {}  
}  
for(int k=0; k*k<n; k++) {}  
```

```c
// O(n) * O(n) + O(log n) = O(n²)
for(int i=0; i<n; i++) {  
  for(int j=0; j<n; j++) {}  
}  
for(int k=1; k<n; k=k*2) {}  
```

```c
// O(n) * O(log n) + O(√n) = O(n log n)
for(int i=0; i<n; i++) {  
  for(int j=1; j<n; j=j*2) {}  
}  
for(int k=0; k*k<n; k++) {}  
```

---

👉 So, the **recipe** is:

* **Sequential loops → addition → max term dominates.**
* **Nested loops → multiplication.**

