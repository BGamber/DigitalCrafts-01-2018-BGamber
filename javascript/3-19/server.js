// HTTP is required for server
const http = require('http');
// UUID generates unique ids server-side
const uuidv4 = require('uuid/v4');
// Moment is a date/time module, used here for logging activity
const moment = require('moment');

// Pre-populate data for testing
let contacts = [
  {
    "contact-name": "Ben Gamber",
    "contact-phone": "555-555-5555",
    "contact-email": "ben@ben.ben",
    "contact-id": "8bfcade3-445c-45ae-bb4f-f90eb49857d4"
  },
  {
    "contact-name": "Dude Duderson",
    "contact-phone": "123-456-7890",
    "contact-email": "dude@dude.dude",
    "contact-id": "7b306ea9-0ec0-4037-af2d-e6ae06e7cfeb"
  }
];

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

let readBody = (request, callback) => {
  let body = '';
  request.on('data', (chunk) => {
    body += chunk.toString();
  });
  request.on('end', function () {
    callback(body);
  });
};

let postContact = (request, response) => {
  readBody(request, createContactEntry);
  response.end('New contact added!');
}

let createContactEntry = (body) => {
  let id = uuidv4();
  let contact = JSON.parse(body);
  contact["contact-id"] = id;
  contacts.push(contact);
  console.log("Added new entry: ", id + '\n', contact);
}

let requestMatches = (request, method, path) => {
  if (request.method === method) {
    let match = path.exec(request.url);
    if (match) {
      return match.slice(1);
    };
    return false;
  };
};

let findContact = (contacts, searchID) => {
  let searchContact = contacts.find((item) => {
    return item["contact-id"] === searchID;
  });
  return searchContact;
};

let getConnectionIP = (request) => {
  let address = request.connection.remoteAddress;
  let addressArr = address.split(':');
  let ip = addressArr[addressArr.length - 1];
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
  { method: 'GET', path: /^\/contacts\/?$/, handler: getAllContacts },
  { method: 'GET', path: /^\/myip$/, handler: respondConnectionIP },
];

let server = http.createServer((request, response) => {
  logConnection(request, response);
  let route = router(request);

  (route ? route.handler : notFound)(request, response);
});

server.listen(3000);
