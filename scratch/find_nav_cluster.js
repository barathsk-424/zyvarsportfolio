const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');

try {
    const content = fs.readFileSync(filePath, 'utf8');
    const searchTerms = ['Home', 'About', 'Services', 'Projects', 'Team', 'Contact'];
    
    // Find where at least 4 of these terms appear within 1000 characters of each other
    for (let i = 0; i < content.length - 1000; i += 100) {
        const chunk = content.substring(i, i + 1000);
        const count = searchTerms.filter(term => chunk.includes(term)).length;
        if (count >= 4) {
            console.log('--- Cluster found at index ' + i + ' (count: ' + count + ') ---');
            console.log(chunk);
            // Jump ahead to avoid multiple prints of same cluster
            i += 1000;
        }
    }
} catch (err) {
    console.error(err);
}
