# Variable Overwriting
box1 = 5
print(box1)

box2 = 3
box2 = 10  # Overwritten
print(box2)

# Python does not have true constants, but uppercase names indicate intended immutability.
MAX_VALUE = 100  # Convention for constants

# Handling Infinity & NaN
print(float('inf'))  # inf (infinity)

box = float('nan') # CANNOT USE INT as ValueError
print(box / 2)  # nan
print(box ** 0)  # 1

# None vs NaN in Python
box3 = None  # Python equivalent of 'null'
# print(box3 ** 0)  # 1

# Python does not support `++`
# box = None
# print(box++)  # SyntaxError

print(type(box))
print(type(str(box)))
# print(type(int(box))) # ValueError: cannot convert float NaN to integer
print(type(bool(box)))

# print("6"/"2") # TypeError
# print("6"/2) # TypeError
# FOR ALL MATH OPS & COMAPIRSION AS IT NEEDS TO BE SAME DATA TYPE

height = 0
# Logical AND
print(1 and 2 and None and 3)  # Output: None
print(1 and 2 and 3)           # Output: 3

# Logical OR
print(height or 100)           # Output: 100

# Nullish Coalescing (?? equivalent)
print(height if height is not None else 100)  # Output: 0
print(height if height is not None else None if None is not None else 100)  # Output: 0

# Logical AND
print(height and 100)          # Output: 0

#  and basically gives first falsy (0, false, none, empty string,set,dict) and or gives first truth
print((1 or 0) and (2 or 0))
print((1 or 0) or (2 or 0))
print((1 and 0) or (2 and 0))
print((1 and 0) and (2 and 0))

print(None>0) # TypeError: '>' not supported between instances of 'NoneType' and 'int'
