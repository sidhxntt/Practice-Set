class Algo(object):
    def binary_search(self, arr, val):
        low = 0
        high = len(arr) - 1

        while low <= high:
            mid = (low + high)//2
            if arr[mid] == val:
                return mid
            elif arr[mid] < val:
                low = mid +1
            else:
                high = mid -1
        return -1
        
a = Algo()

arr = [3, 6, 9, 12, 13, 16, 19]
val = 13

ele = a.binary_search(arr, val)
print(ele)
