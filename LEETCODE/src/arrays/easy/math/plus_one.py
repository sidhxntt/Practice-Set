class Solution(object):
    def plus_one(self, digits):
        n = len(digits)
        
        for i in range(n-1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0
        
        # If all digits were 9, we get here (e.g., 999 -> 1000)
        return [1] + digits


sol = Solution()
arr = [1,2,9]
print(sol.plus_one(arr))  # Output: [1, 3, 0]
