const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Final Emoji & Sync Correction
    const emojiMap = {
        'âš™ï¸ ': '⚙️',
        'ðŸ’»': '💻',
        'ðŸ—„ï¸ ': '📁',
        'ðŸ› ï¸ ': '🛠️',
        'ðŸ °': '🍰',
        'ðŸ” ': '🔍',
        'ðŸŒ ': '🌐',
        'ðŸ—‚ï¸ ': '📂',
        'â€“': '–',
        'â€”': '—',
        'Â©': '©',
        'ðŸ“§': '📧',
        'ðŸ“ž': '📞',
        'ðŸ“Œ': '📍',
        'âœ…': '✅',
        'ðŸš€': '🚀',
        'âœ¨': '✨',
        'ðŸ’¬': '💬'
    };
    
    for (const [key, value] of Object.entries(emojiMap)) {
        content = content.split(key).join(value);
    }
    
    // 2. Restore/Refine Navigation Links
    // I will use href:"#projects" but add a small hack if possible,
    // or just ensure they exist.
    // The previous restoration used i and a. I'll stick to that.
    const navStart = '(0,H.jsxs)(`div`,{className:`nav-links ${i?`mobile-open`:``}`,children:[';
    
    // Improved links with hrefs that should avoid router hijacking if possible,
    // or at least point to the right place. 
    // Using "/#" is a common way to go to root path + hash.
    const restoredLinks = [
        { name: 'About', href: '/#about' },
        { name: 'Team', href: '/#team' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Services', href: '/#services' }
    ].map(l => `(0,H.jsx)(\`a\`,{href:\`${l.href}\`,className:\`nav-link\`,onClick:()=>a(!1),children:\`${l.name}\`})`).join(',');
    
    // Check if my previous restoration is already there to avoid double nesting
    if (content.includes('className:`nav-link`,onClick:()=>a(!1),children:`About`')) {
        console.log("Nav links already restored, updating hrefs...");
        content = content.replace(/href:`\/#about`/g, 'href:`/#about`'); // Already good
    } else if (content.indexOf(navStart) !== -1) {
        content = content.replace(navStart, navStart + restoredLinks + ',');
        console.log("Restored Navigation Links (First time)");
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Final touchups completed on index.js");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
