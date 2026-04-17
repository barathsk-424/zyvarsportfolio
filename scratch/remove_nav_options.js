const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
let content = fs.readFileSync(filePath, 'utf8');

const target = '[`about`,`services`,`projects`,`team`].map(e=>(0,H.jsx)(`a`,{href:r(e),className:`nav-link`,style:{textTransform:`capitalize`},onClick:()=>a(!1),children:e},e)),';

if (content.includes(target)) {
    console.log("Found nav menu map. Removing...");
    content = content.replace(target, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully removed navigation options.");
} else {
    console.log("Target not found. Check if already removed or structure changed.");
}
