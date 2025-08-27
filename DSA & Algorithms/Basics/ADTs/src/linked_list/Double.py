class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None

    # ---------------- Structural functions ----------------
    def display_forward(self):
        """Traversal from head to tail"""
        current = self.head
        while current:
            print(current.data, end=" <-> ")
            current = current.next
        print("None")

    def display_backward(self):
        """Traversal from tail to head"""
        if not self.head:
            print("List is empty")
            return
        # go to last
        last = self.head
        while last.next:
            last = last.next
        # traverse backwards
        while last:
            print(last.data, end=" <-> ")
            last = last.prev
        print("None")

    def append(self, data):
        new_node = Node(data)
        if not self.head:  # empty list
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node
        new_node.prev = last

    def prepend(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        new_node.next = self.head
        self.head.prev = new_node
        self.head = new_node

    def delete(self, key):
        current = self.head
        while current:
            if current.data == key:
                if current.prev:
                    current.prev.next = current.next
                else:  # deleting head
                    self.head = current.next
                if current.next:
                    current.next.prev = current.prev
                return
            current = current.next
        print("Node to be deleted not found")

    # ---------------- Operational functions ----------------
    def node_counts(self):
        count = 0
        current = self.head
        while current:
            count += 1
            current = current.next
        print(f"Total number of nodes are: {count}")
        return count

    def summation(self):
        total = 0
        current = self.head
        while current:
            total += current.data
            current = current.next
        print(f"Summation of the nodes: {total}")
        return total

    def search_node(self, val):
        position = 1
        current = self.head
        while current:
            if current.data == val:
                print(f"Value found at position: {position}")
                return
            current = current.next
            position += 1
        print("Value not found")

    def max_value_node(self):
        if not self.head:
            print("List is empty")
            return None
        max_val = self.head.data
        current = self.head.next
        while current:
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
        while current:
            if current.data < min_val:
                min_val = current.data
            current = current.next
        print(f"Minimum Node is {min_val}")
        return min_val

    def is_sorted(self):
        current = self.head
        while current and current.next:
            if current.data > current.next.data:
                print("Doubly Linked List NOT sorted")
                return False
            current = current.next
        print("Doubly Linked List IS sorted")
        return True

    def check_duplicates_and_remove(self):
        seen = set()
        current = self.head
        while current:
            if current.data in seen:
                print(f"Duplicate node with value {current.data} found")
                # unlink
                if current.prev:
                    current.prev.next = current.next
                if current.next:
                    current.next.prev = current.prev
                self.display_forward()
                return True
            seen.add(current.data)
            current = current.next
        print("No duplicates found")
        return False

    def reversal(self):
        if not self.head:
            print("List is empty")
            return
        current = self.head
        prev = None
        while current:
            prev = current.prev
            current.prev = current.next
            current.next = prev
            current = current.prev
        if prev:
            self.head = prev.prev
        self.display_forward()

    def has_loop(self):
        """Floyd's algorithm (though DLL shouldn’t have loops unless corrupted)"""
        slow = self.head
        fast = self.head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                print("Loop detected in the doubly linked list")
                return True
        print("No loop in the doubly linked list")
        return False

if __name__ == "__main__":
    dl = DoublyLinkedList()
    
    dl.prepend(5)
    dl.append(30)

    dl.prepend(20)
    dl.append(40)
    dl.prepend(20)
    dl.append(10)

    dl.delete(30)
    dl.delete(5)

    dl.display()
    dl.summation()
    dl.is_sorted()
    dl.max_value_node()
    dl.min_value_node()
    dl.check_duplicates_and_remove()
    dl.reversal()

    # dl.loop_formation(6)
    dl.has_loop()