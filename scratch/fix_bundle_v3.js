const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Add name attributes to inputs
    // Full Name input
    content = content.replace(
        /children:`Full Name`\}\)\,\(0,H.jsx\)\(`input`,\{type:`text`,placeholder:`John Doe`,/,
        'children:`Full Name`}),(0,H.jsx)(`input`,{name:`name`,type:`text`,placeholder:`John Doe`,'
    );
    
    // Email Address input
    content = content.replace(
        /children:`Email Address`\}\)\,\(0,H.jsx\)\(`input`,\{type:`email`,placeholder:`john@example.com`,/,
        'children:`Email Address`}),(0,H.jsx)(`input`,{name:`email`,type:`email`,placeholder:`john@example.com`,'
    );
    
    // Message textarea
    content = content.replace(
        /children:`Message`\}\)\,\(0,H.jsx\)\(`textarea`,\{placeholder:`How can we help you\?`,/,
        'children:`Message`}),(0,H.jsx)(`textarea`,{name:`message`,placeholder:`How can we help you?`,'
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Successfully added name attributes to index.js contact form");
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
