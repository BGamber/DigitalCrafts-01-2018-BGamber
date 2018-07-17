# loud = raw_input("How are you? : ").upper()
# print "\n'" + loud + "'"
# print "Jeez, you don't have to yell."

user_string = raw_input("Enter a message: ")
upper_string = user_string.upper()
new_string = ""

for i in range(len(user_string)):
  new_string += upper_string[i]

print new_string