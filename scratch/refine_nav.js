const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Locating the nav-links children
    const navLinksChildrenStart = `className:\`nav-links \${i?\`mobile-open\`:\`\`}\`,children:[`;
    const navLinksChildrenEnd = `]})]})},Qp=`;
    
    const startIdx = content.indexOf(navLinksChildrenStart);
    const endIdx = content.indexOf(navLinksChildrenEnd);
    
    if (startIdx !== -1 && endIdx !== -1) {
        // Theme Switcher code:
        const themeSwitcher = `(0,H.jsx)(\`div\`,{className:\`theme-switcher\`,children:[{id:\`purple\`,bg:\`#8B5CF6\`,icon:Lp},{id:\`blue\`,bg:\`#3B82F6\`,icon:Wp},{id:\`dark-blue\`,bg:\`#1E293B\`,icon:Mp}].map(e=>(0,H.jsx)(\`button\`,{onClick:()=>t(e.id),className:\`theme-btn\`,style:{background:e.bg},children:(0,H.jsx)(e.icon,{size:14,color:\`white\`})},e.id))})`;
        
        // Contact Button
        const contactBtn = `(0,H.jsx)(Qf,{to:\`/contact\`,className:\`btn btn-primary contact-btn\`,style:{borderRadius:\`100px\`},onClick:()=>a(!1),children:\`Contact\`})`;
        
        // ONLY Theme and Contact as requested
        const newChildren = [themeSwitcher, contactBtn].join(',');
        
        const before = content.slice(0, startIdx + navLinksChildrenStart.length);
        const after = content.slice(content.indexOf(']})]})},Qp=')); 
        
        content = before + newChildren + after;
        console.log("Updated Mobile Menu: Theme and Contact only");
    } else {
        console.warn("Failed to locate navigation children for update");
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully refined navigation");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
