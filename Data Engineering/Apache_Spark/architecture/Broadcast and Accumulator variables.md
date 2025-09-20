# 🔹 1️⃣ Broadcast Variables

**Definition:**

* Read-only variables that are **cached on each executor**.
* Spark **sends them to all nodes only once**, instead of shipping them with every task.

**Use Case:**

* Large lookup tables or reference data used in many tasks (e.g., a dictionary of country codes).

**How it Works:**

1. You create a broadcast variable in the Driver:

```python
broadcast_var = spark.sparkContext.broadcast({"US": "United States", "IN": "India"})
```

2. Executors access the **local copy**:

```python
rdd = sc.parallelize(["US", "IN", "US"])
rdd.map(lambda x: broadcast_var.value[x]).collect()
# Output: ['United States', 'India', 'United States']
```

**Key Points:**

* **Immutable**: Executors can’t modify it.
* **Optimizes network usage**: Only sent once to each node.
* **Useful for joins** with small lookup datasets.

---

# 🔹 2️⃣ Accumulator Variables

**Definition:**

* **Write-only variables** used for aggregating information **across tasks**.
* Only the **Driver can read** the final value.

**Use Case:**

* Counting errors, monitoring progress, logging statistics during distributed processing.

**How it Works:**

1. Create an accumulator in the Driver:

```python
accum = spark.sparkContext.accumulator(0)
```

2. Update in tasks:

```python
rdd = sc.parallelize([1, 2, 3, 4, 5])
rdd.foreach(lambda x: accum.add(x))
```

3. Driver reads the final value:

```python
print(accum.value)
# Output: 15
```

**Key Points:**

* Executors can **only add/update**; they can’t read the value.
* **Driver can read** after the tasks complete.
* Useful for **global counters** in distributed jobs.

---

# 🔹 Difference Between Broadcast and Accumulator

| Feature    | Broadcast                   | Accumulator                   |
| ---------- | --------------------------- | ----------------------------- |
| Direction  | Driver → Executors          | Executors → Driver            |
| Mutability | Read-only (on Executors)    | Write-only (on Executors)     |
| Use Case   | Large lookup/reference data | Counters, metrics, statistics |
| Example    | Lookup table, config        | Count errors, sum values      |

---

# 🔹 Analogy

* **Broadcast** = Chef shares a master recipe with all cooking stations (immutable, everyone reads).
* **Accumulator** = Each station adds the number of chopped onions to a shared counter (write-only), head chef reads the total at the end.

---

✅ **Key takeaway:**

* **Broadcast** → efficiently share read-only data across all nodes.
* **Accumulator** → aggregate information from distributed tasks back to the Driver.
