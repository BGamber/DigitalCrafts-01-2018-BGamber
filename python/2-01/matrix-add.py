firstMatrix = [[1, 3], [2, 4]]
print "\nFirst:  %s" % firstMatrix

secondMatrix = [[5, 2], [1, 0]]
print "Second: %s" % secondMatrix

# Expected output: [[6, 5], [3, 4]]
outputMatrix = []

for outer in range(0, 2):
    outputMatrix.append([])
    for inner in range(0, 2):
        outputMatrix[outer].append(firstMatrix[outer][inner] + secondMatrix[outer][inner])

print "Output: %s" % outputMatrix + "\n"