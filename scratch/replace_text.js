const fs = require('fs');
const filePath = 'assets/index.js';
let content = fs.readFileSync(filePath, 'utf8');

// The file actually has an em-dash or similar long dash
const target = "We create simple, professional websites for small shops and manage everything — from website updates to social media marketing.";
const replacement = "We craft clean, professional websites and manage every aspect — from ongoing updates to strategic social media marketing.";

if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(filePath, content);
    console.log("Replacement successful");
} else {
    console.log("Target not found");
}
