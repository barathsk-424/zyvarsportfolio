const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove Footer Logo
const logoStr = '(0,H.jsx)(`img`,{src:`./images/logo.png`,alt:`ZyvraSites`,style:{height:`95px`,width:`auto`,opacity:0.8}}),';
if (content.includes(logoStr)) {
    content = content.replace(logoStr, '');
    console.log("Logo replaced");
}

// 2. Remove Hero Buttons
const btnStartPattern = ',(0,H.jsxs)(Y.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.7},className:`hero-buttons`,';
const btnStartIdx = content.indexOf(btnStartPattern);
if (btnStartIdx !== -1) {
    const btnEndIdx = content.indexOf(']})', btnStartIdx) + 3;
    content = content.substring(0, btnStartIdx) + content.substring(btnEndIdx);
    console.log("Buttons replaced");
}

// 3. Center 'Who We Are'
const aboutStart = content.indexOf('id:`about`,className:`container`,children:(0,H.jsxs)(`div`,{style:{display:`grid`');
if (aboutStart !== -1) {
    const origAboutEnd = content.indexOf('})]})})', aboutStart) + 7;
    const origAbout = content.substring(aboutStart, origAboutEnd);
    
    // Validate we're picking the right bounds (should be ~1000 chars)
    if (origAbout.length > 500 && origAbout.length < 2000) {
        const newAbout = "id:`about`,className:`container`,children:(0,H.jsxs)(`div`,{style:{textAlign:`center`,display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`4rem`},children:[(0,H.jsxs)(Y.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:!0},style:{maxWidth:`900px`},children:[(0,H.jsx)(`span`,{className:`badge`,children:`Who We Are`}),(0,H.jsx)(`h2`,{children:`Helping Local Shops Go Digital & Grow Online`}),(0,H.jsx)(`p`,{style:{margin:`0 auto`},children:`ZyvraSites focuses on helping small local businesses like salons, bakeries, medical shops, and local stores build a strong online presence. We create simple and affordable websites, manage updates, and handle complete social media marketing.`})]}),(0,H.jsxs)(`div`,{style:{display:`flex`,flexWrap:`wrap`,justifyContent:`center`,gap:`2rem`,width:`100%`},children:[(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:`glass-card`,style:{padding:`2rem`,flex:`1 1 350px`,maxWidth:`500px`},children:[(0,H.jsx)(`div`,{style:{color:`var(--primary)`,marginBottom:`1rem`},children:(0,H.jsx)(zp,{size:32})}),(0,H.jsx)(`h3`,{children:`Mission`}),(0,H.jsx)(`p`,{style:{fontSize:`0.9rem`},children:`To help small businesses grow online by providing simple, affordable websites and consistent digital support.`})]}),(0,H.jsxs)(Y.div,{whileHover:{y:-5},className:`glass-card`,style:{padding:`2rem`,flex:`1 1 350px`,maxWidth:`500px`},children:[(0,H.jsx)(`div`,{style:{color:`var(--primary)`,marginBottom:`1rem`},children:(0,H.jsx)(Gp,{size:32})}),(0,H.jsx)(`h3`,{children:`Vision`}),(0,H.jsx)(`p`,{style:{fontSize:`0.9rem`},children:`To make every local shop visible online and help them compete in the digital world.`})]})]})]})})";
        content = content.replace(origAbout, newAbout);
        console.log("About replaced");
    }
}

try {
    const vm = require('vm');
    new vm.Script(content);
    fs.writeFileSync(filePath, content);
    console.log("Syntax is fully valid, saved bundle successfully!");
} catch(e) {
    console.log("Syntax Error during replacements!", e);
}
