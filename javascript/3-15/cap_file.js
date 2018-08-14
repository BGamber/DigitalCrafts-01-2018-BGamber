const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter file name: ", answer => {
  rl.close();
  fs.readFile(answer, (err, data) => {
    if (err) {
      console.log(err.toString());
    } else {
      console.log(data.toString().toUpperCase());
      looping = false;
    }
  });
});
