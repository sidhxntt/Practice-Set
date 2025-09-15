from arrays import Array
from linked_list import LinkedList, Node
from utils.displayer import Displayer

#  FIFO -> First in First Out -> always insert from top (prepend) and always take from top (delete)
# So horizontally insert is append and delete is delete from end.
class Stack1(Array):
    """Using Array as backend"""
    def __init__(self, capacity):
        super().__init__(capacity)
        self.top = -1
        self.logger = Displayer.get_logger('Stacks', arrays=True)

    # ------------------ Mutating Methods ------------------
    @Displayer.array_displayer("Stack Push (using arrays)")
    def push(self, val):
        if self.size == self.capacity:
            self.logger.info("Stack is full")
            return
        self.top += 1
        self.array[self.top] = val   # use array instead of stack
        self.size += 1
        return

    @Displayer.array_displayer("Stack Pop (using arrays)")
    def pop(self):
        if self.size == 0:
            self.logger.info("Stack is empty")
            return None
        val = self.array[self.top]
        self.array[self.top] = 0
        self.top -= 1
        self.size -= 1
        return val

class Stack2(LinkedList, Node):
    """Using Linked List as backend"""
    def __init__(self):
        super().__init__()
        self.top = None
        self.logger = Displayer.get_logger('Stacks', linked_list=True)

    # ------------------ Mutating Methods ------------------
    @Displayer.linked_list_displayer("Stack Push (using linked list)")
    def push(self, val):
        new_node = Node(val)

        if not self.head:         
            self.head = new_node
            self.top = new_node
            return
                                  
        self.top.next = new_node
        self.top = new_node
        return

    @Displayer.array_displayer("Stack Pop (using linked list)")
    def pop(self):
        if not self.head:         
            self.logger.info("Stack is empty")
            return None

        # If there's only one node
        if self.head == self.top:
            val = self.head.data
            self.head = None
            self.top = None
            return val

        # Traverse to the second-last node
        current = self.head
        while current.next != self.top:
            current = current.next

        val = self.top.data
        self.top = current
        self.top.next = None
        return val


# ------------------ Example Usage ------------------
if __name__ == "__main__":
    def stack_using_arrays():
        s = Stack1(3)
        s.push(3)
        s.push(9)
        s.push(1)
        s.pop()
        s.maths()
        s.search_element(9, binary=True) #peek function for stacks

    def stack_using_linked_list():
        s = Stack2()
        s.push(3)
        s.push(9)
        s.push(1)
        s.pop()

    stack_using_arrays()
    stack_using_linked_list()