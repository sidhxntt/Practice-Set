class DP:
    def fibonacci(self, n):
        """Returns the nth Fibonacci number using memoization."""
        memo = {}
        if n in memo:
            return memo[n]
        if n <= 1:
            return n
        memo[n] = self.fibonacci(n - 1) + self.fibonacci(n - 2)
        return memo[n]
#                    fib(4)
#                /             \
#           fib(3)           fib(2)
#          /      \         /      \
#      fib(2)   fib(1)   fib(1)   fib(0)
#     /      \
# fib(1)   fib(0)
    
    def knapsack(self, weights, values, capacity:int, i:int):
        """0/1 Knapsack problem using recursion with memoization."""
        memo = {}
        if (i, capacity) in memo:
            return memo[(i, capacity)]
        # Base cases
        if i < 0 or capacity <= 0:
            return 0
        # If item is too heavy → can ONLY exclude
        if weights[i] > capacity:
            result = self.knapsack(weights, values, capacity, i - 1)
            memo[(i, capacity)] = result
            return result
        # Branch 1: include the item
        include = values[i] + self.knapsack(weights, values, capacity - weights[i], i - 1)
        # Branch 2: exclude the item
        exclude = self.knapsack(weights, values, capacity, i - 1)
        # same as taking max of left-subtree and right-subtree
        result = max(include, exclude)
        memo[(i, capacity)] = result
        return result
        #                            knap(i=2, cap=4)
        #              /--------------------------------\
        #             /                                  \
        #    include item2                            exclude item2
        # (value=30, cap→0)                           (skip item2)
        #          |                                      |
        #  knap(i=1, cap=0)                      knap(i=1, cap=4)
        #        |                           /--------------------------\
        # base case (0)                 include item1                 exclude item1
        #                            (value=20, cap→1)                   |
        #                                |                               |
        #                        knap(i=0, cap=1)                  knap(i=0, cap=4)
        #                       /----------------\              /--------------------\
        #               include item0       exclude item0  include item0        exclude item0
        #              (value=15, cap→0)       |           (value=15, cap→3)        |
        #                    |                 |                 |                   |
        #           knap(i=-1,cap=0)     knap(i=-1,cap=1)  knap(i=-1,cap=3)   knap(i=-1,cap=4)
        #                  |                 |                 |                   |
        #            base case 0        base case 0       base case 0          base case 0

    def mcm(self, p, i, j):
        if i == j:
            return 0
        
        dp = [[-1 for _ in range(j + 1)] for _ in range(i + 1)]
        if dp[i][j] != -1:
            return dp[i][j]
    
        dp[i][j] = float('inf')

        for k in range(i, j):
            cost = (self.mcm(p, i, k) 
                    + self.mcm(p, k+1, j)
                    + p[i-1] * p[k] * p[j])

            dp[i][j] = min(dp[i][j], cost)

        return dp[i][j]

# Example usage
dp = DP()
print("Fibonacci of 6 using DP:", dp.fibonacci(6))
weights = [1, 2, 3]
values = [10, 15, 40]
capacity = 6
print("0/1 Knapsack maximum value:", dp.knapsack(weights, values, capacity, len(weights) - 1))
print("Minimum cost of Matrix Chain Multiplication:", dp.mcm([10, 20, 30, 40, 30], 1, 3))
