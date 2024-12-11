# Data Engineering

## Flow in Your Example

1. **OLTP Systems (Transactional Databases):**

   - The website uses an OLTP (Online Transaction Processing) system for day-to-day transactions like user registrations, purchases, or activity logs.
   - These systems are optimized for real-time, high-frequency operations (e.g., updating user profiles, processing payments).
   - **Examples:** MySQL, PostgreSQL, MongoDB.

2. **Data Lake (Raw Data Storage):**

   - Over time, the data from the OLTP system is extracted and stored in a data lake. This raw data might include user activity logs, clicks, or sensor data from various sources.
   - The data lake acts as a centralized storage for raw, unprocessed data in its native formats.
   - **Purpose:** It serves as a long-term archive and a foundation for diverse analytics, machine learning, or advanced processing tasks.

3. **Data Warehouse (Processed Data for Analytics):**
   - Data from the lake is cleaned, transformed, and loaded (ETL process) into a data warehouse.
   - The warehouse organizes the data into a structured format, making it ready for slicing, dicing, and querying.
   - **Purpose:** Business intelligence (BI) teams use this data for generating dashboards, KPIs, and reports to drive decision-making.

---

## How Does Medallion Architecture Fit in This Picture?

The Medallion Architecture, often associated with the Delta Lake framework, fits seamlessly into the workflow you described by organizing data in tiers within the data lake. This structure ensures efficient data processing, governance, and usability as data transitions from raw to refined states.

### What is Medallion Architecture?

The Medallion Architecture organizes data in a layered structure with three main stages:

1. **Bronze Layer (Raw Data):** Stores raw, unprocessed data. (data lake)
2. **Silver Layer (Cleaned Data):** Stores cleaned, structured, and transformed data. (transform)
3. **Gold Layer (Aggregated Data):** Stores highly optimized data for analytics and business intelligence. (data warehouse)

### Medallion Architecture in the Data Pipeline

1. **OLTP Systems (Transactional Data):**

   - Data flows from OLTP systems into the Bronze Layer of the data lake.

2. **Bronze Layer (Raw Data):**

   - This layer stores raw, unprocessed data from the source systems in its native format (e.g., JSON, logs, CSV, etc.).
   - **Example:** Unprocessed transaction logs, user activity data, clickstream logs.

3. **Silver Layer (Cleaned Data):**

   - Data in the Bronze Layer is cleaned, deduplicated, and transformed into a structured format in the Silver Layer.
   - This layer serves as the single source of truth for analysts or downstream processes.
   - **Example:** Transaction data is enriched with user details, and errors in the data are corrected.

4. **Gold Layer (Aggregated Data):**

   - Data in the Silver Layer is aggregated and organized into business-ready datasets for use in analytics, dashboards, or machine learning models.
   - **Example:** Aggregated sales data, customer segmentation insights, or inventory trends.

5. **Data Warehouse Integration:**
   - The Gold Layer feeds into the data warehouse, where slicing and dicing operations occur. The structured format ensures high performance for analytical queries.
   - Alternatively, BI tools like Tableau, Power BI, or Looker can directly access the Gold Layer if the data lake supports fast querying.

---

## How Does Databricks Lakehouse Platform Fit in the Picture?

The Databricks Lakehouse Platform is a cutting-edge data architecture that unifies the best features of data lakes and data warehouses to create a single platform for all your data needs. It fits into the workflow you described by serving as the backbone for the entire pipeline—storing, processing, and analyzing data seamlessly.

### What is a Lakehouse?

**Lakehouse = Data Lake + Data Warehouse**

1. **Data Lake Characteristics (Bronze Layer):**

   - Stores large volumes of raw, unprocessed, and diverse data types.
   - **Example:** Logs, JSON files, images, videos, and sensor data.
   - **Purpose:** Provides cost-efficient and scalable storage.

2. **Data Warehouse Characteristics (Gold Layer):**

   - Stores clean, structured, and aggregated data for business analytics.
   - **Purpose:** Enables fast, reliable querying and BI operations.

3. **Transformations (Silver Layer):**
   - The Silver Layer bridges the gap between raw data (data lake) and refined data (data warehouse).
   - **Example:** Deduplication, cleaning, and enriching data.

