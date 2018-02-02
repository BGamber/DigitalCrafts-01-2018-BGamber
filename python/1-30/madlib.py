import time

print "\nLet's make some Mad Libs!"
name = raw_input("Give me a name: ")
job = raw_input("Give me a job: ")
item = raw_input("Give me an item: ")
person = raw_input("Give me a person: ")

vowelList = ['a', 'e', 'i', 'o', 'u']
pre = ''
if item[0].lower() in vowelList:
    pre = 'an'
else:
    pre = 'a'

print "\nAll done! Let's see what you wrote...\n"
time.sleep(1)
print "%s was a silly boy." % name
time.sleep(3)
print "He got in trouble with the %s for " \
"bringing his %s to school." % (job, item)
time.sleep(4)
print "But when his %s came to pick him up, they brought %s %s too! What silly people." % (person, pre, item)
time.sleep(4)
print "\nThanks for playing Mad Libs!\n"