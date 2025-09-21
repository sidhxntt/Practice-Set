# What is a *Spark query plan* — explained in detail

A **Spark query plan** is the series of representations Spark builds from your SQL/DataFrame code **before and during execution**. It’s how Spark understands *what* you want and *how* to do it efficiently. There are multiple stages of planning — **logical → analyzed → optimized → physical → executed** — each with a specific purpose. Below I walk through each stage, why it exists, what you see there, how it maps to execution (jobs / stages / tasks), and how to inspect and act on plans.

---

# 1) High-level flow (what Spark does when you run a query)

1. **You write code**: DataFrame ops or `spark.sql("...")` (lazy transformations).
2. **Parser / Logical plan**: Spark parses SQL/DSL into a *logical plan* (a tree of relational operators).
3. **Analyzer**: names/columns/types are resolved → *analyzed logical plan*.
4. **Optimizer (Catalyst)**: rules transform the analyzed logical plan into an *optimized logical plan* (predicate pushdown, projection pruning, constant folding, join reorder, etc.).
5. **Physical planner**: produces one or more *physical plans* (concrete execution strategies, e.g., broadcast join vs sort-merge join). Chooses best based on rules / cost (CBO if enabled).
6. **Code generation & execution**: chosen physical plan is turned into executable operators (whole-stage codegen, Tungsten memory ops), jobs are scheduled; *Exchange* operators become shuffle boundaries → stages/tasks get executed on executors.
7. **(AQE)**: with Adaptive Query Execution enabled, Spark may rewrite the physical plan at runtime (coalesce shuffle partitions, change join strategy, fix skew).

---

# 2) Plan types — what each contains and why it matters

### A. Logical Plan (unresolved / parsed)

* **What:** A tree of relational operators (Project, Filter, Join, Aggregate, Relation).
* **Why:** Simple structural representation of your query; columns may still be unresolved (names not bound to sources).
* **When created:** Immediately when you call a transformation / `spark.sql()` (but lazy — not executed).

### B. Analyzed Logical Plan

* **What:** Names/types resolved — the analyzer binds column/table names to schemas.
* **Why:** Errors like “column not found” are detected here.
* **Useful for:** Ensures semantic correctness before optimizations.

### C. Optimized Logical Plan (Catalyst)

* **What:** Catalyst applies rule-based (and optionally cost-based) rewrites:

  * Predicate pushdown (filter earlier),
  * Projection pruning (only read needed columns),
  * Constant folding,
  * Simplify expressions,
  * Combine filters,
  * Reorder/join re-write (when CBO enabled).
* **Why:** Reduce I/O, avoid unnecessary computation and shuffles.

### D. Physical Plan (SparkPlan)

* **What:** Concrete execution operators (e.g., `HashAggregate`, `SortMergeJoin`, `BroadcastHashJoin`, `FileScan`, `Project`, `Filter`, `Exchange`).
* **Why:** Decides *how* the optimized logical operations will be executed (join algorithm, whether to shuffle, partial aggregates, etc.).
* **Note:** `Exchange` nodes indicate shuffles — they are **stage boundaries** in execution.

### E. Executed Plan (with codegen information)

* **What:** Physical plan plus **whole-stage codegen** wrappers (operators combined into JVM bytecode fragments), metrics and runtime annotations.
* **Why:** This is what the engine actually runs; it’s often what `explain(extended=True)` shows at the bottom.

---

# 3) How to inspect plans (practical commands)

**PySpark DataFrame:**

```python
df.explain()                    # simple plan (physical plan)
df.explain(True)                # extended: logical / analyzed / optimized / physical / executed
```

**SQL:**

```sql
EXPLAIN
SELECT ...;

-- or formatted:
EXPLAIN FORMATTED SELECT ...;
```

**Programmatic access (Scala/advanced):**

* `df.queryExecution.logical`
* `df.queryExecution.optimizedPlan`
* `df.queryExecution.executedPlan`

(Exact access differs between APIs; `df.explain(True)` is generally enough.)

---

# 4) Example — filter + groupBy(count) and an annotated physical plan

**Query:**

```python
df = spark.read.csv("people.csv", header=True, inferSchema=True)
df_filtered = df.filter(df.age > 30)
df_grouped = df_filtered.groupBy("city").count()
df_grouped.explain(True)
```

**(abridged) Example output (physical plan snippet) and annotation:**

