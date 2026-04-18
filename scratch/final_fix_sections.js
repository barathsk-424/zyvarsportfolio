const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

const parentIndicator = 'className:`portfolio`,children:[';
const portfolioIdx = content.indexOf(parentIndicator);
if (portfolioIdx === -1) {
    console.log("Could not find portfolio component start");
    process.exit(1);
}

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

// Identification patterns for all sections
const patterns = {
    about: /(0,H\.jsx\)\(`section`,{id:`about`,className:`container`,children:\(0,H\.jsxs\)\(`div`,{style:{textAlign:`center`,display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`4rem`},children:\[.*\]}\)}\)/,
    team: /(0,H\.jsxs\)\(`section`,{id:`team`,className:`container`,children:\[.*\]}\)/,
    hero: /(0,H\.jsxs\)\(`section`,{className:`hero`,children:\[.*\]}\)/,
    services: /(0,H\.jsxs\)\(`section`,{id:`services`,className:`container`,children:\[.*\]}\)/,
    problems: /(0,H\.jsx\)\(`section`,{className:`container`,children:\(0,H\.jsxs\)\(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat\(auto-fit,minmax\(300px,1fr\)\)`,gap:`2rem`},children:\[.*Problems Local Shops Face.*\]}\)}\)/,
    projects: /(0,H\.jsxs\)\(`section`,{id:`projects`,className:`container`,children:\[.*\]}\)/,
    pricing: /(0,H\.jsx\)\(`section`,{className:`container`,children:\(0,H\.jsx\)\(`div`,{className:`glass-card business-model-card`,style:{background:\`var\(--surface-accent\)\`},children:.*Simple Pricing for Every Business.*}\)}\)/,
    contact: /(0,H\.jsxs\)\(`footer`,{id:`contact`,className:`container`,style:{paddingBottom:\`4rem\`},children:\[.*\]}\)/,
    copyright: /(0,H\.jsx\)\(`div`,{style:{marginTop:\`4rem\`,textAlign:\`center\`,color:\`var\(--text-muted\)\`,fontSize:\`0.9rem\`},children:\(0,H\.jsxs\)\(`div`,{style:{display:\`flex\`,flexDirection:\`column\`,alignItems:\`center\`,gap:\`1rem\`},children:\[.*© 2026.*\]}\)}\)/
};

const extracted = {};
for (const key in patterns) {
    const match = content.match(patterns[key]);
    if (match) {
        extracted[key] = match[0];
        console.log("Extracted", key);
    } else {
        console.log("FAILED to extract", key);
    }
}

// Special case for buttons: remove them from Hero if they exist
if (extracted.hero) {
    const buttonPattern = /,\(0,H\.jsxs\)\(Y\.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:\.7},className:\`hero-buttons\`,style:{animation:\`float-y-fast 6s ease-in-out infinite alternate\`},children:\[.*Get Started.*Our Story.*\]}\)/;
    extracted.hero = extracted.hero.replace(buttonPattern, '');
}

// Build the new array content
const order = ['about', 'team', 'hero', 'services', 'problems', 'projects', 'pricing', 'contact', 'copyright'];
const newArraySections = [];
order.forEach(key => {
    if (extracted[key]) newArraySections.push(extracted[key]);
});

const newArrayContent = newArraySections.join(',');
const newFileContent = content.substring(0, startOfArray) + newArrayContent + content.substring(endOfArray);
fs.writeFileSync(filePath, newFileContent);
console.log("Successfully rebuilt sections in the correct order.");
