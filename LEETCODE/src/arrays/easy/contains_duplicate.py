class Solution(object):
    def containsDuplicate(self, nums):
        freq = {}
        for num in nums:
            if num in freq:
                freq[num] +=1
            else:
                freq[num] = 1

        for num in freq:
            if freq[num] >1:
                return True
        return False
    
    def containsDuplicate2(self, nums, k):
        last_seen = {} 
        
        for i, num in enumerate(nums):
            if num in last_seen and i - last_seen[num] <= k:
                return True
            last_seen[num] = i  
        
        return False

s = Solution()

arr1 = [1,1,1,3,3,4,3,2,4,2]
arr2 = [1,2,3,1]
arr3 = [1,2,3,4]
arr4 = [2,14,18,22,22]

print(s.containsDuplicate(arr1))
print(s.containsDuplicate(arr2))
print(s.containsDuplicate(arr3))
print(s.containsDuplicate(arr4))