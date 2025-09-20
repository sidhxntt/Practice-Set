
```python
df.createOrReplaceTempView("employees")

spark.sql("""
    SELECT dept,
           COUNT(*) AS emp_count,
           SUM(salary) AS total_salary,
           AVG(salary) AS avg_salary,
           MIN(salary) AS min_salary,
           MAX(salary) AS max_salary
    FROM employees
    GROUP BY dept
""").show()
```

---

# 🔹  Notes

1. **Aggregations trigger a job** → Spark will **read partitions, compute partial aggregates on tasks, then combine in driver**.
2. Can be **combined with `filter` or `where`** to aggregate only subsets of data.
3. Some aggregates like `collect_list` and `collect_set` **may cause shuffle**, as they need to gather multiple rows per group.
4. Spark automatically **optimizes aggregations** via **partial aggregation** to reduce shuffle.

