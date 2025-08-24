class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Linkedlist:
    def __init__(self):
        self.head = None # Initially, the list is empty, so head = None.
        self.count = 0
        self.sum = 0

    # Structural functions
    def display(self):
        """Traversal of a linked list"""
        current = self.head
        while current:
            print(current.data, end=" -> ")
            self.sum += current.data
            current = current.next
            self.count +=1
        print("None")

    def append(self, data): # kinda two pointer approach
        new_node = Node(data)

        if not self.head: # if list is empty
            self.head = new_node
            return
        last = self.head
        while last.next:
            last = last.next
        last.next = new_node

    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, key):
        temp = self.head

        # Case 1: the head is the one to delete
        if temp and temp.data == key:
            self.head = temp.next
            temp = None
            return

        # Case 2: find the node to delete, keeping track of previous
        prev = None
        while temp and temp.data != key:
            prev = temp
            temp = temp.next

        if temp is None:  # key not found
            return

        # unlink the node
        prev.next = temp.next
        temp = None
    
    # Operational functions
    def node_counts(self):
        print(f"Total number of nodes are: {self.count}")
        return self.count
    
    def summation(self):
        print(f"Summation of the nodes: {self.sum}")
        return self.sum

if __name__ == "__main__":
    l = Linkedlist()

    l.append(5)
    l.append(10)
    l.append(20)
    l.append(30)
    l.delete(20)

    l.display()
    l.node_counts()
    l.summation()