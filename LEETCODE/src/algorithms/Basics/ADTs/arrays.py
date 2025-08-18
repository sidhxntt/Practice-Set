from utils.displayer import Displayer

class Arrays(Displayer):

    def display(self, arr): 
        print("Current array:", arr)    # display the array O(1)

    @Displayer.auto_display
    def append_ele(self, arr, val):
        arr.append(val)                 # appends the element at the end of the array O(1)

    @Displayer.auto_display
    def insert_ele(self, arr, val, index):
        arr.insert(index, val)          # inserts the element at given index of the array O(1)

    @Displayer.auto_display
    def delete_ele(self, arr, val): 
        if val in arr:
            arr.remove(val)             # removes the element at the end of the array O(1)
        else:
            print(f"Value {val} not found!")

    @Displayer.auto_display
    def delete_ele_from_index(self, arr, index):
        # remove element at specified index
        if 0 <= index < len(arr):
            arr.pop(index)              #  remove element at specified index of the array O(1)
        else:
            print(f"Index {index} out of bounds!")

    @Displayer.auto_display
    def get(self, arr, index):
        if 0 <= index < len(arr): # returns element at index O(1)
            return arr[index]
        else:
            print(f"Index {index} out of bounds!")
            return None

    @Displayer.auto_display
    def set(self, arr, index, val):
        if 0 <= index < len(arr): 
            arr[index] = val # updates element at index O(1)
        else:
            print(f"Index {index} out of bounds!")

    def avg(self, arr):
        if arr:
            return sum(arr) / len(arr) # computes average; O(1)
        else:
            print("Array is empty!")
            return None

    def min(self, arr):
        if arr:
            return min(arr) # returns min O(1)
        else: 
            print("Array is empty!")
            return None

    def max(self, arr):
        if arr:
            return max(arr) # returns min O(1)
        else:
            print("Array is empty!")
            return None

    @Displayer.auto_display
    def linear_search(self, arr, val):
        for i, num in enumerate(arr):
            if num == val:
                print(f"Found {val} at index {i}") # Search element in O(n)
                return i
        print(f"{val} not found")
        return -1
    
    @Displayer.auto_display
    def binary_search(self, arr, val): # Search element in O(logn) {faster as  O(n) >  O(logn) therefore the above takes more time than this}
        arr.sort()
        n = len(arr)
        low = 0
        high = n-1

        while(low <= high):
            mid = low+high//2
            if arr[mid] == val:
                return mid
            elif arr[mid] < val:
                low = mid +1
            else:
                high = mid -1
        return -1


# Usage
arr = [4, 2, 5, 1, 7, 3, 9]
a = Arrays()

operations = [
    ("Original array", a.display, arr),
    ("Add element 99", a.append_ele, arr, 99),
    ("Insert 23 at index 3", a.insert_ele, arr, 23, 3),
    ("Delete element 5", a.delete_ele, arr, 5),
    ("Delete element at index 2", a.delete_ele_from_index, arr, 2),
    ("Linear search 99", a.linear_search, arr, 99),
    ("Binary search 7", a.binary_search, arr, 7)
]

Displayer.execute(operations)

