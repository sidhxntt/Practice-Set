import time
# Recursion always uses a stack data structure internally
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
        
    def fibonacci(self, n):
        """Returns the nth Fibonacci number using simple recursion."""
        if n <= 1:
            return n
        else:
            return self.fibonacci(n-1) + self.fibonacci(n-2)

example = RecursionExample()
example.count_down(3)
print("Factorial of 5:", example.factorial(5))
print("Fibonacci of 6:", example.fibonacci(6))