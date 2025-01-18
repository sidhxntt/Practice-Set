

### **Primitive Types in TypeScript**
1. **`string`**: Represents textual data.
   ```typescript
   let name: string = "John Doe";
   ```

2. **`number`**: Represents numeric data (both integers and floating-point numbers).
   ```typescript
   let age: number = 25;
   let price: number = 99.99;
   ```

3. **`boolean`**: Represents `true` or `false` values.
   ```typescript
   let isActive: boolean = true;
   ```

4. **`null`**: Represents the intentional absence of any value.
   ```typescript
   let emptyValue: null = null;
   ```

5. **`undefined`**: Represents an uninitialized variable or an explicitly undefined value.
   ```typescript
   let uninitialized: undefined = undefined;
   ```

6. **`bigint`**: Represents arbitrarily large integers.
   ```typescript
   let largeNumber: bigint = 1234567890123456789012345678901234567890n;
   ```

7. **`symbol`**: Represents a unique and immutable value often used as object property keys.
   ```typescript
   let uniqueKey: symbol = Symbol("key");
   ```

---

### **Characteristics of Primitive Types**
- **Immutable**: The value of a primitive type cannot be changed after it is created.
  - Example: Reassigning a variable doesn’t mutate the value, it creates a new value.
- **Passed by Value**: When assigning or passing primitives, a copy of the value is used, not a reference.
  ```typescript
  let a = 10;
  let b = a;
  b = 20;
  console.log(a); // 10 (unchanged)
  ```

---

### **Special Notes**
1. **`null` and `undefined`**:
   - Both are considered subtypes of all other types when `strictNullChecks` is disabled.
   - With `strictNullChecks` enabled (recommended), you must explicitly handle these values.

2. **Difference Between `bigint` and `number`**:
   - `number` has precision limitations and is stored as a 64-bit floating-point value.
   - `bigint` is used for exact arithmetic with very large numbers.
---
**Object Literal Types** and **Interfaces** in TypeScript both define the shape of objects, but they have distinct features and use cases. Here's a comparison to help clarify their differences and guide you on when to use each.

---

### **Key Differences**

| **Feature**               | **Object Literal Type**          | **Interface**                  |
|---------------------------|----------------------------------|--------------------------------|
| **Purpose**               | General-purpose type definitions | Object-specific design         |
| **Complex Constructs**    | Supports unions and intersections | Does not support unions        |
| **Extension**             | Combine with `&` (intersection)  | Extend using `extends`         |
| **Declaration Merging**   | Not supported                   | Supported                      |
| **Readability**           | Concise for complex types        | Better for evolving object types |
## Using Union and Intersection Together
``` typescript
type Admin = { role: "admin" };
type User = { name: string };

type SuperUser = (Admin | User) & { permissions: string[] };

const user1: SuperUser = { name: "Alice", permissions: ["read"] }; // User with permissions
const user2: SuperUser = { role: "admin", permissions: ["read", "write"] }; // Admin with permissions
```
### **Literal Types in TypeScript**

A **literal type** in TypeScript is a type that represents a specific and exact value rather than a broader category. This is in contrast to types like `string`, `number`, or `boolean`, which allow any value of their respective kind. Literal types restrict values to a specific set of allowed options.

---

### **1. Types of Literals**

#### **String Literals**
String literal types allow you to specify exact string values.

```typescript
type Direction = "up" | "down" | "left" | "right";

let move: Direction;

move = "up"; // ✅ Valid
move = "left"; // ✅ Valid
move = "forward"; // ❌ Error: Type '"forward"' is not assignable to type 'Direction'.
```

#### **Number Literals**
Number literal types restrict values to specific numbers.

```typescript
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

let roll: DiceRoll;

roll = 1; // ✅ Valid
roll = 7; // ❌ Error: Type '7' is not assignable to type 'DiceRoll'.
```

#### **Boolean Literals**
Boolean literal types restrict values to `true` or `false`.

```typescript
type Toggle = true;

let isOn: Toggle;

isOn = true; // ✅ Valid
isOn = false; // ❌ Error: Type 'false' is not assignable to type 'true'.
```

---

### **2. Literal Types with `type` Aliases**
Literal types can be combined with `type` aliases to define reusable and meaningful constraints.

```typescript
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function request(method: HttpMethod, url: string): void {
  console.log(`${method} request to ${url}`);
}

request("GET", "/api/resource"); // ✅ Valid
request("PATCH", "/api/resource"); // ❌ Error: Type '"PATCH"' is not assignable to type 'HttpMethod'.
```

