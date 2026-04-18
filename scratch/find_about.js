const fs = require('fs');

const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
let content = fs.readFileSync(filePath, 'utf8');

const aboutStart = content.indexOf('id:`about`,className:`container`,children:(0,H.jsxs)(`div`,{style:{');
if (aboutStart !== -1) {
    const origAboutEnd = content.indexOf('})]})})', aboutStart) + 7;
    const origAbout = content.substring(aboutStart, origAboutEnd);
    console.log("Found about length:", origAbout.length);
    
    // Instead of completely rewriting, let's just use the known centered string.
    // I will write this into a replace script.
} else {
    console.log("Could NOT find about section");
}
