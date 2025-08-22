from utils.displayer import logger, Displayer

class Arrays(Displayer):

    def display(self, arr): 
        logger.info(f"Current array: {arr}")    # display the array O(1)

    @Displayer.auto_display("Append element")
    def append_ele(self, arr, val):
        arr.append(val)                 # appends the element at the end of the array O(1)

    @Displayer.auto_display("Insert element")
    def insert_ele(self, arr, val, index):
        arr.insert(index, val)          # inserts the element at given index of the array O(n)

    @Displayer.auto_display("Delete element by value")
    def delete_ele(self, arr, val): 
        if val in arr:
            arr.remove(val)             # removes the element at the end of the array O(n)
        else:
            logger.warning(f"Value {val} not found!")

    @Displayer.auto_display("Delete element by Index")
    def delete_ele_from_index(self, arr, index):
        # remove element at specified index
        if 0 <= index < len(arr):
            arr.pop(index)              #  remove element at specified index of the array O(1)
        else:
            logger.warning(f"Index {index} out of bounds!")

    @Displayer.auto_display("Get element")
    def get(self, arr, index):
        if 0 <= index < len(arr): # returns element at index O(1)
            return arr[index]
        else:
            logger.warning(f"Index {index} out of bounds!")
            return None

    @Displayer.auto_display("Set element")
    def set(self, arr, index, val):
        if 0 <= index < len(arr): 
            arr[index] = val # updates element at index O(1)
        else:
            logger.warning(f"Index {index} out of bounds!")

    def avg(self, arr):
        if arr:
            return sum(arr) / len(arr) # computes average; O(1)
        else:
            logger.warning("Array is empty!")
            return None

    def min(self, arr):
        if arr:
            return min(arr) # returns min O(1)
        else: 
            logger.warning("Array is empty!")
            return None

    def max(self, arr):
        if arr:
            return max(arr) # returns min O(1)
        else:
            logger.warning("Array is empty!")
            return None

    def linear_search(self, arr, val):
        for i, num in enumerate(arr):
            if num == val:
                logger.info(f"Found {val} at index {i}") # Search element in O(n)
                return i
        logger.info(f"{val} not found")
        return -1
    
    def binary_search(self, arr: list[int], val: int): # Search element in O(logn) {faster as  O(n) >  O(logn) therefore the above takes more time than this}
        arr.sort() # only works if sorted
        n = len(arr)
        left = 0
        right = n - 1

        while left <= right:
            mid = (left + right)//2
            if arr[mid] == val:
                logger.info(f"Found {val} at index {mid}") 
                return mid
            elif arr[mid] < val:
                left = mid +1
            else:
                right = mid -1
        logger.info(f"{val} not found")
        return -1
    
    def is_sorted_or_not(self, arr):  # O(n)
        for i in range(1, len(arr)):
            if arr[i-1] > arr[i]:
                logger.info("Array is NOT sorted")
                return False
        logger.info("Array IS sorted")
        return True
    
    def duplicate(self, arr: list):  # O(n)
        seen = {}

        for i, num in enumerate(arr):
            if num in seen:
                logger.info(f"Duplicate found: {num} at index {i} (first seen at {seen[num]})")
                return True
            else:
                seen[num] = i
        
        logger.info("No Duplicates Found")
        return False

    @Displayer.auto_display("Reverse array")
    def reverse(self, arr: list[int]):  # O(n)
        arr[::-1]
    
    def merge_arrays(self, arr1, arr2):  # O(n+m) here as m=n so O(n)
        arr3 = arr1 + arr2
        logger.info(f"Merged arrays: {arr3}")

    def merge_arrays_at_middle(self, arr1, arr2):  # O(n + m)
        mid = len(arr1) // 2
        # take first half of arr1 + second half of arr2
        merged = arr1[:mid] + arr2[mid:]
        logger.info(f"Merged array: {merged}")
        return merged

    def union(self, arr1, arr2):
        """Return the union of arr1 and arr2 (all unique elements)"""
        result = list(set(arr1) | set(arr2))
        logger.info(f"Union: {result}")
        return result

    def intersection(self, arr1, arr2):
        """Return the intersection of arr1 and arr2 (common elements)"""
        result = list(set(arr1) & set(arr2))
        logger.info(f"Intersection: {result}")
        return result

    def difference(self, arr1, arr2):
        """Return the difference arr1 - arr2 (elements in arr1 not in arr2)"""
        result = list(set(arr1) - set(arr2))
        logger.info(f"Difference (arr1 - arr2): {result}")
        return result

if __name__ == "__main__":
    a = Arrays()

    arr1 = [4, 2, 5, 1, 7, 3, 9]
    arr2 = arr1.copy()
    arr3 = [1, 2, 3, 4, 5]
    arr4 = [4, 5, 6, 7, 4]

    operations = [
        ("Original array", a.display, arr1),
        ("Add element 99", a.append_ele, arr1, 99),
        ("Insert 23 at index 3", a.insert_ele, arr1, 23, 3),
        ("Delete element 5", a.delete_ele, arr1, 5),
        ("Delete element at index 2", a.delete_ele_from_index, arr1, 2),
        ("Linear search 99", a.linear_search, arr1, 99),
        ("Binary search 7", a.binary_search, arr1, 7),
        ("Is sorted or not", a.is_sorted_or_not, arr2),
        ("Reversed", a.reverse, arr2),
        ("Duplicated", a.duplicate, arr4),
        ("Merged Arrays", a.merge_arrays, arr3, arr4),
        ("Merged Arrays at middle", a.merge_arrays_at_middle, arr3, arr4),
        ("Union of Arrays", a.union, arr3, arr4),
        ("Intersection of Arrays", a.intersection, arr3, arr4),
        ("Difference of Arrays", a.difference, arr3, arr4),
    ]

    Displayer.execute(operations)