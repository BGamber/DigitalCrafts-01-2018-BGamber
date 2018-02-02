excludeList = ['and', 'the', 'of']

title = raw_input("\nWhat's the last book you read?\n: ")
wordList = title.split()

for word in wordList:
    wordLower = word.lower()
    if (wordLower not in excludeList) or (wordList.index(word) == 0):
        print word.capitalize(),
    else:
        print word.lower(),
