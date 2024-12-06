# POWERBI

## WORKFLOW

To get data into Power BI, you use the Power BI Desktop application to connect to data sources, transform the data, and build reports. Here’s a step-by-step guide to doing it properly:

**Step 1: Launch Power BI Desktop**

1. Open Power BI Desktop.
2. You will land on the Home screen.

**Step 2: Connect to a Data Source**

1. Go to the Home Tab:
   - Click Get Data.
   - A dropdown menu appears with various data source options.
2. Choose the Data Source:
   - Common options include:
   - Excel: For files in .xlsx or .xls format.
   - SQL Server: For databases.
   - Web: For online data (e.g., APIs, web tables).
   - Text/CSV: For .csv or .txt files.
   - Other: SharePoint, Azure, Oracle, etc.
   - Select the source you want to connect to.
3. Provide Connection Details:
   - For files: Browse and select the file.
   - For databases: Enter server name, database name, and authentication details (e.g., username/password).

**Step 3: Preview and Load Data**

1. Preview Data:
   - After connecting, Power BI displays a preview of the data.
   - This step ensures you are importing the correct table, query, or file.
2. Load or Transform:
   - Load: Imports the data as-is into Power BI.
   - Transform Data: Opens Power Query Editor for cleaning and shaping the data.

**Step 4: Transform Data in Power Query (Optional)**

1. Clean the Data:
   - Remove unnecessary columns.
   - Filter rows (e.g., exclude null values or unwanted data).
   - Rename columns to make them meaningful.
2. Shape the Data:
   - Split or merge columns.
   - Add calculated columns or custom formulas.
   - Combine data from multiple sources (e.g., merges, appends).
3. Apply and Close:
   • After transformations, click Close & Apply to load the cleaned data into Power BI.

**Step 5: Model the Data**

1. Check Relationships:
   - Navigate to the Model View to see how tables are related.
   - Power BI auto-detects relationships but allows manual adjustments.
2. Create Measures and Calculated Columns:
   - Use DAX (Data Analysis Expressions) for advanced calculations like totals, averages, or custom KPIs.

**Step 6: Visualize the Data**

1. Switch to Report View:
   - Add visuals like charts, tables, maps, and slicers to your report.
2. Drag Fields into Visuals:
   - Drag fields from the Fields pane onto visuals in the canvas.
   - Use fields for Axis, Values, or Filters.

**Step 7: Publish the Report**

1. Save Your Work:
   - Save the report as a .pbix file.
2. Publish to Power BI Service (Optional):
   - Share the report online by publishing it to the Power BI service.
   - Go to File > Publish > Publish to Power BI.

**Common Data Sources Supported in Power BI**

- File-Based:
- Excel, CSV, Text, XML, JSON.
- Database-Based:
- SQL Server, MySQL, PostgreSQL, Oracle, etc.
- Cloud-Based:
- Azure, Google Analytics, Salesforce, Dynamics 365, etc.
- Web-Based:
- APIs, web pages.
  > POWER BI DESKTOP --> POWER BI SERVICE --> COLLABOROATION

## IMPORTING TECHNIQUES

In Power BI, there are three main modes of importing data into your reports: Import, DirectQuery, and Live Connection. Each has its own use cases, benefits, and limitations. Here’s a detailed explanation:

1. ### _Import Mode_

- What It Does:
  - Power BI imports a snapshot of the data from the source into its internal in-memory model.
  - The entire dataset is loaded and stored in the .pbix file.
- Key Features:
  - High Performance: Data is preloaded, enabling fast visualizations and queries.
  - Disconnected from Source: Once imported, Power BI doesn’t require a live connection to the data source.
  - Scheduled Refresh: Data can be refreshed periodically (e.g., hourly, daily).
- Best For:
  - Small to medium-sized datasets that fit into memory.
  - Scenarios where high-speed interactivity is needed (e.g., quick filtering, cross-filtering).
- Limitations:
  - Limited to the dataset size that fits into Power BI’s memory.
  - Large datasets can cause performance issues or exceed size limits.
- Example Use Case:
  - Importing a CSV file, an Excel workbook, or a SQL Server table.

2. ### _DirectQuery Mode_

- What It Does:
  - Power BI doesn’t store the data. Instead, it sends queries directly to the source database every time a visualization is refreshed or a filter is applied.
  - Data is not cached locally; it remains in the source system.
- Key Features:
  - Real-Time Data: Displays the most up-to-date information from the database.
  - No Data Size Limit: Works with very large datasets because only relevant data is retrieved.
