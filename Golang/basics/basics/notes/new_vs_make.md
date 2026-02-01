**`make` vs `new` in Go (brief):**

### `new`

* Allocates **zeroed memory** for a type.
* Returns a **pointer** to that type.
* Works with **any type**.

```go
p := new(int)   // *int, value is 0
```

### `make`

* Allocates and **initializes** built-in reference types.
* Returns the **value**, not a pointer.
* Only for **slice, map, channel**.

```go
s := make([]int, 5)      // slice with length 5
m := make(map[string]int)
c := make(chan int)
```

### Key difference

* Use **`new`** when you want a pointer to a zero value.
* Use **`make`** when you need a usable slice, map, or channel.
