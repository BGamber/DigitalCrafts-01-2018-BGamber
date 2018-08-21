const root = document.querySelector(".react-root");
const h = React.createElement;

// let startGrid = Array(100).fill(Array(100).fill('x'));
// startGrid[50][49] = 'o';
// startGrid[50][50] = 'o';
// startGrid[50][51] = 'o';
let startGrid = Array(50).fill(Array(50).fill("x"));
startGrid[25][24] = "o";
startGrid[25][25] = "o";
startGrid[25][26] = "o";
// let startGrid = Array(10).fill(Array(10).fill('x'));
// startGrid[5][5] = 'o';

let getNeighbors = (row, col, gridArray) => {
  let neighbors = [];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let currentRow = gridArray[row + i] || [];
      neighbors.push(currentRow[col + j]);
    }
  }
  neighbors.splice(4, 1);
  return neighbors;
};

let countNeighbors = neighborArray =>
  neighborArray.filter(cell => cell === "o").length;

let liveCellRouter = {
  o2: "o",
  o3: "o",
  x3: "o"
};

// Determine whether given cell lives or dies based on current state and number of neighbors
let newCell = (cell, neighborCount) => liveCellRouter[cell + neighborCount] || "x";

let newGrid = grid => {
  let nextGrid = [];
  for (let i = 0; i < grid.length; i++) {
    let nextRow = [];
    for (let j = 0; j < grid[i].length; j++) {
      nextRow.push(
        newCell(grid[i][j], countNeighbors(getNeighbors(i, j, grid)))
      );
    }
    nextGrid.push(nextRow);
  }
  return nextGrid;
};

let Cell = ({ status }) => <div className={`${status} gol-cell`} />;

// class CellWithState extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { status: props.status };
//   }

//   render() {
//     return <Cell {...this.state} />
//   }
// }

let Row = ({ cells }) => (
  <div className="gol-row">
    {cells.map(cell => <Cell status={cell === "o" ? "live" : "dead"} />)}
  </div>
);

class GoLGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grid: startGrid };
  }

  render() {
    let { grid } = this.state;

    let nextCycle = grid => newGrid(grid);

    setTimeout(() => {
      this.setState({ grid: nextCycle(grid) });
    }, 100);

    return (
      <div className="gol-grid">{grid.map(row => <Row cells={row} />)}</div>
    );
  }
}

ReactDOM.render(h(GoLGrid), root);
