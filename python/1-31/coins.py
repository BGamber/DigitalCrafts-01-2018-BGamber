wantCoins = True
coins = 0

while wantCoins:
    print "You have %d coin%s." % (coins, '' if coins == 1 else 's')
    answer = raw_input("Do you want another? (y/n): ").lower()
    if answer == "yes" or answer == 'y':
        coins += 1
    elif answer == "no" or answer == 'n':
        wantCoins = False
    else:
        print "Sorry, I didn't understand you."

print "Enjoy your %d coin%s." % (coins, '' if coins == 1 else 's')