---

### **3. Literal Types with `const`**
When you use `const` with a literal value, TypeScript infers the most specific literal type.

```typescript
const color = "red"; // Inferred as type "red"

let color1 = "red"; // Inferred as type string
const color2: "red" = "red"; // Explicit literal type "red"
```

---

### **4. Combining Literal Types with Union**
You can combine literal types using the `|` (union) operator to allow multiple specific values.

```typescript
type Answer = "yes" | "no" | "maybe";

let response: Answer;

response = "yes"; // ✅ Valid
response = "no"; // ✅ Valid
response = "idk"; // ❌ Error: Type '"idk"' is not assignable to type 'Answer'.
```

---

### **5. Literal Types and Functions**
Literal types are especially useful in functions to enforce strict argument values.

```typescript
function setMode(mode: "dark" | "light"): void {
  console.log(`Mode set to ${mode}`);
}

setMode("dark"); // ✅ Valid
setMode("auto"); // ❌ Error: Argument of type '"auto"' is not assignable to parameter of type '"dark" | "light"'.
```

---

### **6. Literal Types with Enums**
While enums are a dedicated feature in TypeScript, literal types can serve as a lightweight alternative for defining similar functionality.

```typescript
type Status = "success" | "failure" | "pending";

let currentStatus: Status = "pending";
```

---

### **7. Literal Inference in TypeScript**
Literal types are often inferred when you use `as const`.

```typescript
const config = {
  mode: "dark",
  theme: "solarized",
} as const;

// Now, config.mode is of type "dark" instead of string
```

---

### **8. Advantages of Literal Types**
- **Type Safety:** Prevents invalid values at compile time.
- **Improved Autocomplete:** IDEs provide better suggestions when using literal types.
- **Expressiveness:** Helps convey precise intent in your code.

---

### **Conclusion**

Literal types in TypeScript are a powerful way to enforce specific and exact values. They improve type safety and make your code more expressive, reducing runtime errors and improving developer experience. Use them to model strict, predefined sets of values in your applications!
---
### **Type Indexing in TypeScript**

Type indexing in TypeScript allows you to access specific properties of a type or subset types using **index access types** (`T[K]`) and mapped types. This feature is powerful for dynamically referencing parts of an object type.

---

### **1. Basic Index Access Types**

You can use **square bracket notation** to reference the type of a specific property.

#### **Example**
```typescript
type User = {
  id: number;
  name: string;
  age: number;
};

type UserName = User["name"]; // string
type UserId = User["id"];     // number
```

Here:
- `User["name"]` extracts the type of the `name` property, which is `string`.
- `User["id"]` extracts the type of the `id` property, which is `number`.

---

### **2. Indexing with Union of Keys**

You can use a **union of keys** to extract multiple types at once.

#### **Example**
```typescript
type User = {
  id: number;
  name: string;
  age: number;
};

type UserProps = User["id" | "name"]; // number | string
```

This creates a union of the types of `id` and `name`.

---

### **3. Indexing with `keyof`**

The `keyof` operator returns a union of all the keys in an object type. You can combine it with indexing to create dynamic references.

#### **Example**
```typescript
type User = {
  id: number;
  name: string;
  age: number;
};

type UserKeys = keyof User; // "id" | "name" | "age"
type AllUserProps = User[UserKeys]; // number | string
```

Here:
- `keyof User` gives the keys `"id" | "name" | "age"`.
- `User[UserKeys]` gives the union of all property types: `number | string`.

---

### **4. Using Index Types with Arrays**

When working with arrays or tuples, you can use numerical indices to extract types.

#### **Example with Arrays**
```typescript
type Numbers = number[];

type FirstNumber = Numbers[0]; // number
```

#### **Example with Tuples**
```typescript
type Tuple = [string, number, boolean];

type First = Tuple[0]; // string
type Second = Tuple[1]; // number
type Third = Tuple[2]; // boolean
```

---

### **5. Indexing with `typeof`**

The `typeof` operator can extract the type of an existing object, which can then be indexed.

#### **Example**
```typescript
const user = {
  id: 1,
  name: "Alice",
  age: 30,
};

type User = typeof user;
type UserName = User["name"]; // string
```

---

### **6. Preventing Invalid Indexing**

If you attempt to index a type with a key that doesn't exist, TypeScript will throw an error.

#### **Example**
```typescript
type User = {
  id: number;
  name: string;
};

type Invalid = User["email"]; // ❌ Error: Property 'email' does not exist on type 'User'.
```

