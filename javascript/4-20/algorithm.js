let _ = require('lodash');

let getHistogram = (string) => {
  let arr = string.split('');
  let histogram = {};
  arr.forEach(letter => {
    if (histogram[letter]) {
      histogram[letter] += 1;
    } else {
      histogram[letter] = 1;
    };
  });
  return histogram;
};

let sortFrequencies = (histogram) => 
  Object.keys(histogram).sort((a,b) => histogram[b] - histogram[a]);

let getHuffmanKey = (frequencyList) => {
  let prefix = '';
  let key = {};
  frequencyList.forEach((letter, index) => {
    if (index === 0) {
      key[letter] = '0';
    } else if (index < frequencyList.length -1) {
      key[letter] = `${prefix}0`;
    } else {
      key[letter] = `${prefix}`;
    };
    prefix += '1';
  });
  return key;
};

let compressMessage = (message) => {
  let huffKey = getHuffmanKey(sortFrequencies(getHistogram(message)));
  let compressed = message.split('').map(letter => huffKey[letter]).join('');
  return compressed;
}

// For test purposes only
let decompressMessage = (compressed, key) => {
  let bitString = '';
  let decompMessage = '';
  compressed.split('').forEach(bit => {
    bitString += bit;
    if (Object.values(key).indexOf(bitString) !== -1) {
      decompMessage += (_.invert(key))[bitString];
      bitString = '';
    };
  });
  return decompMessage;
};

// let message = 'Hello World!';
let message = "Bacon ipsum dolor amet pork tail dolore, corned beef bacon anim alcatra consectetur ham sint et ham hock exercitation commodo. Pork belly t-bone meatloaf, elit corned beef rump lorem labore. Meatball frankfurter qui hamburger, ut veniam cupidatat biltong eu. Dolore ham filet mignon, excepteur fatback velit irure turducken andouille. Spare ribs drumstick chicken, corned beef occaecat tri-tip capicola proident esse fugiat anim pork chop pork belly. Aliqua meatball consequat sausage.";

let testMessage = message.toLowerCase();

console.log(`${testMessage}: ${testMessage.length * 8} bits`)
console.log(getHistogram(testMessage));
console.log(sortFrequencies(getHistogram(testMessage)));
console.log(getHuffmanKey(sortFrequencies(getHistogram(testMessage))));
console.log(`${compressMessage(testMessage)}: ${compressMessage(testMessage).length} bits`);
console.log(decompressMessage(compressMessage(testMessage), getHuffmanKey(sortFrequencies(getHistogram(testMessage)))));