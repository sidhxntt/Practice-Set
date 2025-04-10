## **🔹 Hoisting in Python**
Hoisting is a behavior in JavaScript where **variable and function declarations** are moved ("hoisted") to the top of their containing scope before execution. However, **Python does not support hoisting** like JavaScript.

### **🚫 No Hoisting in Python**
In Python, variables and functions **must be defined before they are used**. If you try to use a variable or function before declaring it, you’ll get a `NameError`.

🔹 **Example (JavaScript Hoisting)**  
```javascript
console.log(a); // undefined
var a = 10;
```
🔹 **Python (No Hoisting)**
```python
print(a)  # ❌ NameError: name 'a' is not defined
a = 10
```
📌 **Python throws an error because `a` is used before assignment.**

---

## **🔹 Closures in Python**
A **closure** in Python is a function that remembers values from its enclosing scope even after the scope has finished executing.

### **✅ Example of a Closure**
```python
def outer_function(msg):
    def inner_function():
        print(f"Message: {msg}")  # Inner function remembers `msg`
    return inner_function  # Returning the inner function

closure_fn = outer_function("Hello, Python!")
closure_fn()  # Message: Hello, Python!
```
📌 Even though `outer_function` has finished executing, the **inner function still remembers `msg`**, thanks to the closure.

### **🔹 When to Use Closures?**
- **Data hiding (Encapsulation)**
- **Maintaining state**
- **Callback functions**

### **✅ Example: Closure as a Counter**
```python
def counter():
    count = 0  # Enclosed variable

    def increment():
        nonlocal count  # Allow modifying count from outer scope
        count += 1
        return count

    return increment

counter_fn = counter()
print(counter_fn())  # 1
print(counter_fn())  # 2
print(counter_fn())  # 3
```
📌 The `count` variable **persists across function calls** because of closures.

---

## **🔥 Key Takeaways**
| Concept | Hoisting (JS) | Hoisting (Python) | Closures |
|---------|--------------|----------------|---------|
| **Definition** | Variables & functions are moved to the top of scope | ❌ Not supported | Function remembers outer variables |
| **Variables Before Declaration?** | ✅ Allowed | ❌ Not Allowed (`NameError`) | ✅ Possible via closures |
| **Use Cases** | JavaScript execution order | Not applicable | Data hiding, state maintenance |

🚀 **Summary:**  
- **Hoisting is NOT present in Python.** Always define variables before using them.  
- **Closures allow inner functions to remember values from their enclosing scope.** Useful for stateful functions!  

Let me know if you need more examples! 😃