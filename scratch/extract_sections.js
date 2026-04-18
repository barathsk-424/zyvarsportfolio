const fs = require('fs');
const content = fs.readFileSync('c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js', 'utf8');

const target = "Who We Are";
const index = content.indexOf(target);

if (index !== -1) {
    console.log("Found 'Who We Are' context:");
    console.log(content.substring(index - 500, index + 5000));
} else {
    console.log("'Who We Are' not found");
}
