var readline = require('readline');
var fs = require('fs');
var promisify = require('util').promisify;
var EventEmitter = require('events');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var question = function (question) {
  return new Promise(function (resolve) {
    rl.question(question, resolve);
  });
};
var readFile = promisify(fs.readFile);
var writeFile = promisify(fs.writeFile);

var phonebookMaker = function (events) {
  var phonebookList = {};
  return {
    optionsMenu: function () {
      console.log('==========\nPhonebook Menu');
      console.log('1. Look Up Contact');
      console.log('2. View Contact List');
      console.log('3. Add New Contact');
      console.log('4. Delete Contact');
      console.log('5. Exit Phonebook');
      question('Select an option: ')
        .then(function (option) {
          console.log('\033c');
          if (option === '1') {
            // 1 stuff
            events.emit('menu');
          } else if (option === '2') {
            console.log(Object.values(phonebookList));
            events.emit('menu');
          } else if (option === '3') {
            var contactName;
            var contactNumber;
            question('Enter contact name: ')
              .then(function (name) {
                contactName = name;
                return question('Enter contact phone: ');
              })
              .then(function (number) {
                contactNumber = number;
                phonebook.addContact(contactName, contactNumber);
                events.emit('menu');
              })
              .catch(function(err) {
                rl.close();
                throw err;
              });
          } else if (option === '4') {
            // 4 stuff
            events.emit('menu');
          } else if (option === '5') {
            rl.close();
          };
        });
    },
    loadList: function (file) {
      readFile(file)
        .then(function(data) {
          return JSON.parse(data);
        })
        .then(function(parsedData) {
          phonebook.phonebookList = parsedData;
        })
        .catch(function(err) {
          writeFile('phonebook.txt','');
        });
    },
    addContact: function (contactName, contactNumber) {
      if (!(contactName in phonebookList)) {
        phonebookList[contactName] = {};
      };
      phonebookList[contactName].phone = contactNumber;
    },
  };
};

var events = new EventEmitter();
var phonebook = phonebookMaker(events);

events.on('menu', function() {
  phonebook.optionsMenu();
});

console.log('\033c');
phonebook.loadList('phonebook.txt');
phonebook.optionsMenu();