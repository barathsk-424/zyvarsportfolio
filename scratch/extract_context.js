const fs = require('fs');
const path = require('path');
const content = fs.readFileSync('assets/index.js', 'utf8');
const index = content.indexOf('ZyvraSites');
if (index !== -1) {
    const start = Math.max(0, index - 200);
    const end = Math.min(content.length, index + 200);
    console.log(content.substring(start, end));
} else {
    console.log('Not found');
}
