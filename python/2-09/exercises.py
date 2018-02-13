## Smallest divisible by 1-20
# def testDiv(number):
#     for i in range(1,21):
#         if number % i != 0:
#             return False
#     return True

# num = 20
# while not testDiv(num):
#     num += 20
# print num
## Result: 232792560

assert testDiv(2) == False, "Test failed for 2 == False"
assert testDiv(10) == False, "Test failed for 10 == False"
assert testDiv(20) == False, "test failed for 20 == False"

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

## 99 Bottles of beer/Miller/Miller Lite
def whatBeer(number):
    if number % 7 == 0 and number % 5 == 0:
        return 'Miller Lite'
    elif number % 7 == 0:
        return 'Miller'
    elif number % 5 == 0:
        return 'Lite beer'
    else:
        return "beer"

def whatBeer2(number):
    while number % 7 == 0 and number % 5 == 0:
        return 'Miller Lite'

    while number % 7 == 0:
        return 'Miller'

    while number % 5 == 0:
        return 'Lite beer'

    return 'beer'

def whatBeer3(number):
    return ((number % 7 == 0), (number % 5 == 0))

i = 99
booze = {
    (True, True): 'Miller Lite',
    (True, False): 'Miller',
    (False, True): 'Lite beer',
    (False, False): 'beer'
}
while i >= 0:
    check = whatBeer3(i)
    print "%s bottles of %s, take one down, pass it around, %s bottles of %s on the wall." % (i, booze[check], i, booze[check])
    i -= 1

assert whatBeer(7) == 'Miller', "Test failed for 7 == Miller"
assert whatBeer(5) == 'Lite beer', "Test failed for 5 == Lite beer"
assert whatBeer(35) == 'Miller Lite', "Test failed for 35 == Miller Lite"