const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const searchStr = 'Zp=';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const index = content.indexOf(searchStr);
    if (index !== -1) {
        const start = Math.max(0, index - 500);
        const end = Math.min(content.length, index + 2000);
        console.log(content.substring(start, end));
    } else {
        console.log("Not found");
    }
} catch (err) {
    console.error(err);
}
