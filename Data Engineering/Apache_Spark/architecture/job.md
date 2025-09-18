## 🔹 What is a Spark Job?

A **Spark Job** is the **unit of work** that Spark executes when an **action** is called on a DataFrame, RDD, or SQL query.

* Every action (`.count()`, `.collect()`, `.save()`) triggers **a job**.
* A job consists of **one or more stages**, each divided into **tasks** executed on partitions of the data by **Executors**.
* Jobs are coordinated by the **Driver**.

---

### 🔹 How Jobs Are Created

1. **Define transformations (lazy operations):**

```python
df = spark.read.csv("people.csv", header=True, inferSchema=True)
df_filtered = df.filter(df.age > 30)
```

* **Nothing executes yet**. Spark builds a **DAG (Directed Acyclic Graph)** representing the computation.
* **Catalyst optimizer** plans the most efficient execution strategy.

2. **Call an action:**

```python
count = df_filtered.count()
```

* Triggers **Job 1**.
* DAG is split into **Job → Stages → Tasks**, assigned to **Executors**.
* Executors process partitions, results are sent back to the **Driver**, and the action returns the final result.

---

### 🔹 Jobs → Stages → Tasks

* **Job:** Triggered by an action.
* **Stage:** Computation between shuffle boundaries (narrow transformations → same stage, wide → new stage).
* **Task:** Unit of work for **one partition**, executed by an executor.

**Example:**

```python
df.groupBy("department").count().show()
```

* `show()` → Job 1
* Stage 1: Read CSV, parse partitions
* Stage 2: GroupBy & shuffle data
* Executors run tasks → partial results → Driver combines → prints output

---

### 🔹 Key Points

| Operation | Lazy/Immediate | Result                                             |
| --------- | -------------- | -------------------------------------------------- |
| `filter`  | Lazy           | DAG/logical plan (no execution)                    |
| `count`   | Action         | Triggers Job → Stages → Tasks → Executors → result |

---

### 🔹 Analogy (Chef)

* **Driver** = head chef

* **Job** = the whole meal ordered

* **Stage** = a cooking step (preparing, cooking, plating)

* **Task** = a cook handling a portion of ingredients (partition)

* **Executors** = kitchen stations executing tasks

* **filter** = chef notes: *“use onions >3cm”* (no cooking yet)

* **count** = chef: *“process all and tell me how many onions match”* → kitchen executes, result comes back
