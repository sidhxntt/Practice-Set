## 🔹 What is a Spark Action?

In Spark, operations are divided into **two types**:

1. **Transformations** → Lazy operations that define **how to compute** data.

   - Examples: `map()`, `filter()`, `select()`.
   - Spark **does not execute them immediately**; it builds a **DAG (Directed Acyclic Graph)** of operations.

2. **Actions** → Operations that **trigger execution**.

   - Examples: `count()`, `collect()`, `show()`.
   - When you run an action, Spark sends the DAG to the **Driver**, which splits it into **jobs → stages → tasks**, executes them on **Executors**, and returns the result.

✅ **Key point:** Without an action, Spark **does nothing**, because transformations are lazy.

## 🔹 How Actions Trigger Execution

Example:

```python
df = spark.read.csv("people.csv", header=True, inferSchema=True)
df_filtered = df.filter(df.age > 30)  # transformation → lazy

# Action triggers Spark execution
count = df_filtered.count()
print(count)
```

**Execution flow:**

1. `filter()` → builds DAG, but **does not execute**.
2. `count()` → action triggers **job creation**.
3. Spark Driver splits job → **stages → tasks**.
4. Executors process tasks → results returned to Driver.
5. Final output is printed.

---
