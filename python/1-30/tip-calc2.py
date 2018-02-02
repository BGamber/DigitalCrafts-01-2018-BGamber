bill = float(raw_input("Enter bill amount: "))
tipPct = 0.0
while tipPct == 0.0:
    service = raw_input("Quality of service (good/fair/bad): ")
    if service == "good":
        tipPct = 0.2
    elif service == "fair":
        tipPct = 0.15
    elif service == "bad":
        tipPct = 0.1
    else:
        print "Come on, be honest."

numSplit = int(raw_input("Enter number of payers: "))

tipAmount = bill * tipPct
total = bill + tipAmount

print "Tip amount: $%.2f" % tipAmount
print "Total amount: $%.2f" % total
print "Amount per payer: $%.2f" % (total / numSplit)