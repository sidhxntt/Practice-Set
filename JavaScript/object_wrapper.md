### **Object Wrappers in JavaScript**

In JavaScript, **primitive values** (like strings, numbers, and booleans) do not have methods or properties because they are immutable and don't behave like objects. However, when we call methods on primitives, such as `str.toUpperCase()`, JavaScript automatically **wraps** these primitives in their corresponding object wrapper types. This allows us to access methods and properties as if they were objects.

### **How It Works:**
- When you try to call a method like `toUpperCase()` on a string, JavaScript temporarily wraps the primitive string (`'hello'`) in a `String` object.
- This wrapping process, known as **autoboxing**, only occurs when you access methods or properties, and it is discarded afterward.

### **Why Object Wrappers?**
Objects are capable of storing methods and properties of related items. Since primitive types don’t have these capabilities, **object wrappers** are used to provide the necessary methods temporarily. 
So for number ->Number this way:

### **Wrapper Types for Primitives:**

| **Primitive Type** | **Object Wrapper**     |
|--------------------|------------------------|
| `string`           | `String`               |
| `number`           | `Number`               |
| `boolean`          | `Boolean`              |
| `symbol`           | `Symbol`               |
| `bigint`           | `BigInt`               |
| `null`             | No wrapper (primitive) |
| `undefined`        | No wrapper (primitive) |

### **Summary:**
An **object wrapper** in JavaScript is a temporary object that wraps a primitive value, allowing it to be treated as an object with methods and properties. This enables method calls on primitive values without manually converting them into objects.

---
In JavaScript, **functions are not primitives; they are objects**. This is an important distinction because it means that functions can have properties and methods, just like any other object.

---

### **Functions in JavaScript**
- Functions in JavaScript are a special kind of object. Specifically, they are objects of the type `Function`.
- A function is callable (can be invoked with `()`), but it can also have properties and methods.

#### Example:
```javascript
function greet() {
  console.log("Hello!");
}

// Functions can have properties
greet.language = "JavaScript";

// Functions can be called
greet(); // Output: Hello!

// Accessing properties on the function
console.log(greet.language); // Output: JavaScript
```

---

### **How Functions Behave**
1. **Callable Objects**:
   - A function in JavaScript is essentially an object that is callable.
   - It has a `[[Call]]` internal method that allows it to be invoked.

2. **Prototype Chain**:
   - Functions are instances of the `Function` constructor, which means they inherit from `Function.prototype`.

#### Example:
```javascript
console.log(typeof greet); // Output: "function"
console.log(greet instanceof Function); // Output: true
```

3. **Can Have Properties**:
   - Functions are objects, so you can add properties to them just like any other object.

4. **Have Built-in Methods**:
   - Functions come with methods like `.call()`, `.apply()`, and `.bind()` because they are objects.

---

### **Functions vs Objects**
| **Function**                           | **Object**                            |
|----------------------------------------|---------------------------------------|
| Functions are callable.                | Objects are not callable.             |
| Functions have a `[[Call]]` method.    | Objects do not have a `[[Call]]` method. |
| Functions inherit from `Function.prototype`. | Objects inherit from `Object.prototype`. |

---

### **What About Arrow Functions?**
Arrow functions are also objects of type `Function`, but:
- They do not have their own `this` (they inherit `this` from the surrounding lexical scope).
- They cannot be used as constructors (`new` cannot be used with arrow functions).

#### Example:
```javascript
const arrow = () => console.log("I'm an arrow function!");

console.log(arrow instanceof Function); // Output: true
arrow(); // Output: "I'm an arrow function!"
```

---

### **Conclusion**
Functions in JavaScript are indeed objects, but they are specialized objects that are callable and have additional features (like `.call()`, `.apply()`, and `.bind()`). This is why they can behave both as objects and as executable pieces of code.

---
In JavaScript, a **prototype** is an object that is associated with every function and object, providing a mechanism for inheritance and sharing properties and methods among instances. It allows objects to inherit properties and methods from another object, which is known as the **prototype chain**.

### Key Concepts:
1. **Prototype Chain**: 
   Every object in JavaScript has a **prototype** (except for the base object, `Object.prototype`). When you try to access a property or method on an object, JavaScript first checks if it exists on the object itself. If not, it looks at the object's prototype, then the prototype's prototype, and so on, up to `Object.prototype`, which is the top of the prototype chain.

2. **Prototype of Functions**:
   Functions in JavaScript are also objects and have a prototype. The prototype of a function is the object that will be used as the prototype for objects created using that function (i.e., objects created with a constructor function).

3. **Inheritance via Prototypes**:
   Objects can inherit properties and methods from other objects through their prototype. This is the basis of **prototype-based inheritance** in JavaScript.

### Example of Prototype:
```javascript
// Function constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding a method to the prototype of Person
Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

// Creating an instance of Person
const person1 = new Person("John", 30);

// person1 can access greet() through the prototype
person1.greet(); // Output: Hello, my name is John and I am 30 years old.
```

In the example:
- `Person.prototype` is an object that contains the `greet` method.
- When `person1` is created using the `new Person()` syntax, `person1` gets the prototype of `Person` and can access the `greet` method even though it's not defined directly on the `person1` object.

### Key Points:
1. **Prototype Property**: Every function has a `prototype` property, which is used for inheritance when objects are created with that function.
2. **Prototype Chain**: When accessing properties or methods on an object, JavaScript first checks if the object has it. If not, it checks the prototype, then the prototype of the prototype, and so on.
3. **Inherited Properties and Methods**: Objects can inherit methods from other objects via the prototype chain. This is how JavaScript supports inheritance.

### Example of Prototype Chain:
```javascript
const animal = {
  eat() {
    console.log("Eating...");
  }
};

const dog = Object.create(animal); // dog's prototype is animal
dog.bark = function() {
  console.log("Barking...");
};

dog.eat();  // Inherited from animal
dog.bark(); // Defined on dog
```

In the example:
- `dog` doesn't have the `eat` method, but it can access it through the `animal` object, which is its prototype.
- `dog` has its own `bark` method.

### `Object.prototype`:
- The root of the prototype chain is `Object.prototype`, and it has common methods like `toString()` and `hasOwnProperty()`.
- Every object in JavaScript, directly or indirectly, inherits from `Object.prototype`.

### How Prototypes are Useful:
- **Inheritance**: Prototypes allow for efficient code reuse through inheritance. Objects can share methods via prototypes rather than duplicating methods in every instance.
- **Efficiency**: Methods and properties are not copied to every instance of an object but are shared via the prototype. This saves memory.

### Summary:
A **prototype** in JavaScript is an object that serves as a blueprint for other objects, allowing them to inherit properties and methods. It enables **prototype-based inheritance**, where objects can share functionality without duplicating it. Every object has a prototype, and JavaScript uses the **prototype chain** to find properties and methods.