### What Makes a Lakehouse Special?

- **Unified Storage and Processing:**
  - The Lakehouse architecture eliminates the need for separate systems (like a traditional data lake and data warehouse).
- **ACID Transactions:** Ensures data reliability and consistency, a feature of data warehouses.
- **Scalability:** Handles large-scale, unstructured data like a data lake.
- **Performance:** Provides optimized query performance like a data warehouse.

---

## In Your Terms:

The Bronze-Silver-Gold layering is essentially the foundation of the Lakehouse architecture, making it a system that blends data lake flexibility with data warehouse performance for seamless analytics.

**THEREBY – EXTRACT (BRONZE LAYER) [DATA LAKE] + TRANSFORM (SILVER LAYER) + LOAD (GOLD LAYER) [DATA WAREHOUSE]**

---

## How Databricks Lakehouse Fits in Your Pipeline

1. **Data Ingestion:**

   - Data from OLTP systems is ingested directly into the Bronze Layer of the Delta Lake using Databricks.
   - Handles both batch ingestion and real-time streaming.

2. **Bronze Layer (Raw Data):**

   - Stores raw, unprocessed data in cloud object storage (e.g., AWS S3).
   - ACID transactions ensure data reliability.

3. **Silver Layer (Cleaned Data):**

   - Data engineers use Databricks to clean, transform, and deduplicate data.
   - Structured datasets are prepared for downstream analytics and machine learning.

4. **Gold Layer (Business-Ready Data):**

   - Aggregated, refined data is stored here for BI tools (e.g., Tableau, Power BI).
   - Supports slicing and dicing operations directly via SQL queries.

5. **Advanced Analytics and ML:**

   - Data scientists use the cleaned data for ML models within Databricks.
   - The platform integrates seamlessly with tools like MLflow for model development and deployment.

6. **Real-Time Analytics:**
   - Streaming capabilities allow for real-time dashboards and alerts.

---

## Real-World Use Case: Retail Website Example

1. **Bronze Layer:**

   - Stores raw logs of user clicks, purchases, and inventory updates.

2. **Silver Layer:**

   - Processes logs to remove errors, deduplicate, and join with product and user details.

3. **Gold Layer:**
   - Creates aggregated datasets for:
     - **Sales Analytics:** Total sales by region or product.
     - **Customer Segmentation:** Grouping users based on purchase behavior.
     - **Real-Time Inventory Alerts:** Low-stock notifications.

## Databricks Lakehouse enables the entire pipeline, ensuring scalability, efficiency, and advanced analytics on the same platform.

# DATABRICKS ARCHITECTURE

Databricks leverages AWS resources and its own abstractions to provide a seamless data platform. Here's how it works:

## 1. Databricks Workspace

- The **Databricks Workspace** is the primary user interface (UI) where you can:
  - Manage assets such as clusters, notebooks, workflows, jobs, libraries, etc.
  - Collaborate on data engineering, data science, and analytics workloads.

## 2. EC2 Instances

- Databricks uses **Amazon EC2 instances** to form clusters.
- These clusters are the underlying compute resources that execute workloads.
- Each EC2 instance runs the **Databricks Runtime**, which includes:
  - **Apache Spark**
  - **Delta Lake**
  - Other tools and libraries optimized for performance and reliability.

## 3. Databricks Runtime

- A customized runtime provided by Databricks.
- Pre-configured with:
  - **Apache Spark**
  - **Delta Lake**
  - Other optimized libraries.
- Designed to run distributed data processing workloads efficiently.

## 4. DBFS (Databricks File System)

- DBFS is an **abstraction over storage**.
- On AWS, the underlying storage for DBFS is **Amazon S3** (not EBS).
  - While EC2 instances use EBS for their root or attached storage, Databricks relies on S3 for scalable, persistent storage.
- **DBFS Features**:
  - Provides a filesystem-like interface to interact with S3-backed storage.
  - Allows clusters to access shared data easily.
  - Supports reading, writing, and managing files programmatically or through the UI.

---

# Delta Tables in Databricks

## What is a Delta Table?

Delta Table is an open-source storage layer that brings reliability to data lakes. It's built on top of Apache Spark and provides ACID (Atomicity, Consistency, Isolation, Durability) transactions for big data workloads.

