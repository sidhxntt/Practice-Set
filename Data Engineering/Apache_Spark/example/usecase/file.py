class Usage:
    def __init__(self, spark, file_path):
        self.spark = spark
        self.file_path = file_path

    def func1(self):
        """
        This function is used to count the number of records in the csv file using PySpark.
        """
        try:
            df = self.spark.read.csv(self.file_path, header=True, inferSchema=True)
            total_count = df.count()
            print(f"Total number of records in: {total_count}")
            return total_count
        except Exception as e:
            print(f"Error in func1: {e}")
            return None 
    
    def func2(self):
        """
        This function is used to count the number of records in the csv file using SQL.
        """
        try:
            df = self.spark.read.csv(self.file_path, header=True, inferSchema=True)
            view_name = "csv_data"
            df.createOrReplaceTempView(view_name)

            result_row = self.spark.sql(f"SELECT COUNT(*) AS cnt FROM {view_name}").collect()[0]
            total_count = result_row["cnt"]

            print(f"Total number of records: {total_count}")
            return total_count
        except Exception as e:
            print(f"Error in func2: {e}")
            return None