- Best For:
  - Scenarios where data changes frequently, and real-time updates are critical (e.g., stock prices, live dashboards).
  - Very large datasets that cannot fit into memory.
- Limitations:
  - Performance depends on the data source; slower sources may result in slower visuals.
  - Fewer Power BI features are available (e.g., some DAX functions may not work).
  - Heavily reliant on query folding for performance optimization.
- Example Use Case:
  - Connecting to a large SQL Server database or cloud-based services like Azure Synapse Analytics.

3. ### _Live Connection_

- What It Does:
  - Similar to DirectQuery, Power BI connects directly to the data source.
  - However, it is used specifically for connecting to multidimensional models, like SQL Server Analysis Services (SSAS), Azure Analysis Services, or Power BI Datasets in the cloud.
- Key Features:
  - The data resides in the SSAS/Analysis Services model, and Power BI doesn’t import or query the raw data directly.
  - Provides access to pre-defined measures, hierarchies, and relationships in the source.
- Best For:
  - Scenarios where centralized enterprise models (SSAS or Azure AS) are managed by IT teams.
  - Sharing a consistent data model across multiple Power BI reports.
- Limitations:
  - No custom modeling or DAX calculated columns in Power BI (relies on the model defined in SSAS).
  - Requires high-performing Analysis Services instances.
- Example Use Case:
  - Connecting to an enterprise cube for corporate reporting.

Choosing the Right Mode

    -	Import Mode:
    •	Use when performance is critical, and the dataset size is manageable.
    •	Ideal for offline or periodic analysis.
    •	DirectQuery Mode:
    •	Use for large datasets and real-time updates, provided the source system is performant.
    •	Live Connection:
    •	Use when connecting to centralized multidimensional models or shared datasets.

## POWER BI LANGUAGES

| **Language** | **Primary Use**                    | **Where Used in Power BI**                  |
| ------------ | ---------------------------------- | ------------------------------------------- |
| **T-SQL**    | Querying relational databases      | Data loading (Direct Query/Import)          |
| **MDX**      | Querying OLAP cubes                | SSAS Multidimensional Models                |
| **M Code**   | Data transformation (ETL)          | Power Query for reshaping and cleaning data |
| **DAX**      | Advanced calculations and modeling | Data modeling and report creation           |

---

> T-SQL (Transact-SQL) is an extension of SQL (Structured Query Language), specifically developed by Microsoft for SQL Server.

> MDX (Multidimensional Expressions) is used for querying OLAP (Online Analytical Processing) databases.

> M Code is a formula language used in Power Query for data transformation and ETL (Extract, Transform, Load) processes.

> DAX (Data Analysis Expressions) is a formula language used in Power BI for data modeling and report creation.

## QUERY FOLDING

### **_Step-by-Step Breakdown of query folding_**

1. **Apply Transformations in Power Query**:
   - You apply various transformations like filtering, grouping, renaming columns, or adding calculated fields in Power Query using its graphical interface.
2. **M Code Generates Backend Instructions**:
   - Power Query automatically writes these steps in M code (Power Query Formula Language) behind the scenes. Each step you create corresponds to a line of M code.
3. **Translation to Native Query:**
   - If the data source supports query folding, Power Query translates the M code transformations into native queries (e.g., SQL for databases).
   - For example, a filter applied in Power Query might be converted into an equivalent SQL WHERE clause.
4. **Native Query Sent to the Source:**
   - The generated native query is sent to the source database (or data system). The database processes the transformations locally, leveraging its own computing power.
5. **Result Returned to Power BI:**
   - The database executes the query and returns only the resulting data to Power Query or Power BI.
   - This result is smaller and already transformed, reducing the amount of data transferred and processed locally in Power BI.

### **_Benefits of Query Folding_**

- **Improved Performance:** By executing transformations at the source, you reduce the amount of data transferred and
  processed in Power BI, leading to faster report generation.
- **Enhanced Scalability:** Query folding allows Power BI to handle large datasets more efficiently, as the heavy lifting is done at the source.
- **Simplified Data Management:** By leveraging the capabilities of the source system, you can manage data more effectively, reducing the need for complex data transformations in Power BI.

### ***T-SQL’s Role in Query Folding***
1.	**Translation of M Code to T-SQL:**
	-	Power Query writes transformations in M code.
	-	If the database is SQL Server, Power Query translates the M code steps into equivalent T-SQL queries (the native language of SQL Server).
	-	These queries include SQL operations like SELECT, WHERE, GROUP BY, etc.