## Key Features of Delta Tables

### 1. ACID Transactions

- Ensures data integrity and consistency
- Supports atomic writes across multiple files
- Prevents data corruption during concurrent operations

### 2. Schema Evolution

- Allows adding, deleting, or modifying columns without rewriting entire datasets
- Provides backward and forward compatibility
- Supports automatic schema enforcement

### 3. Time Travel (Versioning)

- Enables accessing previous versions of data
- Can query historical data at specific timestamps or version numbers
- Supports data lineage and rollback capabilities

### 4. Performance Optimization

- Uses file-level metadata and indexing
- Supports data skipping and predicate pushdown
- Significantly improves query performance on large datasets

### 5. Merge Operations

- Supports complex upsert (update/insert) operations
- Simplifies data synchronization and change data capture (CDC)
- Allows efficient handling of slowly changing dimensions

### 6. Built-in Data Reliability

- Automatic file management
- Handles small file problems
- Provides compaction and optimization commands

## Why Do We Need Delta Tables in Databricks?

### 1. Data Lake Limitations Solved

- Traditional data lakes lack ACID transactions
- Difficult to manage complex data pipelines
- Prone to data inconsistencies

### 2. Enterprise Data Management

- Provides enterprise-grade data reliability
- Supports complex data engineering workflows
- Enables advanced data governance

### 3. Unified Analytics

- Bridges the gap between data lakes and data warehouses
- Supports both batch and streaming data processing
- Provides a single source of truth for data

## Comparison with Traditional Formats

| Feature                  | Parquet/CSV | Delta Table  |
| ------------------------ | ----------- | ------------ |
| ACID Transactions        | No          | Yes          |
| Schema Evolution         | Limited     | Full Support |
| Time Travel              | No          | Yes          |
| Merge Operations         | No          | Yes          |
| Performance Optimization | Basic       | Advanced     |

I'll explain the concept of transaction logs and how they help provide ACID (Atomicity, Consistency, Isolation, Durability) properties in a comprehensive markdown format.

# Transaction Logs in DataBricks

## What are Transaction Logs?

A transaction log is a sequential record of all database modifications, capturing every change made to the database in a detailed, chronological manner. It serves as a critical mechanism for ensuring data integrity and recovering from system failures.

## Purpose of Transaction Logs

Transaction logs are essential for:

- Maintaining database reliability
- Providing a mechanism for recovery
- Implementing ACID properties
- Enabling point-in-time recovery

## Benefits of Transaction Logs

1. **Data Recovery**: Reconstruct database after crashes
2. **Audit Trail**: Track all database modifications
3. **Performance Optimization**: Separate logging from actual data modification
4. **Replication**: Sync databases by replaying transaction logs

## Challenges and Considerations

- Log file size management
- Performance overhead
- Efficient log storage and retrieval
- Balancing between detailed logging and system performance

> Transaction logs are fundamental to maintaining data integrity in database systems. By providing a robust mechanism to track, validate, and recover database operations, they ensure that the ACID properties are consistently maintained.

## Conclusion

Delta Tables represent a significant advancement in data lake technology, providing reliability, performance, and flexibility that traditional file formats cannot match. They are particularly powerful in Databricks' unified analytics platform, enabling more sophisticated and reliable data engineering and analytics workflows.

> Delta Tables essentially add a "database-like" layer of reliability and transactional capabilities on top of data lake storage, bridging the gap between traditional databases and big data analytics platforms. So all this coz its not oltp ie no db so normal sql wont work so no acid properties that why delta table as we are fetching from the data lake not the db and we need db like features such as ACID property
---
# Delta Table vs Delta Lake

## Delta Lake
- An **open-source storage framework**
- Runs on top of existing data lakes
- Provides ACID transactions, scalability, and reliability
- Works across multiple computing engines (Spark, Databricks, etc.)
- Extends data lake capabilities with warehouse-like features

## Delta Table
- A **specific table format** within Delta Lake
- Stored as a collection of Parquet files
- Contains transaction logs
- Enables versioning, time travel, and ACID transactions
- Represents the actual data structure in a Delta Lake

## Key Differences

