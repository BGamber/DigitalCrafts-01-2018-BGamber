const batchassert = require('batchassert');

let testArray = [['x', 'x', 'x'], ['o', 'o', 'o'], ['x', 'x', 'x']];
let testArray2 = [['x', 'o', 'x'], ['x', 'o', 'x'], ['x', 'o', 'x']];

let getNeighbors = (row, col, gridArray) => {
  let neighbors = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      currentRow = gridArray[row + i] || [];
      neighbors.push(currentRow[col + j]);
    };
  };
  neighbors.splice(4, 1);
  return neighbors;
};

let countNeighbors = (neighborArray) => neighborArray.filter(cell => cell === 'o').length;

// Determine whether given cell lives or dies based on current state and number of neighbors
let newCell = (cell, neighborCount) =>
  cell === 'o' && neighborCount >= 2 && neighborCount <= 3 && 'o'
  || cell === 'x' && neighborCount === 3 && 'o'
  || 'x';

let newGrid = grid => {
  let nextGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let nextRow = [];
    for (let j = 0; j < grid[i].length; j++) {
      nextRow.push(newCell(grid[i][j], countNeighbors(getNeighbors(i, j, grid))));
    };
    nextGrid.push(nextRow);
  };
  return nextGrid;
};

let tests = [
  { test: getNeighbors(1, 1, testArray), result: ['x', 'x', 'x', 'o', 'o', 'x', 'x', 'x'], message: "Center cell should return all (8) neighbors" },
  { test: getNeighbors(2, 0, testArray), result: [undefined, 'o', 'o', undefined, 'x', undefined, undefined, undefined], message: "Bottom-left cell should return 3 total neighbors" },
  { test: countNeighbors(getNeighbors(0, 0, testArray)), result: 2, message: "Top-left cell should count 2 live neighbors" },
  { test: countNeighbors(getNeighbors(1, 2, testArray)), result: 1, message: "Middle-right cell should return 1 live neighbor" },
  { test: newCell('x', 2), result: 'x', message: "Dead cell with fewer than 3 neighbors should stay dead" },
  { test: newCell('x', 4), result: 'x', message: "Dead cell with more than 3 neighbors should stay dead" },
  { test: newCell('o', 2), result: 'o', message: "Live cell with 2 or 3 neighbors should stay alive" },
  { test: newCell('x', 3), result: 'o', message: "Dead cell with exactly 3 neighbors should become live" },
  { test: newGrid(testArray), result: testArray2, message: "Horizontal blinker array should return vertical blinker array" },
  { test: newGrid(testArray2), result: testArray, message: "Vertical blinker array should return horizontal blinker array" }
];

batchassert.testAll(tests);

module.exports = { newGrid };