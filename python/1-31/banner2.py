textList = []
inputtingText = True
check = ""
while inputtingText:
    userString = raw_input("Enter text: ")
    textList.append(userString)
    while check != "yes" and check != "no":
        check = raw_input("Add more? (y/n): ").lower()
        if check == "yes" or check == "y":
            break
        elif check == "no" or check == 'n':
            inputtingText = False
            break

width = 0
for word in textList:
    if len(word) > width:
        width = len(word)

for word in textList:
    spaces = (len(word) - width)
    print "*" * (width + 4)
    print "*" + " "*spaces + word + " "*spaces + "*"

print "*" * (width + 4)