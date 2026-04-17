const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const searchString = 'navbar';
    const regex = new RegExp(searchString, 'gi');
    let match;
    while ((match = regex.exec(content)) !== null) {
        console.log('--- Found ' + match[0] + ' at index ' + match.index + ' ---');
        const start = Math.max(0, match.index - 500);
        const end = Math.min(content.length, match.index + 500);
        console.log(content.substring(start, end));
    }
} catch (err) {
    console.error(err);
}
