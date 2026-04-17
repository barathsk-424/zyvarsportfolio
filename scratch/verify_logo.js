const fs = require('fs');
const content = fs.readFileSync('assets/index.js', 'utf8');
const search = 'className:`logo`';
let index = -1;
while ((index = content.indexOf(search, index + 1)) !== -1) {
    const start = Math.max(0, index - 100);
    const end = Math.min(content.length, index + 300);
    console.log('--- Result ---');
    console.log(content.substring(start, end));
}
if (content.indexOf('./images/logo.png') !== -1) {
    console.log('--- Found logo image path! ---');
} else {
    console.log('--- Logo image path NOT found ---');
}
