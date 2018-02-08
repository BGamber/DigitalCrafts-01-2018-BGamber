### Lunch Tracker
### Ben Gamber

import os

class Restaurant(object):
    def __init__(self, name, weekVisits, totalVisits):
        self.name = name
        self.weekVisits = weekVisits
        self.totalVisits = totalVisits

    def visit(self):
        self.weekVisits += 1
        self.totalVisits += 1

    def resetWeek(self):
        self.weekVisits = 0

    def getName(self):
        return self.name

    def getWeekVisits(self):
        return self.weekVisits

    def getTotalVisits(self):
        return self.totalVisits

def printHeader():
    os.system('clear')
    print 'Lunch Tracker'
    print '================='

restaurantList = []

## Test Data
naanstop = Restaurant('NaanStop', 0, 0)
farmburger = Restaurant('Farm Burger', 0, 0)
chipotle = Restaurant('Chipotle', 0, 0)
restaurantList.append(naanstop)
restaurantList.append(farmburger)
restaurantList.append(chipotle)

## Main Loop
