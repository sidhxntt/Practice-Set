from utils.displayer import logger, Displayer
from arrays import Arrays
class Strings(Arrays):

    def display(self, arr): 
        logger.info(f"Current array: {arr}")    # display the array O(1)

   

# Usage
if __name__ == "__main__":
    a = Strings()

    str1 = "Siddhant Gupta"
    str2 = str1 # strings are immutable unlike lists in py
    str3 = "Priyanka Mishra"
    # str4 = "Sanskar Mohanty"

    operations = [
        ("Original array", a.display, str1),
        ("Add element 99", a.append_ele, str1, 99),
        ("Insert 23 at index 3", a.insert_ele, str1, 23, 3),
        ("Delete element 5", a.delete_ele, str1, 5),
        ("Delete element at index 2", a.delete_ele_from_index, str1, 2),
        ("Linear search 99", a.linear_search, str1, 99),
        ("Binary search 7", a.binary_search, str1, 7),
        ("Is sorted or not", a.is_sorted_or_not, str2),
        ("Reversed", a.reverse, str2),
        # ("Merged Arrays", a.merge_arrays, str3, str4),
        # ("Merged Arrays at middle", a.merge_arrays_at_middle, str3, str4),
        # ("Union of Arrays", a.union, str3, str4),
        # ("Intersection of Arrays", a.intersection, str3, str4),
        # ("Difference of Arrays", a.difference, str3, str4),
    ]

    Displayer.execute(operations)