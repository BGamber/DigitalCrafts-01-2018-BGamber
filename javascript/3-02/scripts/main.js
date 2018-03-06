let size = 100;
let testArray = Array(size).fill(null).map(function() { return Array(size).fill(null)})

// Pre-populating given cells
testArray[50][50] = "o";
testArray[50][51] = "o";
testArray[51][49] = "o";
testArray[51][50] = "o";
testArray[52][50] = "o";

console.log(testArray);

let neighborCheck = function (row, col, arr) {
    let liveNeighbors = 0;
    let thisCell = arr[row][col];
    for (var i=(-1); i < 2; i++) {
        for (var j=(-1); j < 2; j++) {
            if (row+i >= 0 && row+i < size) {
                if (col+j >= 0 && col+j < size) {
                    if (i !== 0 || j !== 0) {
                        if (arr[(row+i)][(col+j)] !== null) {
                            liveNeighbors++;
                        }
                    }
                }
            }
        };
    };


    if (thisCell !== null) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
            return null;
        } else {
            return "o";
        }
    };
    if (thisCell === null) {
        if (liveNeighbors === 3) {
            return "o";
        } else {
            return null;
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

var canvas = document.getElementById('canvas');
if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);
};

// var nextDay = nextDayLifeArray(testArray);
// let animate = function animate(timestamp) {
//     nextDay = nextDayLifeArray(nextDay);
//     console.log(nextDay);
//     requestAnimationFrame(animate);
// };
// requestAnimationFrame(animate);

// ## Drawing using <canvas>



// ## Drawing using CSS Grid and DOM elements -- inefficient
// let newGridLayout = function(dayLayout) {
//     var gridLayout = nextDayLifeArray(dayLayout);
//     var $grid = $('#grid-container');
//     $grid.empty();
//     cellArray = [];
//     for (let i=0; i<size; i++) {
//         for (let j=0; j<size; j++) {
//             var $cell = $('<div>');
//             if (dayLayout[i][j] !== null) {
//                 $cell.addClass('live-cell');
//             } else {
//                 $cell.addClass('dead-cell');
//             }
//             cellArray.push($cell);
//         };
//     };
//     $grid.append(cellArray);
//     return gridLayout;
// };

// var nextDay = newGridLayout(testArray);

// let animate = function animate(timestamp) {
//     nextDay = newGridLayout(nextDay);
//     requestAnimationFrame(animate);
// };

// requestAnimationFrame(animate);