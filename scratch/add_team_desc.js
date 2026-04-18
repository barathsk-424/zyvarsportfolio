const fs = require('fs');
const vm = require('vm');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
let content = fs.readFileSync(filePath, 'utf8');

// Current card ending: name then role, then closes
const oldCardEnd = "(0,H.jsx)(`h3`,{style:{color:`var(--text-main)`,marginBottom:`0.25rem`},children:t}),(0,H.jsx)(`p`,{style:{color:`var(--primary)`,fontSize:`0.9rem`,marginBottom:`0.5rem`,fontWeight:600},children:n})";

// New card ending: name, role, THEN a 3-line about description
const newCardEnd = "(0,H.jsx)(`h3`,{style:{color:`var(--text-main)`,marginBottom:`0.25rem`},children:t}),(0,H.jsx)(`p`,{style:{color:`var(--primary)`,fontSize:`0.9rem`,marginBottom:`0.5rem`,fontWeight:600},children:n}),(0,H.jsx)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.8rem`,lineHeight:`1.5`,overflow:`hidden`,display:`-webkit-box`,WebkitLineClamp:3,WebkitBoxOrient:`vertical`,textOverflow:`ellipsis`,marginTop:`0.25rem`,padding:`0 0.25rem`},children:r})";

if (content.includes(oldCardEnd)) {
    content = content.replace(oldCardEnd, newCardEnd);
    
    try {
        new vm.Script(content);
        fs.writeFileSync(filePath, content);
        console.log("Successfully added 3-line about description below team member names!");
    } catch(e) {
        console.log("Syntax Error:", e.message);
    }
} else {
    console.log("Could not find team card pattern to modify");
}
