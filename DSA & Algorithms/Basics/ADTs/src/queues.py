from arrays import Array
from linked_list import LinkedList, Node
from utils.displayer import Displayer

#  LIFO -> Last in First Out -> always insert from rear (append) and always take from front (delete)
# So horizontally insert is append and delete is delete from front.
class Queue1(Array):
    def __init__(self, capacity):
        super().__init__(capacity)
        self.front = -1
        self.rear = -1
        self.logger = Displayer.get_logger('Queues', arrays=True)

    # ------------------ Mutating Methods ------------------
    @Displayer.array_displayer("Queue Enqueue (using arrays)")
    def enqueue(self, val):
        if self.size == self.capacity:
            self.logger.info("Queue is full")
            return
        self.rear +=1
        self.array[self.rear] = val
        self.size +=1
        return
    
    @Displayer.array_displayer("Queue Dequeue (using arrays)")
    def dequeue(self):
        if self.size == 0:
            self.logger.info("Stack is empty")
            return None
        self.front +=1
        val = self.array[self.front]
        self.array[self.front] = 0 # optional
        for i in range(self.front+1, self.size):
            self.array[i-1] = self.array[i]
        self.size -= 1
        return val
 
class Queue2(LinkedList, Node):
    def __init__(self):
        super().__init__()
        self.front = None
        self.rear = None
        self.logger = Displayer.get_logger('Queues', linked_list=True)

    @Displayer.linked_list_displayer("Queue Enqueue (using linked list)")
    def enqueue(self, val):
        new_node = Node(val)

        if not self.head:         
            self.head = new_node
            self.rear = new_node
            self.front = new_node
            return
                                   
        self.rear.next = new_node
        self.rear = new_node
        return
    
    @Displayer.linked_list_displayer("Queue Dequeue (using linked list)")
    def dequeue(self):
        if not self.head:         
            self.logger.info("Queue is empty")
            return None

        val = self.front.data
        self.front = self.front.next
        self.head = self.front  # keep head in sync

        if not self.front:      # if queue is now empty
            self.rear = None

        return val


# ------------------ Example Usage ------------------
if __name__ == "__main__":
    def queue_using_arrays():
        q = Queue1(3)
        q.enqueue(3)
        q.enqueue(9)
        q.enqueue(1)
        q.dequeue()
        q.maths()
        q.search_element(9, binary=True)

    def queue_using_linked_list():
        q = Queue2()
        q.enqueue(3)
        q.enqueue(9)
        q.enqueue(1)
        q.dequeue()

    queue_using_arrays()
    queue_using_linked_list()