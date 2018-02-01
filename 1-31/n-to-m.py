n = 0
m = 0
while n >= m:
    print "Start number must be lower than end number.\n"
    n = int(raw_input("Enter start number: "))
    m = int(raw_input("Enter end number: "))

for i in range(n, m + 1):
    print i