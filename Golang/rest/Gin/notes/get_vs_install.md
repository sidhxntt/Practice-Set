This is an **important Go concept** and often asked in interviews.
Short version:

> **`go get` manages dependencies**
> **`go install` installs binaries**

Let’s break it down clearly 👇

---

## `go get` (Dependency management)

### What it does

* **Adds / updates dependencies** in `go.mod` and `go.sum`
* Downloads packages into the module cache
* **May install binaries (pre-Go 1.17)**

### Example

```bash
go get github.com/gin-gonic/gin
```

Effects:

* Updates `go.mod`
* Updates `go.sum`
* Fetches the library for your project

### Modern usage (Go 1.17+)

```bash
go get github.com/gin-gonic/gin@v1.9.1
```

Use `go get` **only when you want to change project dependencies**.

---

## `go install` (Binary installation)

### What it does

* **Builds and installs executables**
* Does **NOT** modify `go.mod` or `go.sum`
* Installs binary into:

  ```
  $GOPATH/bin
  ```

### Example

```bash
go install github.com/air-verse/air@latest
```

Used for:

* CLI tools
* Dev utilities
* Formatters, linters, reloaders

---

## Why Go split them (Go 1.17+) 🧠

Before Go 1.17:

* `go get` did **too many things**
* Caused accidental dependency changes

Now:

* `go get` → **dependencies**
* `go install` → **tools**

This separation makes builds:

* Safer
* Reproducible
* More predictable

---

## Side-by-side comparison

| Feature            | `go get`          | `go install` |
| ------------------ | ----------------- | ------------ |
| Modifies `go.mod`  | ✅ Yes             | ❌ No         |
| Installs binary    | ⚠️ (old behavior) | ✅ Yes        |
| Used for libraries | ✅ Yes             | ❌ No         |
| Used for CLI tools | ❌ No              | ✅ Yes        |
| Requires version   | Optional          | ✅ Required   |

---

## Common mistake ❌

```bash
go get github.com/air-verse/air
```

❌ This will pollute `go.mod`

Correct:

```bash
go install github.com/air-verse/air@latest
```

---

## Rule of thumb 🔑

> 📦 **Libraries → `go get`**
> 🛠 **Tools → `go install`**

---

## Interview one-liner 🎯

> “Since Go 1.17, `go get` is only for dependency management, while `go install` is used to install binaries without affecting `go.mod`.”

