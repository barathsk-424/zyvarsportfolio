const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

function findSection(marker) {
    let start = content.indexOf(marker);
    if (start === -1) return null;
    let callStart = content.lastIndexOf('(0,H.', start);
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
    return end === -1 ? null : content.substring(callStart, end);
}

const about = findSection('id:`about`');
const team = findSection('id:`team`');
const hero = findSection('className:`hero`');
const services = findSection('id:`services`');
const projects = findSection('id:`projects`');
const pricing = findSection('Simple Pricing for Every Business');
const contact = findSection('id:`contact`');
const copyright = findSection('© 2026');

// Order requested by user:
// 1. Who We Are (about)
// 2. Expert Team (team)
// 3. Digital Excellence (hero)
// 4. Our Works (projects)
// 5. Our Plans (pricing)
// 6. What We Do (services)
// 7. Contact Section (contact + copyright)

const order = [about, team, hero, projects, pricing, services, contact, copyright].filter(Boolean);

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

const newArrayContent = order.join(',');
const newFileContent = content.substring(0, startOfArray) + newArrayContent + content.substring(endOfArray);
fs.writeFileSync(filePath, newFileContent);
console.log("Successfully reordered sections as per the new 7-point list.");
