numbers = range(0,100,11)
otherNumbers = range(0,100,14)

def add(numList):
    total = 0
    for num in numList:
        total += num
    return total

print numbers, ":", add(numbers)
print otherNumbers, ":", add(otherNumbers)