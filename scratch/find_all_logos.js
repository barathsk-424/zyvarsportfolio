const fs = require('fs');
const content = fs.readFileSync('c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js', 'utf8');

let pos = content.indexOf('./images/logo.png');
while (pos !== -1) {
    console.log("Match at ", pos);
    console.log(content.substring(pos - 100, pos + 100));
    pos = content.indexOf('./images/logo.png', pos + 1);
}
