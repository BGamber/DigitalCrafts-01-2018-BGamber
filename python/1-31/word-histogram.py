sentence = raw_input("\nEnter a sentence: ").lower()

wordCount = {}

wordList = sentence.split(" ")

for word in wordList:
    if word in wordCount:
        wordCount[word] += 1
    else:
        wordCount[word] = 1

print wordCount

topListWord = []
topListCount = []

for word in wordCount:
    if len(topListWord) == 0:
        topListWord.append(word)
        topListCount.append(wordCount[word])
    else:
        for i in range(0, len(topListWord)):
            if wordCount[word] >= topListCount[i]:
                topListWord.insert(i, word)
                topListCount.insert(i, wordCount[word])
                break
            elif len(topListWord) < 3:
                topListWord.append(word)
                topListCount.append(wordCount[word])
                break

    if len(topListWord) > 3:
        topListWord.pop()
        topListCount.pop()

print "Top %d Frequent:" % len(topListWord)
for i in range(0, len(topListWord)):
    print "%s: %s" % (topListWord[i], topListCount[i])