2.	**Execution in the SQL Server:**
	-	The T-SQL query is sent to the database, where SQL Server executes the instructions to filter, aggregate, or transform data.
	-	The computation happens on the server, not in Power BI.
3.	**Result Delivery:**
	-	The database sends only the result set (filtered or transformed data) back to Power Query for further use in Power BI.

## POWER BI MODELS
Data Modeling in Power BI refers to the process of organizing, structuring, and creating relationships between different datasets in your Power BI report to enable effective analysis, reporting, and decision-making. A good data model in Power BI ensures that your data is efficient, easy to work with, and produces accurate results for analysis.

### Key Components of Data Modeling in Power BI

1.	**Tables:**
	-	Power BI uses tables to store data, which can be loaded from various sources like Excel, SQL Server, or APIs.
	-	Each table contains rows (data) and columns (fields).
	-	Tables can be imported or connected using DirectQuery or Live Connection.
2.	**Relationships:**
	-	Relationships link different tables together, enabling Power BI to combine data from multiple tables for analysis.
	- Types of Relationships:
	    - **One-to-Many:** One record in a table relates to many records in another table (e.g., one customer to many orders).
	    - **Many-to-Many:** Records in two tables can relate to many records in the other table (less common, but useful in certain cases).
	    - **One-to-One:** One record in one table relates to exactly one record in another table.
    - Relationships are usually defined through primary keys and foreign keys between tables.
3.	**Data Model Views:**
	-	**Model View:** A visual representation of all the tables and their relationships. You can create, manage, and adjust relationships here.
	-	**Diagram View:** A graphical way to manage and view tables and their relationships, which helps visualize data flow.
	-	**Data View:** Displays the actual data in the tables (rows and columns), where you can inspect and work with your data directly.

### Creating Relationships in Power BI

1.	Automatic Relationship Detection:
	- Power BI automatically detects relationships between tables based on matching column names.
2.	Manual Relationship Creation:
	-	You can manually create relationships by dragging fields between tables in the Model View.
	-	You can configure the relationship type (one-to-many, etc.), direction, and whether the relationship is active or inactive.
3.	Cross-Filtering:
	-	Single Directional Filtering: One table’s filters affect the other table.
	-	Bidirectional Filtering: Both tables can filter each other, useful in certain modeling scenarios.

### Creating Calculated Columns and Measures

1.	Calculated Columns:
	-	Calculated columns are new fields that are created in the data model using DAX (Data Analysis Expressions) formulas.
	-	Example: Create a new column that combines “First Name” and “Last Name” into a “Full Name”.

` Full Name = Customers[FirstName] & " " & Customers[LastName] ` 

2.	Measures:
	-	Measures are dynamic calculations that aggregate data based on filters or context (e.g., total sales, average revenue).
	-	Measures are calculated at the time of data visualization and are not stored in the table but recalculated whenever a user interacts with a report.
Example of a measure to calculate total sales:

`Total Sales = SUM(Orders[SalesAmount])`

### Normalization vs. Star Schema

1.	***Normalization:***
	-	Breaking down tables into smaller, related tables to reduce redundancy and improve data integrity.
	-	Example: You might have separate tables for Customers, Orders, and Products.
2.	***Star Schema:***
	-	A dimensional model with a central fact table and related dimension tables around it (looks like a star).
	-	The fact table holds numerical data (e.g., sales, quantities) and foreign keys linking to dimension tables (e.g., Customer, Time, Product).
	-	Star schema simplifies analysis and is preferred for performance.

### Managing Data Relationships and Hierarchies

1.	***Hierarchies***:
	-	You can create hierarchies (e.g., Year → Quarter → Month → Day) to enable users to drill down in reports.
	-	Hierarchies are often created in dimension tables to represent logical groupings (e.g., geography: Country → State → City).
2.	***Row-Level Security (RLS)***:
	-	RLS restricts data access based on user roles. It ensures that users only see the data they are allowed to view.
	-	For example, salespeople only see data related to their own region.

### Relationship vs Cardinality 
- Relationships and cardinality are essential concepts in data modeling in Power BI. Relationships are connections between tables based on shared columns, allowing filtering and aggregation across related tables. They serve different purposes, such as defining data flow during queries and defining the number of matches between rows. 
- Cardinality refers to the nature of the relationship between two tables in terms of the number of matches between their rows, describing the "multiplicity" of the relationship. Key differences between the two concepts include their definitions, purpose, focus, and the logic of the connection between tables.
- In practice, creating a relationship in Power BI involves defining the relationship by linking a column in Table A to a corresponding column in Table B, specifying the cardinality of the relationship, and setting the cross-filter direction. Understanding these concepts ensures an efficient, accurate, and tailored data model.

