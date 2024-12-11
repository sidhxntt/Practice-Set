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

Databricks Lakehouse enables the entire pipeline, ensuring scalability, efficiency, and advanced analytics on the same platform.
---
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

1. what is delta table & why do we need delta table in dataricks also features?
2. Transaction logs concept & how does it help in giving ACID properties
3. coz its not oltp ie no db so normal sql wont work so no acid properties that why delta table as we are fetching from data lake?
4. So where is the use of data warehouse in the lakehouse thing?
5. what is the difference between delta table and delta lake?
6. dbfs:/mnt? explain databricks file system hirechry and hive,default db
7. views and types of it and it being like a ss
8. Delta lake Time travel, compacting small files and indexing , vacuum
9. CTAS VS create table, table constraints, cloning Delta Lake tables, shallow vs deep
10. delta table vs external table in dbs
11. Querying from files
12. insert overwrite vs create and replace (CRAS) vs insert into vs vs merge into
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

