# Brute force solution 0(n)
class Solution(object):
    def removeElement(self, nums, val):
        k = 0  # index to place next valid element
        for i in range(len(nums)):
            if nums[i] != val:
                nums[k] = nums[i]
                k += 1
        return k


# Create instance of Solution
sol = Solution()

# Input array and target
arr = [0,1,2,2,3,0,4,2]
val = 2

# Call method and print result
print(sol.removeElement(arr, val))
# print(sol.removeDuplicates_optimise(arr))  
