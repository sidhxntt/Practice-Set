## 🔹 1. Spark Memory Overview

Spark memory is **JVM memory**, divided mainly into **Executor Memory**, which is used for:

1. **Storage Memory:** for caching DataFrames, RDDs, and broadcast variables.
2. **Execution Memory:** for computations, shuffles, joins, aggregations, sorting, and intermediate results.
3. **User Memory & Overhead:** for Spark internal metadata, objects, and user code.

---

## 🔹 2. Memory Regions in Spark Executor

### 2.1 Unified Memory Management (Spark 1.6+)

* Spark uses a **unified memory pool**: storage and execution memory can borrow from each other dynamically.
* Total executor memory is split as:

```
Executor JVM Memory
│
├─ Spark Memory Pool (execution + storage)
│   ├─ Execution Memory
│   │    • Shuffle buffers
│   │    • Join buffers
│   │    • Sorts
│   │    • Aggregations
│   └─ Storage Memory
│        • Cached RDDs/DataFrames
│        • Broadcast variables
└─ User / Spark Overhead
     • Task objects
     • Metadata
     • Garbage collection overhead
```

---

### 2.2 Memory Fractions

Spark exposes configuration parameters to control memory:

| Config                         | Default | Purpose                                                           |
| ------------------------------ | ------- | ----------------------------------------------------------------- |
| `spark.executor.memory`        | 1g      | Total memory for an executor JVM                                  |
| `spark.memory.fraction`        | 0.6     | Fraction of JVM memory used for execution + storage (default 60%) |
| `spark.memory.storageFraction` | 0.5     | Fraction of memory fraction reserved for storage (default 50%)    |

**Example:**

If `executor.memory=10GB`, `memory.fraction=0.6` → 6GB used for Spark Memory Pool.

* Storage gets `50%` of 6GB → 3GB
* Execution can use remaining 3GB, plus any unused storage memory.

---

## 🔹 3. Storage Memory

* **What it stores:**

  * Cached DataFrames/RDDs (`.cache()` / `.persist()`)
  * Broadcast variables

* **Eviction Policy:**

  * If storage memory is full, Spark may **evict old cached blocks** to make room for new data.
  * Execution memory can borrow storage memory if needed (unified memory model).

* **Persistence Levels:**

| Level                 | Memory         | Disk | Description                                           |
| --------------------- | -------------- | ---- | ----------------------------------------------------- |
| `MEMORY_ONLY`         | ✅              | ❌    | Keep full RDD/DataFrame in memory                     |
| `MEMORY_AND_DISK`     | ✅              | ✅    | Spill to disk if memory is insufficient               |
| `DISK_ONLY`           | ❌              | ✅    | Store only on disk                                    |
| `MEMORY_ONLY_SER`     | ✅ (serialized) | ❌    | Compressed memory storage (less memory, CPU overhead) |
| `MEMORY_AND_DISK_SER` | ✅              | ✅    | Spill serialized to disk                              |

---

## 🔹 4. Execution Memory

* Used for **shuffles, joins, aggregations, sorts, and scans**.

* Tasks allocate buffers dynamically for computation.

* **Spill to Disk:**

  * If a task requires more memory than available, Spark **spills intermediate data to disk** (slower than memory).

* **Shuffle Buffers:**

  * Temporary memory to store data moving between stages (e.g., groupBy, join).
  * Controlled by `spark.shuffle.file.buffer` and `spark.reducer.maxSizeInFlight`.

* **Sort / Join Buffers:**

  * Sort memory for `orderBy`
  * Join memory for `hash joins`

---

## 🔹 5. Broadcast Variables

* Broadcast variables are sent to all Executors.
* Stored in **Storage Memory**, shared by multiple tasks to avoid sending the same data repeatedly.
* **Optimized via Tungsten:** serialized in a compact format for low memory usage.

---

## 🔹 6. Memory Management in Tasks

* Each task is allocated **task-level memory** within the executor.
* Task memory includes **execution buffers** for shuffles, joins, sorting, and aggregations.
* If multiple tasks run per executor, they **share the executor memory pool**.

---

## 🔹 7. Common Memory-related Issues

| Issue                  | Cause                                                          | Solution                                                           |
| ---------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------ |
| `OutOfMemoryError`     | Large DataFrame, many partitions, insufficient executor memory | Increase `spark.executor.memory`                                   |
| Shuffle spill to disk  | Not enough execution memory for shuffle                        | Increase `spark.memory.fraction` or `spark.sql.shuffle.partitions` |
| GC overhead            | Too many small objects / serialized data                       | Use Tungsten serialized storage, coalesce partitions               |
| Uneven partition sizes | Skewed data                                                    | Repartition or use salting                                         |

---

## 🔹 8. Summary / Best Practices

1. **Cache only what you need** (`.cache()`, `.persist()`).
2. **Monitor storage vs execution usage**: `spark.memory.fraction` & `spark.memory.storageFraction`.
3. **Avoid very large partitions**; use `repartition()` or `coalesce()`.
4. **Use serialized caching** for large datasets (`MEMORY_ONLY_SER`).
5. **Optimize shuffle-heavy operations**: fewer partitions, broadcast joins for small tables.
6. **Tune number of cores per executor** to balance parallelism vs memory per task.

---

💡 **Analogy (Kitchen):**

* **Executor memory** = kitchen counter space + storage pantry.
* **Execution memory** = counter space used while chopping, mixing, and cooking ingredients.
* **Storage memory** = pantry shelves for cached ingredients (cached RDDs).
* **Memory spilling** = if counter is full, temporarily put ingredients on the floor (disk).

---

## 🔹 Spark Executor Memory Layout (Diagram)

```
+-----------------------------------------------------+
|                 Executor JVM Memory                |
|-----------------------------------------------------|
|  User Memory & Overhead                              |
|  • Spark metadata, objects, task bookkeeping       |
|  • JVM overhead (GC, internal structures)          |
|-----------------------------------------------------|
|                 Spark Memory Pool                  |
|-----------------------------------------------------|
|  Execution Memory  |  Storage Memory               |
|  (for shuffles,    |  (cached RDDs/DataFrames,    |
|   joins, sorts,    |   broadcast variables)       |
|   aggregations)    |                               |
|--------------------+------------------------------|
| Task 1 Buffers      |                              |
| Task 2 Buffers      |                              |
| Task N Buffers      |                              |
| (each task dynamically shares execution memory)   |
|-----------------------------------------------------|
|  Spilled Data (Disk) if memory insufficient       |
|  • Shuffle spills                                   |
|  • Execution spills                                 |
+-----------------------------------------------------+
```

