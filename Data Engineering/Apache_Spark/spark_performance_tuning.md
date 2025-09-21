# 🔹 Spark Performance Tuning (Detailed)

Performance tuning in Spark involves **optimizing memory, computation, parallelism, I/O, and shuffles** to reduce runtime, avoid bottlenecks, and improve resource utilization.

---

## 1️⃣ Data Partitioning & Parallelism

### a) Partitions

- Spark divides data into **partitions**; each partition is processed by **one task**.
- Too few partitions → **under-utilization of cores** → some executors idle.
- Too many partitions → **task scheduling overhead** → slower job.

**How to tune:**

```python
# Increase parallelism for large datasets
df = df.repartition(100)  # 100 partitions
df = df.coalesce(10)      # Reduce partitions (for small output)
```

- **Rule of thumb:** 2–4 tasks per CPU core.

---

### b) Partition Size

- Ideal partition size: **100–200 MB** per partition.
- Too small → many tasks, scheduling overhead.
- Too large → tasks take too long, memory pressure.

---

### c) Partitioning for Joins

- Use **partitionBy** for large tables.
- Use **bucketing** to reduce shuffle in join-heavy workloads.

---

## 2️⃣ Caching & Persistence

- Avoid recomputing **intermediate DataFrames/RDDs** multiple times.
- Cache only **hot data** you reuse.

```python
df.cache()        # Default MEMORY_AND_DISK
df.persist("MEMORY_ONLY")  # Explicit storage level
```

- **Storage levels:**

  - `MEMORY_ONLY`, `MEMORY_AND_DISK`, `DISK_ONLY`, `MEMORY_ONLY_SER` (serialized, saves memory).

**Tip:** Serialization reduces memory footprint but increases CPU usage.

---

## 3️⃣ Shuffles Optimization

Shuffles are **expensive operations** (groupBy, join, reduceByKey, orderBy). Minimize them.

**Techniques:**

1. **Use map-side combiners**

   ```python
   rdd.reduceByKey(...)  # better than groupByKey()
   ```

2. **Broadcast small tables for joins**

   ```python
   small_df = spark.read.parquet("small.parquet")
   large_df = spark.read.parquet("large.parquet")
   broadcast(small_df)
   large_df.join(small_df, "key")
   ```

   - Avoids shuffling the small table.

3. **Repartition wisely**

   - `repartition` → full shuffle
   - `coalesce` → narrow shuffle (reduce partitions without moving data much)

4. **Avoid wide transformations repeatedly**

   - Chain narrow transformations if possible.

---

## 4️⃣ Join Optimizations

| Join Type           | When to Use          | Notes                                                  |
| ------------------- | -------------------- | ------------------------------------------------------ |
| Broadcast Hash Join | Small table (< 10GB) | Small table broadcast to all executors; avoids shuffle |
| Sort-Merge Join     | Large tables         | Tables sorted by join key; shuffle required            |
| Shuffle Hash Join   | Medium tables        | Hash-based, works well if memory available             |

**Tip:** Check table size and choose join strategy with `spark.sql.autoBroadcastJoinThreshold`.

---

## 5️⃣ File Format & I/O Optimization

- Use **columnar formats**: **Parquet**, **ORC** → faster reads, predicate pushdown.
- Avoid **CSV / JSON** for large datasets → parsing overhead.
- Use **snappy compression** to reduce I/O.

```python
df.write.parquet("/path/output", compression="snappy")
```

- **Partition pruning**: filter on partition column to read fewer files.

```python
df = spark.read.parquet("/path/output").filter("year = 2023")
```

---

## 6️⃣ Memory Management & Executors

- **Executor Memory**: Enough to hold shuffle buffers and cached data.

```bash
spark-submit --executor-memory 8G --executor-cores 4 --num-executors 10
```

- **Execution vs Storage memory:** tune `spark.memory.fraction` and `spark.memory.storageFraction`.
- Avoid **OOM errors** by adjusting memory and partition size.

---

## 7️⃣ Catalyst Optimizer & SQL Tuning

- **Catalyst optimizer** automatically optimizes DataFrame/SQL queries:

  - Predicate pushdown
  - Constant folding
  - Projection pruning
  - Join reordering

- Tips for SQL/DataFrames:

  - Filter early (`df.filter()`) → reduces data before shuffle.
  - Select only required columns → reduces memory/shuffle.
  - Avoid UDFs if possible → Catalyst cannot optimize UDFs. Use built-in Spark functions.

---

## 8️⃣ Adaptive Query Execution (AQE)

- Introduced in Spark 3.0.
- Dynamically **optimizes query plans at runtime**:

  - Adjust **number of shuffle partitions** based on actual data size.
  - Convert skewed joins to **broadcast join** automatically.

- Enabled via:

```python
spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", "true")
```

---

## 9️⃣ Skew Handling

- Skewed data can slow down tasks.
- Techniques:

  1. **Salting:** add a random prefix to keys to distribute skewed keys.
  2. **Repartition:** increase number of partitions for heavy keys.
  3. **Skewed join hints**:

```python
df1.join(df2.hint("skew"), "key")
```

---

## 🔹 10️⃣ Task & Core Optimization

- Avoid too many small tasks → scheduling overhead.
- Too few tasks → some cores idle.
- Recommended:

  - 2–4 tasks per CPU core.
  - Adjust `spark.default.parallelism` for RDDs.
  - Adjust `spark.sql.shuffle.partitions` for DataFrames/SQL (default 200).

---

## 11️⃣ Serialization & Tungsten

- Use **Kryo serialization** for performance:

```python
spark.conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")
```

