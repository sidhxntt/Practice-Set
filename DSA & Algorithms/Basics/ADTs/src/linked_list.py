import random
from utils.displayer import Displayer
import itertools

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.logger = Displayer.get_logger('Linked_List', linked_list=True)
     
    # ------------------ Mutating Methods ------------------
    @Displayer.linked_list_displayer("Append Node")
    def append(self, val):
        new_node = Node(val)

        if not self.head:
            self.head = new_node
            return

        last = self.head
        while last.next:  
            last = last.next
        last.next = new_node

    @Displayer.linked_list_displayer("Prepend Node")
    def prepend(self, val):
        new_node = Node(val)

        if not self.head:
            self.head = new_node
            return
        
        new_node.next = self.head
        self.head = new_node

    @Displayer.linked_list_displayer("Insert Node")
    def insert(self, val, pos):
        new_node = Node(val)

        # Case 1: Empty list or inserting at head
        if pos == 0 or not self.head:
            new_node.next = self.head
            self.head = new_node
            return

        current = self.head
        position = 0

        # Traverse until the node just before the desired position
        while current and position < pos - 1:
            current = current.next
            position += 1

        # Case 2: Position is out of bounds (append at end)
        if not current:
            self.logger.info("Position out of bounds, appending at end")
            return

        # Insert new node after current
        new_node.next = current.next
        current.next = new_node

    @Displayer.linked_list_displayer("Delete Node")
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
            print("Node to be deleted not found")
            return

        # unlink the node
        prev.next = temp.next
        temp = None

    # ------------------ Mutating Methods ------------------
  
    def math(self, count=False, summation=False, maximum=False, minimum=False, 
             permutations=False, combinations=False, r=None):
        """
        Perform various math operations on the linked list:
        - count: total nodes
        - summation: sum of all node values
        - maximum: max node value
        - minimum: min node value
        - permutations: count of permutations (requires r)
        - combinations: count of combinations (requires r)
        """
        if not self.head:
            self.logger.info("LinkedList is empty")
            return None

        total_nodes = 0
        total_sum = 0
        max_val = self.head.data
        min_val = self.head.data

        current = self.head
        while current:
            total_nodes += 1
            total_sum += current.data
            max_val = max(max_val, current.data)
            min_val = min(min_val, current.data)
            current = current.next

        # Handle basic flags
        if count:
            self.logger.info(f"Total number of nodes: {total_nodes}")
            return total_nodes
        elif summation:
            self.logger.info(f"Summation of nodes: {total_sum}")
            return total_sum
        elif maximum:
            self.logger.info(f"Maximum node value: {max_val}")
            return max_val
        elif minimum:
            self.logger.info(f"Minimum node value: {min_val}")
            return min_val

        # Handle permutations & combinations
        if permutations:
            if r is None:
                r = total_nodes
            perm_count = sum(1 for _ in itertools.permutations(range(total_nodes), r))
            self.logger.info(f"Permutation count (n={total_nodes}, r={r}): {perm_count}")
            return perm_count

        if combinations:
            if r is None:
                r = total_nodes
            comb_count = sum(1 for _ in itertools.combinations(range(total_nodes), r))
            self.logger.info(f"Combination count (n={total_nodes}, r={r}): {comb_count}")
            return comb_count

        # Default: return all stats
        stats = {
            "count": total_nodes,
            "sum": total_sum,
            "max": max_val,
            "min": min_val
        }
        self.logger.info(f"LinkedList stats → {stats}")
        return stats

    # sorting
    # duplicates
    # loop detection & removal
    # merging two linked lists
    
# ------------------ Example Usage ------------------
if __name__ == "__main__":
    ll = LinkedList()
    ll.append(6)
    ll.append(5)
    ll.append(510)
    ll.prepend(4)
    ll.delete(510)
    ll.insert(3,3)
    ll.math()
    ll.math(permutations=True, r=2)  # 6  (3P2)
    ll.math(combinations=True, r=2)
  