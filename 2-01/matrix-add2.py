firstMatrix = [[1, 3, 4, 7], [2, 4, 2, 4]]
print "\nFirst:  %s" % firstMatrix

secondMatrix = [[5, 2, 5, 2], [1, 0, 1, 0]]
print "Second: %s" % secondMatrix

# Expected output: [[6, 5, 9, 9], [3, 4, 3, 4]]
outputMatrix = [[], []]

for outer in range(len(firstMatrix)):
    for inner in range(len(secondMatrix[0])):
        outputMatrix[outer].append(firstMatrix[outer][inner] + secondMatrix[outer][inner])

print "Output: %s" % outputMatrix + "\n"