import time

class RecursionExample:
    def __init__(self):
        pass

    def count_down(self, n):
        if n == 0:
            print("Blastoff!")
        else:
            print(n)
            time.sleep(1)
            self.count_down(n-1)
    
    def factorial(self, n):
        if n == 0:
            return 1
        else:
            return n * self.factorial(n-1)

example = RecursionExample()
example.count_down(3)