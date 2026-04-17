const fs = require('fs');
const content = fs.readFileSync('assets/index.js', 'utf8');
const search = 'className:`logo`';
let index = -1;
while ((index = content.indexOf(search, index + 1)) !== -1) {
    const start = Math.max(0, index - 200);
    const end = Math.min(content.length, index + 200);
    console.log('--- Result ---');
    console.log(content.substring(start, end));
}
