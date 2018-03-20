// HTTP is required for server
var http = require('http');
// UUID generates unique ids server-side
var uuidv4 = require('uuid/v4');
// Moment is a date/time module, used here for logging activity
var moment = require('moment');

// Pre-populate data for testing
var contacts = [
  {
    "first": "Ben",
    "last": "Gamber",
    "email": "ben@ben.ben",
    "id": "8bfcade3-445c-45ae-bb4f-f90eb49857d4"
  },
  {
    "first": "Dude",
    "last": "Duderson",
    "email": "dude@dude.dude",
    "id": "7b306ea9-0ec0-4037-af2d-e6ae06e7cfeb"
  }
];

// Take a request, read its body, and call given function,
// passing it the full body
var readBody = function (request, callback) {
  var body = '';
  request.on('data', function (chunk) {
    body += chunk.toString();
  });
  request.on('end', function () {
    callback(body);
  });
};

// Tests whether given request's method and path match
// given arguments
var requestMatches = function (request, method, path) {
  return request.method === method &&
    request.url.startsWith(path);
};

// Parse and return IP of connection from given request
var getConnectionIP = function (request) {
  var address = request.connection.remoteAddress;
  var addressArr = address.split(':');
  var ip = addressArr[addressArr.length - 1];
  return ip;
}

// http.createServer returns the server itself, and the
// function passed handles server behavior
var server = http.createServer(function (request, response) {
  var nowString = moment().format("h:mm:ss MM-DD-YYYY");
  var userIP = getConnectionIP(request);
  console.log(`${userIP}: ${request.method} ${request.url} ${nowString}`);
  // Test whether user sends GET request to /contacts
  if (requestMatches(request, 'GET', '/contacts')) {
    var secondSlash = request.url.indexOf('/', 1);
    // Test whether user is requesting specific /id address
    if (requestMatches(request, 'GET', '/contacts/')) {
      var searchID = request.url.substring(10);
      console.log('Searching ID:', searchID);
      // Easter Egg!
      if (searchID.toLowerCase() === 'zalgo') {
        var zalgo = {
          first: "Z̠̣̱͚͚͕á̱l̰ͅg̡o̮",
          last: " Ṉ̶͓̭̼ḛ̴̥͓̳̲z̤̜ͅp͔̩̱e͏͎r̜̙̪͚ḏi̹̣a͙͢n̼̞͉",
          email: "Z̤̺͉̦A̖͝L͍̱G̶̰̺̲̗̥̖̮O̩͈̠@h̴̥i̮v̜̣̗̖̭ẹ͞-̱͔͙m͔in̩̮̯d̟̫̟̦̖̯̗́.net",
          id: "H̵̪̥̠̼e̗͚̻̗̭̩̮ w̷͙̭͙̙̝͙h̡̩͇̝̯o͏͉̱͉̲ͅ ̘͉͡W̠̲͙̰̹͡a͞i͍̼̝ts̗̭̖̦̠̺̥ ̙B̝͖̤͜e̘̫͍̤̩͇h̹i̖̦̼͓̠n̸͉̲d̨͚͓͎ͅ Th̨̖̖è͈̞ͅ ̮Wa̬̻̜͕͚̼̤l͓͕̹͔̹̬l͖̦̟̼͈͡.͕̤͚͙̤"
        };
        response.end(JSON.stringify(zalgo));
      } else {
        // Get the contact object with an id (key) matching the SearchID
        var searchContact = contacts.find(function (item) {
          return item["id"] === searchID;
        });
        console.log("Found: \n", searchContact);
        response.end(JSON.stringify(searchContact));
      };
    } else {
      // ...otherwise, send full list
      console.log('No ID included; sending full list');
      response.end(JSON.stringify(contacts));
    };
    // Test whether user sends POST request
  } else if (requestMatches(request, 'POST', '/contacts')) {
    readBody(request, function (body) {
      var id = uuidv4();
      var contact = JSON.parse(body);
      console.log("Adding new entry: ", id + '\n', contact);
      var newContact = contact;
      newContact["id"] = id;
      contacts.push(newContact);
      response.end('New contact added!');
    });
    // Test if user visits /myip
  } else if (requestMatches(request, 'GET', '/myip')) {
    // Find request connection IP and respond with it
    var ip = getConnectionIP(request);
    response.end(`Hi, ${ip !== '1' ? ip : 'Host'}!`);
  } else {
    // ... Otherwise, send 404 response
    response.statusCode = 404;
    response.end("404 Error: Oops, that location doesn't exist! (Try /contacts or /myip)");
  };
});

// Open server port 3000
server.listen(3000);