def func(arr):
    if not arr:
        return ""

    prefix = ""
    for j in range(len(arr[0])):  # loop over characters of first string
        char = arr[0][j]
        for i in range(1, len(arr)):
            if j >= len(arr[i]) or arr[i][j] != char:
                return prefix  # mismatch or out of bounds
        prefix += char  # all strings matched at position j
    return prefix

# Test
strs = ["flower", "flow", "flight"]
print(func(strs))  # Output: "fl"
