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

var readBody = function (request, callback) {
  var body = '';
  request.on('data', function (chunk) {
    body += chunk.toString();
  });
  request.on('end', function () {
    callback(body);
    response.end('New contact added!');
  });
};

var createContactEntry = function (body) {
  var id = uuidv4();
  var contact = JSON.parse(body);
  contact["id"] = id;
  contacts.push(newContact);
  console.log("Added new entry: ", id + '\n', contact);
}

var requestMatches = function (request, method, path) {
  return request.method === method &&
    request.url.startsWith(path);
};

var findContact = function (contacts, searchID) {
  var searchContact = contacts.find(function (item) {
    return item["id"] === searchID;
  });
  return searchContact;
};

var getConnectionIP = function (request) {
  var address = request.connection.remoteAddress;
  var addressArr = address.split(':');
  var ip = addressArr[addressArr.length - 1];
  return ip;
};

var logConnection = function (request) {
  var nowString = moment().format("h:mm:ss M-DD-YYYY");
  var userIP = getConnectionIP(request);
  console.log(`${userIP}: ${request.method} ${request.url} ${nowString}`);
};

var sendZalgo = function (response) {
  var zalgo = {
    first: "Z̠̣̱͚͚͕á̱l̰ͅg̡o̮",
    last: " Ṉ̶͓̭̼ḛ̴̥͓̳̲z̤̜ͅp͔̩̱e͏͎r̜̙̪͚ḏi̹̣a͙͢n̼̞͉",
    email: "Z̤̺͉̦A̖͝L͍̱G̶̰̺̲̗̥̖̮O̩͈̠@h̴̥i̮v̜̣̗̖̭ẹ͞-̱͔͙m͔in̩̮̯d̟̫̟̦̖̯̗́.net",
    id: "H̵̪̥̠̼e̗͚̻̗̭̩̮ w̷͙̭͙̙̝͙h̡̩͇̝̯o͏͉̱͉̲ͅ ̘͉͡W̠̲͙̰̹͡a͞i͍̼̝ts̗̭̖̦̠̺̥ ̙B̝͖̤͜e̘̫͍̤̩͇h̹i̖̦̼͓̠n̸͉̲d̨͚͓͎ͅ Th̨̖̖è͈̞ͅ ̮Wa̬̻̜͕͚̼̤l͓͕̹͔̹̬l͖̦̟̼͈͡.͕̤͚͙̤"
  };
  response.end(JSON.stringify(zalgo));
};

routes = [

];

var server = http.createServer(function (request, response) {
  logConnection(request);
  if (requestMatches(request, 'GET', '/contacts')) {

    if (requestMatches(request, 'GET', '/contacts/')) {
      var searchID = request.url.substring(10);
      console.log('Searching ID:', searchID);

      // Easter Egg!
      if (searchID.toLowerCase() === 'zalgo') {
        sendZalgo(response);
      } else {
        var searchContact = findContact(contacts, searchID);
        if (searchContact) {
          console.log("Found: \n", searchContact);
          response.end(JSON.stringify(searchContact));
        } else {
          response.statusCode = 404;
          response.end("404 ERROR: Could not find listing for given ID");
        };
      };
    } else {
      console.log('No ID included; sending full list');
      response.end(JSON.stringify(contacts));
    };

  } else if (requestMatches(request, 'POST', '/contacts')) {
    readBody(request, createContactEntry(body));
    
  } else if (requestMatches(request, 'GET', '/myip')) {
    var ip = getConnectionIP(request);
    response.end(`Hi, ${ip !== '1' ? ip : 'Host'}!`);

  } else {
    response.statusCode = 404;
    response.end("404 Error: Oops, that location doesn't exist! (Try /contacts or /myip)");
  };
});

server.listen(3000);
