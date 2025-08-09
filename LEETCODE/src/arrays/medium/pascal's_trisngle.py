class Solution(object):
    def Pascals1(self, numRows):
        triangle = []
        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = triangle[i-1][j-1] + triangle[i-1][j]
            triangle.append(row)  
        return triangle  
    
    def Pascals2(self, rowIndex):
        triangle = []
        for i in range(rowIndex + 1):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = triangle[i-1][j-1] + triangle[i-1][j]
            triangle.append(row)  
        return triangle[rowIndex]  

s = Solution()
n = 3
print(s.Pascals1(n))
print(s.Pascals2(n))
