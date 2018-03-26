const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter read file: ", answer => {
  var rfile = answer;
  rl.question("Enter write file: ", answer => {
    var wfile = answer;
    rl.close();

    fs.readFile(rfile, (err, data) => {
      if (err) {
        console.log(err.toString());
      } else {
        fs.writeFile(wfile, data.toString().toUpperCase(), (err) => {
          if (err) throw err;
          console.log("Wrote to file " + wfile);
        });
      };
    });
  });
});