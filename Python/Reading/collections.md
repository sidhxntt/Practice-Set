### **Python Data Structures: Lists vs Tuples vs Sets**
---

## **🔹 List (`list`)**
✅ **Ordered, Mutable (modifiable), Allows Duplicates**

```python
# Creating a list
numbers = [1, 2, 3, 4, 5]

# Modifying a list
numbers.append(6)  # Add element
numbers[0] = 100   # Modify element
numbers.remove(3)  # Remove element
print(numbers)  # [100, 2, 4, 5, 6]

# Sorting a list
numbers.sort()     # Sort in ascending order
numbers.reverse()  # Reverse order

# List comprehension
squared = [x**2 for x in numbers]
print(squared)  # [36, 25, 16, 4, 100]
```
### **Destructuring a List**
```python
a, b, *rest = [10, 20, 30, 40]
print(a, b, rest)  # 10 20 [30, 40]
```

### **Key Features of `list`**
- **Mutable** (can change elements)
- **Indexed** (can access elements by index)
- **Allows duplicates**
- **Supports sorting (`sort()`) and reversing (`reverse()`)**
- **Supports list comprehension**
- **Slower than tuples**

---

## **🔹 Tuple (`tuple`)**
✅ **Ordered, Immutable (cannot modify), Allows Duplicates**

```python
# Creating a tuple
numbers = (1, 2, 3, 4, 5)

# Accessing elements
print(numbers[0])  # 1

# Tuples are immutable
# numbers[0] = 10  # ❌ TypeError

# Converting tuple to list (if modification is needed)
numbers_list = list(numbers)
numbers_list.append(6)
print(tuple(numbers_list))  # (1, 2, 3, 4, 5, 6)
```

### **Destructuring a Tuple**
```python
x, y, *rest = (10, 20, 30, 40)
print(x, y, rest)  # 10 20 [30, 40]
```

### **Key Features of `tuple`**
- **Immutable** (cannot be changed after creation)
- **Indexed** (can access elements by index)
- **Faster than lists** (because they are fixed)
- **Allows duplicates**
- **Supports tuple unpacking (destructuring)**

---

## **🔹 Set (`set`)**
✅ **Unordered, Mutable, No Duplicates**

```python
# Creating a set
numbers = {1, 2, 3, 4, 5}

# Adding and removing elements
numbers.add(6)
numbers.remove(3)
print(numbers)  # {1, 2, 4, 5, 6}

# Set operations (union, intersection, difference)
A = {1, 2, 3}
B = {3, 4, 5}
print(A | B)  # Union → {1, 2, 3, 4, 5}
print(A & B)  # Intersection → {3}
print(A - B)  # Difference → {1, 2}

# Converting set to list
numbers_list = list(numbers)
```

### **Destructuring a Set**
```python
s = {10, 20, 30, 40}
a, b, *rest = s
print(a, b, rest)  # Order is random
```

### **Key Features of `set`**
- **Unordered** (no indexing)
- **Mutable (but elements inside must be immutable)**
- **No duplicates allowed**
- **Supports mathematical operations (union, intersection, difference)**
- **Faster than lists for checking membership (`in` operator)**

---

## **🔹 Summary Table**
| Feature       | **List (`list`)** | **Tuple (`tuple`)** | **Set (`set`)** |
|--------------|----------------|----------------|----------------|
| **Ordered**  | ✅ Yes         | ✅ Yes         | ❌ No (unordered) |
| **Mutable**  | ✅ Yes         | ❌ No         | ✅ Yes (but elements must be immutable) |
| **Duplicates Allowed** | ✅ Yes | ✅ Yes | ❌ No |
| **Indexing Supported** | ✅ Yes | ✅ Yes | ❌ No |
| **Sorting (`sort()`)** | ✅ Yes | ❌ No | ❌ No |
| **Best Use Case** | Dynamic lists | Fixed data | Unique items & set operations |

---

## **🔹 When to Use What?**
✔️ **Use `list`** when you need an **ordered, modifiable sequence**.  
✔️ **Use `tuple`** when you need an **immutable sequence** (e.g., coordinates).  
✔️ **Use `set`** when you need **unique elements & fast membership checking**.  

---

Would you like a deeper dive into any specific operations? 🚀