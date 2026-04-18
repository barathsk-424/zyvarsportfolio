const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

const parentIndicator = 'className:`portfolio`,children:[';
const portfolioIdx = content.indexOf(parentIndicator);
if (portfolioIdx !== -1) {
    console.log("portfolioIdx:", portfolioIdx);
    console.log(content.substring(portfolioIdx - 50, portfolioIdx + parentIndicator.length + 500));
} else {
    console.log("Could not find portfolio component start");
}

let endIdx = content.lastIndexOf(']}');
console.log("File end (last 200 chars):", content.substring(content.length - 200));

// Let's also verify if the previous array rewrite correctly joined the content
