## **🔹 Callback Functions in Python**  

A **callback function** is a function passed as an argument to another function, which is then called (invoked) inside the outer function. This pattern is commonly used in **event-driven programming, asynchronous execution, and functional programming.**

---

## **✅ Example 1: Basic Callback Function**
```python
def greet(name):
    return f"Hello, {name}!"

def process(callback, value):
    return callback(value)  # Calling the passed function

result = process(greet, "Alice")
print(result)  # Output: Hello, Alice!
```
📌 Here, `greet` is passed as a **callback** to `process`, which then invokes it.

---

## **✅ Example 2: Callback with Lambda**
```python
def operate(a, b, callback):
    return callback(a, b)

result = operate(5, 3, lambda x, y: x + y)
print(result)  # Output: 8
```
📌 We pass a **lambda function** as a callback to `operate`.

---

## **✅ Example 3: Callbacks in Sorting (Built-in `sorted`)**
Python allows callback functions in **higher-order functions** like `sorted()`, `map()`, and `filter()`.  

```python
names = ["Alice", "Bob", "Charlie"]
sorted_names = sorted(names, key=lambda name: len(name))  # Sort by length
print(sorted_names)  # Output: ['Bob', 'Alice', 'Charlie']
```
📌 The lambda function acts as a **callback** to determine the sorting criteria.

---

## **✅ Example 4: Callback in Asynchronous Execution (`threading`)**
Callback functions are useful in **asynchronous programming** where an operation completes in the background and calls a function when done.

```python
import threading
import time

def background_task(callback):
    time.sleep(2)
    callback("Task complete!")  # Call the function after execution

def on_complete(message):
    print(message)

thread = threading.Thread(target=background_task, args=(on_complete,))
thread.start()

print("Waiting for background task...")
```
📌 The `on_complete` function is called **after** the background task finishes.

---

## **✅ Example 5: Callback in Event Handling**
```python
def button_click(callback):
    print("Button clicked!")
    callback()  # Execute the callback function

def show_alert():
    print("Showing alert!")

button_click(show_alert)  
```
📌 The `show_alert` function is executed when the **button_click** event occurs.

---

## **🔥 When to Use Callbacks?**
✅ **Event Handling** → GUI, Web frameworks (`Flask`, `Tkinter`)  
✅ **Asynchronous Execution** → `asyncio`, `threading`  
✅ **Higher-Order Functions** → `sorted()`, `map()`, `filter()`  
✅ **Customizable Behaviors** → Allow users to pass logic as functions  

---

## **🔍 Summary**
| Concept | Description |
|---------|------------|
| **Definition** | A function passed as an argument and executed later |
| **Use Cases** | Async programming, event handling, sorting, functional programming |
| **Examples** | `sorted()`, `map()`, `filter()`, threading, GUI interactions |

Let me know if you need more advanced examples! 🚀😃