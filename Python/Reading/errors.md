### 🔥 **Common Python Errors & Exceptions** 🔥  

Here are the most common errors in Python, along with sample cases that trigger them:

| **Exception** | **Description** | **Example** |
|--------------|---------------|------------|
| `SyntaxError` | Invalid Python syntax. | `print("Hello"` (missing closing parenthesis) |
| `IndentationError` | Incorrect indentation. | `def foo():\nprint("Hello")` (no indentation inside function) |
| `NameError` | Using an undefined variable. | `print(x)` when `x` is not defined |
| `TypeError` | Operation with incompatible types. | `5 + "5"` (int + str) |
| `ValueError` | Invalid value for a function. | `int("hello")` (cannot convert string to int) |
| `IndexError` | Accessing an out-of-range list index. | `arr = [1, 2, 3]; print(arr[5])` |
| `KeyError` | Accessing a missing key in a dictionary. | `d = {"a": 1}; print(d["b"])` |
| `AttributeError` | Calling an invalid method or property. | `"hello".append("!")` (strings don’t have `.append()`) |
| `ZeroDivisionError` | Dividing by zero. | `10 / 0` |
| `FileNotFoundError` | Opening a non-existent file. | `open("nofile.txt", "r")` |
| `ModuleNotFoundError` | Importing a missing module. | `import nonexistent_module` |
| `ImportError` | Importing a module incorrectly. | `from math import nonexistent_function` |
| `RecursionError` | Too many recursive calls. | `def f(): f(); f()` |
| `MemoryError` | Running out of memory. | Creating a huge list: `[1] * (10**1000)` |
| `OverflowError` | Exceeding max numerical limit. | `import math; math.exp(1000)` |
| `StopIteration` | Iterating past the end of an iterator. | `next(iter([]))` |
| `PermissionError` | Trying to modify a file without permission. | `open('/root/protected.txt', 'w')` |

---

## ✅ **Handling Exceptions with `try-except`**
Here’s a sample program using `try-except` to handle multiple exceptions:

```python
try:
    num = int(input("Enter a number: "))  # May raise ValueError
    result = 10 / num                     # May raise ZeroDivisionError
    lst = [1, 2, 3]
    print(lst[5])                          # May raise IndexError
except ValueError:
    print("Invalid input! Please enter a valid number.")
except ZeroDivisionError:
    print("You can't divide by zero!")
except IndexError:
    print("List index out of range!")
except Exception as e:
    print(f"Unexpected error: {e}")  # Catch-all exception
```

---

## ✅ **Using `raise` to Manually Throw Exceptions**
You can manually trigger exceptions with `raise`:

```python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative!")
    print(f"Age set to {age}")

try:
    set_age(-5)
except ValueError as e:
    print(f"Error: {e}")
```

---

## ✅ **Using `finally` Block**
`finally` runs **no matter what**, even if an error occurs.

```python
try:
    file = open("sample.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found!")
finally:
    print("This will always run, whether an error occurs or not.")
```

---

## ✅ **Using `else` with `try-except`**
If no exception occurs, the `else` block runs.

```python
try:
    num = int(input("Enter a number: "))
except ValueError:
    print("Invalid input!")
else:
    print(f"Success! You entered: {num}")
finally:
    print("Execution completed.")
```

---

Let me know if you need more details! 🚀🔥