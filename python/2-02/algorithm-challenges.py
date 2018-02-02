## Multiples of 3 or 5 below 1000
## Answer: 233168

total1 = 0

for i in range(1000):
    if i % 3 == 0 or i % 5 == 0:
        total1 += i

print "\nExpected: 233168"
print "Result: %s" % total1

## Fibonnaci evens below 4,000,000
## Answer: 4613732

total2 = 0
next = 0
counting = [1, 1]

while True:
    next = counting[0] + counting[1]
    if next >= 4000000:
        break
    elif next % 2 == 0:
        total2 += next
    counting[0] = counting[1]
    counting[1] = next

print "\nExpected: 4613732"
print "Result: %s" % total2

## Largest prime factor of 600851475143
## Answer: 6857

def getFactors(myNum):
    root = int(myNum**0.5)
    for i in xrange(2,root):
        if myNum % i == 0:
            for j in xrange(i, (myNum/i)):
                # print "Testing %s / %s..." % (myNum, j)
                if myNum % j == 0 and j != 1:
                    factor1 = myNum / j
                    factor2 = j
                    return factor1, factor2
            else:
                return -1, myNum
    return -1, myNum    

testing = 600851475143
factorList = []
while True:
    result = getFactors(testing)
    print result
    if result[0] != -1:
        if result[0] not in factorList:
            factorList.append(result[0])
        if result[1] not in factorList:
            factorList.append(result[1])
    else:
        if result[1] not in factorList:
            factorList.append(result[1])
        break
    testing = result[0]

primeList = []
for num in factorList:
    if getFactors(num)[0] == -1:
        primeList.append(num)

print "\nExpected: 6857"
print "Result: %s\n" % max(primeList)