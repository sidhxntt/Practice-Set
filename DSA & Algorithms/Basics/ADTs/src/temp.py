def summation(*args):
    add = sum(args)
    return add

a = [
    135,
    499,
    915,
    482,
    35,
    697.5,
    72,
    103.8,
    236,
    164,
    309,
    3192.5,
    52,
    236,
    141.60
]

result = summation(*a)
print(result)
