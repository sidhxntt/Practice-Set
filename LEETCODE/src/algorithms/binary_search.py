class Algo(object):
    def linear_search (self, arr, val):
        for i, num in enumerate(arr):
            if num == val:
                return i
            
    def binary_search(self, arr, val):
        low = 0
        high = len(arr) - 1

        while low <= high:
            mid = (low + high)//2
            if arr[mid] == val:
                return mid
            elif arr[mid] < val:
                low = mid +1
            else:
                high = mid -1
        return -1
    
        
a = Algo()

arr = [3, 6, 9, 12, 13, 16, 19]
val = 13

ele1 = a.binary_search(arr, val)
ele2 = a.binary_search(arr, val)
print(ele1)
print(ele2)

# Binary search is an efficient algorithm for finding a target value in a sorted collection (like an array, list, or even conceptual search space).
# Instead of checking each item one by one (like linear search), it cuts the search space in half at each step.

