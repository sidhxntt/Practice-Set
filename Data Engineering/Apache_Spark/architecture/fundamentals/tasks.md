## 🔹 What is a Spark Task?

* A **task** is the **smallest unit of work** in Spark.
* Each task **processes one partition of data**.
* Tasks are **executed by Executors** on worker nodes.
* Many tasks together form a **Stage**.

---

## 🔹 Key Points About Tasks

1. **One Task = One Partition**

   * If a stage has 8 partitions → Spark will create 8 tasks.

2. **Task Execution**

   * Tasks run in **parallel** on executors (depending on the number of cores).
   * Each task reads its partition, applies transformations, and produces results.

3. **Task Lifecycle**

   * **Scheduled by Driver** → Executor picks task → executes → result sent to Driver or stored locally.
   * If a task fails → Driver can **retry the task** (fault tolerance).

4. **Task Types**

   * **ShuffleMapTask** → Prepares data for shuffle (produces shuffle files)
   * **ResultTask** → Computes final output for an action (like `count` or `collect`)

---

## 🔹 Example

```python
df = spark.read.csv("people.csv", header=True, inferSchema=True)
df_filtered = df.filter(df.age > 30)
df_filtered.groupBy("city").count().show()
```

* **Stage 1 (Read + Filter):**

  * Partition 1 → Task 1
  * Partition 2 → Task 2
  * Partition 3 → Task 3

* **Stage 2 (GroupBy + Count / Shuffle):**

  * City A → Task 1
  * City B → Task 2
  * City C → Task 3

---

## 🔹 Analogy (Cooking)

* **Stage** = a cooking step (e.g., chopping, mixing)
* **Task** = a chef handling **one portion of ingredients** (partition)
* **Executors** = kitchen stations executing tasks

---

✅ **Key takeaway:**

* **Task = smallest unit of execution in Spark.**
* Each task works on **one partition**, runs in parallel, and contributes to the overall stage/job result.
