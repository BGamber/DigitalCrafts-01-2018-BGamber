height = int(raw_input("Enter triangle height: "))
width = (height * 2) - 1
i = width
count = 1
while i >= 0:
    halfI = i / 2
    print " " * halfI + "*" * count
    i -= 2
    count += 2