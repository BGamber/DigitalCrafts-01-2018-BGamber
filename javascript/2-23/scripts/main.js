var firstList = [1, 2, 3, 4, 5, 6, 7, 8, 9];

var isEven = function(num) {
    if (num % 2 === 0) {
        return true;
    }
};

var firstLetterE = function(name) {
    if (name[0] === 'E') {
        return true;
    }
};

var isOne = function(num) {
    if (num === 1) {
        return true;
    }
};

var findElement = function(list, fun) {
    for (var i=0; i < list.length; i++) {
        if (fun(list[i]) === true) {
            return list[i];
        }
    }
    return false;
};

console.log(findElement(firstList, isEven));

console.assert((findElement([1, 3, 5, 8], isEven) === 8), '8 is first even element');
console.assert((findElement([1, 3, 5], isEven) === false), 'no even elements');
console.assert(findElement(['Ashley', 'Ben', 'Ellen', 'Robby'], firstLetterE) === 'Ellen', 'Ellen has first letter of E');
console.assert(findElement(['Ashley', 'Ben', 'Robby'], firstLetterE) === false, 'No names with E');
console.assert(findElement([7, 5, 1, 4], isOne) === 1, '1 is first 1');