class Solution(object):
    def merge(self, nums1, m, nums2, n):
        nums = nums1[:m] + nums2[:n]
        nums.sort()
        for i in range(m + n):
            nums1[i] = nums[i]
            
nums1 = [1, 2, 3, 0, 0, 0]
m = 3

nums2 = [2, 5, 6]
n = 3

s = Solution()
s.merge(nums1, m, nums2, n)  
print(nums1) 
