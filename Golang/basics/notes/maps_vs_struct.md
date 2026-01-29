In Go, **`map`** and **`struct`** can both hold key–value–like data, but they are used for **very different purposes**.
This is a *core design decision* in Go.

---

## One-line rule (remember this)

> **Use `struct` for known, fixed data.
> Use `map` for dynamic, unknown data.**

---

## Struct in Go

### What it is

* A **fixed, typed data structure**
* Field names and types are known at compile time

```go
type User struct {
	Name string
	Age  int
}
```

Usage:

```go
u := User{Name: "Alice", Age: 30}
fmt.Println(u.Name)
```

---

### Struct characteristics

✅ Compile-time safety
✅ Fast field access
✅ Autocomplete & documentation
✅ Can have methods
❌ Cannot add/remove fields dynamically

---

## Map in Go

### What it is

* A **dynamic key–value store**
* Keys and values decided at runtime

```go
user := map[string]any{
	"name": "Alice",
	"age":  30,
}
```

Usage:

```go
fmt.Println(user["name"])
```

---

### Map characteristics

✅ Dynamic keys
✅ Good for flexible data
❌ No compile-time field checking
❌ Slower than struct
❌ No methods tied to keys

---

## Side-by-side comparison

| Feature                      | Struct | Map    |
| ---------------------------- | ------ | ------ |
| Fields known at compile time | ✅      | ❌      |
| Type safety                  | ✅      | ❌      |
| Performance                  | Faster | Slower |
| IDE autocomplete             | ✅      | ❌      |
| Can define methods           | ✅      | ❌      |
| JSON schema enforcement      | ✅      | ❌      |
| Dynamic keys                 | ❌      | ✅      |

---

## Example: user data

### Struct (preferred)

```go
type User struct {
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Email string `json:"email"`
}
```

Why this is better:

* Clear schema
* Safer refactors
* Self-documenting

---

### Map (when schema is unknown)

```go
user := map[string]any{}
user["name"] = "Alice"
user["age"] = 30
user["email"] = "a@b.com"
```

Good for:

* Unstructured JSON
* Metadata
* Config blobs

---

## JSON example (very common use case)

### Known JSON → struct

```go
var u User
json.Unmarshal(data, &u)
```

### Unknown JSON → map

```go
var m map[string]any
json.Unmarshal(data, &m)
```

---

## Mutability & semantics

### Struct

```go
u1 := u
u1.Age = 40
```

➡️ `u` is unchanged (value semantics)

### Map

```go
m2 := m
m2["age"] = 40
```

➡️ `m` is changed (reference semantics)

---

## When beginners misuse maps ❌

❌ Using map as a “struct replacement”
❌ Storing strongly typed data in `map[string]any`
❌ Losing compiler guarantees

```go
// Bad
user["age"] = "thirty" // compiles, breaks later
```

---

## When maps are the right tool ✅

* Caches
* Lookup tables
* Counters
* Grouping data
* Unknown or user-defined keys

```go
counts := map[string]int{}
counts["apple"]++
```

---

## Mental model

> **Struct = schema**
> **Map = dictionary**

---

## TL;DR

* Use **structs** for modeling real data
* Use **maps** for dynamic associations
* Prefer structs whenever possible
* Maps trade safety for flexibility


