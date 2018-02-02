word = raw_input("Enter a word to stretch its vowel pairs: ").lower()

vowelPairs = ['ee', 'oo']
longPairs = ['eeeee', 'ooooo']

for pair in vowelPairs:
    if word.find(pair) > 0:
        word = word.replace(pair, longPairs[vowelPairs.index(pair)])

print word