const dns = require('dns');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter site address: ", a => {
  dns.lookup(a, (err, address) => {
    if (err) {
      console.log(err.toString());
    } else {
      console.log(`${a}: ${address}`)
    };
  });
  rl.close();
});