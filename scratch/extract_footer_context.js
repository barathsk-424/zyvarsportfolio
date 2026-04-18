const fs = require('fs');
const content = fs.readFileSync('c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js', 'utf8');

const target = "Let's Build Your Future";
const index = content.indexOf(target);

if (index !== -1) {
    console.log(content.substring(index - 500, index + 3000));
} else {
    console.log("Not found");
}
