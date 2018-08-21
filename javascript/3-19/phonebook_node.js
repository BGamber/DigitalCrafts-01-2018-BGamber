let readline = require("readline");
let fs = require("fs");
let promisify = require("util").promisify;
let EventEmitter = require("events");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let question = question =>
  new Promise(resolve => {
    rl.question(question, resolve);
  });
let readFile = promisify(fs.readFile);
let writeFile = promisify(fs.writeFile);

let phonebookMaker = events => {
  let phonebookList = {};
  return {
    optionsMenu: () => {
      console.log("==========\nPhonebook Menu");
      console.log("1. Look Up Contact");
      console.log("2. View Contact List");
      console.log("3. Add/Edit Contact");
      console.log("4. Delete Contact");
      console.log("5. Save and Exit");
      question("Select an option: ").then(option => {
        console.log("\033c");
        menuOptions = {
          "1": () => {
            question("Enter contact name: ")
              .then(name => {
                let findCount = 0;
                Object.keys(phonebookList).forEach(key => {
                  if (key.indexOf(name) !== -1) {
                    findCount++;
                    console.log(`${key}: ${Object.values(phonebookList[key])}`);
                  }
                });
                if (findCount === 0) {
                  console.log("Contact not found.");
                }
                events.emit("menu");
              })
              .catch(err => {
                rl.close();
                throw err;
              });
          },
          "2": () => {
            if (Object.keys(phonebookList).length > 0) {
              Object.keys(phonebookList)
                .sort()
                .forEach(key => {
                  console.log(`${key}: ${Object.values(phonebookList[key])}`);
                });
            } else {
              console.log("Contact List empty.");
            }
            events.emit("menu");
          },
          "3": () => {
            let contactName;
            let contactNumber;
            question("Enter contact name: ")
              .then(name => {
                contactName = name;
                return question("Enter contact phone: ");
              })
              .then(number => {
                contactNumber = number;
                phonebook.addContact(contactName, contactNumber);
                events.emit("menu");
              })
              .catch(err => {
                rl.close();
                throw err;
              });
          },
          "4": () => {
            question("Enter contact name: ")
              .then(name => {
                if (Object.keys(phonebookList).includes(name)) {
                  delete phonebookList[name];
                  console.log("Contact deleted.");
                }
                events.emit("menu");
              })
              .catch(err => {
                rl.close();
                throw err;
              });
          },
          "5": () => {
            rl.close();
            phonebook.saveList("phonebook.txt");
          }
        };
        if (Object.keys(menuOptions).includes(option)) {
          menuOptions[option]();
        } else {
          console.log("Invalid input.");
          events.emit("menu");
        }
      });
    },
    loadList: file => {
      readFile(file)
        .then(data => {
          return JSON.parse(data);
        })
        .then(parsedData => {
          phonebookList = parsedData;
        })
        .catch(err => {
          writeFile("phonebook.txt", "");
        });
    },
    saveList: file => {
      writeFile(file, JSON.stringify(phonebookList))
        .then(() => {
          console.log("Contact list saved.");
        })
        .catch(err => {
          throw err;
        });
    },
    addContact: (contactName, contactNumber) => {
      if (!(contactName in phonebookList)) {
        phonebookList[contactName] = {};
      }
      phonebookList[contactName].phone = contactNumber;
    }
  };
};

let events = new EventEmitter();
let phonebook = phonebookMaker(events);

events.on("menu", () => {
  phonebook.optionsMenu();
});

console.log("\033c");
phonebook.loadList("phonebook.txt");
phonebook.optionsMenu();
