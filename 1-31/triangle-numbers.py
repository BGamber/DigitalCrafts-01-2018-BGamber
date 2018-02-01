import time

print "Triangle numbers: Xn = n*(n+1)/2"
n = 1
i = 1
while i <= 100:
    n = i*(i+1)/2
    print "%s:" % i, n
    i += 1
    time.sleep(0.2)