class Queue:

    def __init__(self, capacity: int):
        self.queue = [None] * capacity   # fixed-size queue
        self.capacity = capacity
        self.front = -1
        self.rear = -1

    # ---------------- Structural Functions ----------------
    def is_empty(self):
        return self.front == -1

    def is_full(self):
        return (self.rear + 1) % self.capacity == self.front

    def display(self):
        if self.is_empty():
            print("Queue is empty")
            return []
        elements = []
        i = self.front
        while True:
            elements.append(self.queue[i])
            if i == self.rear:
                break
            i = (i + 1) % self.capacity
        print("Queue (front -> rear):", elements)
        return elements

    def enqueue(self, val):
        if self.is_full():
            print("Queue Overflow! Cannot enqueue")
            return None
        if self.is_empty():
            self.front = 0
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = val
        return self.display()

    def dequeue(self):
        if self.is_empty():
            print("Queue Underflow! Cannot dequeue")
            return None
        val = self.queue[self.front]
        if self.front == self.rear:
            # queue becomes empty
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity
        return val

    def peek(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        return self.queue[self.front]

    def size(self):
        if self.is_empty():
            print("Queue size: 0")
            return 0
        if self.rear >= self.front:
            sz = self.rear - self.front + 1
        else:
            sz = self.capacity - self.front + self.rear + 1
        print(f"Queue size: {sz}")
        return sz

    # ---------------- Operational Functions ----------------
    def search(self, val):
        if self.is_empty():
            print("Queue is empty")
            return -1
        i = self.front
        pos = 0
        while True:
            if self.queue[i] == val:
                print(f"Found {val} at position {pos} from front")
                return i
            if i == self.rear:
                break
            i = (i + 1) % self.capacity
            pos += 1
        print(f"{val} not found")
        return -1

    def summation(self):
        if self.is_empty():
            print("Summation of queue elements: 0")
            return 0
        total = sum(self.display())
        print(f"Summation of queue elements: {total}")
        return total

    def max_value(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        max_val = max(self.display())
        print(f"Maximum element in queue: {max_val}")
        return max_val

    def min_value(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        min_val = min(self.display())
        print(f"Minimum element in queue: {min_val}")
        return min_val

    def is_sorted(self):
        elements = self.display()
        if elements == sorted(elements):
            print("Queue is sorted (front to rear)")
            return True
        else:
            print("Queue is NOT sorted")
            return False

    def reverse(self):
        elements = self.display()[::-1]
        print(f"Reversed queue: {elements}")
        return elements

    def duplicate_check(self):
        elements = self.display()
        seen = set()
        for item in elements:
            if item in seen:
                print(f"Duplicate found: {item}")
                return True
            seen.add(item)
        print("No duplicates found")
        return False


# ---------------- Usage Example ----------------
if __name__ == "__main__":
    q = Queue(10)  # capacity 10

    q.enqueue(10)
    q.enqueue(20)
    q.enqueue(30)
    q.display()
    print("Peek:", q.peek())
    print("Dequeue:", q.dequeue())
    q.display()
    q.summation()
    q.max_value()
    q.min_value()
    q.is_sorted()
    q.duplicate_check()