---

### **7. Optional Properties and Indexing**

When a property is optional, indexing results in the property type **or** `undefined`.

#### **Example**
```typescript
type User = {
  id: number;
  name?: string;
};

type UserName = User["name"]; // string | undefined
```

---

### **8. Indexing with `Record` Types**

The `Record` utility type can create a type where all keys are of the same type, which can be indexed dynamically.

#### **Example**
```typescript
type UserRoles = Record<string, "admin" | "user" | "guest">;

type Role = UserRoles["anyKey"]; // "admin" | "user" | "guest"
```

---

### **9. Practical Use Cases**

#### Dynamic Lookups
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Alice" };
const userName = getProperty(user, "name"); // string
```

#### Picking and Omitting Properties
You can use `Pick` or `Omit` utility types in combination with indexing.

```typescript
type User = {
  id: number;
  name: string;
  email: string;
};

type UserPreview = Pick<User, "id" | "name">; // { id: number; name: string; }
type UserWithoutEmail = Omit<User, "email">; // { id: number; name: string; }
```

---

### **Conclusion**

Type indexing is a powerful feature in TypeScript that allows for precise and dynamic type definitions. By leveraging `keyof`, index access, and utility types like `Pick` and `Omit`, you can write flexible and type-safe code that adapts to your needs.

---
In TypeScript, `readonly` is a modifier used to make properties of an object immutable after their initialization. Once a property is marked as `readonly`, it cannot be reassigned, which helps enforce immutability and prevent unintended changes.

---

### 1. **The `readonly` Modifier**

#### Usage
The `readonly` modifier can be applied to:
- **Class properties**
- **Interface properties**
- **Type properties**

#### Example
```typescript
interface User {
  readonly id: number;
  name: string;
}

const user: User = { id: 1, name: "Alice" };
user.name = "Bob"; // OK
user.id = 2;       // Error: Cannot assign to 'id' because it is a read-only property.
```

---

### 2. **Read-only Arrays**
TypeScript provides the `ReadonlyArray<T>` type to ensure array elements cannot be modified.

#### Example
```typescript
const numbers: ReadonlyArray<number> = [1, 2, 3];
numbers[0] = 4;       // Error: Index signature in type 'readonly number[]' only permits reading.
numbers.push(5);      // Error: Property 'push' does not exist on type 'readonly number[]'.

const mutableNumbers = numbers as number[]; // Use type assertion to cast back
mutableNumbers.push(5);                     // This works, but defeats the purpose of readonly.
```

---

### 3. **Similar Modifiers**

#### a. **`const` (Immutable Variables)**
- Used at the variable level.
- Prevents reassignment of the variable reference (but does not make the value immutable for objects or arrays).

#### Example
```typescript
const num = 42;
num = 100; // Error: Cannot assign to 'num' because it is a constant.

const obj = { x: 1 };
obj.x = 2; // OK: Object properties are still mutable.
```

---

#### b. **`private`, `protected`, `public` (Access Modifiers)**
Used in classes to control the visibility of properties and methods.

- **`public`**: Default visibility, accessible anywhere.
- **`private`**: Accessible only within the class.
- **`protected`**: Accessible within the class and subclasses.

#### Example
```typescript
class Example {
  public name: string;    // Accessible anywhere
  private id: number;     // Accessible only within the class
  protected age: number;  // Accessible within the class and subclasses

  constructor(name: string, id: number, age: number) {
    this.name = name;
    this.id = id;
    this.age = age;
  }
}
```

---

#### c. **`static` (Class-Level Members)**
- Properties and methods marked `static` belong to the class itself, not an instance.

#### Example
```typescript
class MathUtil {
  static PI = 3.14; // Class-level property

  static calculateArea(radius: number): number {
    return this.PI * radius * radius;
  }
}

