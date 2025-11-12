# Heaps are specialized tree-based data structures that satisfy the heap property.
# Heaps are complete binary trees, meaning all levels are fully filled except possibly for the last level, which is filled from left to right.
# In a max-heap, for any given node, the value of the node is greater than or equal to the values of its children.
# In a min-heap, for any given node, the value of the node is less than or equal to the values of its children.
# They are widely used in priority queues, heap sort algorithms, and graph algorithms like Dijkstra's and Prim's.
# Heaps are commonly implemented using arrays for efficient storage and access.
#  Array representation: where for any index i, left child is at 2*i + 1 and right child is at 2*i + 2 and parent is at (i - 1) // 2. That means for Heaps arrays cannot have any empty spaces between elements.
class Heap:
    def __init__(self):
        self.heap = []

    def insert(self, key): 
        # inserts in O(log n) time and always inserts at the end of the heap ie leaf then adjust(heapify-up is performed) to maintain heap property
        self.heap.append(key)
        i = len(self.heap) - 1
        # Heapify-up (bubble up)
        while i > 0:
            parent = (i - 1) // 2
            if self.heap[i] > self.heap[parent]:
                self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
                i = parent
            else:
                break

    def create_heap(self, arr):
    # Create heap by inserting one by one in O(n log n) time
        self.heap = []
        for key in arr:
            self.insert(key)
        return self.heap
    
    def delete(self):
        # In heap only root can be deleted in O(log n) time  , once root is deleted last element is put at root and heapify-down is performed to maintain heap property ie compare root with children and swap with larger child in max-heap
        n = len(self.heap)
        if n == 0:
            return None  # empty heap

        # Step 1: Save root value (to return later if needed)
        root = self.heap[0]

        # Step 2: Move last element to root and shrink heap
        self.heap[0] = self.heap[-1]
        self.heap.pop()  # removes last element
        n -= 1

        # Step 3: Heapify-down inline (no helper function)
        i = 0
        while True:
            left = 2 * i + 1
            right = 2 * i + 2
            largest = i

            # Find largest among parent, left, right
            if left < n and self.heap[left] > self.heap[largest]: # compare left child with parent 
                largest = left # update largest to left child index
            if right < n and self.heap[right] > self.heap[largest]: # compare right child with parent 
                largest = right # update largest to right child index

            # If parent is already larger, heap is valid
            if largest == i:
                break

            # Swap and continue
            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            i = largest

        return root  # or return self.heap if you prefer

    def heap_sort(self):
        # Heap sort: O(n log n)
        n = len(self.heap)
        sorted_list = []

        # Step 1: Build the heap from existing elements
        self.create_heap(self.heap)

        # Step 2: Repeatedly delete the root and collect results
        for _ in range(n):
            max_val = self.delete()
            sorted_list.append(max_val)

        # Step 3: The sorted_list has elements in descending order for a max-heap
        sorted_list.reverse()  # make it ascending order

        return sorted_list
    
    # when inserting we insert at the end and adjust by lifting the element up to the root to maintain heap property (heapify-up)
    # when deleting we delete the root and put the last element at root and adjust by pushing the element down to maintain heap property (heapify-down)
    # Note: heapify we start from right to left and bottom to top when creating heap from arbitrary array unlike above insert and delete methods

class MaxHeap:
    def __init__(self):
        self.heap = []  # make sure heap is initialized

    def display(self):
        return self.heap

    def insert(self, key):
        self.heap.append(key)
        n = len(self.heap) - 1
        self._heapify_up(n)

    def create_heap(self, arr):
        self.heap = []
        for key in arr:
            self.insert(key)
        return self.heap

    def delete(self):
        if not self.heap:
            return None  # empty heap

        root = self.heap[0]
        last = self.heap.pop()
        if self.heap:  # only heapify if heap still has elements
            self.heap[0] = last
            self._heapify_down(len(self.heap))
        return root

    def heap_sort(self):
        # make a copy to preserve original heap
        temp_heap = MaxHeap()
        temp_heap.create_heap(self.heap[:])  # copy of heap

        sorted_list = []
        while temp_heap.heap:
            max_val = temp_heap.delete()
            sorted_list.append(max_val)

        sorted_list.reverse()  # ascending order
        return sorted_list

    # Helper: move inserted element upward
    def _heapify_up(self, n):
        i = n
        while i > 0:
            parent = (i - 1) // 2
            if self.heap[i] > self.heap[parent]:
                self.heap[i], self.heap[parent] = self.heap[parent], self.heap[i]
                i = parent
            else:
                break

    # Helper: move root downward after delete
    def _heapify_down(self, n):
        i = 0
        size = n
        while True:
            left = 2 * i + 1
            right = 2 * i + 2
            largest = i

            if left < size and self.heap[left] > self.heap[largest]:
                largest = left
            if right < size and self.heap[right] > self.heap[largest]:
                largest = right

            if largest == i:
                break

            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            i = largest

# Same as MinHeap can be implemented similarly by adjusting comparisons

# Example Usage
if __name__ == "__main__":
    max_heap = MaxHeap()
    elements = [3, 1, 6, 5, 2, 4]
    print("Creating heap from array:", elements)
    max_heap.create_heap(elements)
    print("Heap array representation:", max_heap.display())
    print("Heap sorted array:", max_heap.heap_sort())  # works on a copy
    print("Deleting root:", max_heap.delete())         # still works correctly
    print("Heap after deletion:", max_heap.display())