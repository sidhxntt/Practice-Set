class Stacks:

    def __init__(self, capacity: int):
        self.stack = [None] * capacity   # fixed-size stack
        self.capacity = capacity
        self.top = -1

    # ---------------- Structural Functions ----------------
    def is_empty(self):
        return self.top == -1

    def is_full(self):
        return self.top == self.capacity - 1

    def display(self):
        if self.is_empty():
            print("Stack is empty")
        else:
            print("Stack (top -> bottom):", self.stack[:self.top+1][::-1])
        return self.stack[:self.top+1]

    def push(self, val):
        if self.is_full():
            print("Stack Overflow! Cannot push")
            return None
        self.top += 1
        self.stack[self.top] = val
        return self.stack[:self.top+1]

    def pop(self):
        if self.is_empty():
            print("Stack Underflow! Cannot pop")
            return None
        val = self.stack[self.top]
        self.stack[self.top] = None   # optional: clear slot
        self.top -= 1
        return val

    def peek(self):
        if self.is_empty():
            print("Stack is empty")
            return None
        return self.stack[self.top]

    def size(self):
        print(f"Stack size: {self.top+1}")
        return self.top + 1

    # ---------------- Operational Functions ----------------
    def search(self, val):
        for i in range(self.top, -1, -1):
            if self.stack[i] == val:
                print(f"Found {val} at position {self.top - i} from top")
                return i
        print(f"{val} not found")
        return -1

    def summation(self):
        total = sum(x for x in self.stack[:self.top+1] if x is not None)
        print(f"Summation of stack elements: {total}")
        return total

    def max_value(self):
        if self.is_empty():
            print("Stack is empty")
            return None
        max_val = max(self.stack[:self.top+1])
        print(f"Maximum element in stack: {max_val}")
        return max_val

    def min_value(self):
        if self.is_empty():
            print("Stack is empty")
            return None
        min_val = min(self.stack[:self.top+1])
        print(f"Minimum element in stack: {min_val}")
        return min_val

    def is_sorted(self):
        sub_stack = self.stack[:self.top+1]
        if sub_stack == sorted(sub_stack):
            print("Stack is sorted (bottom to top)")
            return True
        else:
            print("Stack is NOT sorted")
            return False

    def reverse(self):
        sub_stack = self.stack[:self.top+1]
        sub_stack.reverse()
        print(f"Reversed stack: {sub_stack}")
        return sub_stack

    def duplicate_check(self):
        sub_stack = self.stack[:self.top+1]
        seen = set()
        for item in sub_stack:
            if item in seen:
                print(f"Duplicate found: {item}")
                return True
            seen.add(item)
        print("No duplicates found")
        return False


# ---------------- Usage Example ----------------
if __name__ == "__main__":
    s = Stacks(10)  # capacity 10

    s.push(10)
    s.push(20)
    s.push(30)
    s.display()
    print("Peek:", s.peek())
    print("Pop:", s.pop())
    s.display()
    s.summation()
    s.max_value()
    s.min_value()
    s.is_sorted()
    s.duplicate_check()
