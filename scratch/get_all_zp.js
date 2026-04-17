const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const searchStr = 'Zp=';

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const index = content.indexOf(searchStr);
    if (index !== -1) {
        console.log(content.substring(index, index + 5000));
    } else {
        console.log("Not found");
    }
} catch (err) {
    console.error(err);
}
