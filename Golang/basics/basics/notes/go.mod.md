`go.mod` is the **module definition file** in Go.
It tells Go **what your project is**, **what it depends on**, and **which Go version it targets**.

Think of it as Go’s equivalent of:

* `package.json` (Node.js)
* `requirements.txt` / `pyproject.toml` (Python)
* `pom.xml` (Java)

---

## What is a Go module?

A **module** is:

* A collection of Go packages
* Versioned together
* Identified by a **module path**

📦 A module usually lives in a **single repository**.

---

## What does `go.mod` do?

`go.mod` answers these questions:

1. **What is the module name?**
2. **Which Go version is required?**
3. **What external dependencies does this project use?**
4. **Which versions of those dependencies?**

---

## Example `go.mod`

```go
module basics

go 1.22

require (
	golang.org/x/text v0.14.0
)
```

### Breakdown

### 1. `module basics`

* This is the **module path**
* Used in imports:

```go
import "basics/modules"
```

If this were on GitHub:

```go
module github.com/yourname/basics
```

---

### 2. `go 1.22`

* Minimum Go version for this module
* Helps Go tools choose correct language behavior

---

### 3. `require`

* Lists **dependencies**
* Each dependency has an exact version

---

## How `go.mod` relates to packages

Important distinction:

| Concept     | Purpose                             |
| ----------- | ----------------------------------- |
| **module**  | Versioned unit of code              |
| **package** | Code organization inside the module |

Example:

```
module basics
│
├── main.go          → package main
├── modules/         → package modules
│   ├── basics1.go
│   └── flow_control.go
```

Import path format:

```
<module-name>/<folder>
```

```go
import "basics/modules"
```

---

## How `go.mod` is created

Run this **once** in your project root:

```bash
go mod init basics
```

This creates:

* `go.mod`
* (later) `go.sum`

---

## What is `go.sum`?

* Auto-generated file
* Stores **checksums** of dependencies
* Ensures dependency integrity
* You **commit it to git**

You never edit `go.sum` manually.

---

## Common `go mod` commands

```bash
go mod init <name>   // create go.mod
go mod tidy          // add/remove dependencies automatically
go mod download      // download dependencies
go list -m all       // list modules
```

---

## Why Go uses modules (instead of GOPATH)

Before modules:

* Code had to live inside `$GOPATH`
* Dependency management was painful

With modules:

* Project can live **anywhere**
* Dependencies are versioned
* Reproducible builds

---

## Key rules to remember

* `go.mod` lives at the **root of the module**
* Imports start with the **module name**
* One repository can have **multiple modules** (advanced)
* Go tools automatically manage dependencies

---

## TL;DR

* `go.mod` defines your Go project
* It names your module
* Tracks Go version
* Locks dependency versions
* Required for modern Go development

