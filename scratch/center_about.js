const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

// The original about section structure
const target = '(0,H.jsx)(`section`,{id:`about`,className:`container`,children:(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(300px, 1fr))`,gap:`4rem`,alignItems:`center`';

if (content.indexOf(target) === -1) {
    console.log("Could not find about section");
    process.exit(1);
}

// We'll replace the entire section.
// This is delicate because it's a minified file. I'll use a larger block and structured replacement.
const start = content.indexOf('(0,H.jsx)(`section`,{id:`about`,className:`container`,children:(0,H.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit, minmax(300px, 1fr))`,gap:`4rem`,alignItems:`center`}');
// Find the end of this section call.
// It ends where the next section starts or where the children array elements end.
// Next section usually starts with ,(0,H.
const end = content.indexOf(',(0,H.jsxs)(`section`,{id:`services`', start);

if (end === -1) {
    console.log("Could not find end of about section");
    process.exit(1);
}

const originalSection = content.substring(start, end);
console.log("Found original section length:", originalSection.length);

// New centered structure:
const newSection = `(0,H.jsx)(\`section\`,{id:\`about\`,className:\`container\`,children:(0,H.jsxs)(\`div\`,{style:{textAlign:\`center\`,display:\`flex\`,flexDirection:\`column\`,alignItems:\`center\`,gap:\`4rem\`},children:[(0,H.jsxs)(Y.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},style:{maxWidth:\`900px\`},children:[(0,H.jsx)(\`span\`,{className:\`badge\`,children:\`Who We Are\`}),(0,H.jsx)(\`h2\`,{children:\`Helping Local Shops Go Digital & Grow Online\`}),(0,H.jsx)(\`p\`,{style:{margin:\`0 auto\`},children:\`ZyvraSites focuses on helping small local businesses like salons, bakeries, medical shops, and local stores build a strong online presence. We create simple and affordable websites, manage updates, and handle complete social media marketing.\`})]}),(0,H.jsxs)(\`div\`,{style:{display:\`flex\`,flexWrap:\`wrap\`,justifyContent:\`center\`,gap:\`2rem\`,width:\`100%\`},children:[(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:\`glass-card\`,style:{padding:\`2rem\`,flex:\`1 1 350px\`,maxWidth:\`500px\`},children:[(0,H.jsx)(\`div\`,{style:{color:\`var(--primary)\`,marginBottom:\`1rem\`},children:(0,H.jsx)(zp,{size:32})}),(0,H.jsx)(\`h3\`,{children:\`Mission\`}),(0,H.jsx)(\`p\`,{style:{fontSize:\`0.9rem\`},children:\`To help small businesses grow online by providing simple, affordable websites and consistent digital support.\`})]}),(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:\`glass-card\`,style:{padding:\`2rem\`,flex:\`1 1 350px\`,maxWidth:\`500px\`},children:[(0,H.jsx)(\`div\`,{style:{color:\`var(--primary)\`,marginBottom:\`1rem\`},children:(0,H.jsx)(Gp,{size:32})}),(0,H.jsx)(\`h3\`,{children:\`Vision\`}),(0,H.jsx)(\`p\`,{style:{fontSize:\`0.9rem\`},children:\`To make every local shop visible online and help them compete in the digital world.\`})]})]})]})})`;

const newFileContent = content.substring(0, start) + newSection + content.substring(end);
fs.writeFileSync(filePath, newFileContent);
console.log("Successfully centered the 'Who We Are' section.");
