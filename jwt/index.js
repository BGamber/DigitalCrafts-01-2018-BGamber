const http = require('http');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('./database.js');
const { findUserByEmail } = db;

const signature = 'th1s_s3rv3r_1s_s3cur3';

let readBody = request =>
  new Promise(resolve => {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      resolve(body);
    });
  });

let createToken = user => {
  let token = jwt.sign(
    { userId: user.id },
    signature,
    { expiresIn: '7d' }
  );
  return token;
};

let postTokens = (req, res) => {
  readBody(req).then(body => {
    let creds = JSON.parse(body);
    let { email, password } = creds;
    let user = findUserByEmail(email);

    bcrypt.compare(password, user.password).then(result => {
      if (result) {
        let token = createToken(user);
        res.end(token);
      } else {
        res.end("No token for you!");
      };
    });
  });
};

let privatePage = (req, res) => {
  let { authorization } = req.headers;
  let payload;
  try {
    payload = jwt.verify(authorization, signature);
  } catch (err) {
    // catch it
  };
  if (payload) {
    let { userId } = payload;
    res.end(`Muahaha, welcome to the club, User ${userId}!`);
  } else {
    res.end('YOU SHALL NOT PASS!');
  };
};

let routes = {
  'POST /tokens': postTokens,
  'GET /private': privatePage
};

let server = http.createServer((req, res) => {
  let { method, url } = req;
  // "POST /tokens etc."
  let route = `${method} ${url}`;
  routes[route](req, res);
});

server.listen(3000);