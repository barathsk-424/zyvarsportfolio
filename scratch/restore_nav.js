const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Restoration of Nav Links
    const navStart = '(0,H.jsxs)(`div`,{className:`nav-links ${i?`mobile-open`:``}`,children:[';
    
    // Construct the 4 links
    const links = [
        { name: 'About', href: '/#about' },
        { name: 'Team', href: '/#team' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Services', href: '/#services' }
    ].map(l => `(0,H.jsx)(\`a\`,{href:\`${l.href}\`,className:\`nav-link\`,onClick:()=>a(!1),children:\`${l.name}\`})`).join(',');
    
    const replacement = navStart + links + ',';
    
    if (content.indexOf(navStart) !== -1) {
        content = content.replace(navStart, replacement);
        console.log("Restored Navigation Links");
    } else {
        console.warn("Could not find navStart for restoration");
    }
    
    // Fix emojis properly using split/join to avoid regex issues
    const emojiMap = {
        'âš™ï¸ ': '⚙️',
        'ðŸ’»': '💻',
        'ðŸ—„ï¸ ': '📁',
        'ðŸ› ï¸ ': '🛠️',
        'ðŸ °': '🍰',
        'ðŸ” ': '🔍',
        'ðŸŒ ': '🌐',
        'â€“': '–',
        'Â©': '©'
    };
    
    for (const [key, value] of Object.entries(emojiMap)) {
        content = content.split(key).join(value);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Applied Nav Restoration and Emoji Fix");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
