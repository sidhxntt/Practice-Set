Everything (objects, lists, strings, numbers, even functions and classes) in Python is stored in the **heap**.
But the **names/variables** that we write in our code (like `x = 10`, `arr = [1,2,3]`) are just **references (pointers/addresses)**, and those references live in the **stack frame** of the current function.

So:

* **Heap** → The actual object (data).
* **Stack** → The variable name (reference) that *points* to that object.

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
