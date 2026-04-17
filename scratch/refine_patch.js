const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
let content = fs.readFileSync(filePath, 'utf8');

const target = 'let n=jd().pathname==="/"||jd().pathname.includes("/zyvarsportfolio")';
const replacement = 'let n=jd().pathname==="/"||jd().pathname==="/zyvarsportfolio/"||jd().pathname==="/zyvarsportfolio"';

if (content.includes(target)) {
    content = content.replace(target, replacement);
    // Also ensure the r function uses ./# for subpath case if n is false
    // Wait, let's check the r function again
    const rTarget = 'r=e=>n?`#${e}`:`./#${e}`';
    // This is what I replaced it with in the previous turn. 
    // If n is FALSE (we are on a subpage like team member details), 
    // then . / # about becomes ./#about.
    // If the current page is /zyvarsportfolio/team/barath-s, 
    // then ./#about is STILL on the same member page.
    
    // To go back to the app root from /zyvarsportfolio/team/barath-s:
    // We should use /zyvarsportfolio/#${e}
    
    content = content.replace(rTarget, 'r=e=>n?`#${e}`:`/zyvarsportfolio/#${e}`');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated patch for better subpage handling.");
} else {
    console.log("Target not found. Already patched or wrong string.");
}
