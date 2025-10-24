# Why Databricks needs Azure storage — the short version

Databricks separates **compute** (managed Spark clusters) from **persistent storage**. Azure Storage (typically **Azure Data Lake Storage Gen2 (ADLS Gen2)** or **Blob Storage**) is the durable, scalable place where Databricks keeps your data, Delta tables, logs, checkpoints, ML artifacts, and job state. Without an external cloud store you would lose persistence when clusters shutdown — storage is where your data _lives_.

# What Databricks actually stores in Azure Storage

- **Delta tables / Parquet files** (the actual table data files)
- **Delta transaction log** (`_delta_log`) — needed for ACID, time-travel and atomic operations
- **Checkpoint files** for structured streaming
- **Job logs, driver/executor logs, and spark event logs**
- **Library jars / wheel files / init scripts (optional)** if you stage them in storage
- **Model artifacts / MLflow model registry artifacts** if configured to use storage
- **Temp/staging data** used during ETL, shuffle spills, and intermediate results
- **Backups, exports, snapshots** — any persistent assets

# Why cloud storage (ADLS/Blob) — benefits vs local ephemeral disks

1. **Durability & Persistence** — cluster VMs are ephemeral; storage is durable and replicated.
2. **Scale & Cost** — object storage scales to petabytes cheaply compared to block disks.
3. **Separation of compute and storage** — you can spin clusters up/down independently and share the same data across teams and jobs.
4. **Multi-client access** — different workspaces, jobs, and clusters can read/write the same Delta tables and assets.
5. **Governance & Compliance** — encryption, access control, logging at the storage layer.
6. **Data Lake semantics** — hierarchical namespace, lifecycle policies, tiering, and analytics integrations.

# Recommended Azure storage: ADLS Gen2 (vs Blob)

- **ADLS Gen2 (Blob + Hierarchical Namespace)** is usually recommended for Databricks because:

  - It supports **POSIX-like ACLs** and fine-grained access control.
  - Better semantics for big-data workloads (rename operations are atomic when HNS is enabled).
  - Works well with Delta Lake transaction logs and metadata operations.

- Plain **Blob Storage** works too (and many customers use it), but lacks hierarchical namespace and fine-grained ACLs.

# How Databricks accesses Azure storage (common patterns)

- **Direct access** using `abfss://<container>@<account>.dfs.core.windows.net/...` (preferred for ADLS Gen2) from Spark code.
- **DBFS (Databricks File System)** — a Databricks-managed mount/virtual filesystem backed by Azure storage. Convenient but consider security/multi-tenant concerns.
- **Mounts** (`dbutils.fs.mount`) map a storage container into DBFS namespace — easy, but mounts share credentials and can be complex for fine-grained governance.
- **Unity Catalog + Storage Credentials** — Unity Catalog integrates governance with storage credentials for secure, auditable table access.
- **Credential methods**:

  - **Service Principal (app registration)** with OAuth/ABFS (recommended for programmatic access)
  - **Managed Identity / MSI** (if using VNet injection / workspace identity)
  - **SAS tokens** (short-lived; less recommended for long-term)
  - **Account keys** (not recommended; poor security practice)

# Security & governance concerns — best practices

- **Use ADLS Gen2 with HNS** + POSIX ACLs for fine-grained control.
- **Prefer service principal or managed identity** over account keys/SAS for credential management.
- **Enable Unity Catalog** for table/column-level permissions, central governance, and lineage.
- **Use private endpoints / VNet injection** so Databricks and storage traffic stay inside your VNet.
- **Enable storage firewall** and allow access only from trusted Databricks-managed VNet or private endpoint.
- **Customer-managed keys (CMK)** if you must control encryption keys (Azure Key Vault).
- **Audit logs**: enable storage logging and Databricks audit logs for compliance and forensics.
- **Avoid broad mounts** when teams require separate access controls — prefer direct `abfss://` with credentials per-process or Unity Catalog storage credentials.

# Performance and operational tips

- **Avoid many tiny files** — small-file problem harms Spark performance. Use compaction (`OPTIMIZE` in Delta) and write larger parquet files (ideally 100MB–1GB depending on workload).
- **Partition sensibly** (not over-partition). Choose partition columns that reduce scanning without creating too many partitions.
- **Use Delta Optimize (ZORDER)** to speed selective queries.
- **Cache hot tables** (Databricks cache) if you have repeated reads and can afford the memory.
- **Choose appropriate storage tier** (hot/cool/archive) according to access patterns to manage cost.
- **Streaming checkpoints**: store streaming checkpoint locations on ADLS so structured streaming can resume reliably.
- **Leverage Databricks’ I/O optimizations** (IO Cache, vectorized reads).

