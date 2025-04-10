import random
import os
import json
READ_FILE_PATH = "/Users/siddhantgupta/Desktop/SID/Practice-Set/Python/Coding/sample.json"

class Collections:
    """
    This class contains methods to demonstrate the use of different collection types in Python.
    It includes examples for lists, tuples, and dictionaries.
    """
    def __init__(self):
        self.read_file_path = READ_FILE_PATH

    def list_func(self, mylist):
        """
        List (Ordered, Mutable, Allows Duplicates)
        """
        print("Original list:", mylist)
        print("Slicing [1:3]:", mylist[1:3])
        print("Step slicing [1:9:2]:", mylist[1:9:2])
        print("Reversed list:", mylist[::-1])

        mylist.sort()
        print("Sorted list:", mylist)

        mylist.extend([2, 3, 3])
        print("After appending:", mylist)
        print("Count of 2:", mylist.count(2))
        print("Index of 2:", mylist.index(2))

        mylist.remove(3)  # Only removes the first occurrence
        print("After removing one 3:", mylist)

        print("Popped (last):", mylist.pop())
        print("Popped (index 0):", mylist.pop(0))

        mylist.reverse()
        print("Reversed again:", mylist)

        new_list = mylist.copy()
        squared = [x**2 for x in new_list] # List comprehension (map)
        filtered = [x for x in new_list if x%2==0] # List comprehension (filter)
        print("New list:", new_list)
    
        print("Filtered list (even numbers):", filtered)
        print("Squared list:", squared)
        print("Sum:", sum(squared))
        print("Max:", max(squared))
        print("Min:", min(squared))
        print("Length:", len(squared))

        if len(mylist) >= 2:
            x, y, *z = mylist
            print("Destructured:", x, y, z)
        else:
            print("Not enough elements to destructure.")

        return mylist

    def tuple_func(self, mylist):
        """
        Tuple (Ordered, Immutable, Allows Duplicates)
        """
        mytuple = tuple(mylist)
        print("Tuple:", mytuple)

        if mytuple:
            print("First element:", mytuple[0])
        else:
            print("Tuple is empty. No elements to access.")

        try:
            mytuple[0] = 10
        except TypeError as e:
            print("Error (Tuples are immutable):", e)

        print("Tuple slicing [0:3]:", mytuple[0:3])
        print("Converted to list for modification:", list(mytuple))

    def dict_func(self):
        """
        Dictionary (Unordered, Mutable, No Duplicates)
        """
        try:
            with open(self.read_file_path, "r", encoding="utf-8") as file:
                data = json.load(file)
                my_dict = dict(data)

                print("Dictionary:", my_dict)
                print('--' * 50)
                print("Keys:", list(my_dict.keys()))
                print('--' * 50)
                print("Values:", list(my_dict.values()))
                print('--' * 50)
                print("Items:", list(my_dict.items()))
                print('--' * 50)
                print("Length:", len(my_dict))
                print("Is empty:", not bool(my_dict))
                print("Contains 'name':", "name" in my_dict)
        except FileNotFoundError:
            print(f"File not found: {self.read_file_path}")
        except json.JSONDecodeError:
            print(f"Failed to decode JSON from: {self.read_file_path}")

    def set_func(self):
        """
        Sets (Unordered, Mutable, No Duplicates)
        """
        set1 = set([random.randint(1, 100) for _ in range(10)])
        set2 = set([random.randint(1, 100) for _ in range(7)])
        set3 = set([random.randint(1, 100) for _ in range(9)])
        print("Set 1:", set1)
        print("Set 2:", set2)
        print("Set 3:", set3)
        print("Union:", set1.union(set2, set3))
        print("Intersection:", set1.intersection(set2, set3))
        print("Difference:", set1.difference(set2))
        print("Symetric Difference:", set1.symmetric_difference(set2))
        print("Subset:", set1.issubset(set2))
        print("SuperSet:", set1.issuperset(set2))
        print("Disjoint:", set1.isdisjoint(set2))
        
def main():
    mycollection = Collections()
    sample_list = [random.randint(1, 100) for _ in range(10)]

    print("\n--- List Function ---")
    updated_list = mycollection.list_func(sample_list)

    print("\n--- Tuple Function ---")
    mycollection.tuple_func(updated_list)

    print("\n--- Dictionary Function ---")
    mycollection.dict_func()
    
    print("\n--- Set Function ---")
    mycollection.set_func()

if __name__ == "__main__":
    main()
