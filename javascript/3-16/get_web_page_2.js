const request = require('request');
const fs = require('fs');

const url = 'not-a-site';
const filename = 'output.html';

var saveWebPage = (url, filename) => {
  request.get(url, (err, response, html) => {
    if (err) { return err; };
    fs.writeFile(filename, html, (err) => {
      if (err) { return err; };
    });
  });
}

saveWebPage(url, filename, (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log('It worked.');
});
