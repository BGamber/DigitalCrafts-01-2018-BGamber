var fs = require('fs');

var fileContents = fs.readFileSync('../../python/2-06/blah.txt');
console.log(fileContents.toString());

var longFileContents = fs.readFile('bacon.txt', (err, contents) => {
  if (err) {
    console.log(err);
  } else {
    console.log(contents.toString());
  };
});