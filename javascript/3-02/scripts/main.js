let size = 200;
let testArray = [];

for (let i=0; i<size; i++) {
    testArray.push([]);
    testArray[i] = 'x'.repeat(size).split('');
};

// Pre-populating given cells
testArray[1][2] = "o";
testArray[2][2] = "o";
testArray[3][2] = "o";

console.log(testArray);

let neighborCheck = function (row, col, arr) {
    let liveNeighbors = 0;
    let thisCell = arr[row][col];
    for (var i=(-1); i < 2; i++) {
        for (var j=(-1); j < 2; j++) {
            if (row+i >= 0 && row+i < size) {
                if (col+j >= 0 && col+j < size) {
                    if (i !== 0 || j !== 0) {
                        if (arr[(row+i)][(col+j)] === "o") {
                            liveNeighbors++;
                        }
                    }
                }
            }
        };
    };


    if (thisCell === "o") {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
            return "x";
        } else {
            return "o";
        }
    };
    if (thisCell === "x") {
        if (liveNeighbors === 3) {
            return "o";
        } else {
            return "x";
        }
    }
};

let nextDayLifeArray = function (arry) {
    let newArry = [];
    for (i = 0; i < size; i++) {
        newArry.push([]);
        for (j = 0; j < size; j++) {
            newCell = neighborCheck(i,j, arry);
            newArry[i][j] = newCell;
        }
    }
    return newArry;
}

let createGridLayout = function(dayLayout) {
    var gridLayout = nextDayLifeArray(dayLayout);
    var $grid = $('#grid-container');
    for (let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
            var $cell = $('<div>');
            if (dayLayout[i][j] === "o") {
                $cell.addClass('live-cell');
            } else {
                $cell.addClass('dead-cell');
            }
            $grid.append($cell);
        };
    };
}

newGridLayout(testArray);
var nextDay = nextDayLifeArray(testArray);

// setInterval(function() {
//     nextDay = nextDayLifeArray(nextDay);
//     for (let i=0; i<size; i++) {
//         for (let j=0; j<size; j++) {
//             var $cell = $('<div>');
//             if (nextDay[i][j] === "o") {
//                 $cell.addClass('live-cell');
//             } else {
//                 $cell.addClass('dead-cell');
//             }
//             $grid.append($cell);
//         };
//     };
// }, 1000);