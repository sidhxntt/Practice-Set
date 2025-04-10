Sweet — let's peel back the curtain on function objects and their `__dunder__` magic in Python. Here's the good stuff 👇

---

## 🧠 Functions in Python are first-class objects

When you define a function like:

```python
def greet(name):
    return f"Hello, {name}"
```

You're actually creating an **object** of type `function`. You can inspect it:

```python
print(type(greet))  # <class 'function'>
```

This object comes loaded with some helpful **attributes and methods**, including:

---

### 🔍 Common `__dunder__` attributes on functions

| Attribute        | Description |
|------------------|-------------|
| `__name__`       | Name of the function (`greet`) |
| `__doc__`        | Docstring, or `None` if not provided |
| `__defaults__`   | Tuple of default argument values |
| `__code__`       | The compiled bytecode (has its own metadata!) |
| `__globals__`    | Reference to the global namespace where the function was defined |
| `__closure__`    | For closures (captured variables), holds those values |
| `__annotations__`| Dict of parameter and return type annotations |
| `__module__`     | The name of the module where the function is defined |

---

### 🧪 Example

```python
def greet(name: str = "World") -> str:
    """Say hello to someone."""
    return f"Hello, {name}"

print(greet.__name__)         # greet
print(greet.__doc__)          # Say hello to someone.
print(greet.__defaults__)     # ('World',)
print(greet.__annotations__)  # {'name': <class 'str'>, 'return': <class 'str'>}
```

---

### 🧬 Bonus: `__code__` deep dive

```python
print(greet.__code__.co_varnames)   # ('name',)
print(greet.__code__.co_argcount)   # 1
print(greet.__code__.co_filename)   # Full path to source file
```

This lets you programmatically introspect any function, almost like reflection.

---

Let me know if you wanna see:
- How decorators interact with `__name__`
- Function cloning/copying
- Or creating your own function-like objects (`__call__` magic)

Wanna dive into one of those?