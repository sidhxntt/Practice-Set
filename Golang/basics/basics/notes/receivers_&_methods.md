In Go, **receivers** are how you attach **methods** to types.
They are Go’s replacement for “methods on objects” in OOP languages.

---

## What is a receiver?

A **receiver** is the extra parameter that appears **before the function name** in a method definition.

```go
func (r ReceiverType) MethodName() {
	// ...
}
```

Example:

```go
type User struct {
	Name string
	Age  int
}

func (u User) Greet() string {
	return "Hello " + u.Name
}
```

Usage:

```go
u := User{Name: "Alice"}
fmt.Println(u.Greet())
```

---

## Value receiver vs Pointer receiver (VERY IMPORTANT)

### 1️⃣ Value receiver

```go
func (u User) Birthday() {
	u.Age++
}
```

```go
u := User{Age: 20}
u.Birthday()
fmt.Println(u.Age) // 20 ❌
```

Why?
Because `u` is **copied**.

---

### 2️⃣ Pointer receiver

```go
func (u *User) Birthday() {
	u.Age++
}
```

```go
u := User{Age: 20}
u.Birthday()
fmt.Println(u.Age) // 21 ✅
```

Now the method modifies the original struct.

---

## When to use which?

### Use **pointer receivers** when:

* The method modifies the receiver
* The struct is large (avoid copying)
* You want consistency

### Use **value receivers** when:

* The method does not modify data
* The type is small and immutable

👉 **Most Go code uses pointer receivers by default.**

---

## Go automatically handles `&` and `*`

```go
u := User{}
u.Birthday()     // Go uses &u automatically
(&u).Greet()     // Also works
```

You don’t need to worry about calling style.

---

## Receiver naming conventions

```go
func (u User) Greet() {}
```

* Short (1–2 letters)
* Usually first letter of type
* No `this` or `self` keyword in Go

---

## Receivers are NOT classes

Important differences:

❌ No inheritance
❌ No constructors
❌ No method overloading

But Go supports:
✅ Composition
✅ Interfaces
✅ Method sets

---

## Methods on non-struct types

You can define methods on **any named type**:

```go
type MyInt int

func (m MyInt) Double() int {
	return int(m * 2)
}
```

---

## Receivers + interfaces (powerful combo)

```go
type Speaker interface {
	Speak() string
}

func (u User) Speak() string {
	return "Hi, I'm " + u.Name
}
```

Now `User` implements `Speaker` automatically.

---

## Method sets (advanced but useful)

* Value receiver methods belong to both `T` and `*T`
* Pointer receiver methods belong **only to `*T`**

```go
type User struct{}

func (User) A() {}
func (*User) B() {}
```

* `User` has method `A`
* `*User` has methods `A` and `B`

---

## Mental model

> **Receiver = method’s “owner”**

---

## TL;DR

* Receivers attach methods to types
* Use pointer receivers to modify data
* Go handles pointer conversions automatically
* Receivers + interfaces = Go’s OOP

