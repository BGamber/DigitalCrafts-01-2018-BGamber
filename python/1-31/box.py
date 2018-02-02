width = int(raw_input("How wide is the box? : "))
height = int(raw_input("How tall is the box? : "))

i = 0
while i < height:
    j = 0
    while j < width:
        # IF it's the first line or last line, OR
        # IF it's the first column or last column...
        if (i == 0 or i == height - 1) or (j == 0 or j == width - 1):
            print "*",
        else:
            print " ",
        j += 1
    print "\n",
    i += 1