let batchassert = require('batchassert');

let tasks = [
  { node: 'a', depends: ['b', 'c'] },
  { node: 'b', depends: [] },
  { node: 'c', depends: ['b'] },
];

let tasks2 = [
  { node: 'a', depends: ['b'] },
  { node: 'b', depends: ['a'] }
];

let tasks3 = [
  { node: 'a', depends: ['b'] },
  { node: 'b', depends: ['c'] },
  { node: 'c', depends: [] },
  { node: 'd', depends: ['c'] },
  { node: 'e', depends: ['a', 'b', 'f', 'g'] },
  { node: 'f', depends: ['d'] },
  { node: 'g', depends: ['h'] },
  { node: 'h', depends: ['d', 'f'] }
];

let randomDependencies = (taskList) => {
  let newList = taskList.map(item => {
    if (Math.floor(Math.random()*10) < 1) { return item }
  });
  return newList;
};

let generateTasks = (numOfTasks) => {
  let taskList = [];
  for (let i = 0; i < numOfTasks; i++) {
    taskList.push({ node: i, depends: randomDependencies(Array.from(new Array(numOfTasks).keys())).filter(item => item !== undefined) });
  }
  return taskList;
}

let testDependencies = (depends, completedTasks) =>
  depends.every(node => completedTasks.includes(node));

let taskOrdering = (taskList) => {
  console.log(taskList);
  let completedTasks = [];
  let taskCompleted;
  do {
    taskCompleted = false;
    taskList.forEach(node => {
      if (testDependencies(node.depends, completedTasks)) {
        completedTasks.push(node.node);
        taskCompleted = true;
      };
      taskList = taskList.filter(node => completedTasks.includes(node.node) === false);
    });
    if (taskCompleted === false) {
      return 'ERROR: Circular Dependency Detected!';
    }
  } while (taskList.length > 0);
  return completedTasks;
};

// console.log(taskOrdering(tasks));
// console.log(taskOrdering(tasks2));
// console.log(taskOrdering(tasks3));
// console.log(taskOrdering(generateTasks(10)));
console.log(taskOrdering(generateTasks(10)));

// let testBatch = [
//   { test: testDependencies([]), result: true, message: "Empty dependency array should match empty completedTasks" },
//   { test: taskOrdering(tasks), result: ['b', 'c', 'a'], message: "Two-dependency node should be last; no-dependency should be first" },
//   { test: taskOrdering(tasks2), result: 'ERROR: Circular Dependency Detected!', message: 'Circular dependacy should be caught by test' },
//   { test: taskOrdering(tasks3), result: ['c', 'd', 'f', 'h', 'b', 'g', 'a', 'e'], message: "Lotsa stuff should equal lotsa stuff. Yup." }
// ];

// batchassert.testAll(testBatch);
