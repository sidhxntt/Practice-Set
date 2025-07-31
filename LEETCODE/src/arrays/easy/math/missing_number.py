arr = [9,6,4,2,3,5,7,0,1]

# def function (arr):
#     a = sorted(arr)
#     n = len(arr)
#     for i in range(1, arr[n-1]):
#         if arr[i]- arr[i-1] != 1:
#             return arr[i]
#         return -1

def function(arr):
    a = sorted(arr)
    for i in range(len(a)):
        if a[i] != i:
            return i
    return len(arr)

print(function(arr))