console.log(MathUtil.PI);                // 3.14
console.log(MathUtil.calculateArea(10)); // 314
```

---

#### d. **`abstract` (Abstract Classes and Methods)**
- Abstract classes can only be extended (not instantiated).
- Abstract methods must be implemented in derived classes.

#### Example
```typescript
abstract class Animal {
  abstract sound(): void; // Must be implemented by subclasses
  move(): void {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  sound(): void {
    console.log("Bark!");
  }
}

const dog = new Dog();
dog.sound(); // Bark!
```

---

### 4. **Combining `readonly` with Others**

#### `readonly` with `private` or `protected`
```typescript
class Person {
  readonly name: string;       // Immutable but publicly accessible
  private readonly id: number; // Immutable and accessible only within the class

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
```

---

### 5. **`Readonly` Utility Type**
TypeScript provides the `Readonly<T>` utility type to make all properties of a type `readonly`.

#### Example
```typescript
interface User {
  id: number;
  name: string;
}

type ReadonlyUser = Readonly<User>;
// Equivalent to:
// type ReadonlyUser = {
//   readonly id: number;
//   readonly name: string;
// };

const user: ReadonlyUser = { id: 1, name: "Alice" };
user.name = "Bob"; // Error: Cannot assign to 'name' because it is a read-only property.
```

---

### Summary Table

| Modifier       | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| `readonly`     | Makes properties immutable after initialization.                           |
| `const`        | Prevents reassignment of a variable reference (not deep immutability).     |
| `private`      | Restricts access to the class where it is defined.                         |
| `protected`    | Restricts access to the class and its subclasses.                          |
| `public`       | Default visibility, accessible anywhere.                                   |
| `static`       | Defines properties/methods that belong to the class itself, not instances. |
| `abstract`     | Forces subclasses to implement specific methods from an abstract class.    |

These modifiers provide TypeScript with powerful tools for encapsulation, immutability, and type safety.
---
In TypeScript, **mapped types** allow you to create new types by transforming existing ones. They are especially useful for creating utility types and ensuring consistency across similar type transformations.

### Basic Syntax
```typescript
type MappedType<T> = {
  [K in keyof T]: Transformation
};
```
Here’s how mapped types work:

1. **`K`**: Represents each key in the object `T` (using the `keyof` keyword).
2. **`in`**: Iterates over all keys in `T`.
3. **Transformation**: Defines how each property’s type should be transformed.

---

### Examples

#### 1. **Make All Properties Optional**
```typescript
type Optional<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  id: number;
  name: string;
}

type OptionalUser = Optional<User>;
// Equivalent to:
// type OptionalUser = {
//   id?: number;
//   name?: string;
// };
```

#### 2. **Make All Properties Readonly**
```typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type ReadonlyUser = Readonly<User>;
// Equivalent to:
// type ReadonlyUser = {
//   readonly id: number;
//   readonly name: string;
// };
```

#### 3. **Remove `readonly` from Properties**
```typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

type MutableUser = Mutable<ReadonlyUser>;
// Equivalent to:
// type MutableUser = {
//   id: number;
//   name: string;
// };
```

#### 4. **Mapping with Key Transformation**
You can map over keys and transform their names:
```typescript
type PrefixKeys<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${string & K}`]: T[K];
};

type PrefixedUser = PrefixKeys<User, "user_">;
// Equivalent to:
// type PrefixedUser = {
//   user_id: number;
//   user_name: string;
// };
```

#### 5. **Map Properties to Another Type**
Transform all values to a specific type:
```typescript
type AllStrings<T> = {
  [K in keyof T]: string;
};

type StringifiedUser = AllStrings<User>;
// Equivalent to:
// type StringifiedUser = {
//   id: string;
//   name: string;
// };
```

---

### Utility Types in TypeScript
Many utility types in TypeScript are built using mapped types, such as:
- `Partial<T>`: Makes all properties optional.
- `Required<T>`: Makes all properties required.
- `Readonly<T>`: Makes all properties readonly.
- `Record<K, T>`: Creates a type with keys `K` and values of type `T`.

---

### Advanced Features

#### 1. **Conditional Types in Mapped Types**
You can use conditional types within mapped types:
```typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// Equivalent to:
// type NullableUser = {
//   id: number | null;
//   name: string | null;
// };
```

#### 2. **Filtering Keys**
By combining `keyof` with conditional types, you can filter keys:
```typescript
type FilterByValue<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};

type OnlyNumbers = FilterByValue<User, number>;
// Equivalent to:
// type OnlyNumbers = {
//   id: number;
// };
```

---

### Practical Use Cases
- **API Response Transformation:** Add/remove fields or transform field types.
- **Frontend State Management:** Derive types for initial state or reducer actions.
- **Dynamic Key Generation:** Prefixing or suffixing keys in a type.

Mapped types are a cornerstone of TypeScript’s type system, allowing you to define reusable, maintainable, and consistent types for various applications.

---
### Generics in TypeScript

Generics are a feature in TypeScript that allow you to write reusable and flexible components, functions, or classes that work with different data types while maintaining type safety. They provide a way to create **"type variables"** that can be used throughout the code.

---

### 1. **Why Use Generics?**

Without generics, you might resort to using `any`, which sacrifices type safety. Generics let you:
- Write **reusable code** that works with multiple types.
- Enforce **type constraints** for better safety and predictability.
- Avoid redundancy by not needing to write similar code for different types.

---

### 2. **Basic Syntax**
```typescript
function identity<T>(value: T): T {
  return value;
}

const result1 = identity<number>(42);      // Explicit type: number
const result2 = identity("Hello");        // Inferred type: string
```

- **`T`**: The generic type parameter (can be any valid identifier).
- `<T>`: Declares the generic parameter, allowing you to use it as a type within the function, interface, or class.

---

### 3. **Using Generics in Functions**

#### a. **Generic Functions**
```typescript
function getArray<T>(items: T[]): T[] {
  return items;
}

const stringArray = getArray<string>(["a", "b", "c"]); // string[]
const numberArray = getArray([1, 2, 3]);              // number[]
```

#### b. **Multiple Type Parameters**
You can define multiple generic parameters:
```typescript
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

const result = pair("id", 42); // ["id", 42] (type: [string, number])
```

---

### 4. **Generic Interfaces**

Generics can be used in interfaces to define type-safe structures.

#### a. **Generic Interface Example**
```typescript
interface Box<T> {
  value: T;
}

const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 123 };
```

#### b. **Function Types in Interfaces**
```typescript
interface GenericFunction<T> {
  (input: T): T;
}

const echo: GenericFunction<string> = (input) => input;

const result = echo("Hello"); // "Hello"
```

---

### 5. **Generic Classes**

Generics can be applied to classes to create reusable templates.

#### a. **Generic Class Example**
```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.pop()); // "World"
```

---

### 6. **Generic Constraints**

You can constrain generics to specific types using `extends`.

#### a. **Constrain to a Type**
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 25 };
const name = getProperty(person, "name"); // "Alice"
// const invalid = getProperty(person, "height"); // Error: Argument of type '"height"' is not assignable.
```

#### b. **Constrain to a Class or Interface**
```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
  console.log(arg.length);
}

