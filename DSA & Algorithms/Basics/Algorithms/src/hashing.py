# Main use of Hashing: Efficient data retrieval using key-value pairs 
# i.e. search, insert, delete operations.
# This implementation includes both Open Addressing (Chaining) and Closed Addressing (Linear Probing, Quadratic Probing, Double Hashing) methods which are commonly used in hash tables to avoid collisions.
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        
class LinkedList:
    def __init__(self):
        self.head = None

    def insert_sorted_ascending(self, value):
        new_node = Node(value)

        # Case 1: empty list OR new value less than head
        if self.head is None or value < self.head.data:
            new_node.next = self.head
            self.head = new_node
            return

        # Case 2: find correct sorted position
        current = self.head
        while current.next and current.next.data <= value:
            if current.next.data == value:
                return   # avoid duplicates
            current = current.next

        # Insert in correct position
        new_node.next = current.next
        current.next = new_node

class ChainingHashTable:
    def __init__(self, table_size):
        self.table_size = table_size # Size of the hash table
        self.table = [LinkedList() for _ in range(table_size)] # Initialize table with linked lists for chaining

    def display(self):
        table_dict = {}

        for i in range(self.table_size):
            current = self.table[i].head
            values = []
            while current:
                values.append(current.data)
                current = current.next

            table_dict[i] = values if values else None

        return table_dict

    def _hash(self, value):
        return value % self.table_size

    def insert(self, value):
        index = self._hash(value) # Get index using hash function where to insert
        self.table[index].insert_sorted_ascending(value) # Insert value in sorted order in the linked list at that index
     
    def search(self, value):
        index = self._hash(value)
        current = self.table[index].head

        while current:
            if current.data == value:
                return True
            current = current.next
        return False

    def delete(self, value):
        index = self._hash(value)
        current = self.table[index].head
        prev = None

        while current:
            if current.data == value:
                if prev is None:
                    # deleting the head node
                    self.table[index].head = current.next
                else:
                    prev.next = current.next
                return True
            prev = current
            current = current.next

        return False
    
# example usage:
if __name__ == "__main__":
    hash_table = ChainingHashTable(10)
    hash_table.insert(15)
    hash_table.insert(25)
    hash_table.insert(5)
    hash_table.display()
    print(hash_table.search(15))  # Output: True
    print(hash_table.search(10))  # Output: False
    hash_table.delete(15)
    print(hash_table.search(15))  # Output: False