| Aspect | Delta Lake | Delta Table |
|--------|------------|-------------|
| Scope | Storage Framework | Table Format |
| Functionality | Architectural Approach | Specific Data Representation |
| Coverage | Entire Data Lake | Individual Table |
| Purpose | Add reliability to data lakes | Manage table-level transactions |

## Practical Example

```python
# Delta Lake (Framework)
from delta import *

# Delta Table (Specific Table)
deltaTable = DeltaTable.forPath(spark, "/path/to/delta/table")
```

### Analogy
- Delta Lake is like the **entire highway system**
- Delta Table is like **individual cars** traveling on that highway

Delta Lake provides the infrastructure, while Delta Tables are the specific data structures that benefit from its capabilities.
---
# Databricks File System (DBFS) Hierarchy and Hive Metastore

## DBFS (/dbfs) Overview
- **Definition**: Distributed file system abstraction in Databricks
- Mounted on top of cloud storage (S3, Azure Blob, Google Cloud Storage)
- Provides a unified file system interface across different cloud environments

## DBFS Hierarchy Structure

### Root Level: `/dbfs`
- Root of the Databricks File System
- Represents the mounted cloud storage

### Key Directories
1. **`/dbfs/mnt/`**
   - Primary mounting point for external storage
   - Allows integration with cloud storage systems
   - Example structures:
     ```
     /dbfs/mnt/
     ├── raw/
     ├── processed/
     ├── landing/
     └── archive/
     ```

2. **`/dbfs/user/`**
   - Personal workspace for individual users
   - Typically: `/dbfs/user/<username>/`
   - Stores personal notebooks, scripts, temporary files

3. **`/dbfs/tmp/`**
   - Temporary file storage
   - Used for intermediate computations
   - Temporary data processing files

## Hive Metastore

### Purpose
- Centralized metadata repository
- Manages schema and table information
- Provides database and table abstraction

### Default Database
- Name: `default`
- Created automatically in every Databricks workspace
- Stores tables without explicit database specification

### Hive Metastore Hierarchy
```
Hive Metastore
│
├── Databases
│   ├── default (system default)
│   ├── custom_db1
│   └── custom_db2
│
└── Tables
    ├── default.table1
    ├── default.table2
    ├── custom_db1.table1
    └── custom_db2.table2
```

## Example Operations

### Mounting External Storage
```python
# Mounting Azure Blob Storage
dbutils.fs.mount(
    source = "wasbs://<container>@<storage-account>.blob.core.windows.net/",
    mount_point = "/dbfs/mnt/azure-storage",
    extra_configs = {"<configuration>": "<value>"}
)
```

### Working with Default Database
```python
# Create table in default database
spark.sql("""
    CREATE TABLE default.employees (
        id INT,
        name STRING,
        department STRING
    )
""")

# Query default database
spark.sql("SHOW TABLES IN default")
```

### Database and Table Management
```python
# Create custom database
spark.sql("CREATE DATABASE sales_db")

# Create table in custom database
spark.sql("""
    CREATE TABLE sales_db.sales_data (
        sale_date DATE,
        product STRING,
        amount DECIMAL(10,2)
    )
""")
```

## Best Practices
- Use `/dbfs/mnt/` for external storage mounting
- Organize data by environment (raw, processed, etc.)
- Use custom databases for logical data separation
- Implement proper access controls
- Regularly clean up `/dbfs/tmp/` directory

## Key Differences
- **DBFS**: File system abstraction
- **Hive Metastore**: Metadata management system
- **Default Database**: System-provided database for simple table storage

The combination of DBFS and Hive Metastore provides a robust, flexible data management architecture in Databricks, enabling seamless data storage, access, and metadata tracking.
---
# Views in Databricks: Types and Characteristics

## What is a View?
- A **logical** representation of a query
- Does not store data physically
- Provides a virtual table based on the result of a SELECT statement
- Acts like a saved query that can be referenced like a table

## Types of Views

### 1. Temporary Views
- **Scope**: Exists only within a single Spark session
- Disappears when the session ends
- Useful for ad-hoc analysis

```python
# Create Temporary View
df.createOrReplaceTempView("temp_employee_view")

# Query Temporary View
spark.sql("SELECT * FROM temp_employee_view WHERE department = 'Sales'")
```

