const fs = require('fs');
const vm = require('vm');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
let content = fs.readFileSync(filePath, 'utf8');

let successCount = 0;

// 1. Remove Footer Logo
const logoPattern = '(0,H.jsx)(`img`,{src:`./images/logo.png`,alt:`ZyvraSites`,style:{height:`95px`,width:`auto`,opacity:0.8}}),';
if (content.includes(logoPattern)) {
    content = content.replace(logoPattern, '');
    successCount++;
    console.log("Logo replaced");
}

// 2. Remove Hero Buttons
const btnPattern = ',(0,H.jsxs)(Y.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.7},className:`hero-buttons`,style:{animation:`float-y-fast 6s ease-in-out infinite alternate`},children:[(0,H.jsx)(`button`,{className:`btn btn-primary glow-on-hover`,style:{padding:`1rem 2.5rem`},children:`Get Started`}),(0,H.jsx)(Qf,{to:`#about`,className:`btn btn-outline`,style:{padding:`1rem 2.5rem`},children:`Our Story`})]}),';
if (content.includes(btnPattern)) {
    content = content.replace(btnPattern, ',');
    successCount++;
    console.log("Buttons replaced safely");
}

// 3. Center 'Who We Are' (About)
// Using precise substring replacing
const origAboutStart = content.indexOf('id:`about`,className:`container`,children:(0,H.jsxs)(`div`,{style:{display:`grid`');
if (origAboutStart !== -1) {
    const origAboutEnd = content.indexOf('})]})})', origAboutStart) + 7;
    const origAbout = content.substring(origAboutStart, origAboutEnd);
    
    const newAbout = \`id:\`about\`,className:\`container\`,children:(0,H.jsxs)(\`div\`,{style:{textAlign:\`center\`,display:\`flex\`,flexDirection:\`column\`,alignItems:\`center\`,gap:\`4rem\`},children:[(0,H.jsxs)(Y.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},style:{maxWidth:\`900px\`},children:[(0,H.jsx)(\`span\`,{className:\`badge\`,children:\`Who We Are\`}),(0,H.jsx)(\`h2\`,{children:\`Helping Local Shops Go Digital & Grow Online\`}),(0,H.jsx)(\`p\`,{style:{margin:\`0 auto\`},children:\`ZyvraSites focuses on helping small local businesses like salons, bakeries, medical shops, and local stores build a strong online presence. We create simple and affordable websites, manage updates, and handle complete social media marketing.\`})]}),(0,H.jsxs)(\`div\`,{style:{display:\`flex\`,flexWrap:\`wrap\`,justifyContent:\`center\`,gap:\`2rem\`,width:\`100%\`},children:[(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:\`glass-card\`,style:{padding:\`2rem\`,flex:\`1 1 350px\`,maxWidth:\`500px\`},children:[(0,H.jsx)(\`div\`,{style:{color:\`var(--primary)\`,marginBottom:\`1rem\`},children:(0,H.jsx)(zp,{size:32})}),(0,H.jsx)(\`h3\`,{children:\`Mission\`}),(0,H.jsx)(\`p\`,{style:{fontSize:\`0.9rem\`},children:\`To help small businesses grow online by providing simple, affordable websites and consistent digital support.\`})]}),(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:\`glass-card\`,style:{padding:\`2rem\`,flex:\`1 1 350px\`,maxWidth:\`500px\`},children:[(0,H.jsx)(\`div\`,{style:{color:\`var(--primary)\`,marginBottom:\`1rem\`},children:(0,H.jsx)(Gp,{size:32})}),(0,H.jsx)(\`h3\`,{children:\`Vision\`}),(0,H.jsx)(\`p\`,{style:{fontSize:\`0.9rem\`},children:\`To make every local shop visible online and help them compete in the digital world.\`})]})]})]})\`;
    
    content = content.replace(origAbout, newAbout);
    successCount++;
    console.log("About replaced");
} else {
    console.log("Could not find about section");
}

try {
    new vm.Script(content);
    console.log("Syntax perfectly valid!");
    if (successCount > 0) {
        fs.writeFileSync(filePath, content);
        console.log("Written " + successCount + " cosmetic fixes to file.");
    }
} catch (e) {
    console.log("Syntax error in cosmetic replacements:", e.message);
}
