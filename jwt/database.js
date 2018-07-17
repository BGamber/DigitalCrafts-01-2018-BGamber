// Fake database of users
let users = {
  'joe@smith.com': {
    id: 3,
    email: 'joe@smith.com',
    password: '$2a$10$WNfQx07zNEXEEEpLQIkVGuYD083ViU1FVwhQf4QFUJ6Rcs9yNZV7O',
    password_bad: 'mylittlepassword'
  },
  'joe@bloggs.com': {
    id: 5,
    email: 'joe@bloggs.com',
    password: '$2a$10$5xFwr9tjKKr5MbmosElYjuJ.q5u7Q/BzZN1hhkV.fQrzYAxtEzmzm',
    password_bad: 'test1234'
  },
};

let findUserByEmail = email => users[email];

module.exports = {
  findUserByEmail
};