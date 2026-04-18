const fs = require('fs');

function parseSections(arrayContent) {
    const sections = [];
    let currentStart = 0;
    let p = 0; let b = 0; let c = 0;
    let inQuote = null; let inEscape = false;

    for (let i = 0; i < arrayContent.length; i++) {
        const char = arrayContent[i];
        if (inEscape) { inEscape = false; continue; }
        if (char === '\\') { inEscape = true; continue; }
        if (inQuote) { if (char === inQuote) inQuote = null; continue; }
        if (char === "'" || char === '"' || char === '\`') { inQuote = char; continue; }

        if (char === '(') p++; else if (char === ')') p--;
        else if (char === '[') b++; else if (char === ']') b--;
        else if (char === '{') c++; else if (char === '}') c--;
        
        if (char === ',' && p === 0 && b === 0 && c === 0) {
            sections.push(arrayContent.substring(currentStart, i));
            currentStart = i + 1;
        }
    }
    sections.push(arrayContent.substring(currentStart));
    return sections;
}

const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
let content = fs.readFileSync(filePath, 'utf8');

const sectionsStart = content.indexOf('className:`portfolio`,children:[');
const startOfArray = sectionsStart + 'className:`portfolio`,children:['.length;
let bCount = 1;
let endOfArray = -1;
let iQ = null; let iE = false;
for (let i = startOfArray; i < content.length; i++) {
    const char = content[i];
    if (iE) { iE = false; continue; }
    if (char === '\\') { iE = true; continue; }
    if (iQ) { if (char === iQ) iQ = null; continue; }
    if (char === "'" || char === '"' || char === '\`') { iQ = char; continue; }

    if (char === '[') bCount++;
    else if (char === ']') bCount--;
    if (bCount === 0) { endOfArray = i; break; }
}

const originalArrayContent = content.substring(startOfArray, endOfArray);
const sections = parseSections(originalArrayContent);

console.log("Sections parsed:", sections.length);
try {
    const vm = require('vm');
    const newContent = content.substring(0, startOfArray) + sections.join(',') + content.substring(endOfArray);
    new vm.Script(newContent);
    console.log("Syntax OK just splitting and rejoining.");
} catch(e) {
    console.log("Syntax Error just splitting:", e);
}
