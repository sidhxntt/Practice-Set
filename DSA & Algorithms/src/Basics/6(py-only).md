Everything (objects, lists(mutable), strings(immutable), numbers, even functions and classes) in Python is stored in the **heap**.
But the **names/variables** that we write in our code (like `x = 10`, `arr = [1,2,3]`) are just **references (pointers/addresses)**, and those references live in the **stack frame** of the current function.

So:

- **Heap** → The actual object (data).
- **Stack** → The variable name (reference) that _points_ to that object.

✅ Example:

```python
def demo():
    x = [1,2,3]   # x is in stack, [1,2,3] is in heap
    y = x         # y is another reference in stack, pointing to same heap list
    x.append(4)   # modifies heap list
    print(y)      # y sees the change because it points to same heap object

demo()
```

Output:

```
[1, 2, 3, 4]
```

👉 Both `x` and `y` are just "addresses" in stack pointing to the **same heap object**.

1. Heap ≠ Mutable

- The heap is just a region of memory where dynamically allocated objects live.
- Whether an object is mutable or immutable is a language/runtime design choice, not dictated by heap vs stack.
- If strings were mutable, changing "key" inside a dict would break hash lookups.

---

## 🔹 1. Python is dynamically typed

In Python, a variable doesn’t “own” a value — it just holds a **reference** to an object:

```python
x = 10
x = "hello"
```

- At first, `x` points to an integer object.
- Later, the same name `x` points to a string object.

👉 Because Python variables can change type at runtime, Python cannot store the object “inline” in a stack frame like C might.
Instead, it always stores objects on the **heap** and keeps just a reference (pointer) in the stack frame.

---

## 🔹 2. Objects can outlive function calls

Example:

```python
def make_message():
    return "hello"

msg = make_message()
print(msg)
```

- The function’s **stack frame** disappears after `make_message()` returns.
- But `"hello"` is still needed after the function ends.

👉 If the string were on the stack, it would be destroyed.
By putting it on the **heap**, Python ensures objects live as long as they’re referenced.

---

## 🔹 3. Garbage collection needs heap allocation

Python uses **reference counting + garbage collection** to manage memory.
This requires a central pool (the heap) where all objects are tracked.

- Each object has a reference counter.
- When no variables point to it anymore, Python can free it.

That’s only practical if objects are in the heap.

---

## 🔹 4. Uniformity (everything is an object)

In Python:

- `int`, `float`, `str`, `list`, even functions and classes → all are objects.
- They all share a common structure (reference count, type pointer, etc).
- Storing them all on the **heap** keeps the model consistent.

Contrast with C:

- `int x = 5;` → lives on the stack (primitive type, not an object).
- But in Python: `x = 5` → `5` is an **integer object** in the heap.

---

## 🔹 5. Flexibility vs performance tradeoff

Heap allocation is slightly slower than stack allocation, but Python values:

- **Flexibility** (objects can be resized, passed around freely).
- **Safety** (no dangling references after function calls).
- **Simplicity** (uniform model: everything is a heap object).

That’s why Python chooses heap for _everything_ (objects), and the **stack only stores references and function call metadata**.

---

| Aspect                  | **C (low-level language)**                                                                          | **Python (high-level, object-oriented)**                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Primitive variables** | Can live on **stack** (e.g., `int x = 5;`). Value is stored directly in the stack frame.            | Always an **object on the heap** (e.g., `x = 5` → `5` is a heap object). The stack only stores a **reference** (pointer). |
| **Arrays / strings**    | `char s[] = "hi";` → lives on **stack** (local array).<br>`malloc` → manually allocate on **heap**. | `"hi"` → always a **string object on heap**, immutable. No stack-based raw arrays.                                        |
| **Lifetimes**           | Stack vars destroyed when function ends.<br>Heap vars must be manually freed (`free()`).            | Objects on heap live as long as they’re referenced.<br>Garbage collector frees automatically.                             |
| **Mutability**          | Stack vars & heap vars can be mutated (e.g., change `s[0]`).                                        | Objects can be **mutable (lists, dicts)** or **immutable (str, int, tuple)**.                                             |
| **Memory management**   | Manual: programmer must choose stack vs heap and free heap allocations.                             | Automatic: everything on heap; memory freed by **reference counting + garbage collector**.                                |
| **Function calls**      | Function args often copied onto stack (by value, unless pointers).                                  | Function args are **references** (pointers) to heap objects, stored on the stack.                                         |
| **Performance**         | Stack access = very fast (contiguous memory). Heap = slower.                                        | Always uses heap for objects → slower than C.                                                                             |
| **Consistency**         | Two different models: stack vars vs heap vars.                                                      | One uniform model: **everything is a heap object**.                                                                       |