# Networking & connectivity

- **Secure connectivity**: enable Private Link / Private Endpoint between Databricks and your storage account.
- **VNet injection**: gives you control over network policies and egress.
- **Storage firewall**: restrict access to specific VNet/subnet or private endpoints.
- **DNS / routing**: ensure clusters can resolve and reach storage endpoints when using private endpoints.

# Cost considerations

- Storage costs include **capacity**, **transactions (API calls)**, **egress**, and **access tier**. Design pipelines to minimize excessive small writes/reads (which create many transactions).
- **Store raw + curated** layers thoughtfully; use lifecycle policies (move old data to cool/archive).
- Compute costs (Databricks clusters) are separate — you can minimize compute by using efficient file formats (Parquet/Delta) and partitioning to reduce scanned data.

# Practical examples (quick snippets)

Read a Delta table from ADLS Gen2 (using abfss) in a Spark notebook:

```python
# spark config must have credentials (see below) or use Unity Catalog/credential passthrough
df = spark.read.format("delta").load("abfss://mycontainer@myaccount.dfs.core.windows.net/path/to/delta_table")
display(df.limit(10))
```

Mount storage to DBFS (convenient but consider security of mounts):

```python
configs = {
  "fs.azure.account.auth.type": "OAuth",
  "fs.azure.account.oauth.provider.type": "org.apache.hadoop.fs.azurebfs.oauth2.ClientCredsTokenProvider",
  "fs.azure.account.oauth2.client.id": "<service-principal-id>",
  "fs.azure.account.oauth2.client.secret": dbutils.secrets.get(scope="my-scope", key="sp-secret"),
  "fs.azure.account.oauth2.client.endpoint": "https://login.microsoftonline.com/<tenant-id>/oauth2/token"
}
dbutils.fs.mount(
  source = "abfss://mycontainer@myaccount.dfs.core.windows.net/",
  mount_point = "/mnt/mycontainer",
  extra_configs = configs)
```

Using a storage credential in Unity Catalog (high-level idea — Unity Catalog UI/SQL API):

```sql
CREATE STORAGE CREDENTIAL my_cred
  WITH SERVICE_PRINCIPAL '<app-id>', SECRET = '<secret>', TENANT = '<tenant-id>';

CREATE EXTERNAL LOCATION my_ext_loc
  WITH (URL='abfss://mycontainer@myaccount.dfs.core.windows.net/', CREDENTIAL=my_cred);
```

# Summary — when and why Azure Storage matters for DBX

- **Essential** for durable storage of your tables, logs, checkpoints, and artifacts.
- **ADLS Gen2** is recommended for enterprise RBAC/ACLs and better semantics.
- **Enables lakehouse features**: Delta transaction logs, time travel, atomic writes.
- **Required for governance & sharing**: Unity Catalog connects metadata to concrete storage roots.
- **Security & network controls** must be applied to protect data in storage.

> By keeping storage separate from compute, Databricks gains flexibility, scalability, and cost efficiency.
When you run a Databricks job, here’s what actually happens:
You connect to your data lake (ADLS/S3/GCS).
Databricks spins up a Spark cluster (compute layer).
Spark reads and writes data directly to your storage.
When you stop the cluster, compute disappears, but your data remains safely in the cloud storage.
Unity Catalog (or the Hive metastore) keeps the metadata — table schemas, locations, permissions.
So Databricks acts as a smart engine that runs on top of your data lake, not a data warehouse that stores it inside.
🏠 Azure Storage = your pantry — it holds all the raw ingredients (data).

👨‍🍳 Databricks = the chef — comes in, uses the ingredients to prepare meals (analytics, ML models).

🗒️ Unity Catalog = the recipe book — keeps track of what’s in the pantry and who’s allowed to use what.
Although Databricks doesn’t store data, it does maintain:

Metadata (schemas, tables, lineage) in Unity Catalog or Hive Metastore

Job configurations, notebooks, clusters, and workspace settings in its control plane

Temporary execution data on cluster nodes (ephemeral storage while running jobs)

But all persistent data (your Delta tables, logs, models, etc.) live in your Azure Storage account.

