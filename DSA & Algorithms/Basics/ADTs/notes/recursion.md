# Recursion — How count_down Uses the Call Stack

```python
def count_down(self, n):
    if n == 0:
        print("Blastoff!")
    else:
        print(n)
        time.sleep(1)
        self.count_down(n - 1)
```

---

## What is a call stack?

Think of the call stack like a pile of plates:

- A new plate goes on top
- You always remove the plate from the top
- Last plate added = first plate removed (LIFO — Last In, First Out)

Every time a function is called, Python creates a stack frame and places it on this stack.

---

## Step-by-step: What happens when you call `count_down(3)`

Below is what Python does internally when `count_down(3)` runs.

### Step 1 — `count_down(3)` is called

Python creates a new stack frame:

```
[ count_down(3) ]  <- top
```

It prints `3`, waits 1 second, then calls `count_down(2)`.

### Step 2 — `count_down(2)` is called

Stack becomes:

```
[ count_down(3) ]
[ count_down(2) ]  <- top
```

It prints `2`, waits, then calls `count_down(1)`.

### Step 3 — `count_down(1)` is called

Stack becomes:

```
[ count_down(3) ]
[ count_down(2) ]
[ count_down(1) ]  <- top
```

It prints `1`, waits, then calls `count_down(0)`.

### Step 4 — `count_down(0)` is called

Stack becomes:

```
[ count_down(3) ]
[ count_down(2) ]
[ count_down(1) ]
[ count_down(0) ]  <- top
```

This time the function prints:

```
Blastoff!
```

No recursive call is made, so the stack begins to unwind.

---

## Stack unwinding (returning back up)

When a function finishes, Python removes its frame from the stack in LIFO order:

1. `count_down(0)` finishes → pop
2. `count_down(1)` finishes → pop
3. `count_down(2)` finishes → pop
4. `count_down(3)` finishes → pop

Stack becomes empty:

```
[ empty stack ]
```

---

## Key idea

Each recursive call pauses the previous function and places a new one on top of the stack. The line:

```py
self.count_down(n - 1)
```

means: "Pause this function, run a new version of it, and continue only when the new one finishes."

---

## Why deep recursion can crash

If recursion goes too deep, Python keeps adding stack frames until the stack is full. This results in:

```
RecursionError: maximum recursion depth exceeded
```

---

## Final summary

- Every recursive call creates a stack frame
- Frames are placed in a call stack (LIFO)
- The top frame is always the currently running one
- When recursion ends, the stack unwinds
- Recursion = "go deeper → then come back up"

---

