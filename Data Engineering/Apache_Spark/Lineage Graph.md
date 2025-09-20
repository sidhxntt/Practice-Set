# 🔹 What is a Lineage Graph?

* A **Lineage Graph** is a **record of all the transformations applied to an RDD** (or DataFrame).
* Spark keeps track of **how each RDD was derived from others**, i.e., its **ancestry**.
* It is used to **recompute lost partitions** in case of failure.

Think of it as a **recipe or blueprint of how the data was created**.

---

## 🔹 Why Lineage Graph is Important

1. **Fault Tolerance**

   * If an **executor or partition fails**, Spark doesn’t need to reload the entire dataset.
   * It uses the **lineage** to recompute only the missing partitions.

2. **Lazy Evaluation**

   * Transformations are **not executed immediately**.
   * Lineage tracks all the transformations in a DAG.
   * Action triggers execution based on the lineage graph.

3. **No Data Replication Required**

   * Unlike Hadoop HDFS which replicates data blocks, Spark **recomputes lost data using lineage**, saving memory and storage.

---

## 🔹 How Lineage Graph Works

Example:

```python
rdd1 = sc.textFile("people.txt")
rdd2 = rdd1.filter(lambda x: "30" in x)
rdd3 = rdd2.map(lambda x: x.split(",")[0])
rdd3.collect()
```

**Lineage Graph:**

```
rdd3
  |
 map (extract name)
  |
rdd2
  |
 filter (age=30)
  |
rdd1
  |
 textFile("people.txt")
```

* Each RDD knows **how it was derived from its parent**.
* If a partition of `rdd3` is lost, Spark recomputes it by **going back through the lineage**:
  `rdd1 → rdd2 → rdd3`.

---

## 🔹 Difference Between DAG and Lineage Graph

| Concept           | Definition                                                                            |
| ----------------- | ------------------------------------------------------------------------------------- |
| **DAG**           | Optimized execution plan of a job after action is triggered. Includes stages & tasks. |
| **Lineage Graph** | Graph of **transformations** to create RDD/DataFrame, used for **fault recovery**.    |
| **Key Point**     | DAG = execution plan, Lineage = history of transformations                            |

---

## 🔹 Analogy (Library / Recipe)

* **Lineage Graph** = Recipe book showing **all steps** used to create a dish.
* If the final dish (RDD partition) is spoiled, you **follow the recipe again** to recreate it.
* **DAG** = Optimized cooking plan for **efficient execution**.

---

✅ **Key takeaway:**

* **Lineage Graph = fault-tolerance blueprint.**
* Keeps track of **all transformations**.
* Allows Spark to **recompute lost partitions** instead of storing multiple copies.