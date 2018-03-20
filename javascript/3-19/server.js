// HTTP is required for server
var http = require('http');
// UUID generates unique ids server-side
var uuidv4 = require('uuid/v4');
// Moment is a date/time module, used here for logging activity
var moment = require('moment');

// Pre-populate data for testing
var contacts = [
  {
    "8bfcade3-445c-45ae-bb4f-f90eb49857d4": {
      "first": "Ben",
      "last": "Gamber",
      "email": "ben@ben.ben"
    }
  },
  {
    "7b306ea9-0ec0-4037-af2d-e6ae06e7cfeb": {
      "first": "Dude",
      "last": "Duderson",
      "email": "dude@dude.dude"
    }
  }
];

var readBody = function (request, callback) {
  var body = '';
  request.on('data', function (chunk) {
    body += chunk.toString();
  });
  request.on('end', function () {
    callback(body);
  });
};

var reqMatches = function (request, method, path) {
  return request.method === method &&
    request.url.startsWith(path);
};

// http.createServer returns the server itself, and the
// function passed handles server behavior
var server = http.createServer(function (request, response) {
  var nowString = moment().format("h:mm:ss MM-DD-YYYY");
  console.log(request.method, request.url, nowString);
  // Test whether user requests the /contacts url
  if (request.url.startsWith('/contacts')) {
    // Test whether user sends GET request
    if (request.method === 'GET') {
      var secondSlash = request.url.indexOf('/', 1);
      // Test whether user is requesting specific /id address
      if (secondSlash !== -1 &&
        request.url.substring(secondSlash + 1).length !== 0) {
        var searchID = request.url.substring(secondSlash + 1);
        console.log('Searching ID:', searchID);
        // Easter Egg!
        if (searchID.toLowerCase() === 'zalgo') {
          var zalgo = {
            "H̵̪̥̠̼e̗͚̻̗̭̩̮ w̷͙̭͙̙̝͙h̡̩͇̝̯o͏͉̱͉̲ͅ ̘͉͡W̠̲͙̰̹͡a͞i͍̼̝ts̗̭̖̦̠̺̥ ̙B̝͖̤͜e̘̫͍̤̩͇h̹i̖̦̼͓̠n̸͉̲d̨͚͓͎ͅ Th̨̖̖è͈̞ͅ ̮Wa̬̻̜͕͚̼̤l͓͕̹͔̹̬l͖̦̟̼͈͡.͕̤͚͙̤": {
              first: "Z̠̣̱͚͚͕á̱l̰ͅg̡o̮",
              last: " Ṉ̶͓̭̼ḛ̴̥͓̳̲z̤̜ͅp͔̩̱e͏͎r̜̙̪͚ḏi̹̣a͙͢n̼̞͉",
              email: "Z̤̺͉̦A̖͝L͍̱G̶̰̺̲̗̥̖̮O̩͈̠@h̴̥i̮v̜̣̗̖̭ẹ͞-̱͔͙m͔in̩̮̯d̟̫̟̦̖̯̗́.net"
            }
          };
          response.end(JSON.stringify(zalgo));
        } else {
          // Get the contact object with an id (key) matching the SearchID
          var searchContact = contacts.find(function (item) {
            return item.hasOwnProperty(searchID);
          });
          console.log(searchContact);
          response.end(JSON.stringify(searchContact));
        };
      } else {
        // ...otherwise, send full list
        console.log('no ID included');
        response.end(JSON.stringify(contacts));
      };
    };
    // Test whether user sends POST request
    if (request.method === 'POST') {
      readBody(request, function (body) {
        var id = uuidv4();
        var contact = JSON.parse(body);
        console.log(id, '\n', contact);
        var newContact = {};
        newContact[id] = contact;
        contacts.push(newContact);
        response.end('New contact added!');
      });
    };
  } else {
    // ... Otherwise, send generic response
    response.end('Hi!');
  };
});

// Open server port 3000
server.listen(3000);