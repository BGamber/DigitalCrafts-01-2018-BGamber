print "Hello!"
name = raw_input("What's your name? ")

if " " in name:
    print "Nice to meet you,", name
else:
    last = raw_input("What's your last name? ")
    print "Nice to meet you,", name, last