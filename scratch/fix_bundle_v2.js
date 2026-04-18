const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Fix Encoding & Symbols
    const replacements = [
        { from: /â€“/g, to: '–' },
        { from: /â€”/g, to: '—' },
        { from: /Â©/g, to: '©' },
        { from: /ðŸ’»/g, to: '💻' },
        { from: /âš™ï¸ /g, to: '⚙️' },
        { from: /ðŸ—„ï¸ /g, to: '📁' },
        { from: /ðŸ› ï¸ /g, to: '🛠️' },
        { from: /ðŸ“§/g, to: '📧' },
        { from: /ðŸ“ž/g, to: '📞' },
        { from: /ðŸ“Œ/g, to: '📍' },
        { from: /âœ…/g, to: '✅' },
        { from: /ðŸš€/g, to: '🚀' },
    ];
    
    replacements.forEach(r => {
        content = content.replace(r.from, r.to);
    });
    
    // 2. Fix Routes/Links
    // If #projects is broken, let's find it. 
    // It's likely in a nav array or component.
    // Changing href:"#projects" to href:"/#projects" (relative to root)
    content = content.replace(/href:`#projects`/g, 'href:`/#projects`');
    content = content.replace(/href:`#team`/g, 'href:`/#team`');
    content = content.replace(/href:`#about`/g, 'href:`/#about`');
    content = content.replace(/href:`#services`/g, 'href:`/#services`');
    
    // 3. Inject EmailJS hook into the Contact Form
    // Original: onSubmit:e=>{e.preventDefault(),alert(`Thank you for your message! We will get back to you soon.`)}
    const oldSubmit = 'onSubmit:e=>{e.preventDefault(),alert(`Thank you for your message! We will get back to you soon.`)}';
    const newSubmit = 'onSubmit:e=>{e.preventDefault(),window.emailjsSendForm(e.target)}';
    
    if (content.indexOf(oldSubmit) !== -1) {
        content = content.replace(oldSubmit, newSubmit);
        console.log("Patched Contact Form onSubmit");
    } else {
        console.warn("Could not find exact onSubmit string for patching");
    }
    
    // 4. Fix Resume and Image paths (again, to be sure)
    content = content.replace(/resumeUrl:"\/([^"]+\.pdf)"/g, 'resumeUrl:"./images/$1"');
    content = content.replace(/image:"\/barath\.png"/g, 'image:"./barath.png"');
    content = content.replace(/image:"\/jeeva\.png"/g, 'image:"./jeeva.png"');
    content = content.replace(/image:"\/mokkesh\.svg"/g, 'image:"./mokkesh.svg"');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully applied all patches to index.js");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
