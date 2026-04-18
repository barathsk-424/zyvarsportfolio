const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

const target = '(0,H.jsx)(`img`,{src:`./images/logo.png`,alt:`ZyvraSites`,style:{height:`95px`,width:`auto`,opacity:0.8}}),';

if (content.includes(target)) {
    const newContent = content.replace(target, '');
    fs.writeFileSync(filePath, newContent);
    console.log("Successfully removed the image at the end.");
} else {
    console.log("Target string not found. Please check the content.");
    // Try to find a slightly different version (maybe quotes are different)
    const partial = 'alt:`ZyvraSites`,style:{height:`95px`,width:`auto`,opacity:0.8}';
    if (content.includes(partial)) {
        console.log("Found partial match. Content might have different spacing or quotes.");
    }
}
