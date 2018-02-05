class Person(object):
    def __init__(self, name, email, phone):
        self.name = name
        self.email = email
        self.phone = phone
        self.friends = []
        self.greeting_count = 0
        self.unique_people_greeted = []
    
    def __repr__(self):
        return "%s %s %s" % (self.name, self.email, self.phone)

    def greet(self, other_person):
        print 'Hello %s, I am %s!' % (other_person.name, self.name)
        self.greeting_count += 1
        if other_person not in self.unique_people_greeted:
            self.unique_people_greeted.append(other_person)

    def print_contact_info(self):
        print "%s's email: %s, %s's phone number: %s" % (self.name, self.email, self.name, self.phone)

    def add_friend(self, other_person):
        self.friends.append(other_person)

    def num_friends(self):
        return len(self.friends)

    def num_unique_people_greeted(self):
        return len(self.unique_people_greeted)

class Vehicle(object):
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year
    
    def print_info(self):
        print self.year, self.make, self.model

sonny = Person('Sonny', 'sonny@hotmail.com', '483-485-4948')
jordan = Person('Jordan', 'jordan@aol.com', '495-586-3456')
annie = Person('Annie', 'annie@gmail.com', '477-358-1205')
sonny.greet(jordan)
jordan.greet(sonny)
sonny.print_contact_info
jordan.print_contact_info
sonny.add_friend(jordan)
jordan.add_friend(sonny)
print "Jordan # of friends: %s" % jordan.num_friends()
sonny.greet(jordan)
print "Sonny greet count: %s" % sonny.greeting_count
print jordan
sonny.greet(annie)
print "Sonny greet count: %s" % sonny.greeting_count
print "Sonny has greeted %s people." % sonny.num_unique_people_greeted()

car = Vehicle('Nissan', 'Leaf', 2015)
car.print_info()