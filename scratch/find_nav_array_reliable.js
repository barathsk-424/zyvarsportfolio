const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

// The array might look like: [{name:"About",id:"about"},{name:"Services",id:"services"},{name:"Projects",id:"projects"},{name:"Team",id:"team"}]
// Or it might be just [ {name:"About",...}, ... ]

const regex = /{name:"About"/;
const match = content.match(regex);
if (match) {
    console.log("Match found at " + match.index);
    console.log(content.substring(match.index, match.index + 2000));
} else {
    console.log("Not found");
}
