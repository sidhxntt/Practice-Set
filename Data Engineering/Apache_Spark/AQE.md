# 🚀 Adaptive Query Execution (AQE) in Spark

**AQE** is a **dynamic optimization feature** introduced in **Spark 3.0** that **adjusts query execution at runtime** based on the **actual data statistics**.

Think of it as **Spark learning while cooking** — it adjusts its strategy depending on how ingredients actually look.

---

## 🔹 1. Why AQE?

In traditional Spark execution:

* Spark builds a **static physical plan** at compile time.
* It estimates **partition sizes, join strategies, and shuffle partitions** before seeing the real data.
* If **data distribution is skewed**, the plan may be inefficient (e.g., one huge partition, wrong join type).

**Problem:**

* Skewed keys → long-running tasks
* Incorrect partitioning → executor memory issues
* Large shuffles → slow jobs

**Solution:** AQE → adjusts execution plan **after seeing actual runtime stats**.

---

## 🔹 2. How AQE Works

### AQE Features:

1. **Dynamic Partition Coalescing**

   * Merge small shuffle partitions at runtime to reduce task overhead.
   * Example: If 1000 partitions but many are tiny → Spark merges them into 200.

2. **Dynamic Join Strategy**

   * Switches join type based on actual data size.
   * Example: Spark converts a **shuffle join** to **broadcast join** if one table is smaller than expected.

3. **Skew Join Optimization**

   * Detects **skewed partitions** at runtime.
   * Splits them into smaller partitions to avoid straggler tasks.

---

## 🔹 3. Enabling AQE

```python
spark = SparkSession.builder \
    .appName("AQE Example") \
    .config("spark.sql.adaptive.enabled", "true") \
    .config("spark.sql.adaptive.coalescePartitions.enabled", "true") \
    .config("spark.sql.adaptive.skewJoin.enabled", "true") \
    .getOrCreate()
```

* **`spark.sql.adaptive.enabled`** → turn on AQE globally
* **`coalescePartitions.enabled`** → merge small shuffle partitions
* **`skewJoin.enabled`** → automatically handle skewed joins

---

## 🔹 4. Example

Suppose you have:

```python
df_orders = spark.read.csv("orders.csv", header=True, inferSchema=True)
df_customers = spark.read.csv("customers.csv", header=True, inferSchema=True)

# Join on customer_id
df_joined = df_orders.join(df_customers, "customer_id")
df_joined.groupBy("region").sum("amount").show()
```

* Without AQE: Spark may create a **shuffle join** → one huge partition for a skewed customer → task delay.
* With AQE: Spark **detects skewed customer\_id partition** at runtime → splits it into multiple tasks → faster execution.
* If `df_customers` is smaller than expected → converts join to **broadcast join** → avoids shuffle.

---

## 🔹 5. Benefits of AQE

| Feature                      | Benefit                                         |
| ---------------------------- | ----------------------------------------------- |
| Dynamic partition coalescing | Reduces small task overhead                     |
| Dynamic join strategy        | Avoids unnecessary shuffles                     |
| Skew join optimization       | Prevents straggler tasks                        |
| Runtime adjustments          | Efficient execution even with unknown data size |

---

## 🔹 6. Analogy (Cooking)

* **Static plan (without AQE)**: Chef decides beforehand how many cooks and pans he will need, assuming all baskets of veggies are equal.
* **AQE (adaptive)**: Chef opens the baskets, sees that one basket is huge and others are tiny, then **redistributes work** among cooks dynamically → meal ready faster.

---

### 🔹 Key Points

1. AQE is **runtime optimization** → unlike Catalyst, which is **compile-time optimization**.
2. Works best for:

   * **Skewed joins**
   * **Large datasets with unknown distribution**
   * **Shuffle-heavy queries**
3. Requires **Spark 3.0+**.