logLength("Hello");      // 5 (string has a length property)
logLength([1, 2, 3]);    // 3 (array has a length property)
// logLength(42);        // Error: number does not have a length property
```

---

### 7. **Generic Utility Types**

#### a. **`Partial<T>`**
Makes all properties of `T` optional.
```typescript
interface User {
  id: number;
  name: string;
}

type PartialUser = Partial<User>;
// PartialUser = { id?: number; name?: string; }
```

#### b. **`Readonly<T>`**
Makes all properties of `T` readonly.
```typescript
type ReadonlyUser = Readonly<User>;
// ReadonlyUser = { readonly id: number; readonly name: string; }
```

#### c. **`Record<K, T>`**
Creates an object type with keys of type `K` and values of type `T`.
```typescript
type RecordExample = Record<string, number>;
// RecordExample = { [key: string]: number; }
```

---

### 8. **Generic with Default Types**

You can provide default types for generics.

#### Example
```typescript
interface Response<T = any> {
  data: T;
  status: number;
}

const response1: Response<string> = { data: "Success", status: 200 };
const response2: Response = { data: { id: 1 }, status: 200 }; // Defaults to `any`
```

---

### 9. **Advanced Examples**

#### a. **Generic with Conditional Types**
```typescript
type IsArray<T> = T extends any[] ? "array" : "not array";

type Test1 = IsArray<number[]>; // "array"
type Test2 = IsArray<string>;  // "not array"
```

#### b. **Generic Factories**
```typescript
function createInstance<T>(ctor: new () => T): T {
  return new ctor();
}

class Person {
  name = "John";
}

const person = createInstance(Person); // Person instance
```

---

### 10. **Common Use Cases**
- **Reusable Libraries**: Generic classes, functions, or interfaces for data manipulation.
- **Type-Safe APIs**: Ensure API responses are type-checked.
- **Custom Data Structures**: Stacks, queues, or trees with type constraints.
- **Code Simplification**: Replace repetitive type-specific code.

---

Generics make TypeScript highly flexible and powerful while ensuring robust type safety. By leveraging them effectively, you can write reusable and maintainable code for various applications.

---
In TypeScript, **conditional types** provide a way to express logic in type definitions. They allow you to define types that depend on other types. This is particularly powerful for creating flexible, reusable, and type-safe structures.

---

### 1. **Basic Syntax**
```typescript
T extends U ? X : Y
```

- **`T extends U`**: Checks if `T` is assignable to `U`.
- **`X`**: The type returned if the condition is true.
- **`Y`**: The type returned if the condition is false.

---

### 2. **Examples**

#### Example 1: Simple Conditional Type
```typescript
type IsString<T> = T extends string ? "yes" : "no";

