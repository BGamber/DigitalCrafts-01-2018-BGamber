text = open('long-file.txt', 'r+')

for line in text.readlines():
    print line,

text.writelines('\ntldr; Lorem Ipsum is long.')

text.close()
