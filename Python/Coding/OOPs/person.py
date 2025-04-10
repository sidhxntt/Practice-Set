class Person:
    population = 0  # Class-level variable (shared across all instances)

    def __init__(self, name, age):
        self.__name = name  # Private attribute
        self.__age = age    # Private attribute
        Person.population += 1  # It keeps track of the total number of Person objects created.

    def greet(self):
        print(f"Hello, my name is {self.__name} and I am {self.__age} years old.")

    @property # The @property decorator allows name to be accessed like an attribute instead of calling a method.
    def name(self):
        """Getter for name."""
        return self.__name

    @name.setter
    def name(self, new_name):
        """Setter for name with validation."""
        if new_name:
            self.__name = new_name
        else:
            print("Name cannot be empty.")

    def set_age(self):
        """Sets age through user input."""
        new_age = input("Please enter your age: ")
        if new_age.isdigit() and int(new_age) > 0:
            self.__age = int(new_age)
        else:
            print("Age must be a positive integer.")

    def get_age(self):
        """Returns the age."""
        return self.__age

    @classmethod
    def get_population(cls):
        """Returns the total number of Person instances."""
        return cls.population

    @staticmethod
    def is_adult(age):
        """Checks if a person is an adult (18+)."""
        return age >= 18

    def __call__(self) -> None:
        """Makes the object callable like a function."""
        self.greet()

    def __del__(self):
        """Destructor to decrease population count when an instance is deleted."""
        Person.population -= 1
        print(f"{self.__name} has been removed.")

# Usage
if __name__ == "__main__": # ensures that the block of code only runs when the script is executed directly, not when it's imported.
    person1 = Person("Alice", 25)
    person1.greet()  # Output: Hello, my name is Alice and I am 25 years old.

    person1.set_age()
    print(f"Updated Age: {person1.get_age()}")  # Updated age after user input

    print(f"Is Alice an adult? {Person.is_adult(person1.get_age())}")  # Uses @staticmethod

    print(f"Total population: {Person.get_population()}")  # Uses @classmethod

    person1()  # Calls __call__(), behaves like a function

    del person1  # Calls __del__()

    print(f"Total population after deletion: {Person.get_population()}")  # Updated count

__all__ = ["Person"]