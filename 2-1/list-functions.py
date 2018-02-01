# Starting values for testing
list1 = range(0,101,20)[1:]
list2 = range(-30,30,10)[1:]
list3 = range(0,16,3)[1:]

print '\n', list1, list2, list3, '\n'

# Add numbers of a list
def sumList(myList):
    total = 0
    for num in myList:
        total += num
    return total

print "Sums:"
print sumList(list1), sumList(list2), sumList(list3), '\n'

# Get largest number of a list
def largestInList(myList):
    largest = myList[0]
    for num in myList:
        if num > largest:
            largest = num
    return largest

print "Largest:"
print largestInList(list1), largestInList(list2), largestInList(list3), '\n'

# Get lowest number of a list
def lowestInList(myList):
    lowest = myList[0]
    for num in myList:
        if num < lowest:
            lowest = num
    return lowest

print "Lowest:"
print lowestInList(list1), lowestInList(list2), lowestInList(list3), '\n'

# Get list of even values in given list
def evensInList(myList):
    evens = []
    for num in myList:
        if num % 2 == 0:
            evens.append(num)
    return sorted(evens)

print "Evens:"
print evensInList(list1), evensInList(list2), evensInList(list3), '\n'

# Get list of positive values in given list
def posInList(myList):
    positives = []
    for num in myList:
        if num > 0:
            positives.append(num)
    return sorted(positives)

print "Positives:"
print posInList(list1), posInList(list2), posInList(list3), '\n'

# Multiply values in list by given factor
def multiplyList(myList, factor):
    multList = []
    for num in myList:
        multList.append(num * factor)
    return multList

print "Multiply:"
print "%s: %s, %s: %s, %s: %s" % (2, multiplyList(list1, 2), 3, multiplyList(list2, 3), 5, multiplyList(list3, 5)), '\n'

# Multiply index-matching values of two lists
def multiplyVectors(list1, list2):
    result = []
    for i in range(len(list1)):
        result.append(list1[i] * list2[i])
    return result

print "Multiply Vectors:"
print "%s: %s, %s: %s, %s: %s" % ("1 * 2", multiplyVectors(list1, list2), "2 * 3", multiplyVectors(list2, list3), "1 * 3", multiplyVectors(list1, list3)), '\n'

# Add index-matching values of two lists
def addVectors(list1, list2):
    result = []
    for i in range(len(list1)):
        result.append(list1[i] + list2[i])
    return result

# Add two given matrices
def addMatrices(matrix1, matrix2):
    result = []
    for i in range(len(matrix1)):
        result.append(addVectors(matrix1[i], matrix2[i]))
    return result


print "Add Matrices: [[1, 3], [2, 4]] and [[5, 2], [1, 0]]"
matrix1 = [[1, 3], [2, 4]]
matrix2 = [[5, 2], [1, 0]]
print addMatrices(matrix1, matrix2), '\n'

print "Add Matrices: [[1, 3, 5], [2, 4, 6]] and [[5, 2, -1], [1, 0, -1]]"
matrixA = [[1, 3, 5], [2, 4, 6]]
matrixB = [[5, 2, -1], [1, 0, -1]]
print addMatrices(matrixA, matrixB), '\n'

# Remove duplicates from given list
def dedup(myList):
    dedupList = []
    for item in myList:
        if item not in dedupList:
            dedupList.append(item)
    return dedupList

print "De-duplicate List: ['spam', 'eggs', 'spam', 'milk', 'spam', 'cheese', 'spam']"
dupeList = ['spam', 'eggs', 'spam', 'milk', 'spam', 'cheese', 'spam']
print dedup(dupeList), '\n'

#
# def multiplyMatrices(matrix1, matrix2):
#     result = []
#     for i in range(0, 2):
#         result.append([])
#         for j in range(0, 2):
#             fact1 = matrix1[i][j]
#             fact2 = 0
