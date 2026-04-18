const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove logo carefully
const logoStart = content.indexOf('(0,H.jsx)(`img`,{src:`./images/logo.png`');
// we know it's at the end of the file in the footer.
let endOfLogo = content.indexOf('})', logoStart) + 3; // '}),'
// but let's check if there's a comma
if(content[endOfLogo-1] === ',') {
    content = content.substring(0, logoStart) + content.substring(endOfLogo);
}

const sectionsStart = content.indexOf('className:`portfolio`,children:[');
const startOfArray = sectionsStart + 'className:`portfolio`,children:['.length;
let bracketCount = 1;
let endOfArray = -1;
for (let i = startOfArray; i < content.length; i++) {
    if (content[i] === '[') bracketCount++;
    else if (content[i] === ']') bracketCount--;
    if (bracketCount === 0) { endOfArray = i; break; }
}

const originalArrayContent = content.substring(startOfArray, endOfArray);
const sections = [];
let currentStart = 0;
let parenCount = 0;
let inArray = 0;

for (let i = 0; i < originalArrayContent.length; i++) {
    const char = originalArrayContent[i];
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (char === '[') inArray++;
    if (char === ']') inArray--;
    
    if (char === ',' && parenCount === 0 && inArray === 0) {
        sections.push(originalArrayContent.substring(currentStart, i));
        currentStart = i + 1;
    }
}
sections.push(originalArrayContent.substring(currentStart));

let about, team, hero, projects, pricing, services, contact, copyright;
sections.forEach((s) => {
    if (s.includes('className:`hero`')) { hero = s; }
    else if (s.includes('id:`about`')) { about = s; }
    else if (s.includes('id:`team`')) { team = s; }
    else if (s.includes('id:`services`')) { services = s; }
    else if (s.includes('id:`projects`')) { projects = s; }
    else if (s.includes('Simple Pricing for Every Business')) { pricing = s; }
    else if (s.includes('id:`contact`')) { contact = s; }
    else if (s.includes('© 2026')) { copyright = s; }
});

const orderList = [about, team, hero, projects, pricing, services, contact, copyright].filter(Boolean);
const newArrayContent = orderList.join(',');

const finalContent = content.substring(0, startOfArray) + newArrayContent + content.substring(endOfArray);
console.log("LAST 500 CHARACTERS:");
console.log(finalContent.substring(finalContent.length - 500));
