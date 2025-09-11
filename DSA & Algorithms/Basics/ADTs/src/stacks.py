from arrays import Array
from utils.displayer import Displayer

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

    stack_using_arrays()