> k = the total number of times the loop body executes.
## Problem 1: for(i=0; i<n; i++)

**Analysis:**
- i=0
- i=1
- i=2
- ...
- i=n-1

**Loop runs:** n times  
**Time Complexity:** O(n)

---

## Problem 2: for(i=n; i>0; i--)

**Analysis:**
- i=n
- i=n-1
- i=n-2
- i=n-3
- ...
- i=1 
- i = 0 (loop stops)

**Loop runs:** n times  
**Time Complexity:** O(n)

---

## Problem 3: for(i=0; i<n; i+=2)

**Analysis:**
- i=0
- i=2
- i=4
- i=6
- ...
- i=n-2

**Loop runs:** n/2 times  
**Time Complexity:** O(n)

---

## Problem 4: for(i=0; i<n; i+3)

**Analysis:**
- i=0
- i=3
- i=6
- i=9
- ...
- i=n-3

**Loop runs:** n/3 times  
**Time Complexity:** O(n)

---

## Problem 5: for(i=n; i>0; i-=2)

**Analysis:**
- i=n
- i=n-2
- i=n-4
- i=n-6
- ...
- Last i > 0 → i = 2 (if n is even)

**Loop runs:** n/2 times  
**Time Complexity:** O(n)

---

## Key Insights:

### Linear Increment/Decrement Loops
All loops that increment or decrement by a **constant** value have **O(n)** time complexity:

- `for(i=0; i<n; i++)` → O(n)
- `for(i=0; i<n; i+=2)` → O(n) 
- `for(i=0; i<n; i+=3)` → O(n)
- `for(i=n; i>0; i--)` → O(n)
- `for(i=n; i>0; i-=2)` → O(n)

**Why?** Because we ignore constants in Big O notation. Whether the loop runs n times, n/2 times, or n/3 times, the growth rate is still linear with respect to n.

---

## Summary Table

| Loop Pattern | Operations Count | Time Complexity |
|-------------|------------------|-----------------|
| for(i=0; i<n; i++) | n | O(n) |
| for(i=n; i>0; i--) | n | O(n) |
| for(i=0; i<n; i+=2) | n/2 | O(n) |
| for(i=0; i<n; i+=3) | n/3 | O(n) |
| for(i=n; i>0; i-=2) | n/2 | O(n) |

**Universal Rule for Linear Loops:** Any single loop that processes input of size n with constant increment/decrement = **O(n)**