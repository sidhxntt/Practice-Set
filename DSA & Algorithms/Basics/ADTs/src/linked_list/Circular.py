from Linear import Node

class Circular_LinkedList:
    def __init__(self):
        self.head = None  # Initially empty

    # ---------------- Structural functions ----------------
    def display(self):
        """Traversal of a circular linked list"""
        if not self.head:
            print("List is empty")
            return
        current = self.head
        while True:
            print(current.data, end=" -> ")
            current = current.next
            if current == self.head:
                break
        print("(back to head)")

    def append(self, data):
        new_node = Node(data)
        if not self.head:  # empty list
            self.head = new_node
            new_node.next = self.head
            return

        last = self.head
        while last.next != self.head:
            last = last.next
        last.next = new_node
        new_node.next = self.head

    def prepend(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            new_node.next = self.head
            return

        last = self.head
        while last.next != self.head:
            last = last.next

        new_node.next = self.head
        last.next = new_node
        self.head = new_node

    def delete(self, key):
        if not self.head:
            return

        current = self.head

        # Case 1: deleting the head
        if current.data == key:
            if current.next == self.head:  # only one node
                self.head = None
                return
            # find the last node
            last = self.head
            while last.next != self.head:
                last = last.next
            last.next = current.next
            self.head = current.next
            return

        # Case 2: delete any other node
        prev = None
        while True:
            prev = current
            current = current.next
            if current.data == key:
                prev.next = current.next
                return
            if current == self.head:
                break
        print("Node to be deleted not found")

    # ---------------- Operational functions ----------------
    def node_counts(self):
        if not self.head:
            print("Total number of nodes are: 0")
            return 0

        count = 0
        current = self.head
        while True:
            count += 1
            current = current.next
            if current == self.head:
                break
        print(f"Total number of nodes are: {count}")
        return count

    def summation(self):
        if not self.head:
            print("Summation of nodes: 0")
            return 0

        total = 0
        current = self.head
        while True:
            total += current.data
            current = current.next
            if current == self.head:
                break
        print(f"Summation of the nodes: {total}")
        return total

    def search_node(self, val):
        if not self.head:
            print("List is empty")
            return

        position = 1
        current = self.head
        while True:
            if current.data == val:
                print(f"Value found at position: {position}")
                return
            current = current.next
            position += 1
            if current == self.head:
                break
        print("Value not found")

    def max_value_node(self):
        if not self.head:
            print("List is empty")
            return None

        max_val = self.head.data
        current = self.head.next
        while current != self.head:
            if current.data > max_val:
                max_val = current.data
            current = current.next
        print(f"Maximum Node is {max_val}")
        return max_val

    def min_value_node(self):
        if not self.head:
            print("List is empty")
            return None

        min_val = self.head.data
        current = self.head.next
        while current != self.head:
            if current.data < min_val:
                min_val = current.data
            current = current.next
        print(f"Minimum Node is {min_val}")
        return min_val

    def is_sorted(self):
        if not self.head or self.head.next == self.head:
            print("Linked List IS sorted")
            return True

        current = self.head
        while current.next != self.head:
            if current.data > current.next.data:
                print("Linked List NOT sorted")
                return False
            current = current.next
        print("Linked List IS sorted")
        return True

    def check_duplicates_and_remove(self):
        if not self.head:
            return False

        seen = set()
        current = self.head
        prev = None

        while True:
            if current.data in seen:
                print(f"Duplicate node with value {current.data} found")
                prev.next = current.next
                self.display()
                return True
            seen.add(current.data)
            prev = current
            current = current.next
            if current == self.head:
                break
        print("No duplicates found")
        return False

    def reversal(self):
        if not self.head or self.head.next == self.head:
            self.display()
            return

        prev = None
        current = self.head
        start = self.head

        while True:
            nxt = current.next
            current.next = prev
            prev = current
            current = nxt
            if current == start:
                break

        # fix head and last node link
        start.next = prev
        self.head = prev
        self.display()

    def has_loop(self):
        """CLL always has a loop by design, but this checks integrity"""
        if not self.head:
            print("No loop (list is empty)")
            return False

        slow = self.head
        fast = self.head

        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                print("Loop detected in the circular linked list")
                return True
        print("No loop detected")
        return False

if __name__ == "__main__":
    cl = Circular_LinkedList()
    
    cl.prepend(5)
    cl.append(30)

    cl.prepend(20)
    cl.append(40)
    cl.prepend(20)
    cl.append(10)

    cl.delete(30)
    cl.delete(5)

    cl.display()
    cl.summation()
    cl.is_sorted()
    cl.max_value_node()
    cl.min_value_node()
    cl.check_duplicates_and_remove()
    cl.reversal()

    # cl.loop_formation(6)
    cl.has_loop()