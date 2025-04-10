from student import *

# Creating a Student object
student1 = Student("Bob", 20, "S12345")

student1.greet()  # Output: Hello, my name is Bob, I am 20 years old, and my student ID is S12345.

# Using inherited method
print(f"Is Bob an adult? {Student.is_adult(student1.get_age())}")  # True

# Using Student-specific method
student1.study()  # Output: Bob is studying.

# Checking total population
print(f"Total population: {Student.get_population()}")  # 1

student1()