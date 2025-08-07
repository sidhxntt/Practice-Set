arr = [9,6,4,2,3,5,7,0,1]

def function(arr):
    a = sorted(arr)
    for i in range(len(a)):
        if a[i] != i:
            return i
    return len(arr)

print(function(arr))