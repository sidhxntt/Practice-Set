from arrays import Array
from utils.displayer import Displayer

class Queue1(Array):
    def __init__(self, capacity):
        super().__init__(capacity)
        self.front = -1
        self.rear = -1
        self.logger = Displayer.get_logger('Queues')

    # ------------------ Mutating Methods ------------------
    @Displayer.displayer("Queue Enqueue (using arrays)")
    def enqueue(self, val):
        if self.size == self.capacity:
            self.logger.info("Queue is full")
            return
        self.rear +=1
        self.array[self.rear] = val
        self.size +=1
        return
    
    @Displayer.displayer("Queue Dequeue (using arrays)")
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

    queue_using_arrays()