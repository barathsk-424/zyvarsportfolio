const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const searchStr = 'href:"/contact"';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    let index = content.indexOf(searchStr);
    while (index !== -1) {
        console.log('--- Found at index ' + index + ' ---');
        console.log(content.substring(index - 50, index + 100));
        index = content.indexOf(searchStr, index + 1);
    }
} catch (err) {
    console.error(err);
}
