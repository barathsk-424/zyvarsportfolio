const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');
let content = fs.readFileSync(filePath, 'utf8');

// Looking for the target string with backticks. 
// Use hex codes or something to avoid backtick confusion in the script if needed.
// Or just use the fact that I know the context.

const target = 'n=jd().pathname===`/`,r=e=>n?`#${e}`:`/#${e}`';
// In the minified file, backticks might be used.
// Let's try to find it using indexOf with a smaller chunk.

const searchPrefix = 'n=jd().pathname===';
const index = content.indexOf(searchPrefix);

if (index !== -1) {
    console.log("Found pathname usage at " + index);
    // Extract the whole function line to see exactly what it is
    const snippet = content.substring(index, index + 100);
    console.log("Snippet: " + snippet);
    
    // We want to replace:
    // n=jd().pathname==="/",r=e=>n?`#${e}`:`/#${e}`
    // or
    // n=jd().pathname===`/`,r=e=>n?`#${e}`:`/#${e}`
    
    // Let's try a very specific replacement that works regardless of the quotes around /
    const parts = [
        'n=jd().pathname==="/",r=e=>n?`#${e}`:`/#${e}`',
        'n=jd().pathname===`/`,r=e=>n?`#${e}`:`/#${e}`'
    ];
    
    let replaced = false;
    for (const p of parts) {
        if (content.indexOf(p) !== -1) {
            content = content.replace(p, 'n=jd().pathname==="/"||jd().pathname.includes("/zyvarsportfolio"),r=e=>n?`#${e}`:`./#${e}`');
            replaced = true;
            break;
        }
    }
    
    if (replaced) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Successfully patched!");
    } else {
        console.log("Could not find exact match for replacement.");
    }
} else {
    console.log("jd().pathname usage not found.");
}
