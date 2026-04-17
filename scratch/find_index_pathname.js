const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

const content = fs.readFileSync(filePath, 'utf8');
const searchStr = 'jd().pathname';
const index = content.indexOf(searchStr);
console.log('Index: ' + index);
if (index !== -1) {
    console.log(content.substring(index - 50, index + 300));
}
