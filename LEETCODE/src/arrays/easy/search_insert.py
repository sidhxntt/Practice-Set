class Solution(object):
    def searchInsert(self, nums, target):
        for i, num in enumerate(nums):
            if num >= target:
                return i
        return len(nums)

s = Solution()
arr = [1,3,5,6]
val = 4

print(s.searchInsert(arr, val))