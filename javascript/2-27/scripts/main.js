people = [
    {name: 'Ben', strength: 499},
    {name: 'Robby', strength: 499},
    {name: 'James', strength: 427},
    {name: 'Ashley', strength: 482},
    {name: 'Bemi', strength: 456}
];

var sortAsc = function(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        } else {
            return 0;
        }
    };
};

var sortDesc = function(prop) {
    return function(a, b) {
        if (a[prop] < b[prop]) {
            return 1;
        } else if (a[prop] > b[prop]) {
            return -1;
        } else {
            return 0;
        }
    };
};

console.log(people.slice().sort(sortAsc('name')));
console.log(people.slice().sort(sortDesc('name')));

console.log(people.slice().sort(sortAsc('strength')));
console.log(people.slice().sort(sortDesc('strength')));