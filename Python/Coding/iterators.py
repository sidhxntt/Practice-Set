import random
from functools import reduce

mylist = [random.randint(1, 100) for _ in range(10)]
print(mylist)

squared = list(map(lambda x: x**2, mylist)) 
filtered = list(filter(lambda x: x%2==0, mylist))
reduced = reduce(lambda x,y: x+y ,mylist)

print("Squared:", squared)
print("Filtered:", filtered)
print("Reduce:", reduced)

print("-" * 20)
print("Iterating through the list using for loop:")
for item in mylist:
    print(item)
print("-" * 20)

print("Iterating through the list using while loop:")
i = 0
while i < len(mylist):
    print(mylist[i])
    i += 1
print("-" * 20)

print("Iterating through the list using enumerate():")
for index, item in enumerate(mylist):
    print(f"Index {index}: {item}")
print("-" * 20)

print("Iterating through the list using reversed():")
for item in reversed(mylist):
    print(item)
print("-" * 20)

print("Iterating through the list using a for loop with range():")
for i in range(len(mylist)):
    print(mylist[i])
print("-" * 20)

print("Iterating through the list using iter() and next():")
mylist_iter = iter(mylist)
while True:
    try:
        item = next(mylist_iter)
        print(item)
    except StopIteration:
        break
print("-" * 20)


my_list = [random.randint(1, 100) for _ in range(5)]
list_iter = iter(my_list)  # This creates an iterator

print("Original list:", my_list)
print("First value (via next):", next(list_iter))
print("Second value (via next):", next(list_iter))