```
== Parsed Logical Plan ==
'Aggregate [city], [count(1) AS count#7L]
+- 'Filter (age#2 > 30)
   +- 'UnresolvedRelation [people]

== Analyzed Logical Plan ==
Aggregate [city#3], [count(1) AS count#7L]
+- Filter (age#2 > CAST(30 AS INT))
   +- Relation[name#0, age#2, city#3] CSV

== Optimized Logical Plan ==
Aggregate [city#3], [count(1) AS count#7L]
+- Project [city#3]
   +- Filter (isnotnull(age#2) && (age#2 > 30))
      +- FileScan csv [name#0,age#2,city#3] ...

== Physical Plan ==
*(2) HashAggregate(keys=[city#3], functions=[count(1)])
+- Exchange hashpartitioning(city#3, 200)
   +- *(1) HashAggregate(keys=[city#3], functions=[partial_count(1)])
      +- *(1) Project [city#3]
         +- *(1) Filter (isnotnull(age#2) && (age#2 > 30))
            +- FileScan csv [name#0,age#2,city#3] ...

== Executed Plan ==
*(2) HashAggregate(keys=[city#3], functions=[count(1)])
... (WholeStageCodegen)
```

**Annotations:**

* `FileScan csv` — reading data; after projection pruning it only reads needed columns.
* `Filter` — filter pushed as early as possible (Catalyst).
* `*(1)` and `*(2)` — stages of whole-stage codegen (operators combined).
* `HashAggregate` (inner `*(1)`) — partial aggregation on map side (per partition).
* `Exchange hashpartitioning(...)` — **shuffle**: this is a shuffle boundary → marks end of Stage 1 / start of Stage 2.
* `HashAggregate` (outer `*(2)`) — reduce-side aggregation combining partial results.

**Key takeaway:** every `Exchange` corresponds to a shuffle and therefore a stage boundary in the DAG scheduler.

---

# 5) Important plan nodes you’ll commonly see

* **FileScan** (CSV/Parquet/ORC): reads files; metadata and stats may enable predicate pushdown.
* **Project**: expression evaluation / column selection.
* **Filter**: predicate application (often pushed down).
* **HashAggregate / SortAggregate**: aggregations (partial + final).
* **Exchange**: shuffle (hashpartitioning, rangepartitioning). **Stage boundary.**
* **SortMergeJoin**: join that sorts partitions and merges (used for large tables).
* **BroadcastHashJoin**: small table broadcast to executors (no shuffle for small side).
* **ShuffleHashJoin**: hash join implemented over a shuffle (inner joins; less common than SMJ).
* **WholeStageCodegen**: wrapper that indicates a set of operators that will be compiled into a single generated function for speed.
* **SerializeFromObject / DeserializeToObject**: physical serialization/deserialization steps (Tungsten).

---

# 6) Catalyst optimizer: common rules it applies (examples)

* **Predicate pushdown** → filter rows as early as possible, possibly into the data source.
* **Projection pruning** → only read needed columns from files.
* **Constant folding** → evaluate constant expressions at plan time.
* **Null propagation / simplifications**.
* **Push filters into Parquet/ORC readers** (data source specific).
* **Join reordering / rewriting** if CBO enabled (and table stats available).
* **Combine projections / combine filters**.

Enable cost-based optimizer (CBO) for better physical plan choices:

```python
spark.conf.set("spark.sql.cbo.enabled", "true")
# and compute stats:
spark.sql("ANALYZE TABLE my_table COMPUTE STATISTICS")
```

---

# 7) Whole-stage Codegen & Tungsten — why the plan shows `*` and `WholeStageCodegen`

* **Whole-stage codegen** merges adjacent CPU-bound operators (filter, project, aggregate) into a single generated function (Java bytecode). This reduces interpreter overhead and improves performance.
* **Tungsten**: low-level runtime improvements: off-heap encodings, binary processing, optimized memory layout.
* Plan annotations like `*(1)` typically show the codegen regions; the executed plan will show `WholeStageCodegen`.

---

# 8) Where physical plan maps to execution (jobs / stages / tasks)

* **Every action** triggers a job.
* **DAG → stages**: Spark breaks the physical plan into stages at **Exchange** (shuffle) nodes.
* **Stage → tasks**: each partition produces one task for the stage. Tasks run on executors.
* So: *Plan node `Exchange` ⇄ stage boundary ⇄ shuffle files written/read*.

---

# 9) Adaptive Query Execution (AQE) interaction

If `spark.sql.adaptive.enabled=true`, Spark can:

