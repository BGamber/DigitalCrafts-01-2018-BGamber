# # Smallest divisible by 1-20
# def testDiv(number):
#     for i in range(1,21):
#         if number % i != 0:
#             return False
#     return True

# num = 20
# while not testDiv(num):
#     num += 20
# print num
# # Result: 232792560

# assert testDiv(2) == False, "Test failed for 2 == False"
# assert testDiv(10) == False, "Test failed for 10 == False"
# assert testDiv(20) == False, "test failed for 20 == False"

def smallestDiv(number):
    test = 1
    for i in range(2, number):
        if test % i != 0:
            test *= i
    return test

print smallestDiv(10)

## Largest plaindromic num from 3-digit-based products
def testPalin(num1, num2):
    test1 = str(num1 * num2)
    test2 = str(num1 * num2)[::-1]
    if test1 == test2:
        return True
    return False

# i = 100
# big_palindrome = 0
# while i < 1000:
#     j = 100
#     while j < 1000:
#         if testPalin(i, j):
#             if i * j > big_palindrome:
#                 big_palindrome = i * j
#                 print "New big palindrome: %s" % big_palindrome, "%d * %d" % (i, j)
#         j += 1
#     i += 1

# print big_palindrome


assert testPalin(1, 11) == True, "Test failed for (1, 11) == True"
assert testPalin(91, 99) == True, "Test failed for (91, 99) == True"
assert testPalin(2, 5) == False, "Test failed for (2, 5) == False"

## 99 cans of Cola/soda/soda pop
def whatSoda(number):
    if number % 7 == 0 and number % 5 == 0:
        return 'soda pop'
    elif number % 7 == 0:
        return 'soda'
    elif number % 5 == 0:
        return 'pop'
    else:
        return "Cola"

def whatSoda2(number):
    while number % 7 == 0 and number % 5 == 0:
        return 'soda pop'

    while number % 7 == 0:
        return 'soda'

    while number % 5 == 0:
        return 'pop'

    return 'Cola'

def whatSoda3(number):
    return ((number % 7 == 0), (number % 5 == 0))

i = 99
drink = {
    (True, True): 'soda pop',
    (True, False): 'soda',
    (False, True): 'pop',
    (False, False): 'Cola'
}
while i >= 0:
    check = whatSoda3(i)
    print "%s cans of %s, take one down, pass it around, %s cans of %s on the wall." % (i, drink[check], i, drink[check])
    i -= 1

assert drink[whatSoda3(7)] == 'soda', "Test failed for 7 == soda"
assert drink[whatSoda3(5)] == 'pop', "Test failed for 5 == pop"
assert drink[whatSoda3(35)] == 'soda pop', "Test failed for 35 == soda pop"