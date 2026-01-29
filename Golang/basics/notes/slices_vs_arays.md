In Go, **arrays** and **slices** are related but very different in how you use them.
If you come from JS or Python, **slices are what you’ll use 95% of the time**.

---

## Quick summary

| Feature              | Array             | Slice                       |
| -------------------- | ----------------- | --------------------------- |
| Size                 | Fixed             | Dynamic                     |
| Type includes length | ✅ Yes             | ❌ No                        |
| Resizable            | ❌ No              | ✅ Yes                       |
| Commonly used        | ❌ Rare            | ✅ Very common               |
| Passed to functions  | By value (copied) | Descriptor (reference-like) |

---

## Arrays in Go

### Definition

```go
var a [3]int
```

or

```go
a := [3]int{1, 2, 3}
```

### Key points

* Length is part of the **type**
* `[3]int` ≠ `[4]int`
* Cannot grow or shrink

```go
a[0] = 10
// a = append(a, 4) // ❌ compile error
```

### Arrays are copied

```go
func change(a [3]int) {
	a[0] = 99
}

x := [3]int{1, 2, 3}
change(x)
fmt.Println(x) // [1 2 3]
```

---

## Slices in Go (the important one)

### Definition

```go
var s []int
```

or

```go
s := []int{1, 2, 3}
```

### Dynamic size

```go
s = append(s, 4, 5)
```

### Passed by reference (sort of)

```go
func change(s []int) {
	s[0] = 99
}

x := []int{1, 2, 3}
change(x)
fmt.Println(x) // [99 2 3]
```

---

## Slice internals (important concept)

A slice is a **descriptor**:

```go
type slice struct {
	pointer *T
	len     int
	cap     int
}
```

* Points to an underlying array
* Multiple slices can share the same array

---

## Slicing an array or slice

```go
a := [5]int{1, 2, 3, 4, 5}
s := a[1:4] // [2 3 4]
```

This **shares memory**:

```go
s[0] = 99
fmt.Println(a) // [1 99 3 4 5]
```

---

## `len` vs `cap`

```go
s := make([]int, 2, 5)

len(s) // 2 → usable elements
cap(s) // 5 → total space
```

Appending beyond capacity creates a **new array**.

---

## When to use arrays (rare cases)

Use arrays when:

* Size is known and fixed
* You want value semantics
* You’re doing low-level or performance-critical code

Example:

```go
type SHA256 [32]byte
```

---

## When to use slices (almost always)

Use slices when:

* You need dynamic size
* Passing collections to functions
* Working with lists, queues, stacks

Slices ≈ JS arrays / Python lists

---

## Common beginner mistakes

❌ Using arrays when you want slices
❌ Forgetting that slices share memory
❌ Assuming `append` modifies the original slice always

Correct pattern:

```go
s = append(s, x)
```

---

## Mental model

> **Array** = fixed-size value
> **Slice** = window over an array

---

## TL;DR

* Arrays are fixed and copied
* Slices are dynamic and reference-like
* Use slices unless you have a very good reason not to
