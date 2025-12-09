import time
# Recursion always uses a stack data structure internally
class RecursionExample:
    def __init__(self):
        pass

    # def count_down(self, n):
    #     if n == 0:
    #         print("Blastoff!")
    #     else:
    #         print(n)
    #         # time.sleep(1)  # Pause for 1 second
    #         self.count_down(n-1)
    
    def sum_of_n(self, n):
        memo = {}
        if n in memo:
            return memo[n]
        if n == 0:
            return 0
        else:
            memo[n] = n + self.sum_of_n(n-1)
            return memo[n]
    
    def pow(self, x, n):
        """Calculates x raised to the power n using recursion."""
        memo = {}
        if n in memo:
            return memo[n]
        if n == 0:
            return 1
        elif n < 0:
            if n in memo:
                return memo[n]
            return 1 / self.pow(x, -n)
        else:
            memo[n] = x * self.pow(x, n - 1)
            return memo[n]
        
    def factorial(self, n):
        memo = {}
        if n in memo:
            return memo[n]
        if n == 0:
            return 1
        else:
            memo[n] = n * self.factorial(n-1)
            return memo[n]
        
    def fibonacci(self, n):
        """Returns the nth Fibonacci number using simple recursion."""
        memo = {}
        if n in memo:
            return memo[n]
        if n <= 1:
            return n
        else:
            memo[n] = self.fibonacci(n-1) + self.fibonacci(n-2)
            return memo[n]
    
    def taylor_series(self, x, n):
        """Calculates e^x using Taylor series expansion up to n terms."""
        memo = {}
        if n in memo:
            return memo[n]
        if n == 0:
            return 1
        else:
            memo[n] = self.taylor_series(x, n - 1) + (x ** n) / self.factorial(n)
            return memo[n]
        
    def combinations(self, n, r):
        """Calculates nCr (combinations) using recursion."""
        memo = {}
        if (n, r) in memo:
            return memo[(n, r)]
        if r == 0 or r == n:
            return 1
        else:
            # nCr = (n-1)C(r-1) + (n-1)Cr (
            # Pascal's rule) Also called Pascal's Triangle
            memo[(n, r)] = self.combinations(n - 1, r - 1) + self.combinations(n - 1, r)
            return memo[(n, r)]
        
    def towers_of_hanoi(self, n, source, auxiliary, target):
        """Returns a list of moves for the Towers of Hanoi problem."""
        if n == 1:
            return [(source, target)]

        moves = []
        moves += self.towers_of_hanoi(n - 1, source, target, auxiliary)
        moves.append((source, target))
        moves += self.towers_of_hanoi(n - 1, auxiliary, source, target)
        return moves
        
example = RecursionExample()
# example.count_down(3)
print("Factorial of 5:", example.factorial(5))
print("Fibonacci of 6:", example.fibonacci(6))
print("Sum of first 5 natural numbers:", example.sum_of_n(5))
print("2 raised to power 3:", example.pow(2, 3))
print("e^1 using 10 terms of Taylor series:", example.taylor_series(1, 10))
print("Combinations of 5 choose 2:", example.combinations(5, 2))

print(50*'-')
moves = example.towers_of_hanoi(5, 'A', 'C', 'B')
move_count = len(moves)
print("Total moves:", move_count)
print("Towers of Hanoi with 5 disks:", moves)