type Test1 = IsString<string>; // "yes"
type Test2 = IsString<number>; // "no"
```

#### Example 2: Type Transformation
```typescript
type RemoveReadonly<T> = T extends ReadonlyArray<infer U> ? U[] : T;

type ReadonlyArrayType = ReadonlyArray<number>;
type Result = RemoveReadonly<ReadonlyArrayType>; // number[]
```

#### Example 3: Nested Conditional Types
```typescript
type CheckType<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : "unknown";

type Test1 = CheckType<42>;        // "number"
type Test2 = CheckType<"hello">;   // "string"
type Test3 = CheckType<true>;      // "boolean"
type Test4 = CheckType<null>;      // "unknown"
```

---

### 3. **Key Concepts**

#### a. **`infer` Keyword**
- Used in conditional types to infer part of the type.
- Example: Extracting the element type from an array.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : T;

type Test1 = ElementType<number[]>;   // number
type Test2 = ElementType<string[]>;  // string
type Test3 = ElementType<boolean>;   // boolean (fallback to T)
```

#### b. **Distributive Conditional Types**
When a conditional type is applied to a union, it is distributed across each member of the union.

```typescript
type Test<T> = T extends number ? "number" : "other";

type Result = Test<number | string>;
// Equivalent to:
// Test<number> | Test<string>
// Result = "number" | "other"
```

To disable distribution, wrap the type in a tuple:
```typescript
type NonDistributive<T> = [T] extends [number] ? "number" : "other";

type Result = NonDistributive<number | string>; // "other"
```

---

### 4. **Utility with Conditional Types**

Many built-in utility types in TypeScript use conditional types. 

#### a. **`Extract`**
Extracts types from a union that are assignable to a specified type.
```typescript
type Extracted = Extract<string | number | boolean, string | boolean>;
// Extracted = string | boolean
```

#### b. **`Exclude`**
Removes types from a union that are assignable to a specified type.
```typescript
type Excluded = Exclude<string | number | boolean, string | boolean>;
// Excluded = number
```

#### c. **`NonNullable`**
Removes `null` and `undefined` from a type.
```typescript
type NonNullableType = NonNullable<string | number | null | undefined>;
// NonNullableType = string | number
```

#### d. **`ReturnType`**
Extracts the return type of a function.
```typescript
type Fn = () => string;

type FnReturnType = ReturnType<Fn>; // string
```

#### e. **`InstanceType`**
Extracts the instance type of a class.
```typescript
class MyClass {
  constructor(public value: number) {}
}

type Instance = InstanceType<typeof MyClass>;
// Instance = MyClass
```

---

### 5. **Advanced Use Cases**

#### a. **Flattening Nested Arrays**
```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = number[][][];
type FlatArray = Flatten<NestedArray>; // number
```

#### b. **Mapping Properties Conditionally**
```typescript
type MakeOptional<T> = {
  [K in keyof T]?: T[K] extends string ? T[K] : never;
};

type User = {
  name: string;
  age: number;
};

type Result = MakeOptional<User>;
// Result = {
//   name?: string;
//   age?: never;
// }
```

#### c. **Deep Readonly**
```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Nested = {
  a: number;
  b: {
    c: string;
  };
};

type ReadonlyNested = DeepReadonly<Nested>;
// ReadonlyNested = {
//   readonly a: number;
//   readonly b: {
//     readonly c: string;
//   };
// }
```

---

### Summary

Conditional types are incredibly powerful and form the foundation of TypeScript's advanced type system. By combining them with features like `infer`, utility types, and mapped types, you can create highly dynamic, reusable, and type-safe solutions tailored to your application.

---
In TypeScript, the syntax `Array<T>` is a generic type for arrays, where `T` is the type of the elements in the array. TypeScript provides similar generic types for other collections and utilities. Below is a list of similar types and their purposes:

---

### 1. **`ReadonlyArray<T>`**
Represents an immutable array where the elements cannot be modified.

```typescript
const fruits: ReadonlyArray<string> = ["apple", "banana"];
// fruits.push("cherry"); // Error: Property 'push' does not exist on type 'ReadonlyArray<string>'
```

---

