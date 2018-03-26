var assert = require('assert');

var testArray = [['x','x','x'],['o','o','o',],['x','x','x']];

var getNeighbors = function(row, col, gridArray) {
  var neighbors = [];
  for (let i=-1; i<2; i++) {
    for (let j=-1; j<2; j++) {
      currentRow = gridArray[row+i] || [];
      neighbors.push(currentRow[col+j]);
    };
  };
  neighbors.splice(4,1);
  return neighbors;
};

var countNeighbors = function(neighborArray) {
  var liveArray = neighborArray.filter(function(cell) {
    return cell === 'o';
  });
  return liveArray.length;
};

// Determine whether given cell lives or dies based on current state and number of neighbors

assert.deepEqual(getNeighbors(1,1,testArray),['x','x','x','o','o','x','x','x'],"Center cell should return all (8) neighbors");
assert.deepEqual(getNeighbors(2,0,testArray),[undefined,'o','o',undefined,'x',undefined,undefined,undefined],"Bottom-left cell should return 3 total neighbors");
assert(countNeighbors(getNeighbors(0,0,testArray)) === 2,'Top left cell should count 2 live neighbors');
assert(countNeighbors(getNeighbors(1,2,testArray)) === 1, 'Middle-right cell should return 1 live neighbor');
