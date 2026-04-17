const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

const searchTerms = ['scrollTo', 'scrollIntoView'];
for (const term of searchTerms) {
    let index = content.indexOf(term);
    while (index !== -1) {
        console.log('--- Found ' + term + ' at index ' + index + ' ---');
        console.log(content.substring(index - 50, index + 100));
        index = content.indexOf(term, index + 1);
    }
}
