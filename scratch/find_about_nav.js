const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /name:`About`|label:`About`|`About`|'About'/;
const match = content.match(regex);
if (match) {
    console.log("Match found at " + match.index);
    console.log(content.substring(match.index - 100, match.index + 1000));
} else {
    console.log("Not found");
}
