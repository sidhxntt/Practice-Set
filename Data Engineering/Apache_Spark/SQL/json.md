Perfect 👌 Let’s go through **Spark SQL JSON functions** in detail. These are very powerful when working with **semi-structured JSON data inside a column** (common in logs, API responses, IoT data, etc.).

---

# 🔹 1. Why JSON Functions?

* Often, Spark loads data from sources where one column contains a **JSON string**.
* JSON functions let you **parse, query, and manipulate JSON data** directly in Spark SQL or DataFrames.

Example:

```python
data = [
    (1, '{"name":"Alice","age":30,"skills":["Python","Spark"]}'),
    (2, '{"name":"Bob","age":35,"skills":["Java","SQL"]}')
]

df = spark.createDataFrame(data, ["id", "json_str"])
df.show(truncate=False)
```

---

# 🔹 2. Core JSON Functions in Spark SQL

### 1️⃣ `get_json_object(json_str, path)`

Extracts a **field** from a JSON string using a **JSONPath expression** (`$.field`).

```sql
SELECT get_json_object(json_str, '$.name') AS name,
       get_json_object(json_str, '$.age') AS age
FROM my_table
```

Output:

```
Alice | 30
Bob   | 35
```

---

### 2️⃣ `json_tuple(json_str, 'field1', 'field2', ...)`

Extracts **multiple fields** at once (works faster than multiple `get_json_object` calls).

```sql
SELECT json_tuple(json_str, 'name', 'age') AS (name, age)
FROM my_table
```

---

### 3️⃣ `from_json(json_str, schema)`

Parses a JSON string into a **struct** (usable like a DataFrame column).

```python
from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, ArrayType

schema = StructType([
    StructField("name", StringType()),
    StructField("age", IntegerType()),
    StructField("skills", ArrayType(StringType()))
])

df_parsed = df.withColumn("data", from_json(col("json_str"), schema))
df_parsed.select("id", "data.name", "data.age", "data.skills").show()
```

---

### 4️⃣ `to_json(struct_or_map)`

Converts a **struct or map column back into a JSON string**.

```python
from pyspark.sql.functions import to_json, struct

df2 = df_parsed.withColumn("json_back", to_json(struct("data.name", "data.age")))
df2.select("id", "json_back").show(truncate=False)
```

---

### 5️⃣ `schema_of_json(json_str)`

Infers the **schema** of a JSON string.

```sql
SELECT schema_of_json('{"name":"Alice","age":30}')
```

Returns:

```
struct<name:string, age:int>
```

---

### 6️⃣ `explode` with JSON arrays

You can **flatten JSON arrays**.

```sql
SELECT explode(from_json(get_json_object(json_str, '$.skills'), array<string>)) AS skill
FROM my_table
```

Output:

```
Python
Spark
Java
SQL
```

---

# 🔹 3. Putting It All Together

Imagine we query:

```sql
SELECT id,
       get_json_object(json_str, '$.name') AS name,
       get_json_object(json_str, '$.age') AS age,
       json_tuple(json_str, 'name', 'age') AS (n, a),
       from_json(json_str, 'struct<name:string, age:int, skills:array<string>>') AS parsed
FROM my_table
```

* `get_json_object` → extracts individual fields.
* `json_tuple` → extracts multiple fields in one go.
* `from_json` → converts into a structured column (usable as DataFrame).

---

# 🔹 4. Analogy (Restaurant Menu 📖)

* Think of JSON as a **menu card written in one string**:

  ```json
  {"item":"Pizza","price":250,"toppings":["Cheese","Olives"]}
  ```

* `get_json_object` → ask: “What’s the price?” (extract one field).

* `json_tuple` → ask: “Give me both item and price.”

* `from_json` → convert the menu into a **table with columns** (item, price, toppings).

* `to_json` → take the structured table and **reprint it back into JSON**.

* `explode` → split toppings into separate rows.

---

✅ **Summary**:

* **Extraction**: `get_json_object`, `json_tuple`
* **Parsing**: `from_json`, `schema_of_json`
* **Conversion**: `to_json`
* **Flattening**: `explode` with JSON arrays

