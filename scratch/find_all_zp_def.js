const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const searchStr = 'Zp=';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    let index = content.indexOf(searchStr);
    while (index !== -1) {
        console.log('--- Found at index ' + index + ' ---');
        const start = Math.max(0, index - 500);
        const end = Math.min(content.length, index + 2000);
        console.log(content.substring(start, end));
        index = content.indexOf(searchStr, index + 1);
    }
} catch (err) {
    console.error(err);
}
