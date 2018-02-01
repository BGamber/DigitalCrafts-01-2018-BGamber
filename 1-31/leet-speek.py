leetText = {
    "A": "4",
    "E": "3",
    "G": "6",
    "I": "1",
    "O": "0",
    "S": "5",
    "T": "7"
}

text = raw_input("Input text: ").upper()

for char in leetText:
    text = text.replace(char, leetText[char])

print text