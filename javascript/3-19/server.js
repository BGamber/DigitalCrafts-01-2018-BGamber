// HTTP is required for server
const http = require('http');
// WS is required for running WebSocketServer
const WebSocket = require('ws');
// FS enabled file read/write for file serving
const fs = require('fs');
// DB is Postgres database handling
const db = require('./db.js');
// Promisify converts callback-based functions to Promise-based
const promisify = require('util').promisify;
// UUID generates unique ids server-side
const uuidv4 = require('uuid/v4');
// Moment is a date/time module, used here for logging activity
const moment = require('moment');
// Convert needed functions to promisers
const readFile = promisify(fs.readFile);

// Load WebSocketServer from file
const wss = require('./websocket-server.js');

// // Pre-populate data for testing -- REPLACING WITH DATABASE
// let contacts = [
//   {
//     "name": "Ben Gamber",
//     "phone": "555-555-5555",
//     "email": "ben@ben.ben",
//     "id": "8bfcade3-445c-45ae-bb4f-f90eb49857d4"
//   },
//   {
//     "name": "Dude Duderson",
//     "phone": "123-456-7890",
//     "email": "dude@dude.dude",
//     "id": "7b306ea9-0ec0-4037-af2d-e6ae06e7cfeb"
//   }
// ];

let getMatchingContacts = (request, response) => {
  let searchID = request.url.substring(10);
  console.log('Searching ID:', searchID);

  // Easter Egg!
  if (searchID.toLowerCase() === 'zalgo') {
    sendZalgo(response);

  } else {
    let searchContact = findContact(contacts, searchID);
    if (searchContact) {
      console.log("Found: \n", searchContact);
      response.end(JSON.stringify(searchContact));
    } else {
      console.log(`ID '${searchID}' not found`);
      response.statusCode = 404;
      response.end(`404 ERROR: Could not find listing for given ID: ${searchID}`);
    };
  };
};

let getAllContacts = (request, response) => {
  console.log('No ID included; sending full list');
  response.end(JSON.stringify(contacts));
};

let findContact = (contacts, searchID) => {
  let searchContact = contacts.find((item) => {
    return item["id"] === searchID;
  });
  return searchContact;
};

let readBody = (request, callback) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });
  request.on('end', function () {
    let result = callback(body);
    return result;
  });
};

let postContact = (request, response) => {
  let contact = readBody(request, createContactEntry);
  console.log(contact);
  contacts.push(contact);
  response.end('New contact added!');
};

let createContactEntry = (body) => {
  let id = uuidv4();
  let contact = JSON.parse(body);
  contact["id"] = id;
  console.log("Created new contact: ", id + '\n', contact);
  return contact;
};

let updateContact = (request, response) => {
  let contactEdit = readBody(request, createContactEntry);
};

let deleteContact = (request, response) => {
  response.end("delete code dev in progress");
};

let requestMatches = (request, method, path) => {
  if (request.method === method) {
    let match = path.exec(request.url);
    if (match) {
      return match.slice(1);
    };
    return false;
  };
};

let getConnectionIP = (request) => {
  let address = request.connection.remoteAddress;
  let ip = /::(.*:)?([0-9.]+)/.exec(request.connection.remoteAddress)[2];
  return ip;
};

let respondConnectionIP = (request, response) => {
  let ip = getConnectionIP(request);
  response.end(`Hi, ${ip !== '1' ? ip : 'Host'}!`);
};

let logConnection = (request, response) => {
  let nowString = moment().format("h:mm:ss M-DD-YYYY");
  let userIP = getConnectionIP(request, response);
  console.log(`${userIP}: ${request.method} ${request.url} ${nowString}`);
};

let requestPage = (request, response) => {
  let page = requestMatches(request, 'GET', /^\/([a-zA-Z0-9]+\.[a-zA-Z0-9]+)?$/);
  if (page[0]) {
    renderPage(page[0], response);
  } else {
    renderPage('index.html', response);
  };
};

let renderPage = (address, response) => {
  let file = readFile(`./static/${address}`);
  file.then(data => {
    response.end(data);
  })
  .catch(err => {
    response.end(err);
  });
};

let notFound = (request, response) => {
  response.statusCode = 404;
  if (requestMatches(request, 'GET', /^\/contacts\/?$/)) {
    response.end("404 ERROR: Oops! No matching ID found!");
  } else {
    response.end("404 ERROR: Invalid request method and/or path!");
  }
};

let sendZalgo = (response) => {
  let zalgo = {
    first: "Z̠̣̱͚͚͕á̱l̰ͅg̡o̮",
    last: " Ṉ̶͓̭̼ḛ̴̥͓̳̲z̤̜ͅp͔̩̱e͏͎r̜̙̪͚ḏi̹̣a͙͢n̼̞͉",
    email: "Z̤̺͉̦A̖͝L͍̱G̶̰̺̲̗̥̖̮O̩͈̠@h̴̥i̮v̜̣̗̖̭ẹ͞-̱͔͙m͔in̩̮̯d̟̫̟̦̖̯̗́.net",
    id: "H̵̪̥̠̼e̗͚̻̗̭̩̮ w̷͙̭͙̙̝͙h̡̩͇̝̯o͏͉̱͉̲ͅ ̘͉͡W̠̲͙̰̹͡a͞i͍̼̝ts̗̭̖̦̠̺̥ ̙B̝͖̤͜e̘̫͍̤̩͇h̹i̖̦̼͓̠n̸͉̲d̨͚͓͎ͅ Th̨̖̖è͈̞ͅ ̮Wa̬̻̜͕͚̼̤l͓͕̹͔̹̬l͖̦̟̼͈͡.͕̤͚͙̤"
  };
  response.end(JSON.stringify(zalgo));
};

let router = (request) => {
  return routes.find(route => { return requestMatches(request, route.method, route.path) })
};

routes = [
  { method: 'GET', path: /^\/contacts\/([a-zA-Z0-9\-]+)\/?$/, handler: getMatchingContacts },
  { method: 'POST', path: /^\/contacts\/?$/, handler: postContact },
  { method: 'PUT', path: /^\/contacts\/([a-zA-Z0-9\-]+)\/?$$/, handler: updateContact },
  { method: 'DELETE', path: /\/contacts\/([a-zA-Z0-9\-]+)\/?$/, handler: deleteContact },
  { method: 'GET', path: /^\/contacts\/?$/, handler: getAllContacts },
  { method: 'GET', path: /^\/myip$/, handler: respondConnectionIP },
  { method: 'GET', path: /^\/([a-zA-Z0-9]+\.[a-zA-Z0-9]+)?$/, handler: requestPage }
];

let server = http.createServer((request, response) => {
  logConnection(request, response);
  let route = router(request);

  (route ? route.handler : notFound)(request, response);
});

server.listen(3000);