### 2. **`Tuple` Types**
Tuples represent fixed-size arrays with known types at specific positions.

```typescript
type Point = [number, number];
const point: Point = [10, 20];

// Access by index
console.log(point[0]); // 10
```

---

### 3. **`Set<T>`**
A collection of unique values.

```typescript
const uniqueNumbers: Set<number> = new Set([1, 2, 3]);
uniqueNumbers.add(4); // Adds 4 to the set
uniqueNumbers.has(2); // true
```

---

### 4. **`Map<K, V>`**
A collection of key-value pairs where keys can be of any type.

```typescript
const userRoles: Map<string, string> = new Map();
userRoles.set("Alice", "Admin");
userRoles.set("Bob", "User");

console.log(userRoles.get("Alice")); // "Admin"
```

---

### 5. **`WeakSet<T>`**
A collection of objects that doesn’t prevent garbage collection.

```typescript
const obj = { id: 1 };
const weakSet: WeakSet<object> = new WeakSet();
weakSet.add(obj);
```

---

### 6. **`WeakMap<K, V>`**
A map where keys are objects and entries can be garbage collected.

```typescript
const weakMap: WeakMap<object, string> = new WeakMap();
const key = {};
weakMap.set(key, "value");
```

---

### 7. **`Record<K, T>`**
An object type with keys of type `K` and values of type `T`.

```typescript
type UserRoles = Record<string, string>;
const roles: UserRoles = {
  admin: "Alice",
  user: "Bob",
};
```

---

### 8. **`Promise<T>`**
Represents a value that may be available now, or in the future, or never.

```typescript
function fetchData(): Promise<string> {
  return new Promise((resolve) => resolve("Data fetched"));
}

fetchData().then((data) => console.log(data)); // "Data fetched"
```

---

### 9. **`ReadonlyMap<K, V>` and `ReadonlySet<T>`**
Immutable versions of `Map<K, V>` and `Set<T>`.

```typescript
const readonlyMap: ReadonlyMap<string, string> = new Map([["key", "value"]]);
const readonlySet: ReadonlySet<number> = new Set([1, 2, 3]);
```

---

### 10. **`Partial<T>`**
Makes all properties in a type optional.

```typescript
interface User {
  name: string;
  age: number;
}

const partialUser: Partial<User> = { name: "Alice" };
```

---

### 11. **`Pick<T, K>`**
Creates a type by picking specific properties from another type.

```typescript
type User = { name: string; age: number; email: string };
type UserSummary = Pick<User, "name" | "email">;

const summary: UserSummary = { name: "Alice", email: "alice@example.com" };
```

---

### 12. **`Omit<T, K>`**
Creates a type by omitting specific properties from another type.

```typescript
type User = { name: string; age: number; email: string };
type WithoutEmail = Omit<User, "email">;

const user: WithoutEmail = { name: "Alice", age: 25 };
```

---

### 13. **`NonNullable<T>`**
Removes `null` and `undefined` from a type.

```typescript
type NullableString = string | null | undefined;
type NonNullableString = NonNullable<NullableString>; // string
```

---

### 14. **`Extract<T, U>`**
Extracts types from `T` that are assignable to `U`.

```typescript
type Mixed = string | number | boolean;
type StringsAndNumbers = Extract<Mixed, string | number>; // string | number
```

---

### 15. **`Exclude<T, U>`**
Removes types from `T` that are assignable to `U`.

```typescript
type Mixed = string | number | boolean;
type Excluded = Exclude<Mixed, boolean>; // string | number
```

---

### 16. **`ArrayLike<T>`**
An array-like object with a `length` property and indexed access.

```typescript
function printArrayLike(items: ArrayLike<string>): void {
  for (let i = 0; i < items.length; i++) {
    console.log(items[i]);
  }
}
```

---

### 17. **`ConstructorParameters<T>`**
Extracts the parameter types of a constructor.

```typescript
class Person {
  constructor(public name: string, public age: number) {}
}

type Params = ConstructorParameters<typeof Person>; // [string, number]
```

---

### Summary

- Use `Array<T>` or `T[]` for simple arrays.
- Leverage the other types (`Set`, `Map`, `Record`, etc.) for advanced use cases like collections, key-value stores, or immutability.
- Explore utility types like `Partial<T>`, `Omit<T>`, and `Extract<T>` for building flexible type-safe applications.

