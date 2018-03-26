const batchassert = require('batchassert');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let grid2 = [[0, 1],
[1, null]];

let grid3 = [[0, 1, 1],
[1, 2, 3],
[1, 3, null]];

let addParents = (row, col, array) => {
  let total = (array[row - 1][col] + array[row][col - 1]);
  return total;
};

testBatch = [
  { test: addParents(1, 1, grid2), result: 2 },
  { test: addParents(2, 2, grid3), result: 6 }
];

batchassert.testAll(testBatch);

rl.question("Enter grid width: ", width => {
  let gridWidth = Number(width) + 1;
  rl.question("Enter grid height: ", height => {
    let gridHeight = Number(height) + 1;
    rl.close();
    let grid = [];
    // Populate grid with arrays of 0s
    for (let i = 0; i < gridHeight; i++) {
      // let line = "0".repeat(gridSize).split("");
      let numberLine = new Array(gridWidth);
      numberLine.fill(1);
      grid.push(numberLine);
    };
    grid[0] = grid[0].map((item, index) => { return (index > 0 ? 1 : 0); })

    for (let row = 1; row < gridHeight; row++) {
      grid[row][0] = 1;
      for (let col = 1; col < gridWidth; col++) {
        grid[row][col] = addParents(row, col, grid);
      };
    };

    console.log(grid[gridHeight - 1][gridWidth - 1]);
  })
});