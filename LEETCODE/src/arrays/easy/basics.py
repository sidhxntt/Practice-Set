arr = [1, 2, 3, 4, 5]

class Basics(object):
    def assign(self, a):
        i = 2
        j = 1
        a[i] = a[j]
        return a

    def push_left(self, a):
        for i in range(1, len(a)):
            a[i - 1] = a[i]
        a[-1] = None
        return a
    
    # vice-versa of above
    def push_right(self, a):
        for i in range(len(a) - 2, -1, -1):  # go from second last to first
            a[i + 1] = a[i]
        a[0] = None
        return a

b = Basics()
array1 = b.assign(arr[:])       # Copy to prevent in-place side effects
array2 = b.push_left(arr[:])
array3 = b.push_right(arr[:])

print("After assign:     ", array1)
print("After push_left:  ", array2)
print("After push_right: ", array3)