### 2. Global Temporary Views
- **Scope**: Accessible across multiple Spark sessions
- Stored in the global temp database
- Persists until the Spark application is terminated

```python
# Create Global Temporary View
df.createOrReplaceGlobalTempView("global_employee_view")

# Query Global Temporary View
spark.sql("SELECT * FROM global_temp.global_employee_view")
```

### 3. Persistent Views (Stored Views)
- **Scope**: Permanently stored in the Hive metastore
- Survives across Spark sessions
- Can be used like permanent tables

```python
# Create Persistent View
spark.sql("""
CREATE OR REPLACE VIEW hr_view AS
SELECT id, name, department
FROM employees
WHERE department = 'HR'
""")
```

## Is a View a Screenshot?
### No, Not Exactly
- **Not a Static Snapshot**
  - Always reflects the current state of underlying tables
  - Dynamically generates results when queried
  - Data changes in source tables are immediately reflected

### View vs. Materialized View
| Aspect | Regular View | Materialized View |
|--------|--------------|-------------------|
| Data Storage | No physical storage | Physically stored results |
| Performance | Recomputes each query | Precomputed, faster query |
| Data Freshness | Always current | Needs periodic refresh |

## View Characteristics
- Read-only by default
- Can combine multiple tables
- Supports complex transformations
- Provides abstraction and security
- Reduces query complexity

Views are dynamic, query-based representations that provide flexibility in data access and query design, unlike a static screenshot of data.
---
# Delta Lake Advanced Concepts: Time Travel, Compaction, Vacuum, and Indexing

## Time Travel in Delta Lake

### Concept
- Ability to access previous versions of a Delta table
- Maintains historical snapshots of data
- Enables point-in-time querying and recovery

### Key Characteristics
```python
# Accessing previous versions of a table
# By version number
df = spark.read.format("delta").option("versionAsOf", 0).load("/path/to/delta/table")

# By timestamp
df = spark.read.format("delta").option("timestampAsOf", "2024-01-01 10:00:00").load("/path/to/delta/table")
```

### Version History
- Each write operation creates a new table version
- Transaction log tracks all modifications
- Configurable history retention

## File Compaction (Optimize)

### Small File Problem
- Multiple small files reduce query performance
- Increases overhead in file management
- Impacts storage efficiency

### Compaction Process
```python
# Compact and optimize Delta table
from delta.tables import DeltaTable

deltaTable = DeltaTable.forPath(spark, "/path/to/delta/table")

# Compact files and create Z-Order index
deltaTable.optimize().executeCompaction()

# Specific column Z-Ordering
deltaTable.optimize().executeZOrderBy("id", "date")
```

### Optimization Strategies
- Combines small files into larger ones
- Improves read performance
- Reduces storage overhead
- Supports Z-Ordering for multi-dimensional indexing

## Vacuum Operation

### Purpose
- Removes old files no longer referenced in the table
- Prevents accumulation of unnecessary files
- Manages storage space

### Implementation
```python
# Vacuum operation
deltaTable.vacuum()  # Default 7 days retention

# Custom retention period (hours)
deltaTable.vacuum(168)  # 7 days
```

### Key Considerations
- Prevents time travel beyond retention period
- Configurable retention window
- Helps manage storage costs

## Indexing in Delta Lake

### Z-Ordering (Multi-Dimensional Clustering)
- Co-locates related data
- Improves query performance
- Reduces data scanning

```python
# Z-Ordering example
deltaTable.optimize().executeZOrderBy("country", "state")
```

### Clustering Benefits
- Reduces I/O
- Speeds up range and equality queries
- Works best with high-cardinality columns

## Comprehensive Example

```python
from delta.tables import DeltaTable
from pyspark.sql.functions import col

# Create Delta Table
spark.createDataFrame(...).write.format("delta").save("/path/to/table")

# Delta Table Operations
deltaTable = DeltaTable.forPath(spark, "/path/to/table")

# 1. Optimize and Z-Order
deltaTable.optimize().executeZOrderBy("id", "date")

# 2. Vacuum old files
deltaTable.vacuum(168)  # 7 days retention

# 3. Time Travel Query
old_version = spark.read.format("delta") \
    .option("versionAsOf", 1) \
    .load("/path/to/table")
```



## Performance Impact

