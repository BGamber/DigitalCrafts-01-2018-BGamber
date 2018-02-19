// Javascript 101
var hello = function (name) {
    if (name === undefined) {
        console.log('Hello, world!')
    } else {
        console.log(`Hello, ${name}!`);
    }
};

var madlib = function (name, subject) {
    console.log(`${name}'s favorite subject in school is ${subject}.`);
};

var tipCalc = function (bill, service) {
    var tip;
    if (service === 'good') {
        tip = bill * 0.20;
    } else if (service === 'fair') {
        tip = bill * 0.15;
    } else if (service === 'bad') {
        tip = bill * 0.10;
    } else {
        tip = 0;
    }
    return tip;
};

var totalBill = function (bill, service) {
    var total = bill + tipCalc(bill, service);
    return total;
};

var splitAmount = function (bill, service, numSplit) {
    var splitAmount = totalBill(bill, service) / numSplit;
    return splitAmount;
};

// Javascript 102
var printNumbers = function (num1, num2) {
    for (i = num1; i <= num2; i++) {
        console.log(i);
    }
}

var printSquare = function (size) {
    for (i = 0; i < size; i++) {
        console.log('* '.repeat(size));
    }
}

var printBox = function (size) {
    for (i = 1; i <= size; i++) {
        if (i == 1 || i == size) {
            console.log('* '.repeat(size));
        } else {
            console.log('* ' + '  '.repeat(size - 2) + '* ');
        }
    }
}

var printBanner = function (message) {
    console.log('*'.repeat(message.length + 4));
    console.log('* ' + message + ' *');
    console.log('*'.repeat(message.length + 4));
}

var factor = function (number) {
    var factorList = [];
    for (i = 1; i <= number; i++) {
        if (number % i == 0) {
            if (factorList.indexOf(i) == -1) {
                factorList.push(i);
            }
        }
    }
    return factorList;
}

var cipher = function (message, key) {
    var shift = 13;
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var alphaDict = {};
    var numDict = {};
    var messageArray = message.toLowerCase().split('');
    var letterToNumArray = [];
    var ciperArray = [];
    var numToLetterArray = [];
    for (i=0;i<alphabet.length;i++) {
        alphaDict[alphabet[i]] = i + 1;
        numDict[String(i+1)] = alphabet[i];
    }
    for (i=0;i<message.length;i++) {
        letterToNumArray.push(alphaDict[messageArray[i]]);
    }
    if (key !== undefined) {
        shift = key;
    }
    for (i=0;i<message.length;i++) {
        var newNum = letterToNumArray[i] + shift;
        // TODO: Handle new numbers shifted
    }
}