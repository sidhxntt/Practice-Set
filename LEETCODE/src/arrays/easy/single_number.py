class Solution(object):
    def singleNumber(self, nums):
        freq = {}
        for num in nums:
            if num in freq:
                freq[num] +=1
            else:
                freq[num] = 1

        for num in freq:
            if freq[num] ==1:
                return num

s = Solution()
arr = [2,2,1]
print(s.singleNumber(arr))