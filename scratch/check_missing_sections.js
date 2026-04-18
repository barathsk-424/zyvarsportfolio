const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

const sectionsStart = content.indexOf('className:`portfolio`,children:[');
if (sectionsStart === -1) {
    console.log("Could not find start of sections");
    process.exit(1);
}

const startOfArray = sectionsStart + 'className:`portfolio`,children:['.length;
let bracketCount = 1;
let endOfArray = -1;
for (let i = startOfArray; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    else if (content[i] === ']') bracketCount--;
    if (bracketCount === 0) {
        endOfArray = i;
        break;
    }
}
const arrayContent = content.substring(startOfArray, endOfArray);

const sections = [];
let currentStart = 0;
let parenCount = 0;
let inArray = 0;

for (let i = 0; i < arrayContent.length; i++) {
    const char = arrayContent[i];
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (char === '[') inArray++;
    if (char === ']') inArray--;
    
    if (char === ',' && parenCount === 0 && inArray === 0) {
        sections.push(arrayContent.substring(currentStart, i));
        currentStart = i + 1;
    }
}
sections.push(arrayContent.substring(currentStart));

console.log("Current sections count:", sections.length);
sections.forEach((s, idx) => {
    console.log(`Section ${idx}:`, s.substring(0, 150));
});
