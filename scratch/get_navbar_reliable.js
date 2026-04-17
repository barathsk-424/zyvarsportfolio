const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

// The Zp component likely has className:`navbar`
const searchStr = 'className:`navbar`';
const index = content.indexOf(searchStr);
if (index !== -1) {
    console.log(content.substring(index, index + 4000));
} else {
    // Try without quotes just in case
    const index2 = content.indexOf('className:');
    if (index2 !== -1) {
        console.log("Found className at " + index2);
        console.log(content.substring(index2, index2 + 500));
    }
}
