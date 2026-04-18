const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Remove the restored links
    const linksPattern = /,\(0,H.jsx\)\(`a`,\{href:`\/#about`,className:`nav-link`,onClick:\(\)=>a\(!1\),children:`About`\}\),\(0,H.jsx\)\(`a`,\{href:`\/#team`,className:`nav-link`,onClick:\(\)=>a\(!1\),children:`Team`\}\),\(0,H.jsx\)\(`a`,\{href:`\/#projects`,className:`nav-link`,onClick:\(\)=>a\(!1\),children:`Projects`\}\),\(0,H.jsx\)\(`a`,\{href:`\/#services`,className:`nav-link`,onClick:\(\)=>a\(!1\),children:`Services`\}\)/;
    
    // 2. Insert Mobile-only Logo and ensure order
    // Order: Theme, Logo, Contact (as per user request "display Theme, Logo, and Contact options")
    // Wait, the user said "In the mobile view... display Theme, Logo, and Contact options".
    // I'll put them in that order inside the dropdown.
    
    const themeSwitcherPattern = /\(0,H.jsx\)\(`div`,\{className:`theme-switcher`,children:\[\{id:`purple`,bg:`#8B5CF6`,icon:Lp\},\{id:`blue`,bg:`#3B82F6`,icon:Wp\},\{id:`dark-blue`,bg:`#1E293B`,icon:Mp\}\]\.map\(e=>\(0,H.jsx\)\(e.icon,\{size:14,color:`white`\}\),e\.id\)\)\}\)/;
    // Wait, I missed the map part or the icons. 
    // Let's use a simpler target.
    
    // Original structure inside children:[]:
    // [About, Team, Projects, Services, ThemeSwitcher, ContactButton]
    
    // New structure:
    // [ThemeSwitcher, MobileLogo, ContactButton]
    
    // Locating the whole children array of nav-links
    const navLinksChildrenStart = `className:\`nav-links \${i?\`mobile-open\`:\`\`}\`,children:[`;
    const navLinksChildrenEnd = `]})]})},Qp=`;
    
    const startIdx = content.indexOf(navLinksChildrenStart);
    const endIdx = content.indexOf(navLinksChildrenEnd);
    
    if (startIdx !== -1 && endIdx !== -1) {
        // Extract symbols to keep (ThemeSwitcher and ContactButton)
        // I'll just reconstruct the content.
        
        // I need the Qf, H, t, a, i, Lp, Wp, Mp variables from the scope.
        // Theme Switcher code:
        const themeSwitcher = `(0,H.jsx)(\`div\`,{className:\`theme-switcher\`,children:[{id:\`purple\`,bg:\`#8B5CF6\`,icon:Lp},{id:\`blue\`,bg:\`#3B82F6\`,icon:Wp},{id:\`dark-blue\`,bg:\`#1E293B\`,icon:Mp}].map(e=>(0,H.jsx)(\`button\`,{onClick:()=>t(e.id),className:\`theme-btn\`,style:{background:e.bg},children:(0,H.jsx)(e.icon,{size:14,color:\`white\`})},e.id))})`;
        
        // Mobile Logo (displayed only on mobile)
        const mobileLogo = `(0,H.jsx)(Qf,{to:\`/\`,onClick:()=>a(!1),className:\`mobile-only-logo\`,style:{display:i?\`block\`:\`none\`,textAlign:\`center\`,marginBottom:\`1rem\`},children:(0,H.jsx)(\`img\`,{src:\`./images/logo.png\`,alt:\`ZyvraSites\`,style:{height:\`45px\`,width:\`auto\`}})})`;
        
        // Contact Button
        const contactBtn = `(0,H.jsx)(Qf,{to:\`/contact\`,className:\`btn btn-primary contact-btn\`,style:{borderRadius:\`100px\`},onClick:()=>a(!1),children:\`Contact\`})`;
        
        const newChildren = [themeSwitcher, mobileLogo, contactBtn].join(',');
        
        const before = content.slice(0, startIdx + navLinksChildrenStart.length);
        const after = content.slice(content.indexOf(']})]})},Qp=')); // Using the Qp as anchor
        
        content = before + newChildren + after;
        console.log("Reconstructed Navbar Links (Simplified)");
    } else {
        console.warn("Failed to locate navigation children for cleanup");
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully removed navigation links and updated mobile menu");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
