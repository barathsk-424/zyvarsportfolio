const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'assets', 'index.js');
let content = fs.readFileSync(filePath, 'utf8');

// The original code:
// Zp=({currentTheme:e,setTheme:t})=>{let n=jd().pathname==="/",r=e=>n?`#${e}`:`/#${e}`,[i,a]=(0,b.useState)(!1);
// Wait, the output I saw used backticks for / as well? No, it was pathname==="/", or similar.

// Let's use a regex to be safe
const original = /Zp=\(({currentTheme:e,setTheme:t})\)=>{let n=jd\(\)\.pathname==="/",r=e=>n\?`#\${e}`:`\/#\${e}`,/;
const replacement = 'Zp=({currentTheme:e,setTheme:t})=>{let n=jd().pathname==="/"||jd().pathname.includes("/zyvarsportfolio"),r=e=>n?`#${e}`:`./#${e}`,';

if (content.match(original)) {
    console.log("Match found! Replacing...");
    content = content.replace(original, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Success.");
} else {
    // Try another variation if the first didn't match (e.g. single quotes or different slashes)
    console.log("First regex failed, trying escaped variation...");
    const altOriginal = /Zp=\(({currentTheme:e,setTheme:t})\)=>{let n=jd\(\)\.pathname===`\/`,r=e=>n\?`#\${e}`:`\/#\${e}`,/;
    if (content.match(altOriginal)) {
        console.log("Alt match found! Replacing...");
        content = content.replace(altOriginal, replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Success.");
    } else {
        console.log("No match found in JS file.");
        // Print a snippet around where we expect it to be to help debug
        const index = content.indexOf('jd().pathname');
        if (index !== -1) {
            console.log("Context around jd().pathname:");
            console.log(content.substring(index - 50, index + 200));
        }
    }
}
