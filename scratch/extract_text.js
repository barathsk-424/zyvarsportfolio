
const fs = require('fs');
const content = fs.readFileSync('assets/index-BApfYy1D.js', 'utf8');
const text = "We Build Websites for Businesses & Help Them Grow Online";
const index = content.indexOf(text);
if (index !== -1) {
    const start = Math.max(0, index - 200);
    const end = Math.min(content.length, index + 200);
    console.log(content.substring(start, end));
} else {
    console.log("NOT FOUND");
}
