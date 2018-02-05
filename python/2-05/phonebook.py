### Electronic Phonebook - Ben Gamber
### Look up, create, and modify contact entries

import os, time

running = True
userInput = ''
phonebook = {}

## Look up an entry
def lookUpEntry():
    os.system('clear')
    print 'Electronic Phone Book'
    print '====================='
    print "Look Up Entry"
    name = raw_input("Search for name: ")
    if name in phonebook:
        print '%s: %s' % (name, phonebook[name])
        raw_input("Press 'Enter' to continue...")
    else:
        print "Entry for '%s' not found." % name
        raw_input("Press 'Enter' to continue...")

## Create an entry
def setEntry():
    os.system('clear')
    print 'Electronic Phone Book'
    print '====================='
    print "Create/Edit Entry"
    name = raw_input("Enter name: ")
    phone = raw_input("Enter phone number: ")
    phonebook[name] = phone
    print "Entry set for %s: %s" % (name, phone)
    raw_input("Press 'Enter' to continue...")

## Delete an entry
def deleteEntry():
    os.system('clear')
    print 'Electronic Phone Book'
    print '====================='
    print "Delete Entry"
    name = raw_input("Enter name: ")
    if name in phonebook:
        del phonebook[name]
        print "Entry deleted for %s" % name
        raw_input("Press 'Enter' to continue...")
    else:
        print "Entry for '%s' not found." % name
        raw_input("Press 'Enter' to continue...")

## List all entries
def listEntries():
    os.system('clear')
    print 'Electronic Phone Book'
    print '====================='
    print "List Entries"
    for name,number in sorted(phonebook.iteritems()):
        print '%s: %s\n' % (name, number)
    raw_input("Press 'Enter' to continue...")

## Clear screen and list options
def printMenu():
    os.system('clear')
    print 'Electronic Phone Book'
    print '====================='
    print '1. Look up an entry'
    print '2. Create/Edit an entry'
    print '3. Delete an entry'
    print '4. List all entries'
    print '5. Quit'

## Main loop
while running:
    printMenu()
    userInput = raw_input("Select an option: ")
    if userInput == '1':
        lookUpEntry()
    elif userInput == '2':
        setEntry()
    elif userInput == '3':
        deleteEntry()
    elif userInput == '4':
        listEntries()
    elif userInput == '5':
        print '\nClosing application...'
        running = False
        time.sleep(0.5)
        os.system('clear')
    else:
        print 'Invalid input.'
        time.sleep(1)