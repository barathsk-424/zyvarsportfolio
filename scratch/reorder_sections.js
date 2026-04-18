const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

const heroPattern = /,\(0,H\.jsxs\)\(`section`,{className:`hero`,children:\[.*\]}\)/;
const aboutPattern = /,\(0,H\.jsx\)\(`section`,{id:`about`,className:`container`,children:.*}\)/;
const teamPattern = /,\(0,H\.jsxs\)\(`section`,{id:`team`,className:`container`,children:\[.*\]}\)/;

// I'll find the locations
const sectionsStart = content.indexOf('className:`portfolio`,children:[');
if (sectionsStart === -1) {
    console.log("Could not find start of sections");
    process.exit(1);
}

const startOfArray = sectionsStart + 'className:`portfolio`,children:['.length;
// We need to find the matching closing bracket for the children array
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

if (endOfArray === -1) {
    console.log("Could not find end of array");
    process.exit(1);
}

const originalArrayContent = content.substring(startOfArray, endOfArray);
console.log("Original array content length:", originalArrayContent.length);

// Now split by the top-level sections
// They are separated by commas. But they are H.jsx/H.jsxs calls.
// We can use a parser or regex to find the elements.
// Since it's minified, they are usually (0,H.jsx)(`section`,...) or (0,H.jsxs)(`section`,...)

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

console.log("Detected ", sections.length, " sections.");
sections.forEach((s, idx) => {
    console.log(`Section ${idx}:`, s.substring(0, 100));
});

// Identify About and Team
let aboutIdx = -1;
let teamIdx = -1;
sections.forEach((s, idx) => {
    if (s.includes('id:`about`')) aboutIdx = idx;
    if (s.includes('id:`team`')) teamIdx = idx;
});

console.log("About Index:", aboutIdx);
console.log("Team Index:", teamIdx);

if (aboutIdx !== -1 && teamIdx !== -1) {
    // New order: About (0), Team (1), others
    const movedAbout = sections.splice(aboutIdx, 1)[0];
    // Re-index Team since about might have been before it
    const newTeamIdx = sections.findIndex(s => s.includes('id:`team`'));
    const movedTeam = sections.splice(newTeamIdx, 1)[0];
    
    const newSections = [movedAbout, movedTeam, ...sections];
    const newArrayContent = newSections.join(',');
    
    const newFileContent = content.substring(0, startOfArray) + newArrayContent + content.substring(endOfArray);
    fs.writeFileSync(filePath, newFileContent);
    console.log("Successfully reordered sections.");
} else {
    console.log("Could not find sections to move.");
}
