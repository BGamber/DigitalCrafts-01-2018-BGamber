const express = require('express');
const { newGrid } = require('./gameoflife');

let app = express();
let Router = express.Router;

let homePage = (req, res) => {
  res.sendFile(__dirname + '/index.html');
};

// let nextCycle = (grid) => newGrid(grid);

// let postNextCycle = (req, res) => {
//   console.log(req.body);
//   let grid = nextCycle(req.body);
//   console.log(grid);
//   res.send(grid);
// };

let router = new Router();
// let gameOfLife = new Router();
// gameOfLife.post('/next', postNextCycle);

// router.use('/gol', gameOfLife);
router.get('/', homePage);
router.use((req, res, next) => {
  res.sendFile(__dirname + `/${req.url}`);
})

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

app.listen(3000, () => {
  console.log("Server listening on Port 3000");
});