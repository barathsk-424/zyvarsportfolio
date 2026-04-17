const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
let content = fs.readFileSync(filePath, 'utf8');

// Target the logo link rendering
// Previously saw: (0,H.jsx)(`a`,{href:`/`,className:`logo`,onClick:e=>{e.preventDefault(),window.location.href=`./`,window.location.reload()},style:{fontWeight:800,fontSize:`1.4rem`,color:`var(--primary)`,textDecoration:`none`,letterSpacing:`-1px`,zIndex:1001},children:`ZyvraSites`})
// Note: My previous patch changed href to something? No, I only changed n and r.

const logoSearch = /children:`ZyvraSites`}/;
const logoReplacement = 'children:(0,H.jsx)(`img`,{src:`.c:\Users\sk barath\Downloads\logo.png`,alt:`ZyvraSites`,style:{height:`45px`,width:`auto`,display:`block`}})';

if (content.indexOf('children:`ZyvraSites`') !== -1) {
    console.log("Found logo text. Replacing with image...");
    content = content.replace('children:`ZyvraSites`', logoReplacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully updated logo.");
} else {
    console.log("Logo text not found. Check if already changed or wrong pattern.");
}
