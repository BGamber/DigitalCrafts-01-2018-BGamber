const pg = require('pg-promise')();
const db = pg('postgres://bengamber@localhost:5432/phonebook');

module.exports = db;