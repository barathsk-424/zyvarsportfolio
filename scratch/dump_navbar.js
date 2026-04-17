const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

const start = 383000;
const end = 386000;
fs.writeFileSync(path.join(__dirname, 'navbar_snip.txt'), content.substring(start, end), 'utf8');
console.log("Written snip to navbar_snip.txt");
