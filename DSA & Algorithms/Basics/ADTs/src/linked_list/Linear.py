# We never move head whatever happens its lime index 0 of array , a constant reference
import random
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Linear_Linkedlist:
    def __init__(self):
        self.head = None # Initially, the list is empty, so head = None.

    # Structural functions
    def display(self):
        """Traversal of a linked list"""
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
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

        if not self.head: # if list is empty
            self.head = new_node
            return
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
            print("Node to be deleted not found")
            return

        # unlink the node
        prev.next = temp.next
        temp = None
    
    # Operational functions
    def node_counts(self):
        count = 0
        current = self.head
        while current:
            current = current.next
            count += 1
        print(f"Total number of nodes are: {count}")
        return count
    
    def summation(self):
        sum = 0
        current = self.head
        while current:
            sum += current.data
            current = current.next
        print(f"Summation of the nodes: {sum}")
        return sum
    
    def search_node(self, val):
        position = 1
        current = self.head
        while current:
            if current.data == val:
                print(f"Value found at postion: {position}")
                return
            current = current.next
            position +=1
        
    def max_value_node(self):
        current = self.head
        max_val = current.data

        while current:
            if current.data > max_val:
                max_val = current.data
            current = current.next

        print(f"Maximum Node is {max_val}")
        return max_val
    
    def min_value_node(self):
        current = self.head
        min_val = current.data

        while current:
            if current.data < min_val:
                min_val = current.data
            current = current.next

        print(f"Minimum Node is {min_val}")
        return min_val

    def is_sorted(self):
        current = self.head
        prev = None

        while current:
            if prev and prev.data > current.data:
                print("Linked List NOT sorted")
                return False
            prev = current
            current = current.next

        print("Linked List IS sorted")
        return True

    def check_duplicates_and_remove(self):
        current = self.head
        position = 1
        prev = None
        seen = {}

        while current:
            if current.data in seen:
                print(f"Duplicate node for value {current.data} found at {position}")
                prev.next = current.next
                self.display()
                return True
            seen[current.data] = True 
            prev = current
            current = current.next
            position +=1
        
    def reversal(self):
        prev = None
        current = self.head

        while current:
            nxt = current.next       # store the next node
            current.next = prev      # reverse the pointer
            prev = current           # move prev forward
            current = nxt            # move current forward

        self.head = prev             # new head is the old tail
        self.display()

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
        print(f"New node with value {data} points to node with value {random_node.data}")

    def has_loop(self):
        slow = self.head
        fast = self.head

        while fast and fast.next and slow and slow.next:
            slow = slow.next          # move slow pointer by 1
            fast = fast.next.next     # move fast pointer by 2

            if slow == fast: # in a loop they will meet at sometime unlike linear
                print("Loop detected in the linked list")
                return True

        print("No loop in the linked list")
        return False

if __name__ == "__main__":
    ll = Linear_Linkedlist()
    
    ll.prepend(5)
    ll.append(30)

    ll.prepend(20)
    ll.append(40)
    ll.prepend(20)
    ll.append(10)

    ll.delete(30)
    ll.delete(5)

    ll.display()
    ll.summation()
    ll.is_sorted()
    ll.max_value_node()
    ll.min_value_node()
    ll.check_duplicates_and_remove()
    ll.reversal()

    # ll.loop_formation(6)
    ll.has_loop()
