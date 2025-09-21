## Beginner
- SELECT clause
- WHERE clause
- FROM clause
- ORDER BY clause
- STRING operations (LOWER, UPPER etc)
- LIKE clause 
- DATE operations (DATE_DIFF, DATE_ADD, etc)
- TRY_CAST
- LIMIT
- OFFSET (skip rows)
- GROUP BY & HAVING clause
- JOINS (Inner, self, left, right, CROSS JOIN, FULL OUTER JOIN)
- AGGREGATE FUNCS (sum, avg, count etc) [always used with group by]


## Intermediate
- WITH clause (CTE)
- Subqeury (WHERE clause (most common) , FROM clause (acts as a derived table) , SELECT clause (returns scalar values))
- VIEWS (materialsed etc)
- LATERAL JOIN
- WINDOW FUNCTIONS (RANK, DENSE_RANK, FIRST_VALUE, LAST_VALUE, ROW_NUMBER, Nth_Value , LAG, LEAD, NTILE etc)
- MERGE
- PIVOT/UNPIVOT
- JSON/Array functions

## Advance
- GROUPING SETS 
- ROLLUP 
- CUBE 
- UDF
- Recursion
- Procedures
- Triggers (automatic actions on INSERT/UPDATE/DELETE)
- Transactions (BEGIN, COMMIT, ROLLBACK, ACID properties)
- Indexing (clustered vs non-clustered, covering indexes)
- Query Plans (understanding optimizers (EXPLAIN, EXPLAIN ANALYZE))
- Security (RLS/CLS)
- Partitioning & Sharding (horizontal/vertical partitioning for performance)
- Parallelism & Optimizer Hints (e.g., /*+ BROADCAST */ in Spark SQL)