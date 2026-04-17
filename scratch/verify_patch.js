const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');
console.log('Includes /zyvarsportfolio: ' + content.includes('/zyvarsportfolio'));
console.log('Includes ./#: ' + content.includes('./#'));
const index = content.indexOf('jd().pathname');
if (index !== -1) {
    console.log(content.substring(index - 50, index + 200));
}
