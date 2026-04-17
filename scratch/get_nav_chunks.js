const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

const index = content.indexOf('jd().pathname');
if (index !== -1) {
    // Print in chunks of 1000 to avoid buffer issues if any
    console.log("CHUNK 1:");
    console.log(content.substring(index, index + 1000));
    console.log("CHUNK 2:");
    console.log(content.substring(index + 1000, index + 2000));
    console.log("CHUNK 3:");
    console.log(content.substring(index + 2000, index + 3000));
}
