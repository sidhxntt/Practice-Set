from utils.displayer import  Displayer
from itertools import permutations, combinations

class Array(Displayer):
    def __init__(self, capacity: int):
        self.array = [0] * capacity  # fixed size array
        self.capacity = capacity
        self.size = 0  # number of elements actually stored
        self.logger = Displayer.get_logger('Arrays')
        
    # ------------------ Mutating Methods ------------------

    @Displayer.displayer("Append")
    def append(self, val):
        if self.size == self.capacity:
            self.logger.info("Array is full")
            return
        self.array[self.size] = val
        self.size += 1

    @Displayer.displayer("Prepend")
    def prepend(self, val):
        if self.size == self.capacity:
            self.logger.info("Array is full")
            return
        for i in range(self.size, 0, -1):
            self.array[i] = self.array[i - 1]
        self.array[0] = val
        self.size += 1

    @Displayer.displayer("Insert")
    def insert_at_position(self, val, pos):
        if self.size == self.capacity:
            self.logger.info("Array is full")
            return
        if pos < 0 or pos > self.size:
            self.logger.info("Invalid position")
            return
        for i in range(self.size, pos, -1):
            self.array[i] = self.array[i - 1]
        self.array[pos] = val
        self.size += 1

    @Displayer.displayer("Delete")
    def delete(self, pos=None, start=False, end=False):
        if self.size == 0:
            self.logger.info("Array is empty")
            return

        if start:  # delete first element
            deleted = self.array[0]
            for i in range(1, self.size):
                self.array[i - 1] = self.array[i]
            self.array[self.size - 1] = 0
            self.size -= 1
            self.logger.info(f"Deleted Element: {deleted}")

        elif end:  # delete last element
            deleted = self.array[self.size - 1]
            self.array[self.size - 1] = 0
            self.size -= 1
            self.logger.info(f"Deleted Element: {deleted}")

        elif pos is not None:  # delete at position
            if pos < 0 or pos >= self.size:
                self.logger.info("Invalid position")
                return
            deleted = self.array[pos]
            for i in range(pos + 1, self.size):
                self.array[i - 1] = self.array[i]
            self.array[self.size - 1] = 0
            self.size -= 1
            self.logger.info(f"Deleted Element: {deleted}")
        else:
            self.logger.info("Specify start, end, or pos")

    @Displayer.displayer("Sorting", reversed=True)
    def sorting(self):
        def is_sorted():
            for i in range(1, self.size):
                if self.array[i - 1] > self.array[i]:
                    return False
            return True

        if not is_sorted():
            self.array[:self.size] = sorted(self.array[:self.size])
            self.logger.info("Array was not sorted. Now sorted.")
        else:
            self.logger.info("Array is already sorted.")

    @Displayer.displayer("De-duplication")
    def duplicates(self, remove=False): 
        def find_duplicates():
            seen = {}
            found = False

            for i, num in enumerate(self.array[:self.size]):  # only check valid elements
                if num in seen:
                    self.logger.info(f"Duplicate found: {num} at index {i} (first seen at {seen[num]})")
                    found = True
                else:
                    seen[num] = i
            
            if not found:
                self.logger.info("No Duplicates Found")
            return found
        
        def remove_duplicates():
            unique = []
            for num in self.array[:self.size]:
                if num not in unique:
                    unique.append(num)

            # Replace contents with unique values
            self.array[:len(unique)] = unique
            for i in range(len(unique), self.capacity):
                self.array[i] = 0  # clear trailing values
            self.size = len(unique)

            self.logger.info(f"Array after removing duplicates: {self.array[:self.size]}")

        # Run appropriate action
        has_dupes = find_duplicates()
        if remove and has_dupes:
            remove_duplicates()

    # ------------------ Non-Mutating Methods ------------------

    def search_element(self, val, linear=False, binary=False):
        if linear:
            for i, num in enumerate(self.array[:self.size]):
                if num == val:
                    self.logger.info(f"Found {val} at index {i}")
                    return i
            self.logger.info(f"{val} not found")
            return -1

        elif binary:
            left, right = 0, self.size - 1
            while left <= right:
                mid = (left + right) // 2
                if self.array[mid] == val:
                    self.logger.info(f"Found {val} at index {mid}")
                    return mid
                elif self.array[mid] < val:
                    left = mid + 1
                else:
                    right = mid - 1
            self.logger.info(f"{val} not found")
            return -1

    def maths(self):
        if self.size == 0:
            self.logger.info("Array is empty")
            return

        data = self.array[:self.size]
        length = len(data)
        summation = sum(data)
        average = summation / length
        minimum = min(data)
        maximum = max(data)

        perms_count = len(list(permutations(data)))
        combs_count = sum(len(list(combinations(data, r))) for r in range(1, len(data) + 1))

        self.logger.info("---------------------------------")
        self.logger.info(f"size = {length}")
        self.logger.info(f"sum = {summation}")
        self.logger.info(f"avg = {average}")
        self.logger.info(f"min = {minimum}")
        self.logger.info(f"max = {maximum}")
        self.logger.info(f"permutations count = {perms_count}")
        self.logger.info(f"combinations count = {combs_count}")
        self.logger.info("---------------------------------")

    def maths2(self, split_pos=None, merge_pos=False, perform_ops=False):
        if split_pos is None:
            self.logger.info("Please provide a split position (int)")
            return

        if split_pos < 0 or split_pos >= self.size:
            self.logger.info("Invalid split position")
            return

        arr1 = self.array[:split_pos]
        arr2 = self.array[split_pos:self.size]
        self.logger.info(f"array 1: {arr1} & array 2: {arr2}")

        def merged_at_pos(val, arr1, arr2, use_first=True):
            if use_first:
                arr3 = arr1[:val] + arr2
            else:
                arr3 = arr2[:val] + arr1
            self.logger.info(f"New array: {arr3}")
            return arr3

        def set_operations(arr1, arr2):
            intersection = list(set(arr1) & set(arr2))
            union = list(set(arr1) | set(arr2))
            difference = list(set(arr1) - set(arr2))
            self.logger.info("---------------------------------")
            self.logger.info(f"Intersection = {intersection}")
            self.logger.info(f"Union        = {union}")
            self.logger.info(f"Difference   = {difference}")
            self.logger.info("---------------------------------")

        if merge_pos:
            merged_at_pos(2, arr1, arr2, use_first=False)
        elif perform_ops:
            set_operations(arr1, arr2)
        else:
            merged_at_pos(2, arr1, arr2, use_first=False)
            set_operations(arr1, arr2)

# ------------------ Example Usage ------------------
if __name__ == "__main__":
    a = Array(10)
    a.append(7)
    a.append(3)
    a.append(3)
    a.append(5)
    a.prepend(9)
    a.insert_at_position(200, 2)
    a.delete(start=True)   # removes 9
    a.duplicates(remove=True)
    a.sorting()

    a.search_element(5, binary=True)
    a.maths()

    a.maths2(split_pos=2, merge_pos=True)
    a.maths2(split_pos=2, perform_ops=True)