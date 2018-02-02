todaySeats = [
    "Bamie",
    "Kyle",
    "Terry",
    "Ben",
    "Joel",
    "Janelle",
    "Itzik",
    "Prathyusha",
    "Rachel",
    "Illia",
    "Ashley"
]

yesterdaySeats = [
    "Dylan",
    "Kyle",
    "David",
    "Jaehee",
    "Ellen",
    "Paul",
    "Terry",
    "Itzik",
    "Rachel",
    "Ashley",
    "Illia"
]

print "-FIRST LOOP-"
seatTest = 0
seatCount = len(todaySeats)
while seatTest < seatCount:
    if todaySeats[seatTest] == yesterdaySeats[seatTest]:
        print "Hey! %s can't sit there!" % todaySeats[seatTest]
    else:
        print "New seat! Good job %s!" % todaySeats[seatTest]

    seatTest += 1
print "-SECOND LOOP-"
for currentSeat in todaySeats:
    indx = todaySeats.index(currentSeat)
    if todaySeats[indx] == yesterdaySeats[indx]:
        print "Hey! %s can't sit there!" % currentSeat
    else:
        print "New seat! Good job %s!" % currentSeat
print "-THIRD LOOP-"
for i in range(0, len(todaySeats)):
    if todaySeats[i] == yesterdaySeats[i]:
        print "Hey! %s can't sit there!" % todaySeats[i]
    else:
        print "New seat! Good job %s!" % todaySeats[i]