# Brute force solution 0(n2)
class Solution(object):
    def twoSum_brute(self, nums, target):
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        
    def twoSum_optimise(self, nums, target): #(0(n))
        num_to_index = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_to_index:
                return [num_to_index[complement], i]
            num_to_index[num] = i

# Create instance of Solution
sol = Solution()

# Input array and target
arr = [2, 7, 11, 15]
target = 9

# Call method and print result
print(sol.twoSum_brute(arr, target))  # Output: [0, 1]
print(sol.twoSum_optimise(arr, target))  # Output: [0, 1]
