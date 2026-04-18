const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix encoding issues
    content = content.replace(/â€“/g, '–');
    content = content.replace(/Â©/g, '©');
    
    // Resume links
    content = content.replace(/resumeUrl:"\/barath-resume\.pdf"/g, 'resumeUrl:"./images/barath-resume.pdf"');
    content = content.replace(/resumeUrl:"\/jeeva-bharathi\.pdf"/g, 'resumeUrl:"./images/jeeva-bharathi.pdf"');
    content = content.replace(/resumeUrl:"\/mokkesh\.pdf"/g, 'resumeUrl:"./images/mokkesh.pdf"');
    
    // Image paths
    content = content.replace(/image:"\/barath\.png"/g, 'image:"./barath.png"');
    content = content.replace(/image:"\/jeeva\.png"/g, 'image:"./jeeva.png"');
    content = content.replace(/image:"\/mokkesh\.svg"/g, 'image:"./mokkesh.svg"');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully patched index.js using Node.js");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