### Optimizing a Power BI data model 
- Optimizing a Power BI data model is essential for ensuring fast performance, efficient resource usage, and seamless user experience. 
- To optimize a model, use a star schema with a central fact table and related dimension tables, avoiding highly normalized schemas that can complicate relationships and slow performance.
- Reduce data volume by filtering data at the source and aggregating data where detailed granularity isn't needed. Optimize relationships by using one-to-many (1:M) relationships and setting appropriate cross-filter directions. Choose the most efficient data types for columns and avoid text columns unless necessary for reporting. 
- Minimize calculated columns by creating calculated columns at the source or in Power Query instead of DAX. Optimize DAX calculations by using simpler formulas and variables. Disable Auto Date/Time and create a custom date table for time-based analysis.
- Manage cardinality and relationships by avoiding high-cardinality columns and aggregating or grouping data at higher levels. Reduce column and table complexity by combining similar tables or removing unused columns using Power Query. Optimize Query Folding by ensuring transformations in Power Query are folded into native queries. 
- Use Aggregations by creating pre-aggregated tables for high-level reporting and configure Power BI's Aggregation feature to switch between detailed and summary data seamlessly. 
- Limit visual complexity by reducing the number of visuals on a single report page.
- Use Incremental Refresh for large datasets in Power BI Premium or Pro. Enable compression by using fewer unique values. Monitor and analyze performance using the Performance Analyzer in Power BI.

### Best Practices for Data Modeling in Power BI

1.	Keep Models Simple:
	-	Try to avoid complex relationships and calculations that might slow down the performance.
	-	Organize the model logically (group similar tables, keep related fields together).
2.	Use Star Schema:
	-	For ease of use and better performance, structure your model around a star schema with fact and dimension tables.
3.	Avoid Circular Relationships:
	-	Circular dependencies (where two or more tables refer to each other in a loop) can cause issues and should be avoided.
4.	Use DAX for Efficiency:
	-	Use DAX to create efficient calculations, measures, and aggregations, but try to keep it as simple as possible to avoid performance overhead.
5.	Data Modeling in Power Query:
	-	Perform data cleaning and transformations in Power Query before loading the data to the model to reduce complexity in the model.
---
## Query Diagnostics

Query Diagnostics in Power BI is a feature that helps you analyze and troubleshoot the performance and behavior of your queries in Power Query.
Query Diagnostics in Power BI is a feature that helps you analyze and troubleshoot the performance and behavior of your queries in Power Query. It provides detailed insights into how queries are processed, which can help identify bottlenecks or inefficiencies in your data transformations.

### *Why Use Query Diagnostics?*

1. **Understand Performance Issues**:
   - Identify steps that consume the most time during query execution.
2. **Monitor Query Folding**:
   - Check if transformations are being folded into a single query or processed locally.
3. **Debug Issues**:
   - Pinpoint errors or unexpected results in your queries.
4. **Optimize Queries**:
   - Use diagnostics to make transformations more efficient by reducing unnecessary operations.
---
>The phrase “Check if transformations are being folded into a single query or processed locally” refers to verifying whether the transformations you apply in Power Query are being executed by the source database or are handled locally by Power Query in Power BI. This is important for performance optimization.

### Two Scenarios in Query Execution

1. ### Query Folding (Processed on the Source):

	-	Transformations like filtering, grouping, or selecting columns are translated into a single query (e.g., SQL) that runs on the source database.
	    -	**Key Benefits:**
	        -	The database processes the data using its computational power.
	        -	Only the final, transformed data is sent to Power BI, reducing the amount of data transferred.
	        -	Optimized for speed and resource efficiency.

    - **Example of Query Folding**:
	    -	Transformation in Power Query: Filter rows where Sales > 1000.
	    -	Generated SQL (Native Query):

            `SELECT * FROM SalesTable WHERE Sales > 1000;`

	    - The filter is applied on the database, and only the filtered rows are sent to Power BI.

