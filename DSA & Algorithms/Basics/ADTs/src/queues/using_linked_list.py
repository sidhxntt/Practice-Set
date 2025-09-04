class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class Queue:
    def __init__(self):
        self.front = None
        self.rear = None

    # ---------------- Structural Functions ----------------
    def is_empty(self):
        return self.front is None

    def display(self):
        if self.is_empty():
            print("Queue is empty")
            return []
        current = self.front
        elements = []
        while current:
            elements.append(current.data)
            current = current.next
        print(f"Queue (front -> rear): {elements}")
        return elements

    def enqueue(self, val):
        new_node = Node(val)
        if self.is_empty():
            self.front = self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
        return self.display()

    def dequeue(self):
        if self.is_empty():
            print("Queue Underflow! Cannot dequeue")
            return None
        val = self.front.data
        self.front = self.front.next
        if self.front is None:  # queue became empty
            self.rear = None
        print(f"Dequeued element: {val}")
        return val

    def peek(self):
        if self.is_empty():
            print("Queue is empty")
            return None
        return self.front.data

    def size(self):
        count = 0
        current = self.front
        while current:
            count += 1
            current = current.next
        print(f"Queue size: {count}")
        return count

    # ---------------- Operational Functions ----------------
    def search(self, val):
        if self.is_empty():
            print("Queue is empty")
            return -1
        pos = 0
        current = self.front
        while current:
            if current.data == val:
                print(f"Found {val} at position {pos} from front")
                return pos
            current = current.next
            pos += 1
        print(f"{val} not found")
        return -1

    def summation(self):
        total = sum(self.display())
        print(f"Summation of queue elements: {total}")
        return total

    def max_value(self):
        elements = self.display()
        if not elements:
            print("Queue is empty")
            return None
        max_val = max(elements)
        print(f"Maximum element in queue: {max_val}")
        return max_val

    def min_value(self):
        elements = self.display()
        if not elements:
            print("Queue is empty")
            return None
        min_val = min(elements)
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
    q = Queue()

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
