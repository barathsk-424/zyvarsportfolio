const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Locate the nav-links children
    const navLinksChildrenStart = `className:\`nav-links \${i?\`mobile-open\`:\`\`}\`,children:[`;
    const navLinksChildrenEnd = `]})]})},Qp=`;
    
    const startIdx = content.indexOf(navLinksChildrenStart);
    
    if (startIdx !== -1) {
        // Just the Theme Switcher and Contact Button components
        // We reuse the variable names H, t, Lp, Wp, Mp, Qf, a, i from the scope
        const themeSwitcher = `(0,H.jsx)(\`div\`,{className:\`theme-switcher\`,children:[{id:\`purple\`,bg:\`#8B5CF6\`,icon:Lp},{id:\`blue\`,bg:\`#3B82F6\`,icon:Wp},{id:\`dark-blue\`,bg:\`#1E293B\`,icon:Mp}].map(e=>(0,H.jsx)(\`button\`,{onClick:()=>t(e.id),className:\`theme-btn\`,style:{background:e.bg},children:(0,H.jsx)(e.icon,{size:14,color:\`white\`})},e.id))})`;
        const contactBtn = `(0,H.jsx)(Qf,{to:\`/contact\`,className:\`btn btn-primary contact-btn\`,style:{borderRadius:\`100px\`},onClick:()=>a(!1),children:\`Contact\`})`;
        
        const newChildren = [themeSwitcher, contactBtn].join(',');
        
        const before = content.slice(0, startIdx + navLinksChildrenStart.length);
        const after = content.slice(content.indexOf(']})]})},Qp='));
        
        content = before + newChildren + after;
        console.log("Updated Navbar to only show Theme and Contact in mobile menu");
    } else {
        console.warn("Could not find nav-links for update");
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully fixed mobile menu content");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
