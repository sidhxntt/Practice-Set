### **Hoisting**
Hoisting is a JavaScript mechanism where variable and function declarations are moved to the top of their respective scopes during the **compilation phase**, before the code execution. However, only the declarations are hoisted, not the initializations or assignments.

#### **How Hoisting Works**

1. **Variable Hoisting**:
   - When a variable is declared using `var`, the declaration (but not the assignment) is hoisted to the top.
   - Variables declared with `let` and `const` are **hoisted** but **not initialized**, so they go into a "temporal dead zone" until the actual line of code where they are initialized.

2. **Function Hoisting**:
   - Function declarations (like `function greet() {}`) are hoisted completely, meaning the function's body is available throughout the scope, even before the declaration line.
   - Function expressions (e.g., `const greet = function() {}`) are not hoisted. Only the variable is hoisted, but it won't hold a function until the assignment is made.

#### **Examples of Hoisting**

1. **Variable Hoisting with `var`**:
   ```javascript
   console.log(x); // undefined (not ReferenceError because it's hoisted, but not assigned yet)
   var x = 5;
   console.log(x); // 5
   ```

   - Here, the declaration of `x` is hoisted, but the initialization (`x = 5`) happens at runtime. So when `x` is accessed before initialization, it results in `undefined`.

2. **Variable Hoisting with `let`/`const`**:
   ```javascript
   console.log(y); // ReferenceError: Cannot access 'y' before initialization
   let y = 10;
   ```

   - Variables declared with `let` and `const` are hoisted to the top, but they cannot be accessed before the actual declaration line because they are in the "temporal dead zone."

3. **Function Declaration Hoisting**:
   ```javascript
   greet(); // Works, outputs "Hello!"
   
   function greet() {
     console.log("Hello!");
   }
   ```

   - The function `greet` is hoisted entirely, so it can be called before its declaration.

4. **Function Expression Hoisting**:
   ```javascript
   greet(); // TypeError: greet is not a function

   const greet = function() {
     console.log("Hello!");
   };
   ```

   - Here, only the variable `greet` is hoisted, and it is initially `undefined`. Therefore, when the function call is made before the assignment, it throws an error because `greet` is not a function yet.

---

### **Closure**

A **closure** is a feature in JavaScript where an inner function has access to the outer function's variables and parameters even after the outer function has returned. In other words, closures allow functions to "remember" the environment in which they were created, even when they are executed outside of that environment.

#### **How Closures Work**
When a function is created inside another function, it forms a closure, meaning it "captures" the variables and parameters of the outer function. The inner function can continue to access and modify those variables, even after the outer function has finished execution.

#### **Example of a Closure**

```javascript
function outerFunction() {
  let outerVariable = 'I am from the outer function';

  // Inner function forms a closure
  function innerFunction() {
    console.log(outerVariable); // inner function has access to outerVariable
  }

  return innerFunction; // return the inner function
}

const closureFunction = outerFunction(); // outerFunction is executed and returns innerFunction
closureFunction(); // Outputs: I am from the outer function
```

- In the example above, even though `outerFunction` has finished executing, the `innerFunction` still has access to `outerVariable` because of the closure.

#### **Real-World Example of Closure**
Closures are often used in JavaScript to create private variables, such as in counter functions.

```javascript
function createCounter() {
  let count = 0; // count is a private variable

  return {
    increment: function() {
      count++;
      console.log(count);
    },
    decrement: function() {
      count--;
      console.log(count);
    },
    getCount: function() {
      console.log(count);
    }
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
counter.decrement(); // 1
```

- The `count` variable is "private" to the `createCounter` function and is only accessible through the `increment`, `decrement`, and `getCount` methods. This is a closure because the inner functions still have access to `count` even though the `createCounter` function has finished execution.

#### **Key Characteristics of Closures**
- **Access to Outer Function's Variables**: An inner function has access to variables in the outer function.
- **Persistent State**: The inner function "remembers" the values of the variables from its lexical scope.
- **Encapsulation**: Closures allow for the encapsulation of private variables.

---

### **Differences Between Hoisting and Closure**

| Aspect                 | **Hoisting**                                | **Closure**                                       |
|------------------------|--------------------------------------------|--------------------------------------------------|
| **Definition**          | Hoisting refers to the behavior where function and variable declarations are moved to the top of their scope during the compilation phase. | A closure is a function that "remembers" its lexical scope even after the function has finished executing. |
| **Behavior**            | Variables and functions are hoisted and can be accessed even before the code is executed, but with different rules for `var`, `let`, and `const`. | Inner functions can access outer function variables even after the outer function has finished execution. |
| **Use Case**            | Hoisting allows for flexible code placement, but can lead to unexpected behavior, especially with `let` and `const`. | Closures are used for data encapsulation, creating private variables, and maintaining state across function calls. |
| **Common Errors**       | Accessing a `let` or `const` variable before declaration causes a `ReferenceError`. Function expressions are not hoisted fully. | Overusing closures can lead to memory leaks if large objects or variables are captured unnecessarily. |

---

### **Summary**
- **Hoisting**: Moves variable and function declarations to the top of their scope. `var` declarations are hoisted with undefined values, while `let` and `const` are hoisted but not initialized.
- **Closure**: A function that remembers the environment in which it was created, allowing it to access variables from outer functions even after the outer function has finished executing.

Both hoisting and closures are fundamental concepts in JavaScript that help you understand how code execution works and how to manage scope, variables, and function behavior effectively.