---
# GETTER & SETTER
```typescript
interface Ruler {
  get size(): number; // Getter: Returns a number
  set size(value: number | string); // Setter: Accepts a number or string
}
```
---
Control flow analysis in TypeScript is a feature that allows the TypeScript compiler to understand the flow of your code and infer types dynamically based on conditions, assignments, and other control structures. It enhances type safety and reduces the need for manual type assertions.

Here's a detailed breakdown of **control flow analysis**:

---

### **1. Basic Concept**
Control flow analysis tracks the possible types of variables and expressions as your code executes. Depending on conditions (`if`, `else`, `switch`, etc.), the TypeScript compiler refines the type of a variable at a specific point in the code.

#### Example:
```typescript
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows `value` is a string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows `value` is a number here
    console.log(value.toFixed(2));
  }
}
```

---

### **2. Type Narrowing**
TypeScript narrows the type of a variable based on checks like `typeof`, `instanceof`, equality checks, or custom type guards.

#### Using `typeof`:
```typescript
function print(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // `value` is a string
  } else if (typeof value === "number") {
    console.log(value.toFixed(2)); // `value` is a number
  } else {
    console.log(value); // `value` is a boolean
  }
}
```

#### Using `instanceof`:
```typescript
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function interactWithPet(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    pet.bark(); // TypeScript knows `pet` is a Dog
  } else {
    pet.meow(); // TypeScript knows `pet` is a Cat
  }
}
```

---

### **3. Discriminated Unions**
TypeScript can narrow types using a common discriminant property in union types.

#### Example:
```typescript
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number };

function calculateArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2; // `shape` is a circle
  } else {
    return shape.sideLength ** 2; // `shape` is a square
  }
}
```

Here, the `kind` property acts as a **discriminant** that TypeScript uses to narrow down the type.

---

### **4. Null and Undefined Checks**
TypeScript performs control flow analysis for nullable types (`null` or `undefined`).

#### Example:
```typescript
function printLength(str: string | null) {
  if (str !== null) {
    console.log(str.length); // TypeScript knows `str` is a string here
  } else {
    console.log("String is null");
  }
}
```

You can also use the **optional chaining operator (`?.`)** or the **non-null assertion operator (`!`)**:
```typescript
function printLengthSafe(str?: string) {
  console.log(str?.length); // Safely access `length` if `str` is defined
}
```

---

### **5. Exhaustiveness Checks**
Control flow analysis works with `never` types to ensure all cases in a union type are handled.

#### Example:
```typescript
type Animal = { kind: "dog" } | { kind: "cat" } | { kind: "bird" };

function handleAnimal(animal: Animal) {
  switch (animal.kind) {
    case "dog":
      console.log("Woof");
      break;
    case "cat":
      console.log("Meow");
      break;
    case "bird":
      console.log("Tweet");
      break;
    default:
      const _exhaustive: never = animal;
      throw new Error("Unhandled case: " + _exhaustive);
  }
}
```

If a new type is added to `Animal` but not handled in the `switch` statement, the compiler will throw an error.

---

### **6. Type Guards**
TypeScript allows you to define custom type guards for more complex narrowing.

#### Example:
```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}

function move(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal.swim(); // TypeScript knows `animal` is a Fish
  } else {
    animal.fly(); // TypeScript knows `animal` is a Bird
  }
}
```

---

### **7. Variable Reassignment**
TypeScript updates types based on variable reassignment within the flow of the code.

#### Example:
```typescript
function example(value: string | number) {
  value = 42; // Now `value` is a number
  console.log(value.toFixed(2)); // Safe to call number methods
}
```

---

### **8. Definite Assignment Analysis**
TypeScript performs control flow analysis to ensure that variables are assigned before they are used.

#### Example:
```typescript
let x: number;
if (Math.random() > 0.5) {
  x = 10; // Assigned here
}
console.log(x); // Error: Variable 'x' might be used before assignment
```

You can use the **definite assignment assertion (`!`)** to bypass this:
```typescript
let y!: number;
y = 20;
console.log(y); // Safe to use
```

---

### **9. Control Flow with Loops**
TypeScript tracks types even in loops.

#### Example:
```typescript
function sumNumbers(arr: (number | null)[]) {
  let sum = 0;
  for (const num of arr) {
    if (num !== null) {
      sum += num; // TypeScript knows `num` is a number
    }
  }
  return sum;
}
```

---

### **Benefits of Control Flow Analysis**
1. Reduces the need for explicit type annotations.
2. Increases code safety and helps catch runtime errors during compile time.
3. Makes TypeScript smarter and more intuitive for developers.

---

Let me know if you'd like further clarification or examples!