def letterHistogram(text):
    letterCount = {}
    for letter in text:
        if letter.isalnum():
            if letter in letterCount:
                letterCount[letter] += 1
            else:
                letterCount[letter] = 1
    return letterCount

def wordHistogram(text):
    wordCount = {}
    wordList = text.split(" ")
    for word in wordList:
        if word in wordCount:
            wordCount[word] += 1
        else:
            wordCount[word] = 1
    return wordCount

name = raw_input("Enter file to examine: ")

myFile = open(name)
contents = myFile.read()
myFile.close()

text = contents.replace("\n", " ").replace(".", "").replace("?", "").lower()

print letterHistogram(text)
print wordHistogram(text)
