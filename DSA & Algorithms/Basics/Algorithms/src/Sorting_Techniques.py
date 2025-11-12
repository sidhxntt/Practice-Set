# Algorithms: Sorting Techniques are adaptive if they take minimum time when the array is already sorted.
# Stable sorting algorithms maintain the relative order of records with equal keys (i.e., values).
class Sorting:
    def __init__(self, arr):
        self.arr = arr.copy()      # prevents modifying the caller’s list
        self.n = len(arr)

    def bubble_sort(self): 
        # Bubble Sort: repeatedly swap adjacent elements if they are in the wrong order
        # time complexity: O(n^2)
        # space complexity: O(1)
        # min time complexity: O(n) when the array is already sorted therefore this is adaptive when used with a flag
        # its stable too as duplicate elements maintain their relative positions, not suitable for linked lists
        for i in range(self.n-1): # number of passes
            flag = False  # reset each pass
            for j in range(0, self.n-i-1): # in every pass, last i elements are sorted there comparison is not needed
                if self.arr[j] > self.arr[j+1]: # swap if the element found is greater
                    self.arr[j], self.arr[j+1] = self.arr[j+1], self.arr[j] # swap the elements
                    flag = True
            if not flag: # if no two elements were swapped by inner loop, then break
                break
        return self.arr

    def insertion_sort(self):
        # Insertion Sort: build a sorted array one element at a time
        # time complexity: O(n^2)
        # space complexity: O(1)
        # by nature, it is adaptive as it reduces time complexity to O(n) when the array is already sorted
        # it is also stable as duplicate elements maintain their relative positions, also suitable for linked lists
        for i in range(1, self.n): # passes
            key = self.arr[i] # element to be placed at correct position
            j = i-1
            while j >=0 and key < self.arr[j]: # move elements of arr[0..i-1], that are greater than key, to one position ahead of their current position
                self.arr[j + 1] = self.arr[j]
                j -= 1
            self.arr[j + 1] = key
        return self.arr

    def selection_sort(self):
        # Selection Sort: repeatedly select the minimum element from unsorted part and put it at the beginning
        # time complexity: O(n^2)
        # space complexity: O(1)
        # not adaptive as time complexity remains O(n^2) even if the array is sorted
        # not stable as relative positions of duplicate elements may not be maintained
        for i in range(self.n): # passes
            min_idx = i
            for j in range(i+1, self.n):
                if self.arr[j] < self.arr[min_idx]:
                    min_idx = j
            self.arr[i], self.arr[min_idx] = self.arr[min_idx], self.arr[i] # swap the found minimum element with the first element
        return self.arr
    
    def quick_sort(self, arr):
        # Quick Sort: divide-and-conquer algorithm that selects a 'pivot' element and partitions the array around the pivot
        # time complexity: O(n log n) on average, O(n^2) in worst case
        # space complexity: O(log n) due to recursive stack space
        # not stable as relative positions of duplicate elements may not be maintained
        # not adaptive as time complexity remains O(n log n) even if the array is sorted
        # note: when recursion is used, no need of passes
        if len(arr) <= 1:
            return arr

        # Choose the first element as pivot
        pivot = arr[0]

        # Partition into two lists
        left = [x for x in arr[1:] if x <= pivot]
        right = [x for x in arr[1:] if x > pivot]

        # Recursively sort left and right, then combine
        return self.quick_sort(left) + [pivot] + self.quick_sort(right)   
    
    def merge_sort(self, arr):
        # Merge Sort: divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back
        # time complexity: O(n log n)
        # space complexity: O(n) due to temporary arrays used for merging
        # stable as relative positions of duplicate elements are maintained
        # not adaptive as time complexity remains O(n log n) even if the array is sorted
        if len(arr) <= 1:
            return arr

        # Step 1: Split array into two halves
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        # Step 2: Recursively sort both halves
        left_sorted = self.merge_sort(left_half)
        right_sorted = self.merge_sort(right_half)

        # Step 3: Merge the two sorted halves
        return Sorting._merge(left_sorted, right_sorted)

    @staticmethod
    def _merge(left, right):
        sorted_array = []
        i = j = 0

        # Merge elements from left and right in sorted order
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                sorted_array.append(left[i])
                i += 1
            else:
                sorted_array.append(right[j])
                j += 1

        # Append any remaining elements from left or right
        sorted_array.extend(left[i:])
        sorted_array.extend(right[j:])

        return sorted_array

    def count_sort(arr):
        # Step 1: Find maximum element
        max_val = max(arr)

        # Step 2: Initialize count array
        count = [0] * (max_val + 1)

        # Step 3: Store frequency of each element
        for num in arr:
            count[num] += 1

        # Step 4: Rebuild the sorted array
        i = j = 0
        while i < len(count):
            if count[i] > 0:
                arr[j] = i
                j += 1
                count[i] -= 1
            else:
                i += 1

        return arr
    
if __name__ == "__main__":
    a = [64, 34, 25, 12, 22, 11, 90]

    bubble = Sorting(a.copy()).bubble_sort()
    insertion = Sorting(a.copy()).insertion_sort()

    print("Unsorted array:", a)
    print("Bubble sorted array:", bubble)
    print("Insertion sorted array:", insertion) 

