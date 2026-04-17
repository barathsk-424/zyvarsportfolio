const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

const terms = ['About', 'Services', 'Projects', 'Team'];
for (let i = 0; i < content.length - 2000; i += 100) {
    const chunk = content.substring(i, i + 2000);
    const count = terms.filter(t => chunk.includes(t)).length;
    if (count === 4) {
        console.log("MATCH at " + i);
        console.log(chunk);
        i += 2000;
    }
}
