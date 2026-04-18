const fs = require('fs');
const content = fs.readFileSync('c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js', 'utf8');

const s = content.indexOf('portfolio`,children:[');
if (s !== -1) {
    console.log(content.substring(s, s + 10000));
}
