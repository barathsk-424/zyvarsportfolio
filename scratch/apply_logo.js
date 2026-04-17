const fs = require('fs');
const content = fs.readFileSync('assets/index.js', 'utf8');

const target = 'children:`ZyvraSites`';
const replacement = 'children:(0,H.jsx)(`img`,{src:`./images/logo.png`,alt:`ZyvraSites`,style:{height:`50px`,width:`auto`,display:`block`}})';

if (content.indexOf(target) !== -1) {
    const newContent = content.replace(target, replacement);
    fs.writeFileSync('assets/index.js', newContent, 'utf8');
    console.log('Successfully replaced logo text with image.');
} else {
    console.log('Target string not found in index.js');
}
