const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

const searchStr = 'Contact';
let index = content.indexOf(searchStr);
while (index !== -1) {
    console.log('--- At ' + index + ' ---');
    console.log(content.substring(index - 50, index + 200));
    index = content.indexOf(searchStr, index + 1);
}
