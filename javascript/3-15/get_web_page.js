const http = require('http');
const fs = require('fs'); const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("URL: ", answer => {
  rl.close();
  http.get(answer, (res) => {
    console.log('Server Response: ' + res.statusCode);

    res.setEncoding('utf8');
    var rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      // try {
      //   const parsedData = JSON.parse(rawData);
      //   console.log(parsedData);
      try {
        fs.writeFile('web_page.html', rawData, (err) => {
          if (err) throw err;
          console.log('Wrote to web_page.html');
        });
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('socket', (socket) => {
    socket.emit('agentRemove');
  });
});
