const fs = require('fs');

function parseSections(arrayContent) {
    const sections = [];
    let currentStart = 0;
    let p = 0; let b = 0; let c = 0;
    let inQuote = null; // can be ' " or `
    let inEscape = false;

    for (let i = 0; i < arrayContent.length; i++) {
        const char = arrayContent[i];

        if (inEscape) {
            inEscape = false;
            continue;
        }

        if (char === '\\') {
            inEscape = true;
            continue;
        }

        if (inQuote) {
            if (char === inQuote) {
                inQuote = null;
            }
            continue;
        }

        if (char === "'" || char === '"' || char === '\`') {
            inQuote = char;
            continue;
        }

        if (char === '(') p++;
        else if (char === ')') p--;
        else if (char === '[') b++;
        else if (char === ']') b--;
        else if (char === '{') c++;
        else if (char === '}') c--;
        
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

// 1. Remove logo
const logoStart = content.indexOf('(0,H.jsx)(`img`,{src:`./images/logo.png`,alt:`ZyvraSites`,style:{height:`95px`,width:`auto`,opacity:0.8}}),');
if (logoStart !== -1) {
    const p = content.substring(logoStart, logoStart + 104);
    content = content.replace(p, '');
}

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

console.log("Found pure sections:", sections.length);

let about, team, hero, projects, pricing, services, contact, copyright;
const newSections = [];

sections.forEach((s) => {
    if (s.includes('className:`hero`')) { 
        hero = s; 
        const buttonPattern = /,\(0,H\.jsxs\)\(Y\.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:\.7},className:\`hero-buttons\`,style:{animation:\`float-y-fast 6s ease-in-out infinite alternate\`},children:\[.*Get Started.*Our Story.*\]}\)/;
        hero = hero.replace(buttonPattern, '');
    }
    else if (s.includes('id:`about`')) { 
        about = `(0,H.jsx)(\`section\`,{id:\`about\`,className:\`container\`,children:(0,H.jsxs)(\`div\`,{style:{textAlign:\`center\`,display:\`flex\`,flexDirection:\`column\`,alignItems:\`center\`,gap:\`4rem\`},children:[(0,H.jsxs)(Y.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},style:{maxWidth:\`900px\`},children:[(0,H.jsx)(\`span\`,{className:\`badge\`,children:\`Who We Are\`}),(0,H.jsx)(\`h2\`,{children:\`Helping Local Shops Go Digital & Grow Online\`}),(0,H.jsx)(\`p\`,{style:{margin:\`0 auto\`},children:\`ZyvraSites focuses on helping small local businesses like salons, bakeries, medical shops, and local stores build a strong online presence. We create simple and affordable websites, manage updates, and handle complete social media marketing.\`})]}),(0,H.jsxs)(\`div\`,{style:{display:\`flex\`,flexWrap:\`wrap\`,justifyContent:\`center\`,gap:\`2rem\`,width:\`100%\`},children:[(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:\`glass-card\`,style:{padding:\`2rem\`,flex:\`1 1 350px\`,maxWidth:\`500px\`},children:[(0,H.jsx)(\`div\`,{style:{color:\`var(--primary)\`,marginBottom:\`1rem\`},children:(0,H.jsx)(zp,{size:32})}),(0,H.jsx)(\`h3\`,{children:\`Mission\`}),(0,H.jsx)(\`p\`,{style:{fontSize:\`0.9rem\`},children:\`To help small businesses grow online by providing simple, affordable websites and consistent digital support.\`})]}),(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:\`glass-card\`,style:{padding:\`2rem\`,flex:\`1 1 350px\`,maxWidth:\`500px\`},children:[(0,H.jsx)(\`div\`,{style:{color:\`var(--primary)\`,marginBottom:\`1rem\`},children:(0,H.jsx)(Gp,{size:32})}),(0,H.jsx)(\`h3\`,{children:\`Vision\`}),(0,H.jsx)(\`p\`,{style:{fontSize:\`0.9rem\`},children:\`To make every local shop visible online and help them compete in the digital world.\`})]})]})]})})`; 
    }
    else if (s.includes('id:`team`')) { team = s; }
    else if (s.includes('id:`services`')) { services = s; }
    else if (s.includes('id:`projects`')) { projects = s; }
    else if (s.includes('Simple Pricing for Every Business')) { pricing = s; }
    else if (s.includes('id:`contact`')) { contact = s; }
    else if (s.includes('© 2026')) { copyright = s; }
});

const orderList = [about, team, hero, projects, pricing, services, contact, copyright];
orderList.forEach(item => {
    if (item) newSections.push(item);
});

const newArrayContent = newSections.join(',');
const finalContent = content.substring(0, startOfArray) + newArrayContent + content.substring(endOfArray);

try {
    const vm = require('vm');
    new vm.Script(finalContent);
} catch (e) {
    console.error("SyntaxError!", e);
    process.exit(1);
}

fs.writeFileSync('c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js', finalContent);
console.log("Successfully rebuilt with proper string-aware parsing!");
