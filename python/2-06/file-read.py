name = raw_input('Enter file name: ')

myFile = open(name)

for line in myFile.readlines():
    print line,