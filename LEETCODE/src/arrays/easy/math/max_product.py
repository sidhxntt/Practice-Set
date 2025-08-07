arr = [-100,-98,-1,2,3,4]

class Solution(object):
    def maximumProduct(self, nums):
        nums.sort()
        return max(nums[-1] * nums[-2] * nums[-3],
                   nums[0] * nums[1] * nums[-1]) # edge case

s = Solution()
print(s.maximumProduct(arr))