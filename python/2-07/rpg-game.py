"""
In this less-simple RPG game, the player fights the enemy. He has the options to:
1. fight enemy
2. do nothing - in which case the enemy will attack him anyway
3. flee
"""
import random, time

class Character(object):
    def __init__(self):
        self.name = 'ERROR'
        self.health = 0
        self.power = 0
        self.coins = 9001
        self.weakness = []
        self.requiredElement = []
        self.attackedWith = []

    def alive(self):
        if self.health <= 0 and hasattr(self, 'requiredElement'):
            for element in self.attackedWith:
                if element in self.requiredElement and self.health <= 0:
                    return False
            else:
                return True
        elif self.health <= 0:
            return False
        else:
            return True

    def attack(self, enemy, **dmgType):
        if not self.alive():
            return
        if 'element' in dmgType:
            enemy.attackedWith.append(dmgType['element'])
        enemy.health -= self.power
        print "%s's attack does %d damage to %s." % (self.name, self.power, enemy.name)

    def print_status(self):
                print "%s has %d health and %d power." % (self.name, self.health, self.power)

class Hero(Character):
    def __init__(self):
        self.name = 'Hero'
        self.health = 10
        self.power = 5
        self.coins = 20
        self.dmgType = 'slashing'

    def attack(self, enemy, dmgType):
        if not self.alive():
            return
        damage = self.power
        if len(dmgType) > 0:
            if dmgType not in enemy.attackedWith:
                enemy.attackedWith.append(dmgType)
            if dmgType in enemy.weakness:
                print "Super effective!",
                damage *= 2
        if random.random() >= 0.8:
            print "Critical strike!!",
            damage *= 2
        enemy.health -= damage
        print "%s's attack does %d %s damage to %s." % (self.name, damage, dmgType, enemy.name)

    def restore(self):
        self.health = 10
        print "Hero's heath is restored to %d!" % self.health
        time.sleep(1)

    def buy(self, item):
        self.coins -= item.cost
        item.apply(hero)

class Goblin(Character):
    def __init__(self):
        self.name = 'Goblin'
        self.health = 6
        self.power = 2
        self.weakness = ['ice']
        self.attackedWith = []

class Zombie(Character):
    def __init__(self):
        self.name = 'Zombie'
        self.health = 4
        self.power = 3
        self.weakness = []
        self.requiredElement = ['fire', 'radiant']
        self.attackedWith = []

def main():
    player = Hero()
    enemy = Goblin()
    print "You are a %s." % player.name
    while enemy.alive() and player.alive():
        player.print_status()
        enemy.print_status()
        print
        print "What will you do?"
        print "1. Fight %s" % enemy.name
        print "2. Nothing"
        print "3. Flee"
        print "> ",
        input = raw_input()
        if input == "1":
            player.attack(enemy, player.dmgType)
            if not enemy.alive():
                print "The %s is dead." % enemy.name
        elif input == "2":
            pass
        elif input == "3":
            print "You ran away!"
            break
        else:
            print "Invalid input: %r" % input
        if enemy.alive():
            # Goblin attacks hero
            enemy.attack(player)
        if player.health <= 0:
            print "You are dead."
main()