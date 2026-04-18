
const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\sk barath\\OneDrive\\Desktop\\zyvarsportfolio\\assets\\index.js';
const content = fs.readFileSync(filePath, 'utf8');

let searchStr = 'logo.png';
let idx = content.indexOf(searchStr);
while (idx !== -1) {
    let start = Math.max(0, idx - 100);
    let end = Math.min(content.length, idx + 100);
    console.log(`Match at ${idx}: ...${content.substring(start, end)}...`);
    idx = content.indexOf(searchStr, idx + 1);
}
