const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

const index = content.indexOf('className:"navbar"');
if (index !== -1) {
    // Get a larger chunk to find the list of links
    console.log(content.substring(index, index + 4000));
}
