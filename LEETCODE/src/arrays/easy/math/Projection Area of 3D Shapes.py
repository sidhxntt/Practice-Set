class Solution(object):
    def projectionArea(self, grid):
        #generators
        n = len(grid)
        top = sum(1 for i in range(n) for j in range(i) if grid[i][j]>0)
        front = sum(max(row) for row in grid)
        side = sum(max(grid[i][j] for i in range(n)) for j in range(n))
        projection =  top + front + side
        return projection
        
    def projectionArea2(self, grid):
        n = len(grid)
        
        # Top view: count of cells > 0
        top = 0
        for i in range(n):
            for j in range(n):
                if grid[i][j] > 0:
                    top += 1

        # Front view: max of each row
        front = 0
        for row in grid:
            max_in_row = 0
            for val in row:
                if val > max_in_row:
                    max_in_row = val
            front += max_in_row

        # Side view: max of each column
        side = 0
        for j in range(n):
            max_in_col = 0
            for i in range(n):
                if grid[i][j] > max_in_col:
                    max_in_col = grid[i][j]
            side += max_in_col

        projection = top + front + side
        return projection
   

   

sol = Solution()
grid = [[1,2],
        [3,4]]

print(sol.projectionArea(grid))


