// Express handles back-end routing and file serving
const express = require("express");
// DB is Postgres database handling
const db = require("./db.js");
// UUID generates unique ids server-side
const uuidv4 = require("uuid/v4");
// Moment is a date/time module, used here for logging activity
const moment = require("moment");

// Load WebSocketServer from file
const wss = require("./websocket-server.js");

let getMatchingContacts = (request, response) => {
  let searchID = request.params.id;
  console.log("Searching ID:", searchID);

  // Easter Egg!
  if (searchID.toLowerCase() === "zalgo") {
    sendZalgo(response);
  } else {
    let searchContact = db.query(
      `SELECT * FROM contacts WHERE id = '${searchID}';`
    );
    searchContact
      .then(result => {
        if (result) {
          console.log("Found: \n", result[0]);
          response.send(JSON.stringify(result[0]));
        } else {
          console.log(`ID '${searchID}' not found`);
          response.statusCode = 404;
          response.send(
            `404 ERROR: Could not find listing for given ID: ${searchID}`
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};

let getAllContacts = (request, response) => {
  console.log("No ID included; sending full list");
  let getAll = db.query(`SELECT
          c.id, c.name, c.email, c.phone, g.name as group
          FROM contacts c
          LEFT JOIN groups g
          ON c.group_id = g.id;`);
  getAll
    .then(result => {
      response.send(JSON.stringify(result));
    })
    .catch(err => {
      console.log(err);
    });
};

let postContact = (request, response) => {
  let body = request.body;
  let id = uuidv4();
  body.id = id;
  console.log("Created new contact: ", id + "\n", body);

  let postQuery = db.query(`INSERT INTO contacts (id, email, name, phone)
          VALUES ('${body.id}', '${body.email}', '${body.name}', ${
    body.phone === undefined ? null : "'" + body.phone + "'"
  });`);
  postQuery
    .then(result => {
      response.send("New contact added!");
    })
    .catch(err => {
      console.log(err);
    });
};

// Update to use bodyParser
let updateContact = (request, response) => {
  let contactEdit = readBody(request, createContactEntry);
};

let deleteContact = (request, response) => {
  response.send("delete code dev in progress");
};

let getConnectionIP = request => {
  let nowString = moment().format("h:mm:ss M-DD-YYYY");
  let ip = /::(.*:)?([0-9.]+)/.exec(request.connection.remoteAddress)[2];
  console.log(`${ip}: ${request.method} ${request.url} ${nowString}`);
  return ip;
};

let respondConnectionIP = (request, response) => {
  let ip = getConnectionIP(request);
  response.send(`Hi, ${ip !== "1" ? ip : "Host"}!`);
};

let sendZalgo = response => {
  let zalgo = {
    id: "H̵̪̥̠̼e̗͚̻̗̭̩̮ w̷͙̭͙̙̝͙h̡̩͇̝̯o͏͉̱͉̲ͅ ̘͉͡W̠̲͙̰̹͡a͞i͍̼̝ts̗̭̖̦̠̺̥ ̙B̝͖̤͜e̘̫͍̤̩͇h̹i̖̦̼͓̠n̸͉̲d̨͚͓͎ͅ Th̨̖̖è͈̞ͅ ̮Wa̬̻̜͕͚̼̤l͓͕̹͔̹̬l͖̦̟̼͈͡.͕̤͚͙̤",
    name: "Z̠̣̱͚͚͕á̱l̰ͅg̡o̮",
    email: "Z̤̺͉̦A̖͝L͍̱G̶̰̺̲̗̥̖̮O̩͈̠@h̴̥i̮v̜̣̗̖̭ẹ͞-̱͔͙m͔in̩̮̯d̟̫̟̦̖̯̗́.net",
    phone: null,
    group: null
  };
  response.send(JSON.stringify(zalgo));
};

const Router = express.Router;
const bodyParser = require("body-parser");
let app = express();
let api = new Router();

api.get("/:id", getMatchingContacts);
api.post("/", postContact);
api.put("/:id", updateContact);
api.delete("/:id", deleteContact);
api.get("/", getAllContacts);

app.use(bodyParser.json());
app.use("/contacts", api);
app.get("/myip", respondConnectionIP);
app.use((req, res, next) => {
  res.sendFile(__dirname + `/static/${req.url}`);
});

app.listen(3000, () => {
  console.log("Server listening on Port 3000");
});
