const batchAssert = require('./batchAssert');

let phoneRegex = /^[0-9]{3}-?[0-9]{3}-?[0-9]{4}$/;
let stockRegex = /[A-Z]{3}[A-Z]?/;
let creditRegex = /[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}/;
let linkRegex = /https?:\/\/[a-z]+.com(\/[a-zA-Z0-9]+.[a-zA-Z]+\?[a-zA-Z]+=[a-zA-Z0-9]+(&[a-zA-Z]+=[a-zA-Z0-9]+)+?)?/;

let testBatch = [
  { test: phoneRegex.test("9015555555"), result: true, message: "Number-only phone numbers should match" },
  { test: phoneRegex.test('901-555-5555'), result: true, message: 'Phone numbers with dashes should match' },
  { test: phoneRegex.test('(901)555-5555'), result: false, message: "Parentheses are not allowed" },
  { test: stockRegex.test('AAPL'), result: true, message: "Four-letter Stock Market Ticker should match" },
  { test: stockRegex.test('MDB'), result: true, message: "Three-letter Stock Market Ticker should match" },
  { test: creditRegex.test('4000123498762746'), result: true, message: "16-digit credit card number should match" },
  { test: creditRegex.test('123456'), result: false, message: "Non-16-digit numbers should fail" },
  { test: creditRegex.test('4000-1234-9876-2746'), result: true, message: "4-digit-groups separated by dashes should match" },
  { test: linkRegex.test('https://google.com'), result: true, message: "Basic links should match" },
  { test: linkRegex.exec('http://facebook.com/mysite.html?q=hello')[0], result: 'http://facebook.com/mysite.html?q=hello', message: "Pages of site, and queries, should match" },
  { test: linkRegex.exec('https://google.com/search?q=place&t=time'), result: 'http://google.com/search?q=place&t=time', message: "Multiple query parameters should match" }
];

batchAssert.testAll(testBatch, false);