const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

const targetSub = 'className:`hero-buttons`,style:{animation:`float-y-fast 6s ease-in-out infinite alternate`';
const fullTargetPattern = /,\(0,H\.jsxs\)\(Y\.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:\.7},className:`hero-buttons`,style:{animation:`float-y-fast 6s ease-in-out infinite alternate`},children:\[\(0,H\.jsxs\)\(Y\.a,{href:`#services`,className:`btn btn-primary`,whileHover:{scale:1\.05,y:-5},whileTap:{scale:\.95},style:{padding:`1rem 2rem`},children:\[`Get Started `,\(0,H\.jsx\)\(Op,{size:22}\)\]}\),\(0,H\.jsx\)\(Y\.a,{href:`#about`,className:`btn`,whileHover:{background:`rgba\(255,255,255,0\.05\)`,y:-5},style:{border:`1px solid var\(--glass-border\)`,color:`var\(--text-main\)`,background:`var\(--glass\)`,backdropFilter:`blur\(10px\)`,padding:`1rem 2rem`},children:`Our Story`}\)\]}\)/;

if (content.match(fullTargetPattern)) {
    const newContent = content.replace(fullTargetPattern, '');
    fs.writeFileSync(filePath, newContent);
    console.log("Successfully removed the buttons.");
} else {
    console.log("Full pattern not matched. Trying simpler string replacement.");
    // Fallback to literal search since regex might have slight mismatches due to escaped characters
    const start = content.indexOf(',(0,H.jsxs)(Y.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.7},className:`hero-buttons`');
    if (start !== -1) {
        // Find the matching end brace for this div
        // Since we know the structure, we can just find the end based on the unique children content
        const end = content.indexOf('children:`Our Story`})]})', start) + 'children:`Our Story`})]})'.length;
        const potentialMatch = content.substring(start, end);
        console.log("Found range:", potentialMatch);
        const newContent = content.substring(0, start) + content.substring(end);
        fs.writeFileSync(filePath, newContent);
        console.log("Removed via range match.");
    } else {
        console.log("Could not find start point.");
    }
}
