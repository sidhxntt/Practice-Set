from utils.displayer import logger, Displayer


class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class Stacks(Displayer):
    def __init__(self):
        self.top = None   # top pointer

    # ---------------- Structural Functions ----------------
    def is_empty(self):
        return self.top is None

    def display(self):
        if self.is_empty():
            logger.info("Stack is empty")
            return []
        current = self.top
        elements = []
        while current:
            elements.append(current.data)
            current = current.next
        logger.info(f"Stack (top -> bottom): {elements}")
        return elements

    @Displayer.auto_display("Push element")
    def push(self, val):
        new_node = Node(val)
        new_node.next = self.top
        self.top = new_node
        return self.display()

    @Displayer.auto_display("Pop element")
    def pop(self):
        if self.is_empty():
            logger.warning("Stack Underflow! Cannot pop")
            return None
        popped = self.top.data
        self.top = self.top.next
        return popped

    @Displayer.auto_display("Peek element")
    def peek(self):
        if self.is_empty():
            logger.warning("Stack is empty")
            return None
        return self.top.data

    def size(self):
        count = 0
        current = self.top
        while current:
            count += 1
            current = current.next
        logger.info(f"Stack size: {count}")
        return count

    # ---------------- Operational Functions ----------------
    def search(self, val):
        current = self.top
        pos = 0
        while current:
            if current.data == val:
                logger.info(f"Found {val} at position {pos} from top")
                return pos
            pos += 1
            current = current.next
        logger.info(f"{val} not found")
        return -1

    def summation(self):
        total = 0
        current = self.top
        while current:
            total += current.data
            current = current.next
        logger.info(f"Summation of stack elements: {total}")
        return total

    def max_value(self):
        if self.is_empty():
            logger.warning("Stack is empty")
            return None
        max_val = self.top.data
        current = self.top.next
        while current:
            if current.data > max_val:
                max_val = current.data
            current = current.next
        logger.info(f"Maximum element in stack: {max_val}")
        return max_val

    def min_value(self):
        if self.is_empty():
            logger.warning("Stack is empty")
            return None
        min_val = self.top.data
        current = self.top.next
        while current:
            if current.data < min_val:
                min_val = current.data
            current = current.next
        logger.info(f"Minimum element in stack: {min_val}")
        return min_val

    def is_sorted(self):
        if self.is_empty():
            logger.info("Stack is empty")
            return True
        current = self.top
        while current and current.next:
            if current.data < current.next.data:   # descending check
                logger.info("Stack is NOT sorted (top to bottom)")
                return False
            current = current.next
        logger.info("Stack IS sorted (top to bottom)")
        return True

    def reverse(self):
        prev = None
        current = self.top
        while current:
            nxt = current.next
            current.next = prev
            prev = current
            current = nxt
        self.top = prev
        logger.info("Stack reversed")
        return self.display()

    def duplicate_check(self):
        seen = set()
        current = self.top
        while current:
            if current.data in seen:
                logger.info(f"Duplicate found: {current.data}")
                return True
            seen.add(current.data)
            current = current.next
        logger.info("No duplicates found")
        return False


# ---------------- Usage Example ----------------
if __name__ == "__main__":
    s = Stacks()

    operations = [
        ("Push 10", s.push, 10),
        ("Push 20", s.push, 20),
        ("Push 30", s.push, 30),
        ("Display", s.display),
        ("Peek", s.peek),
        ("Pop", s.pop),
        ("Display", s.display),
        ("Summation", s.summation),
        ("Max value", s.max_value),
        ("Min value", s.min_value),
        ("Is sorted?", s.is_sorted),
        ("Reverse stack", s.reverse),
        ("Duplicate check", s.duplicate_check),
    ]

    Displayer.execute(operations)
