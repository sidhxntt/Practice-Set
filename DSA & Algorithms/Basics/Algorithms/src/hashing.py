# Main use of Hashing: Efficient data retrieval using key-value pairs 
# i.e. search, insert, delete operations.
# This implementation includes both Open Addressing (Chaining) and Closed Addressing (Linear Probing, Quadratic Probing, Double Hashing) methods which are commonly used in hash tables to avoid collisions.
from typing import Iterable, Dict, Callable
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
class ChainingHashTable():
    def __init__(self, table_size):
        self.table_size = table_size # Size of the hash table
        self.table = [LinkedList() for _ in range(table_size)] # Initialize table with linked lists for chaining

    def _chaining_hash(self, value):
        idx  = value % self.table_size
        return idx
    
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
    
    def insert(self, value):
        index = self._chaining_hash(value) # Get index using hash function where to insert
        self.table[index].insert_sorted_ascending(value) # Insert value in sorted order in the linked list at that index
     
    def search(self, value):
        index = self._chaining_hash(value)
        current = self.table[index].head

        while current:
            if current.data == value:
                return True
            current = current.next
        return False

    def delete(self, value):
        index = self._chaining_hash(value)
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
class LinearProbingHashTable():
    def __init__(self, table_size):
        self.table_size = table_size
        self.table = [None] * table_size

    def display(self):
        table_dict = {}

        for i in range(self.table_size):
            table_dict[i] = self.table[i]

        return table_dict
    
    def _linear_probing_hash(self, value):
        idx = value % self.table_size
        i = 0
        while self.table[(idx + i) % self.table_size] is not None:
            i += 1
        return (idx + i) % self.table_size

    def insert(self, value):
        index = self._linear_probing_hash(value)
        self.table[index] = value

    def search(self, value):
        idx = value % self.table_size

        while self.table[idx] is not None:
            if self.table[idx] == value:
                return True
            idx = (idx + 1) % self.table_size

        return False

    def delete(self, value):
        idx = value % self.table_size

        while self.table[idx] is not None:
            if self.table[idx] == value:
                self.table[idx] = None
                return True
            idx = (idx + 1) % self.table_size

        return False
class QuadraticProbingHashTable():
    def __init__(self, table_size):
        self.table_size = table_size
        self.table = [None] * table_size

    def display(self):
        table_dict = {}

        for i in range(self.table_size):
            table_dict[i] = self.table[i]

        return table_dict

    def _quadratic_probing_hash(self, value):
        idx = value % self.table_size
        i = 0
        while self.table[(idx + i * i) % self.table_size] is not None:
            i += 1
        return (idx + i * i) % self.table_size

    def insert(self, value):
        index = self._quadratic_probing_hash(value)
        self.table[index] = value

    def search(self, value):
        idx = value % self.table_size
        i = 0

        while self.table[(idx + i * i) % self.table_size] is not None:
            if self.table[(idx + i * i) % self.table_size] == value:
                return True
            i += 1

        return False

    def delete(self, value):
        idx = value % self.table_size
        i = 0

        while self.table[(idx + i * i) % self.table_size] is not None:
            if self.table[(idx + i * i) % self.table_size] == value:
                self.table[(idx + i * i) % self.table_size] = None
                return True
            i += 1

        return False
class DoubleHashingHashTable():
    def __init__(self, table_size):
        self.table_size = table_size
        self.table = [None] * table_size

    def _double_hashing_hash(self, value):
        idx1 = value % self.table_size
        idx2 = 7 - (value % 7)  # Secondary hash function
        i = 0
        while self.table[(idx1 + i * idx2) % self.table_size] is not None:
            i += 1
        return (idx1 + i * idx2) % self.table_size

    def display(self):
        table_dict = {}

        for i in range(self.table_size):
            table_dict[i] = self.table[i]

        return table_dict

    def insert(self, value):
        index = self._double_hashing_hash(value)
        self.table[index] = value

    def search(self, value):
        idx1 = value % self.table_size
        idx2 = 7 - (value % 7)
        i = 0

        while self.table[(idx1 + i * idx2) % self.table_size] is not None:
            if self.table[(idx1 + i * idx2) % self.table_size] == value:
                return True
            i += 1

        return False

    def delete(self, value):
        idx1 = value % self.table_size
        idx2 = 7 - (value % 7)
        i = 0

        while self.table[(idx1 + i * idx2) % self.table_size] is not None:
            if self.table[(idx1 + i * idx2) % self.table_size] == value:
                self.table[(idx1 + i * idx2) % self.table_size] = None
                return True
            i += 1

        return False

# EXAMPLE USAGE: --- IGNORE ---
class HashingExamplesFactory:
    """
    Container for different hash table implementations.
    Expects concrete hash table classes to implement insert/search/delete and optionally display().
    """
    def __init__(self, table_size: int):
        self.table_size = table_size

        # Instantiate each hash-table once and keep in a dict for easy iteration
        self.tables: Dict[str, object] = {
            "Chaining":    ChainingHashTable(table_size),
            "Linear":      LinearProbingHashTable(table_size),
            "Quadratic":   QuadraticProbingHashTable(table_size),
            "DoubleHash":  DoubleHashingHashTable(table_size),
        }

    def insert(self, values: Iterable[int]) -> None:
        """Insert same sequence of values into all tables."""
        for value in values:
            for name, table in self.tables.items():
                table.insert(value)

    def run_demo(self, values: Iterable[int]) -> None:
        """
        Run a demonstration for each table:
        - insert values
        - print display() if available (fallback to printing internal representation)
        - run search/delete checks
        """
        # Insert values into all tables
        self.insert(values)

        for name, table in self.tables.items():
            print(f"=== {name} Hash Table Example ===")
            # Display current contents if available
            if hasattr(table, "display") and callable(getattr(table, "display")):
                try:
                    print(table.display())
                except Exception as e:
                    print(f"(display() raised an exception: {e})")
            else:
                # Fallback: try to print an attribute likely to exist
                if hasattr(table, "table"):
                    print(table.table)
                elif hasattr(table, "buckets"):
                    print(table.buckets)
                else:
                    print("<no display available>")

            # Basic checks
            sample = list(values)
            if sample:
                # search the first value inserted (should be True)
                v_search = sample[0]
                print(f"search({v_search}) -> {table.search(v_search)}")
                # search a value we didn't insert (choose something unlikely)
                not_inserted = max(sample) + 1
                print(f"search({not_inserted}) -> {table.search(not_inserted)}")

                # delete the first value and check again
                deleted = table.delete(v_search)
                print(f"delete({v_search}) -> {deleted}")
                print(f"search({v_search}) after delete -> {table.search(v_search)}")

            print("\n")


if __name__ == "__main__":
    # Demo parameters
    table_size = 10
    demo_values = [15, 25, 5]

    demo = HashingExamplesFactory(table_size)
    demo.run_demo(demo_values)
