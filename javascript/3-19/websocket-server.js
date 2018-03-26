const WebSocket = require('ws');
const moment = require('moment');

let ws = new WebSocket.Server({ port: 3001 });

ws.on('connection', (newClient, req) => {
  let connectTime = moment().format("hh:mm")
  // RegExp to get the IP from the format "::<forwarded:><IP>"
  let address = /::(.*:)?([0-9.]+)/.exec(req.connection.remoteAddress)[2];
  console.log(`[${connectTime}] Connection from: ${address}`);
  ws.clients.forEach(client => {
    client.send(`[${connectTime}] ${address} has joined the channel!`);
  });

  newClient.on('message', input => {
    let nowTime = moment().format("hh:mm");
    console.log(`[${nowTime}] ${address}: ${input}`);

    if (/^\/.*$/.test(input)) {
      console.log("User entered a command.");
    } else {
      ws.clients.forEach(client => {
        if (client !== newClient) {
          client.send(`[${nowTime}] ${address}: ${input}`);
        };
      });
    };
  });

  newClient.on('close', (code, reason) => {
    let nowTime = moment().format("hh:mm");
    console.log(`[${nowTime}] ${address} CONNECTION CLOSED: ${code} - ${reason}`);
    ws.clients.forEach(client => {
      if (client !== newClient) {
        client.send(`[${nowTime}] ${address} disconnected.`);
      };
    });
  });
});