- Reduces memory usage and improves CPU efficiency.
- Tungsten engine optimizes memory layout for objects → better cache & shuffle performance.

---

## 12️⃣ Checkpointing & Caching

- For **long lineage DAGs**:

  - Use `.checkpoint()` → saves RDD/DataFrame to disk, truncates lineage → reduces recomputation.

- Use `.cache()` for repeated reuse of intermediate results.

---

## 13️⃣ Monitoring & Profiling

- Use **Spark UI** (`http://<driver>:4040`) to check:

  - Stage/task execution time
  - Skewed partitions
  - Shuffle read/write
  - Garbage collection

- Optimize based on bottlenecks.

---

## 🔹 14️⃣ Summary / Best Practices

| Area          | Tips                                                                 |
| ------------- | -------------------------------------------------------------------- |
| Partitions    | 100–200MB, 2–4 tasks per core                                        |
| Caching       | Cache intermediate results wisely                                    |
| Shuffle       | Reduce shuffles, broadcast small tables                              |
| Joins         | Use broadcast join for small tables, bucketed joins for large tables |
| File Format   | Columnar formats, parquet/orc, compression                           |
| Memory        | Tune executor memory, fraction for storage/execution                 |
| Catalyst      | Filter/select early, avoid UDFs                                      |
| AQE           | Enable for dynamic optimization                                      |
| Skew          | Handle with salting/repartition/skew hints                           |
| Serialization | Kryo for better memory/CPU efficiency                                |
| Monitoring    | Spark UI, stage/task metrics, GC logs                                |

---

💡 **Analogy (Kitchen)**

- **Partitions** = prep stations (divide veggies, meats, spices).
- **Executors** = chefs at each station.
- **Caching** = keeping pre-chopped ingredients ready.
- **Shuffles** = moving ingredients between stations (expensive).
- **Broadcast** = sending small sauce jars to every station instead of moving it repeatedly.
- **AQE** = head chef notices some stations overloaded and reassigns tasks dynamically.

---

## 🔹 Spark Performance Tuning Workflow (Visual Overview)

```
                +-----------------------------+
                |       Spark Job/Action      |
                +-----------------------------+
                             |
                             v
            +---------------------------------+
            |  DAG / Logical Plan Creation    |
            | (Transformations: filter, map) |
            +---------------------------------+
                             |
                             v
           +----------------------------------+
           | Catalyst Optimizer & AQE         |
           | - Predicate pushdown             |
           | - Projection pruning             |
           | - Join reordering                |
           | - Dynamic shuffle partitions     |
           +----------------------------------+
                             |
                             v
           +----------------------------------+
           | Physical Execution Plan           |
           | Stages -> Tasks                  |
           +----------------------------------+
                             |
         +-------------------------------------------+
         | Executor Memory Layout                     |
         |-------------------------------------------|
         | Execution Memory  | Storage Memory        |
         | - Shuffle buffers | - Cached DataFrames  |
         | - Sort / Join     | - Broadcast Vars     |
         |------------------|---------------------|
         | Spilling to Disk if memory insufficient |
         +-------------------------------------------+
                             |
         +-------------------------------------------+
         | Partitioning & Bucketing                  |
         | - Repartition / Coalesce                  |
         | - Partition pruning                        |
         | - Bucketed joins for optimization          |
         +-------------------------------------------+
                             |
         +-------------------------------------------+
         | Shuffle Optimization                        |
         | - ReduceByKey / Map-side Combiner          |
         | - Broadcast small table                     |
         | - Avoid wide transformations repeatedly     |
         +-------------------------------------------+
                             |
         +-------------------------------------------+
         | Caching & Persistence                      |
         | - df.cache() / df.persist()                |
         | - Storage levels: MEMORY_ONLY, DISK, etc. |
         +-------------------------------------------+
                             |
         +-------------------------------------------+
         | Join Optimization                           |
         | - Broadcast Join                             |
         | - Sort-Merge Join                             |
         | - Shuffle Hash Join                           |
         +-------------------------------------------+
                             |
         +-------------------------------------------+
         | Skew Handling                                |
         | - Salting                                    |
         | - Repartition skewed keys                     |
         | - Skewed join hints                           |
         +-------------------------------------------+
                             |
                             v
                +----------------------------+
                | Task Execution on Executors |
                | - Each task processes a     |
                |   partition                  |
                | - Partial results returned   |
                +----------------------------+
                             |
                             v
                +----------------------------+
                | Combine Results in Driver   |
                +----------------------------+
                             |
                             v
                +----------------------------+
                | Output / Action Completed  |
                +----------------------------+
```

---

### 🔹 Key Notes

1. **DAG → Optimizer → Physical Plan → Executors**: Spark lazily builds a DAG, optimizes it with Catalyst/AQE, then schedules tasks on executors.
2. **Partitioning & Bucketing** reduce shuffle and improve parallelism.
3. **Caching / Persist** avoid recomputation for hot data.
4. **Shuffle & Join Optimization** reduce network I/O and task time.
5. **Skew Handling** ensures some tasks don’t take much longer than others.
6. **Executors’ memory**: manages execution and storage with spilling if needed.

---

💡 **Analogy (Kitchen)**

- Chef (Driver) creates a **recipe plan (DAG)**.
- Recipe optimizer (Catalyst) decides **best cooking steps**.
- Stations (Executors) cook different partitions of ingredients.
- Pantry (Storage Memory) holds prepped ingredients.
- Counters (Execution Memory) used for cooking tasks.
- Shuffling = moving ingredients between stations.
- Skew = some stations get too many ingredients → need salting/extra prep.
