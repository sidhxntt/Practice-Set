## 🔹 1️⃣ Partitioning

**Definition:**

* Partitioning splits data into **separate directories** on disk based on a **column value**.
* Each unique value of the column becomes a **partition** (directory).

**Example:**

```python
df.write.partitionBy("year").parquet("/path/to/output")
```

Result on disk:

```
/path/to/output/year=2022/part-0001.parquet
/path/to/output/year=2023/part-0001.parquet
/path/to/output/year=2023/part-0002.parquet
```

**Key Points:**

| Feature         | Description                                                             |
| --------------- | ----------------------------------------------------------------------- |
| Physical Layout | Separate directories per partition column value                         |
| Benefit         | Spark can **prune partitions** at read time → faster queries            |
| Drawback        | Too many partitions → many small files → performance hit                |
| Use case        | Big column with relatively few distinct values (like `year`, `country`) |

**Partition Pruning Example:**

```python
spark.read.parquet("/path/to/output").filter("year = 2023").show()
```

* Only reads the folder `year=2023` → much faster.

---

## 🔹 2️⃣ Bucketing

**Definition:**

* Bucketing splits data into **fixed number of buckets (files)** based on a **hash of a column**.
* Unlike partitioning, all buckets are in the **same directory**.

**Example:**

```python
df.write.bucketBy(4, "user_id").sortBy("user_id").saveAsTable("users_bucketed")
```

* This creates **4 buckets** for `user_id`.
* Spark distributes data into buckets using a **hash function**.
* Often combined with **sorting inside each bucket** for efficient joins.

**Key Points:**

| Feature         | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| Physical Layout | Fixed number of bucket files                                                              |
| Benefit         | Efficient **joins & aggregations** on bucketed column; avoids full shuffle                |
| Drawback        | Buckets not automatically pruned like partitions                                          |
| Use case        | Join-heavy operations on large tables; same bucket column in both tables → optimized join |

**Join Optimization Example:**

```python
# If both tables bucketed by user_id with same number of buckets
spark.sql("""
SELECT a.*, b.*
FROM users_bucketed a
JOIN purchases_bucketed b
ON a.user_id = b.user_id
""")
```

* Spark can **perform bucketed join** without shuffling all data → huge performance gain.

---

## 🔹 Partitioning vs Bucketing (Summary)

| Aspect              | Partitioning                          | Bucketing                                 |
| ------------------- | ------------------------------------- | ----------------------------------------- |
| Data Split          | By column value → directory per value | By hash of column → fixed number of files |
| Directory structure | Yes                                   | No                                        |
| Pruning             | Yes, reads only relevant partitions   | No, must scan all buckets                 |
| Use Case            | Filtering, query pruning              | Join/aggregation optimization             |
| Number of splits    | Depends on distinct values            | Fixed (set by user)                       |
| Disk Files          | Many (1 per value × partitions)       | Controlled (fixed number of buckets)      |

---

### 🔹 Analogy (Kitchen)

* **Partitioning:** You store ingredients in separate cabinets labeled by type (Vegetables, Fruits, Spices). When cooking, you only open the cabinet you need.
* **Bucketing:** You divide each type into fixed boxes (like 4 boxes of vegetables). When cooking, you know which box may contain your ingredient based on a formula (hash).

---

✅ **Key Takeaways:**

* Use **partitioning** to **skip reading unnecessary data** (pruning).
* Use **bucketing** to **optimize joins and aggregations**, reducing shuffle.
* They can be **combined**: e.g., partition by `year`, bucket by `user_id`.
