class Sorting:
    def __init__(self, arr):
        self.arr = arr.copy()      # prevents modifying the caller’s list
        self.n = len(arr)

    def bubble_sort(self): 
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
    
if __name__ == "__main__":
    a = [64, 34, 25, 12, 22, 11, 90]

    bubble = Sorting(a.copy()).bubble_sort()
    insertion = Sorting(a.copy()).insertion_sort()

    print("Unsorted array:", a)
    print("Bubble sorted array:", bubble)
    print("Insertion sorted array:", insertion) 

