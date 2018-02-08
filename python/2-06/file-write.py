name = raw_input('Enter file to write to: ')
mode = ''
check = ''
try:
    open(name, 'r')
except IOError:
    mode = 'w+'
else:
    while check != 'y' and check != 'n':
        check = raw_input("Do you want to overwrite the file? (y/n): ")
    if check == 'n':
        mode = 'a+'
    else:
        mode = 'w+'

userInput = raw_input("Enter your file content: ")

myFile = open(name, mode)

myFile.write(userInput)

myFile.close()

print "File written."