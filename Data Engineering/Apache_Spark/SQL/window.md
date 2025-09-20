```python
df.createOrReplaceTempView("employees")

spark.sql("""
    SELECT *,
           ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary) AS row_num,
           RANK() OVER(PARTITION BY dept ORDER BY salary) AS rnk,
           DENSE_RANK() OVER(PARTITION BY dept ORDER BY salary) AS dense_rnk
    FROM employees
""").show()
```

---

# 🔹 Notes

1. Window functions **do not reduce row count** (unlike aggregates).
2. Useful for **top-N per group, running totals, moving averages, comparisons between rows**.
3. **Partitioning** affects which rows are considered for calculation.
4. **Ordering** affects results like `row_number`, `lag`, `lead`.
5. Can be **combined with filtering, grouping, joins** for complex analytics.

---

💡 **Analogy (Kitchen)**

* Imagine each **department = a kitchen section**, and **salary ordering = seniority of chefs**.
* `row_number` → gives each chef a unique number in that section.
* `rank` → gives rank, leaving gaps for ties.
* `lag` → checks previous chef’s salary to compare.
* `sum` over window → total salaries in that section **for each chef row**.

