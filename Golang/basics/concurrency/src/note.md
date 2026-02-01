Great observation — this is a **classic goroutines “gotcha”**, and noticing it means you’re understanding concurrency 👍

---

## Your code (simplified)

```go
func ExampleGoroutines1() {
	go greeter1("Sid")
	go greeter1("Pri")
}
```

You expect:

> “No synchronization → nothing should print”

But you **sometimes see `Pri` printed** (or `Sid`, or both).

---

## Why does this happen?

### Key rule (very important)

> **“Without synchronization” does NOT mean “will never run”**
> It means **“non-deterministic”**

---

## What actually happens at runtime

1. `go greeter1("Sid")` is scheduled
2. `go greeter1("Pri")` is scheduled
3. `ExampleGoroutines1()` returns
4. `main()` *might* continue for a tiny bit
5. Go scheduler *might* run one goroutine
6. Program exits

Whether a goroutine runs **depends on timing**.

---

## Why you see `Pri` printed specifically

Because of **scheduler timing**, not logic.

Possible sequence:

```
main goroutine
│
├─ go greeter1("Sid")  (scheduled, not run yet)
├─ go greeter1("Pri")  (scheduled, RUNS immediately)
│    └─ prints "Pri"
└─ program exits → Sid never runs
```

The scheduler got a chance to run **one goroutine before exit**.

Next run might print:

* nothing
* only `Sid`
* both
* different order

---

## Important misconception to fix 🧠

❌ “Goroutines won’t run without WaitGroup”
✔️ “Goroutines may or may not run without WaitGroup”

---

## Why this happens even on a single core

Even with:

```go
GOMAXPROCS = 1
```

Go still **time-slices** execution:

* main goroutine
* other goroutines

---

## Demo to prove non-determinism

Run this multiple times:

```go
func main() {
	for i := 0; i < 5; i++ {
		go fmt.Println(i)
	}
}
```

You’ll get different output every run.

---

## The only guarantee

> When `main()` returns → program terminates → all goroutines die

Everything before that is **best-effort scheduling**.

---

## How to make behavior deterministic (correct way)

### WaitGroup

```go
var wg sync.WaitGroup

wg.Add(2)
go greeter1("Sid", &wg)
go greeter1("Pri", &wg)

wg.Wait()
```

---

## Mental model (remember this)

🎯 **Goroutines are like sparks**

* They may light
* They may not
* Unless you *wait* for them

---

## TL;DR

* You see `Pri` printed because the scheduler ran it **before program exit**
* This is **expected, correct, and non-deterministic**
* Never rely on this behavior
* Always synchronize goroutines you care about
