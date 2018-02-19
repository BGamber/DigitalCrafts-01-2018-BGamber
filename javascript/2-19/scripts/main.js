var hello = function (name) {
    if (name == undefined) {
        console.log('Hello, world!')
    } else {
        console.log(`Hello, ${name}!`);
    }
};

var madlib = function (name, subject) {
    console.log(`${name}'s favorite subject in school is ${subject}.`);
};

var tipCalc = function (bill, service) {
    var tip;
    if (service === 'good') {
        tip = bill * 0.20;
    } else if (service === 'fair') {
        tip = bill * 0.15;
    } else if (service === 'bad') {
        tip = bill * 0.10;
    } else {
        tip = 0;
    }
    return tip;
}

var totalBill = function (bill, service) {
    var total = bill + tipCalc(bill, service);
    return total;
}

var splitAmount= function (bill, service, numSplit) {
    var splitAmount = totalBill(bill, service) / numSplit;
    return splitAmount;
}