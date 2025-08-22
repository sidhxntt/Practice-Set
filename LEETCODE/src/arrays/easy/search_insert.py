class Solution(object):
    def searchInsert(self, nums, target):
        for i, num in enumerate(nums):
            if num >= target:
                return i
        return len(nums)
    
    def searchInsert(self, nums, target):
        left, right = 0, len(nums) - 1

        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        
        return left


s = Solution()
arr = [1,3,5,6]
val = 4

print(s.searchInsert(arr, val))