In Go (Golang), **packages** are the primary way you organize, reuse, and encapsulate code. They’re a core part of how Go programs are structured.

---

## What is a Go package?

A **package** is a collection of Go source files in the same directory that:

* Share the same `package` name
* Are compiled together
* Expose (or hide) identifiers to other packages

Every Go program is made up of one or more packages.

---

## The `main` package

* `package main` is **special**
* It defines an executable program
* It must contain a `main()` function

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

If a package is **not** `main`, it builds into a library, not an executable.

---

## Package declaration

Every Go file starts with a package declaration:

```go
package mathutils
```

All `.go` files in the same directory must use the **same package name**.

---

## Importing packages

You use the `import` keyword to access other packages:

```go
import "fmt"
```

Multiple imports:

```go
import (
    "fmt"
    "math"
)
```

Custom (local or module) packages:

```go
import "github.com/user/project/mathutils"
```

---

## Exported vs unexported identifiers

Go controls visibility using **capitalization**.

### Exported (public)

* Start with a capital letter
* Accessible from other packages

```go
func Add(a, b int) int {
    return a + b
}
```

### Unexported (private)

* Start with a lowercase letter
* Only accessible within the same package

```go
func addInternal(a, b int) int {
    return a + b
}
```

---

## Example: custom package

### Directory structure

```
project/
├── go.mod
├── main.go
└── mathutils/
    └── mathutils.go
```

### `mathutils/mathutils.go`

```go
package mathutils

func Add(a, b int) int {
    return a + b
}
```

### `main.go`

```go
package main

import (
    "fmt"
    "project/mathutils"
)

func main() {
    result := mathutils.Add(2, 3)
    fmt.Println(result)
}
```

---

## Package name vs folder name

* Usually the same, but **not required**
* Import path uses the **folder name**
* Code refers to the **package name**

```go
// folder: utils
package helpers
```

Imported as:

```go
import "project/utils"
```

Used as:

```go
helpers.SomeFunc()
```

---

## The `init()` function

* Optional
* Runs automatically when the package is imported
* Runs **before `main()`**

```go
func init() {
    fmt.Println("package initialized")
}
```

Use sparingly (often for setup or registration).

---

## Standard library packages

Go comes with many built-in packages:

* `fmt` – formatting & printing
* `net/http` – web servers & clients
* `os` – OS interaction
* `time` – time utilities
* `sync` – concurrency primitives

Example:

```go
import "net/http"
```

---

## Key rules to remember

* One directory = one package
* Package name declared at top of each file
* Capitalized names are exported
* `main` package creates executables
* `init()` runs automatically on import

---

