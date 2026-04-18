const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

const sectionsStart = content.indexOf('className:`portfolio`,children:[');
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

// Split sections by outer-level commas
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

console.log("Found", sections.length, "sections.");

// Identification map
const sorted = [];
const markers = {
    about: (s) => s.includes('id:`about`'),
    team: (s) => s.includes('id:`team`'),
    hero: (s) => s.includes('className:`hero`'),
    services: (s) => s.includes('id:`services`'),
    problems: (s) => s.includes('Problems Local Shops Face'),
    projects: (s) => s.includes('id:`projects`'),
    pricing: (s) => s.includes('Simple Pricing for Every Business'),
    contact: (s) => s.includes('id:`contact`')
};

const processed = new Set();
const getSection = (key) => {
    const idx = sections.findIndex((s, i) => !processed.has(i) && markers[key](s));
    if (idx !== -1) {
        processed.add(idx);
        return sections[idx];
    }
    return null;
};

const order = ['about', 'team', 'hero', 'services', 'problems', 'projects', 'pricing', 'contact'];
const newSections = [];
order.forEach(key => {
    const s = getSection(key);
    if (s) newSections.push(s);
});

// Add any leftover sections just in case
sections.forEach((s, i) => {
    if (!processed.has(i)) newSections.push(s);
});

const newArrayContent = newSections.join(',');
const newFileContent = content.substring(0, startOfArray) + newArrayContent + content.substring(endOfArray);
fs.writeFileSync(filePath, newFileContent);
console.log("Successfully fixed section order: About -> Team -> Hero -> Others");
