class Solution(object):
    def median(self, arr1, arr2):
        arr3 = arr1+arr2
        sorted(arr3)

        n = len(arr3)

        if n%2 ==1:
            return arr3[n//2]
        else:
            mid1 = arr3[n//2 -1]
            mid2 = arr3[n//2 ]
            return (mid1 + mid2)/ 2.0
        
        