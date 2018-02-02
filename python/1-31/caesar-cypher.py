# lbh zhfg hayrnea jung lbh unir yrnearq
# key modifier:
#   if value > 25: value -= 26
#   if value < 0: value += 26
import string
import os

crypt = int(raw_input("\nEnter 1 to ENCRYPT; enter 2 to DECRYPT: "))
given = list(raw_input("Enter the message: ").lower())
key = int(raw_input("Enter the key (shift value): "))

os.system('clear')

newMessage = given
# Create alphabet dictionary
letterList = list(string.ascii_lowercase)
letterDict = {}
numberDict = {}
for letter in letterList:
    letterDict[letter] = letterList.index(letter)
for letter in letterList:
    numberDict[letterList.index(letter)] = letter

# Convert characters in message to number equivalent
for i in range(0, len(given)):
    if given[i].isalpha():
        newMessage[i] = letterDict[given[i]]

# Convert number values to modified values
for i in range(0, len(given)):
    if str(given[i]).isalnum():
        if crypt == 1:
            newMessage[i] += key
            if newMessage[i] > 25:
                newMessage[i] -= 26
        elif crypt == 2:
            newMessage[i] -= key
            if newMessage[i] < 0:
                newMessage[i] += 26

# Convert modified number values back to character values
for i in range(0, len(given)):
    if str(given[i]).isalnum():
        newMessage[i] = numberDict[newMessage[i]]

outputMessage = "".join(newMessage)
print "\n%sed Message: " % ("Encrypt" if crypt == 1 else "Decrypt") + outputMessage + "\n"