const fs = require('fs');
const vm = require('vm');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove logo
const logoFooterPattern = '(0,H.jsx)(`img`,{src:`./images/logo.png`,alt:`ZyvraSites`,style:{height:`95px`,width:`auto`,opacity:0.8}}),';
content = content.replace(logoFooterPattern, '');

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
    if (s.includes('className:`hero`')) {
        hero = s;
        // Remove 'Get Started' and 'Our Story' buttons
        const buttonPattern = /,\(0,H\.jsxs\)\(Y\.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:\.7},className:\`hero-buttons\`,style:{animation:\`float-y-fast 6s ease-in-out infinite alternate\`},children:\[.*Get Started.*Our Story.*\]}\)/;
        hero = hero.replace(buttonPattern, '');
    } else if (s.includes('id:`about`')) {
        about = `(0,H.jsx)(\`section\`,{id:\`about\`,className:\`container\`,children:(0,H.jsxs)(\`div\`,{style:{textAlign:\`center\`,display:\`flex\`,flexDirection:\`column\`,alignItems:\`center\`,gap:\`4rem\`},children:[(0,H.jsxs)(Y.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},style:{maxWidth:\`900px\`},children:[(0,H.jsx)(\`span\`,{className:\`badge\`,children:\`Who We Are\`}),(0,H.jsx)(\`h2\`,{children:\`Helping Local Shops Go Digital & Grow Online\`}),(0,H.jsx)(\`p\`,{style:{margin:\`0 auto\`},children:\`ZyvraSites focuses on helping small local businesses like salons, bakeries, medical shops, and local stores build a strong online presence. We create simple and affordable websites, manage updates, and handle complete social media marketing.\`})]}),(0,H.jsxs)(\`div\`,{style:{display:\`flex\`,flexWrap:\`wrap\`,justifyContent:\`center\`,gap:\`2rem\`,width:\`100%\`},children:[(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:\`glass-card\`,style:{padding:\`2rem\`,flex:\`1 1 350px\`,maxWidth:\`500px\`},children:[(0,H.jsx)(\`div\`,{style:{color:\`var(--primary)\`,marginBottom:\`1rem\`},children:(0,H.jsx)(zp,{size:32})}),(0,H.jsx)(\`h3\`,{children:\`Mission\`}),(0,H.jsx)(\`p\`,{style:{fontSize:\`0.9rem\`},children:\`To help small businesses grow online by providing simple, affordable websites and consistent digital support.\`})]}),(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:\`glass-card\`,style:{padding:\`2rem\`,flex:\`1 1 350px\`,maxWidth:\`500px\`},children:[(0,H.jsx)(\`div\`,{style:{color:\`var(--primary)\`,marginBottom:\`1rem\`},children:(0,H.jsx)(Gp,{size:32})}),(0,H.jsx)(\`h3\`,{children:\`Vision\`}),(0,H.jsx)(\`p\`,{style:{fontSize:\`0.9rem\`},children:\`To make every local shop visible online and help them compete in the digital world.\`})]})]})]})})`;
    } else if (s.includes('id:`team`')) { team = s; }
    else if (s.includes('id:`services`')) { services = s; }
    else if (s.includes('id:`projects`')) { projects = s; }
    else if (s.includes('Simple Pricing for Every Business')) { pricing = s; }
    else if (s.includes('id:`contact`')) { contact = s; }
    else if (s.includes('© 2026')) { copyright = s; }
});

const orderList = [about, team, hero, projects, pricing, services, contact, copyright].filter(Boolean);
const newArrayContent = orderList.join(',');

const finalContent = content.substring(0, startOfArray) + newArrayContent + content.substring(endOfArray);

try {
    new vm.Script(finalContent);
    console.log("Syntax is valid!");
    fs.writeFileSync(filePath, finalContent);
    console.log("Written to file successfully.");
} catch (e) {
    console.log("SyntaxError:", e.message);
    const m = e.stack.match(/<anonymous>:(\d+):(\d+)/);
    if(m) {
        const lines = finalContent.split('\n');
        const l = parseInt(m[1]) - 1;
        const c = parseInt(m[2]) - 1;
        console.log("Error Context:");
        console.log(lines[l].substring(Math.max(0, c - 50), c + 50));
    }
}
