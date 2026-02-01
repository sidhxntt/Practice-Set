This is a **great question**—and it gets to the heart of how Go’s dependency system works.

Short answer:

> **Go *does* have an equivalent of `package.json` / `requirements.txt`:
> `go.mod` and `go.sum`.**

They just work **very differently** (and more automatically).

---

## 1️⃣ `go.mod` = dependency manifest (like `package.json`)

Example:

```go
module github.com/you/myapp

go 1.22

require (
	github.com/gin-gonic/gin v1.9.1
	github.com/jackc/pgx/v5 v5.5.0
)
```

This file:

* Lists **all direct dependencies**
* Pins **exact versions**
* Is committed to Git

➡️ This is the **source of truth**.

---

## 2️⃣ `go.sum` = dependency lockfile (like `package-lock.json`)

Example:

```txt
github.com/gin-gonic/gin v1.9.1 h1:...
github.com/gin-gonic/gin v1.9.1/go.mod h1:...
```

This file:

* Stores **cryptographic hashes**
* Verifies dependency integrity
* Locks **transitive dependencies**

➡️ Prevents “works on my machine” issues.

---

## 3️⃣ How dependencies get installed on another system 🚀

On a fresh machine:

```bash
git clone repo
cd repo
go mod download
```

Or simply:

```bash
go run .
# or
go build
```

Go will:

1. Read `go.mod`
2. Resolve versions
3. Download dependencies automatically
4. Verify hashes using `go.sum`

📦 Dependencies are stored in:

```
$GOMODCACHE
# usually: $GOPATH/pkg/mod
```

No manual install step needed.

---

## 4️⃣ Why Go doesn’t need `npm install` / `pip install`

In Go:

* Dependency resolution is **build-time**
* Modules are **global & cached**
* No virtual environments
* No per-project `node_modules`

This makes:

* Builds faster
* Disk usage lower
* CI simpler

---

## 5️⃣ Adding dependencies (developer side)

```bash
go get github.com/gin-gonic/gin@latest
```

This:

* Updates `go.mod`
* Updates `go.sum`

Commit both files.

---

## 6️⃣ Removing unused dependencies

```bash
go mod tidy
```

* Removes unused deps
* Adds missing ones
* Cleans `go.sum`

This is like:

* `npm prune`
* `pip freeze` + cleanup

---

## 7️⃣ Tools vs dependencies (important distinction)

| Type                     | Stored in `go.mod`? |
| ------------------------ | ------------------- |
| App libraries            | ✅ Yes               |
| Runtime deps             | ✅ Yes               |
| CLI tools (Air, linters) | ❌ No                |

Tools are installed via:

```bash
go install tool@version
```

(Optional: pin them using a `tools.go` file.)

---

## 8️⃣ Interview-ready explanation 🎯

> “Go uses `go.mod` and `go.sum` as its dependency manifest and lockfile. When someone clones the repo and runs `go build` or `go run`, Go automatically installs the exact dependency versions—no separate install step needed.”

---

## 9️⃣ Mental model 🧠

| Ecosystem | Dependency files                     |
| --------- | ------------------------------------ |
| Node.js   | `package.json` + `package-lock.json` |
| Python    | `requirements.txt` / `poetry.lock`   |
| Go        | `go.mod` + `go.sum`                  |

---

## 🔑 Final takeaway

> **Go doesn’t skip dependency management—it automates it.**

