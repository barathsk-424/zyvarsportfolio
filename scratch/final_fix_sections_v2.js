const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

function findSection(marker, anchor = null) {
    let start = -1;
    if (anchor) {
        start = content.indexOf(marker, anchor);
    } else {
        start = content.indexOf(marker);
    }
    
    if (start === -1) return null;
    
    // Find the start of the (0,H... call
    let callStart = content.lastIndexOf('(0,H.', start);
    
    // Find matching paren for the call
    let parenCount = 1;
    let end = -1;
    for (let i = callStart + 5; i < content.length; i++) {
        if (content[i] === '(') parenCount++;
        else if (content[i] === ')') parenCount--;
        
        if (parenCount === 0) {
            end = i + 1;
            break;
        }
    }
    
    if (end === -1) return null;
    return content.substring(callStart, end);
}

const about = findSection('id:`about`');
const team = findSection('id:`team`');
const hero = findSection('className:`hero`');
const services = findSection('id:`services`');
const projects = findSection('id:`projects`');
const contact = findSection('id:`contact`');

// Problems: search for generic section with the text
const problemsMarker = 'Problems Local Shops Face';
const problems = findSection(problemsMarker);

// Pricing: search for generic section with the text
const pricingMarker = 'Simple Pricing for Every Business';
const pricing = findSection(pricingMarker);

// Copyright
const copyrightMarker = '© 2026';
const copyright = findSection(copyrightMarker);

console.log("Extracted status:", {
    about: !!about,
    team: !!team,
    hero: !!hero,
    services: !!services,
    problems: !!problems,
    projects: !!projects,
    pricing: !!pricing,
    contact: !!contact,
    copyright: !!copyright
});

const parentIndicator = 'className:`portfolio`,children:[';
const portfolioIdx = content.indexOf(parentIndicator);
const startOfArray = portfolioIdx + parentIndicator.length;
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

const order = [about, team, hero, services, problems, projects, pricing, contact, copyright].filter(Boolean);
const newArrayContent = order.join(',');
const newFileContent = content.substring(0, startOfArray) + newArrayContent + content.substring(endOfArray);
fs.writeFileSync(filePath, newFileContent);
console.log("Rebuilt successfully");
