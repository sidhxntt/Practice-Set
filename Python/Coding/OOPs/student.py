from person import *

class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # Call the parent constructor
        self.student_id = student_id  # New attribute for students

    def greet(self):
        """Override greet to include student ID."""
        print(f"Hello, my name is {self.name}, I am {self.get_age()} years old, and my student ID is {self.student_id}.")

    def study(self):
        """New method specific to Student class."""
        print(f"{self.name} is studying.")

# Only allow `Student` to be imported when using `from student import *`
__all__ = ["Student"]

