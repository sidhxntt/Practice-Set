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
   
    def display(self, operation_name="Display"):
        nodes = []
        current = self.head
        while current is not None:  # loop until end
            nodes.append(str(current.data))
            current = current.next
        nodes.append("None")

        self.logger.info(f"[{operation_name}] LinkedList → {' -> '.join(nodes)}")

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
            self.logger.info("Node to be deleted not found")
            return

        # unlink the node
        prev.next = temp.next
        temp = None
    

    # ------------------Non Mutating Methods ------------------
  
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

    def sorting(self):
        if not self.head:
            self.logger.info("Linked List is Empty")
            return

        current = self.head
        while current and current.next:
            if current.data > current.next.data:
                self.logger.info("Linked List not sorted")
                return
            current = current.next

        self.logger.info("Linked List Sorted")
        # if sort:
        #     # to be done

    def duplicates(self, dedupication = False):
        current = self.head
        position = 1
        prev = None
        seen = {}
        if not self.head:
            self.logger.info("Linked List is Empty")
            return
        while current:
            if current.data in seen:
                self.logger.info(f"Duplicate node for value {current.data} found at {position}")
                if dedupication:
                    prev.next = current.next
                    self.display(operation_name="De-Duplication")
                    return True
            seen[current.data] = True 
            prev = current
            current = current.next
            position +=1

    def searching(self, val):
        if not self.head:
            self.logger.info("Linked List is Empty")
            return
        current = self.head
        pos =1
        while current:
            if current.data == val:
                self.logger.info(f"Node found with data: {val} at position: {pos}")
                break
            pos +=1
            current = current.next

    def loop_formation(self, data):
        new_node = Node(data)

        if not self.head:  # if list is empty
            self.head = new_node
            return

        # Traverse to the last node
        last = self.head
        nodes = [last]  # collect nodes for random choice
        while last.next:
            last = last.next
            nodes.append(last)

        # Append the new node
        last.next = new_node

        # Pick a random node from the list (including head, but excluding new_node itself)
        random_node = random.choice(nodes)
        new_node.next = random_node
        self.logger.info(f"New node with value {data} points to node with value {random_node.data}")

    def change_to_array(self):
        arr = []
        current = self.head
        while current:
            arr.append(current.data)
            current = current.next

        if not arr:
            self.logger.info("Linked List is Empty")
        self.logger.info(f"Linked List in Array: {arr}")
        return arr
    
    def has_loop(self):
        """Floyd's algorithm - Floyd’s Cycle Detection Algorithm - Tortoise and Hare algorithm"""
        slow = self.head
        fast = self.head

        while fast and fast.next and slow and slow.next:
            slow = slow.next          # move slow pointer by 1
            fast = fast.next.next     # move fast pointer by 2

            if slow == fast: # in a loop they will meet at sometime unlike linear
                self.logger.info("Loop detected in the linked list")
                return True

        self.logger.info("No loop in the linked list")
        return False

    def maths2(self, arr:list, split_pos=None, merge_pos=False, perform_ops=False):
        if split_pos is None:
            self.logger.info("Please provide a split position (int)")
            return

        if split_pos < 0:
            self.logger.info("Invalid split position")
            return

        arr1 = arr[:split_pos]
        arr2 = arr[split_pos:]
        self.logger.info(f"array 1: {arr1} & array 2: {arr2}")

        def merged_at_pos(val, arr1, arr2, use_first=True):
            if use_first:
                arr3 = arr1[:val] + arr2
            else:
                arr3 = arr2[:val] + arr1
            self.logger.info(f"New array: {arr3}")
            return arr3

        def set_operations(arr1, arr2):
            intersection = list(set(arr1) & set(arr2))
            union = list(set(arr1) | set(arr2))
            difference = list(set(arr1) - set(arr2))
            self.logger.info("---------------------------------")
            self.logger.info(f"Intersection = {intersection}")
            self.logger.info(f"Union        = {union}")
            self.logger.info(f"Difference   = {difference}")
            self.logger.info("---------------------------------")

        if merge_pos:
            merged_at_pos(2, arr1, arr2, use_first=False)
        elif perform_ops:
            set_operations(arr1, arr2)
        else:
            merged_at_pos(2, arr1, arr2, use_first=False)
            set_operations(arr1, arr2)
# ------------------ Example Usage ------------------
if __name__ == "__main__":
    ll = LinkedList()
    ll.append(6)
    ll.append(5)
    ll.append(5)
    ll.append(510)
    ll.prepend(4)
    ll.delete(510)
    ll.insert(3,3)
    ll.math()
    ll.math(permutations=True, r=2)  # 6  (3P2)
    ll.math(combinations=True, r=2)
    ll.sorting()
    ll.duplicates(dedupication=True)
    ll.searching(5)

    
    arr = ll.change_to_array()
    ll.maths2(arr, split_pos=2, merge_pos=True)
    ll.maths2(arr, split_pos=2, perform_ops=True)


    ll.loop_formation(6)
    ll.has_loop()

  