| Operation | Performance | Storage | Use Case |
|-----------|-------------|---------|----------|
| Time Travel | Moderate | High | Historical Analysis |
| Compaction | High | Medium | Query Performance |
| Vacuum | Low | High | Storage Management |
| Z-Ordering | High | Low | Query Optimization |
---
# Delta Lake Table Creation and Management Techniques

## Create Table As Select (CTAS) vs Traditional Create Table

### CTAS (Create Table As Select)
```sql
-- CTAS Example
CREATE TABLE employees_backup 
AS SELECT * FROM employees
```

### Traditional Create Table
```sql
-- Traditional Method
CREATE TABLE employees_new (
    id INT,
    name STRING,
    department STRING
) USING DELTA
```

## Comparison of CTAS and Traditional Create Table

| Aspect | CTAS | Traditional Create Table |
|--------|------|--------------------------|
| Data Population | Immediate data copy | Schema defined, no data |
| Schema Inference | Automatic from source | Manual schema definition |
| Performance | Faster for large datasets | More control over schema |
| Flexibility | Limited customization | More configuration options |

## Table Constraints in Delta Lake

### Define Constraints
```sql
-- NOT NULL Constraint
CREATE TABLE employees (
    id INT NOT NULL,
    name STRING NOT NULL,
    salary DECIMAL(10,2) CHECK (salary > 0)
) USING DELTA

-- Adding Constraints to Existing Table
ALTER TABLE employees 
ADD CONSTRAINT positive_salary CHECK (salary > 0)
```

### Constraint Types
1. **NOT NULL**
2. **CHECK** constraints
3. **UNIQUE** constraints
4. **Primary Key** constraints

## Table Cloning in Delta Lake

### Shallow Clone
```python
# Shallow Clone
spark.sql("""
CREATE TABLE employees_clone 
CLONE employees
""")
```

### Deep Clone
```python
# Deep Clone
spark.sql("""
CREATE TABLE employees_full_clone 
CLONE employees DEEP
""")
```

## Shallow vs Deep Clone: Detailed Comparison

### Shallow Clone
- **Characteristics**
  - Creates metadata link to original table
  - No data copied
  - Lightweight
  - Shares underlying data files
  - Changes in original affect clone

### Deep Clone
- **Characteristics**
  - Complete independent copy of data
  - Full data files copied
  - Separate storage
  - Isolated from original table
  - No dependency on source table

## Comprehensive Example

```python
from delta.tables import DeltaTable

# Original Table
spark.sql("""
CREATE TABLE sales (
    sale_id INT,
    product STRING,
    amount DECIMAL(10,2),
    sale_date DATE
) USING DELTA
""")

# Add Constraints
spark.sql("""
ALTER TABLE sales 
ADD CONSTRAINT positive_amount CHECK (amount > 0)
""")

# CTAS with Filtering
spark.sql("""
CREATE TABLE high_value_sales 
AS SELECT * FROM sales 
WHERE amount > 1000
""")

# Cloning
# Shallow Clone
spark.sql("CREATE TABLE sales_shallow_clone CLONE sales")

# Deep Clone
spark.sql("CREATE TABLE sales_deep_clone CLONE sales DEEP")
```

## Best Practices

### Table Creation
- Use CTAS for quick data copying
- Define constraints early
- Leverage schema evolution
- Use appropriate cloning strategy




9. delta table vs external table in dbs
10. Querying from files
11. insert overwrite vs create and replace (CRAS) vs insert into vs vs merge into

- create and replace (CRAS) - create if not exists otherwise complete overwrite,
- insert overwrite - same as CRAS in output but it needs the table to already exist as it cant create, also it can override only the new records that match current table schema (safer as it doesnt modify table schema while overriding
- insert into - append (prone to duplication of records)
- merge into - update and insert (safer than insert into)

13. CTAS VS CRAS - for cras limitations are no option to set options which is problematic while importing csv files solution using temp view
14. spark sql vs sql & python vs spark py
15. delta table vs hive table
16. delta table vs spark sql table
17. delta table vs external table
18. delta table vs managed table
19. delta table vs unmanaged table
20. delta table vs hive external table
21. delta table vs hive managed table
22. struct data type in dbs
23. explode, collect-set, flatten, filter ,transform, UDF
