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
    var uniArray = [];
    var cipherArray = [];
    var newMessage;
    if (key !== undefined) {
        shift = key;
    }
    for (var i=0; i < message.length; i++) {
        var newCode = message.charCodeAt(i) - shift;
        if (message.charCodeAt(i) !== 32) {
            uniArray.push(newCode);
        } else {
            uniArray.push(32);
        }
    }
    for (var i=0; i < uniArray.length; i++) {
        cipherArray.push(String.fromCharCode(uniArray[i]));
    }
    newMessage = cipherArray.join('');
    return newMessage;
}

var leetspeak = function (message) {
    var messageUpper = message.toUpperCase();
    var leetMessage = '';
    var convertObj = {
        A: '4',
        E: '3',
        G: '6',
        L: '1',
        O: '0',
        S: '5',
        T: '7'
    }
    for (var i=0; i < message.length; i++) {
        if (messageUpper.charAt(i) in convertObj) {
            leetMessage += String(convertObj[messageUpper.charAt(i)]);
        } else {
            leetMessage += messageUpper.charAt(i);
        }
    }
    return leetMessage;
}

var longLongVowels = function (word) {
    var newWord = '';
    var vowelArray = ['a', 'e', 'i', 'o', 'u'];
    for (var i=0; i < word.length; i++) {
        newWord += word.charAt(i);
        if (word.charAt(i) === word.charAt(i-1) && vowelArray.indexOf(word.charAt(i)) !== -1) {
            newWord += word.charAt(i).repeat(3);
        }
    }
    return newWord;
}

var sumNumbers = function (list) {
    var total = 0;
    for (var i=0; i < list.length; i++) {
        total += list[i];
    }
    return total;
}

var positiveNumbers = function (list) {
    var posArray = [];
    for (var i=0; i < list.length; i++) {
        if (list[i] >= 0) {
            posArray.push(list[i]);
        }
    }
    return posArray;
}

var matrixAdd = function (matrix1, matrix2) {
    var newMatrix = [];
    for (var i=0; i < matrix1.length; i++) {
        newMatrix.push([]);
        for (var j=0; j < matrix2.length; j++) {
            newMatrix[i][j] = matrix1[i][j] + matrix2[i][j];
        }
    }
    return newMatrix;
}

var matrixMultiply = function (matrix1, matrix2) {
    var newMatrix = [];
    for (var check=0; check < matrix1.length; check++) {
        if (matrix1[check].length !== matrix2.length) {
            return 'ERROR: matrices cannot be multiplied.';
        }  
    }
    for (var i=0; i < matrix1.length; i++) {
        newMatrix.push([]);
    }
    for (var col=0; col < matrix2[0].length; col++) {
        for (var row=0; row < matrix1.length; row++) {
            var pairResults = [];
            for (var pair=0; pair < matrix1[0].length; pair++) {
                pairResults.push(matrix1[row][pair] * matrix2[pair][col]);
            }
            newMatrix[row][col] = pairResults[0] + pairResults[1];
        }
    }
    return newMatrix;
}

var rockPaperScissors = function (p1, p2) {
    var result = 0;
    var shapes = { rock: 1, paper: 2, scissors: 0 }
    if (typeof p1 === 'string' && typeof p2 === 'string') {
        result = shapes[p1] - shapes[p2];
    } else {
        result = shapes[p1.play()] - shapes[p2.play()];
    }
    if (Math.abs(result) > 1) {
        result *= -0.5;
    }
    if (result > 0) {
        return `player 1 wins!`;
    } else if (result < 0) {
        return `player 2 wins!`;
    } else {
        return `player 1 and player 2 tied.`;
    }
}

// Bonus!
var vsRockPaperScissors = function (numPlayers) {
    var playerlist = [];
    for (var i = 0; i < numPlayers; i++) {
        var player = {
            name: ('player '+(i+1)),
            play: function () {
                var num = Math.floor(Math.random() * 3);
                switch (num) {
                    case 0:
                        return 'rock';
                    case 1:
                        return 'paper';
                    case 2:
                        return 'scissors';
                }
            },
            wins: 0
        }
        playerlist.push(player);
    }
    var check = prompt('This function is not complete, and will loop infinitely, probably messing up your browser. Are you sure you want to run it?');
    if (check === 'yes') {
        while (playerlist.length > 0) {
            var playerMoves = {};
            for (var i=0; i < playerlist.length; i++) {
                playerMoves[playerlist[i].name] = playerlist[i].play();
            }
            for (var i=0; i < playerlist.length - 1; i++) {
                for (var j=i+1; j < playerlist.length - i; j++) {

                }
            }
        }
        // return `${playerlist[0].name} wins!`;
    }
}

var ticTacToe = function (grid) {
    for (var row=0; row < grid.length; row++) {
        if (grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2]) {
            return grid[row][0];
        }
    }
    for (var col=0; col < grid[0].length; col++) {
        if (grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
            return grid[0][col];
        }
    }
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
        return grid[0][0];
    }
    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
        return grid[0][2];
    }
    return null;
}