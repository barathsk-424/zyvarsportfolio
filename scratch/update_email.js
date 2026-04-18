const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Global replacement of the email
    const oldEmail = 'zyvrasites@gmail.com';
    const newEmail = 'skbarath424@gmail.com';
    
    // Check occurrences
    const count = content.split(oldEmail).length - 1;
    content = content.split(oldEmail).join(newEmail);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Successfully replaced ${count} occurrences of ${oldEmail} with ${newEmail}`);
} catch (err) {
    console.error("Error:", err);
    process.exit(1);
}
