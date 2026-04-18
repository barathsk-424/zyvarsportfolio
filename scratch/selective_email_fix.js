const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Footer Email Update
    // Targeted replacement for the "Let's Build Your Future" section
    const footerEmailOld = 'children:`skbarath424@gmail.com`})]})]}),(0,H.jsxs)(`a`,{href:`tel:+916374618833`';
    const footerEmailNew = 'children:`zyvrasites@gmail.com`})]})]}),(0,H.jsxs)(`a`,{href:`tel:+916374618833`';
    
    if (content.indexOf(footerEmailOld) !== -1) {
        content = content.replace(footerEmailOld, footerEmailNew);
        console.log("Updated Footer Email to zyvrasites@gmail.com");
    } else {
        // Fallback more general footer match
        const footerMatch = /children:`skbarath424@gmail\.com`\}\)\]\}\)\]\}\)\,\(0,H\.jsxs\)\(`a`,\{href:`tel:\+916374618833`/g;
        if (footerMatch.test(content)) {
             content = content.replace(footerMatch, 'children:`zyvrasites@gmail.com`})]})]}),(0,H.jsxs)(`a`,{href:`tel:+916374618833`');
             console.log("Updated Footer Email via regex");
        } else {
             console.warn("Could not find Footer email pattern");
        }
    }
    
    // 2. Barath Email Update (Make sure it stays skbarath424)
    // It's already skbarath424, but let's confirm the data array
    // Xp=[{id:`barath-s`,...,email:`skbarath424@gmail.com`
    
    // 3. Definitive Emoji Fix (using more patterns)
    const emojiFixes = [
        { from: /âš™ï¸ /g, to: '⚙️' },
        { from: /ðŸ—„ï¸ /g, to: '📁' },
        { from: /ðŸ› ï¸ /g, to: '🛠️' },
        { from: /ðŸ¤–/g, to: '🤖' },
        { from: /ðŸ“š/g, to: '📚' },
        { from: /ðŸŽ“/g, to: '🎓' },
        { from: /ðŸ—‚ï¸ /g, to: '📂' },
        { from: /ðŸ °/g, to: '🍰' },
        { from: /ðŸ” /g, to: '🔍' },
        { from: /ðŸŒ /g, to: '🌐' }
    ];
    
    emojiFixes.forEach(f => {
        content = content.replace(f.from, f.to);
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Applied selective email fix and remaining emoji corrections");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
