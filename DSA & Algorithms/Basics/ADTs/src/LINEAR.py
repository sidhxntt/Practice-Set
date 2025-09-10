from itertools import permutations, combinations

class Array:
    def __init__(self, capacity: int):
        self.array = [0] * capacity  # fixed size array
        self.capacity = capacity
        self.size = 0  # number of elements actually stored

    def display(self):
        print(self.array[:self.size])  # only show valid elements

    def append(self, val):
        if self.size == self.capacity:
            print("Array is full")
            return
        self.array[self.size] = val
        self.size += 1

    def prepend(self, val):
        if self.size == self.capacity:
            print("Array is full")
            return
        for i in range(self.size, 0, -1):
            self.array[i] = self.array[i - 1]
        self.array[0] = val
        self.size += 1

    def insert_at_position(self, val, pos):
        if self.size == self.capacity:
            print("Array is full")
            return
        if pos < 0 or pos > self.size:
            print("Invalid position")
            return
        for i in range(self.size, pos, -1):
            self.array[i] = self.array[i - 1]
        self.array[pos] = val
        self.size += 1

    def delete(self, pos=None, start=False, end=False):
        if self.size == 0:
            print("Array is empty")
            return
        
        if start:  # delete first element
            deleted = self.array[0]
            for i in range(1, self.size):
                self.array[i - 1] = self.array[i]
            self.array[self.size - 1] = 0
            self.size -= 1
            print(f"Deleted Element: {deleted}")

        elif end:  # delete last element
            deleted = self.array[self.size - 1]
            self.array[self.size - 1] = 0
            self.size -= 1
            print(f"Deleted Element: {deleted}")

        elif pos is not None:  # delete at position
            if pos < 0 or pos >= self.size:
                print("Invalid position")
                return
            deleted = self.array[pos]
            for i in range(pos + 1, self.size):
                self.array[i - 1] = self.array[i]
            self.array[self.size - 1] = 0
            self.size -= 1
            print(f"Deleted Element: {deleted}")
        else:
            print("Specify start, end, or pos")

    def maths(self):
        if self.size == 0:
            print("Array is empty")
            return

        data = self.array[:self.size]  # work only with filled part
        length = len(data)
        summation = sum(data)
        average = summation / length
        minimum = min(data)
        maximum = max(data)

        perms = [list(p) for p in permutations(data)]
        combs = []
        for r in range(1, len(data) + 1):
            combs.extend(list(c) for c in combinations(data, r))

        print(f"""
            ---------------------------------
            size = {length}
            sum = {summation}
            avg = {average}
            min = {minimum}
            max = {maximum}
            permutations = {perms}
            combinations = {combs}
            ---------------------------------
        """)

if __name__ == "__main__":
    a = Array(5)
    a.append(3)
    a.append(5)
    a.append(7)
    a.prepend(9)
    a.display()          # [9, 3, 5, 7]
    a.insert_at_position(200, 2)
    a.display()          # [9, 3, 200, 5, 7]
    a.delete(start=True) # removes 9
    a.display()          # [3, 200, 5, 7]
    a.maths()
