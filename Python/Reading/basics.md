### 🔹 **Code**
```python
# Variable Overwriting
box1 = 5
print(box1)

box2 = 3
box2 = 10  # Overwritten
print(box2)

# Python does not have true constants, but uppercase names indicate intended immutability.
MAX_VALUE = 100  # Convention for constants

# Handling Infinity & NaN
print(float('inf'))  # inf (infinity)

box = float('nan')
print(box / 2)  # nan
print(box ** 0)  # 1

# None vs NaN in Python
box3 = None  # Python equivalent of 'null'
print(box3 ** 0)  # 1

# Python does not support `++`
# box = None
# print(box++)  # SyntaxError
```

---

### 🔹 **JavaScript vs Python Equivalents**

| Concept        | JavaScript        | Python              |
|---------------|------------------|---------------------|
| **Null**      | `null`            | `None`             |
| **NaN**       | `NaN`             | `float('nan')`     |
| **Infinity**  | `Infinity`        | `float('inf')`     |
| **Undefined** | `undefined`       | `NameError` (not defined) |

✅ **Key Differences:**  
- **Python does not have `undefined`** – accessing an uninitialized variable results in a `NameError`.  
- **Python requires explicit NaN (`float('nan')`)**.  
- **Infinity must be explicitly defined (`float('inf')`) in Python**.  
- **Python does not allow `++` or `--` operators**.  