2. ### Local Processing (Processed by Power Query):

	-	If query folding breaks (i.e., transformations cannot be translated into a native query), the data is first loaded as is into Power BI.
	-	The remaining transformations are applied locally within Power Query, using your machine’s resources.
	    -	Key Issues:
	        -	Higher data transfer costs (entire dataset might need to be loaded).
	        -	Slower performance because the transformations rely on local processing rather than the database.

    - **Example of Local Processing:**

	    - Transformation in Power Query: Adding a custom column with a complex formula that the source database does not support.
	    -	In this case, Power BI retrieves the entire dataset first, then applies the custom column transformation locally.

# How to Choose the Right Visualization for an Appropriate Data Scenario

Choosing the right visualization is essential for effectively communicating insights. The decision depends on the type of data, the story you want to tell, and the insights you want your audience to gain. Here's a structured guide:

## 1. Identify the Purpose of the Visualization

Understand the goal of your analysis. Common purposes include:
- **Comparison**: Compare values across categories or time.
- **Trend Analysis**: Show changes over time.
- **Distribution**: Display how data is spread out.
- **Composition**: Show parts of a whole.
- **Relationships**: Highlight correlations or connections between variables.
- **Geographical Analysis**: Represent data spatially.

---

## 2. Choose Visualization Based on Data Type

| **Purpose**             | **Best Visualizations**                                                                                               |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Comparison**           | Bar Chart, Column Chart, Line Chart, Dot Plot                                                                         |
| **Trend Analysis**       | Line Chart, Area Chart, Scatter Plot with Trend Line                                                                  |
| **Distribution**         | Histogram, Box Plot, Scatter Plot, Density Plot                                                                       |
| **Composition**          | Pie Chart (limited categories), Donut Chart, Stacked Bar/Column Chart, 100% Stacked Chart, Treemap                    |
| **Relationships**        | Scatter Plot, Bubble Chart, Network Diagram                                                                           |
| **Geographical Analysis**| Map (Filled, Choropleth, or Point Map), Heat Map                                                                      |
| **Ranking**              | Bar Chart (sorted), Lollipop Chart                                                                                   |
| **Flow/Process**         | Sankey Diagram, Funnel Chart                                                                                          |

---

## 3. Match Visualization to Data Granularity
- **Aggregated Data**: Use bar, pie, or line charts to show summarized trends.
- **Detailed Data**: Use tables or scatter plots to show specific data points.

---

## 4. Consider Audience and Context
- **Simplicity**: Ensure the visualization is easy to understand for the target audience.
- **Focus**: Avoid clutter and focus on the key message or insight.

---

## 5. Popular Scenarios and Recommended Visualizations

### **A. Time-Series Analysis**
- **Scenario**: Tracking performance or changes over time (e.g., sales growth, website traffic).
- **Best Visualization**: 
  - **Line Chart**: For continuous data over time.
  - **Area Chart**: To emphasize total trends.

### **B. Category Comparison**
- **Scenario**: Comparing different groups or categories (e.g., sales by region).
- **Best Visualization**: 
  - **Bar Chart**: For discrete comparisons.
  - **Stacked Bar Chart**: For showing sub-category contributions.

### **C. Composition (Parts of a Whole)**
- **Scenario**: Showing the contribution of parts to the total (e.g., market share).
- **Best Visualization**: 
  - **Pie Chart**: Limited to 5–6 categories for clarity.
  - **Treemap**: For hierarchical or large data sets.

### **D. Correlation or Relationships**
- **Scenario**: Exploring relationships between two or more variables (e.g., sales vs. marketing spend).
- **Best Visualization**: 
  - **Scatter Plot**: For continuous variables.
  - **Bubble Chart**: To add a third variable as size.

### **E. Distribution Analysis**
- **Scenario**: Understanding data spread (e.g., income levels in a population).
- **Best Visualization**: 
  - **Histogram**: For frequency distribution.
  - **Box Plot**: To show quartiles and outliers.

### **F. Geographical Analysis**
- **Scenario**: Visualizing location-based data (e.g., population density by state).
- **Best Visualization**: 
  - **Choropleth Map**: For density or intensity.
  - **Point Map**: For individual locations.

### **G. Process or Flow**
- **Scenario**: Showing sequences or connections (e.g., user journey, resource flow).
- **Best Visualization**: 
  - **Sankey Diagram**: For flow between categories.
  - **Funnel Chart**: For step-wise processes like sales pipelines.


## Visualization Decision Workflow

1. **What do you want to show?**
   - Trends, comparisons, relationships, or distributions.
2. **Who is your audience?**
   - Technical or non-technical users.
3. **What level of detail do you need?**
   - Summarized (high-level) or detailed insights.
4. **Choose a visualization based on these factors and refine iteratively.**
