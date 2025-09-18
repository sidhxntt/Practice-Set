# connect Spark to a cluster
# Connecting Spark to a cluster means Spark stops being a “one-machine engine” and becomes a distributed engine.
# Instead of just your laptop doing all the work, you use many machines working together.
# This is where Spark shines — handling terabytes or petabytes of data.

from pyspark.sql import SparkSession
from usecase.file import Usage

file_path = "/Users/siddhantgupta/Desktop/SID/Practice-Set/Data Engineering/Apache_Spark/example/corpus.csv"

spark = (SparkSession.builder
            .master("local[*]")
            .appName("Test")
            .getOrCreate())

if __name__ == "__main__":

    print("Testing both functions")
    print("--------------------------------")
    
    count1 = Usage(spark, file_path).func1()
    print(f"Count1: {count1}")

    print("--------------------------------")
    count2 = Usage(spark, file_path).func2()
    print(f"Count2: {count2}")
    print("--------------------------------")

    if count1 == count2:
        print("Both functions are working correctly")
    else:
        print("Both functions are not working correctly")
    spark.stop()