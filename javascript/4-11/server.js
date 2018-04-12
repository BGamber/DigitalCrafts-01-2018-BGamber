const express = require('express');

let app = express();

let homePage = (req, res) => {
  res.sendFile(__dirname + '/reactdemo.html');
};

app.get('/', homePage);
app.use((req, res, next) => {
  res.sendFile(__dirname + `/${req.url}`);
});

app.listen(3000, () => {
  console.log("Server listening on Port 3000");
});