# This strategy works on the principle of "divide and conquer", where the problem is divided into smaller subproblems that are easier to solve.
# Usually, these subproblems are solved recursively, and their solutions are combined to solve the original problem.
from Sorting_Techniques import Sorting

class DivideAndConquer(Sorting):
    def __init__(self, arr):
        self.n = len(arr)
        super().__init__(arr)
   
    def _binary_search_recursive(self, val, low, high):
        if low > high:
            return -1
        mid = (low + high) // 2
        if self.arr[mid] == val:
            return mid
        elif self.arr[mid] < val:
            return self._binary_search_recursive(val, mid + 1, high)
        else:
            return self._binary_search_recursive(val, low, mid - 1)

    def binary_search(self, val):
        return self._binary_search_recursive(val, 0, self.n - 1)
    
    def sort(self, quick_sort=False):
        if quick_sort:
            self.arr = self.quick_sort(self.arr)
        else:
            self.arr = self.merge_sort(self.arr)
        return self.arr

    def min_max(self):
        # base cases
        if self.n == 1:
            return (self.arr[0], self.arr[0])

        if self.n == 2:
            return (min(self.arr[0], self.arr[1]), max(self.arr[0], self.arr[1]))

        # divide
        mid = self.n // 2

        left = DivideAndConquer(self.arr[:mid])
        right = DivideAndConquer(self.arr[mid:])

        left_min, left_max = left.min_max()
        right_min, right_max = right.min_max()

        # combine
        return (min(left_min, right_min), max(left_max, right_max))
        
 
if __name__ == "__main__":
    arr = [38, 27, 43, 3, 9, 82, 10]     
    a = DivideAndConquer(arr)
    val = arr[3]
    arr_sorted = a.sort()
    ele1 = a.binary_search(val)
    print("Sorted array using Merge Sort:", arr_sorted)
    print(f"Element {val} found at index: {ele1}")
    min_val, max_val = a.min_max()
    print(f"Minimum value: {min_val}, Maximum value: {max_val}")


