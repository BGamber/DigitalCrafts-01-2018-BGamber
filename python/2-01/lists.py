givenList = [-8, -4, -2, 1, 5, 12, 4, 9, 6]
print "List: %s" % givenList
total = 0
for num in givenList:
    total += num
print "Sum: %s" % total
highest = givenList[0]
for num in givenList:
    if num > highest:
        highest = num
print "Highest: %s" % highest
lowest = givenList[0]
for num in givenList:
    if num < lowest:
        lowest = num
print "Lowest: %s" % lowest
evens = []
for num in givenList:
    if num % 2 == 0:
        evens.append(num)
print "Evens: %s" % evens
posList = []
print "Positive: "
for num in givenList:
    if num > 0:
        print "    %s" % num
        posList.append(num)
print "Positive II: %s" % posList
times2List = []
for num in givenList:
    times2List.append(num * 2)
print "Multiplied by 2: %s" % times2List
