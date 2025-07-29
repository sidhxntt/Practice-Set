# Brute force solution 0(n)
class Solution(object):
    def removeDuplicates_brute(self, nums):
        k = 1
        for i in range(1, len(nums)):
            if nums[i] != nums[i - 1]:
                nums[k] = nums[i]
                k += 1
        
        return k
 
    
    def removeDuplicates_optimise(self, nums):
        seen = {}
        k = 0
        for num in nums:
            if num not in seen:
                seen[num] = True
                nums[k] = num
                k +=1
        return k  

# Create instance of Solution
sol = Solution()

# Input array and target
arr = [0,0,1,1,1,2,2,3,3,4]


# Call method and print result
print(sol.removeDuplicates_brute(arr))  
print(sol.removeDuplicates_optimise(arr))  
