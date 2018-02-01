word = raw_input("Enter a word: ").lower()

letterCount = {}

for letter in word:
    if letter in letterCount:
        letterCount[letter] += 1
    else:
        letterCount[letter] = 1

print letterCount