* **Coalesce small partitions** after shuffle (reduce number of tasks).
* **Change join strategy** at runtime (e.g., convert to broadcast join based on actual sizes).
* **Split skewed partitions** to avoid stragglers.
  AQE means the *executed plan* may differ from the static physical plan you saw before execution.

Enable:

```python
spark.conf.set("spark.sql.adaptive.enabled", "true")
```

---

# 10) Cost-based optimization (CBO)

* To use CBO, Spark needs table & column statistics:

  * `ANALYZE TABLE table COMPUTE STATISTICS` or `ANALYZE TABLE ... FOR COLUMNS ...`.
* Enable CBO:

  * `spark.conf.set("spark.sql.cbo.enabled", "true")`
  * `spark.conf.set("spark.sql.cbo.joinReorder.enabled", "true")`
* CBO can reorder joins and choose join algorithms using estimated sizes.

---

# 11) Practical tips — how to use query plans to optimize queries

* **Always `explain(True)`** when performance surprises you. Look for:

  * `Exchange` nodes (shuffles). Try to reduce them.
  * `BroadcastHashJoin` vs `SortMergeJoin` — if you expected broadcast but see SMJ, consider `broadcast()` hint or increase `spark.sql.autoBroadcastJoinThreshold`.
  * `FileScan` reading many columns — enable projection pruning by selecting only needed columns.
  * `WholeStageCodegen` presence is good; absence may indicate non-optimizable operators.
* **Fix skew**: if a partition is huge (seen in Spark UI as stragglers), consider salting, repartitioning, or enable AQE.
* **Persist** if the same DataFrame is reused multiple times to avoid re-computation of long lineage.
* **Collect statistics** for CBO to help Catalyst choose better physical plans.
* **Use hints** for join: `df.join(broadcast(small_df), 'key')` or SQL `/*+ BROADCAST(small) */`.
* **Use `EXPLAIN FORMATTED`** when using SQL to see detailed attributes and statistics.

---

# 12) Quick checklist when reading a plan

* Are filters pushed to file scan? (Reduces I/O)
* Is join a broadcast? (Good for small table)
* Where are the `Exchange` nodes? (Shuffle points)
* Are there `HashAggregate` (partial + final) or `SortAggregate`?
* Is whole-stage codegen shown? (indicates efficient execution)
* Does the plan match expectation? (if not, add hints or compute stats)

---

# 13) Example: how a small change affects the plan

* `df.join(small_df, "id")` → may be `SortMergeJoin` if small\_df is not detected small.
* `df.join(broadcast(small_df), "id")` → forces `BroadcastHashJoin` and eliminates an `Exchange`.
* `df.filter(...)` → Catalyst will push the filter into `FileScan` if possible.

---

# 14) Summary (short & practical)

* **Query plan** = the representation of your query at multiple stages: parsed → analyzed → optimized → physical → executed.
* **Catalyst optimizer** rewrites logical plans to reduce work (predicate/column pushdown, join reordering with CBO).
* **Physical plan** shows actual operators (FileScan, Filter, Project, Exchange, Aggregates, Joins).
* **Exchange** nodes = shuffle boundaries = stage breaks.
* **Use `df.explain(True)` and Spark UI** to inspect plans and execution metrics.
* **AQE** and **CBO** can change or improve plans at runtime or before execution respectively.

---

## How they connect

1. You write a query:

```python
df.filter(df.age > 30).groupBy("city").count()
```

2. **Catalyst builds query plan** (logical → optimized → physical).

   * Plan shows `Filter`, `Project`, `HashAggregate`, `Exchange` etc.

3. **Spark scheduler converts physical plan → DAG**:

   * Each **Exchange node** in the physical plan becomes a **stage boundary** in the DAG.
   * Tasks are created per partition within each stage.

4. **Execution**:

   * Driver sends tasks of Stage 1 to executors.
   * Stage 2 waits for Stage 1 shuffles to finish.
   * Partial results are combined at driver (or next stage).

```
SQL Query / DataFrame API
       |
       v
Physical Plan (operators)
----------------------------------------
FileScan --> Filter --> Project --> HashAggregate(partial) --> Exchange --> HashAggregate(final)
       |
       v
DAG (Stages + Tasks)
----------------------------------------
Job
 ├─ Stage 1
 │   ├─ Task 1 (partition 1)
 │   ├─ Task 2 (partition 2)
 │   └─ Task N (partition N)
 └─ Stage 2
     ├─ Task 1 (partition 1)
     ├─ Task 2 (partition 2)
     └─ Task N (partition N)
       |
       v
Executors execute tasks → Driver collects results → Action completes
```

