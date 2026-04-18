const fs = require('fs');
const content = fs.readFileSync('c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js', 'utf8');

const t1 = content.indexOf('Who We Are');
const t2 = content.indexOf('Expert Team');
const t3 = content.indexOf('We Build Websites');

console.log("Who We Are:", t1);
console.log("Expert Team:", t2);
console.log("We Build Websites:", t3);

// Let's find the 'children:[' that precedes t1
let childrenStart = content.lastIndexOf('children:[', t1);
console.log("Children start for About:", childrenStart);

// Let's see the content from childrenStart
console.log(content.substring(childrenStart, childrenStart + 5000));
