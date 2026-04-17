const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'assets', 'index.js');
const content = fs.readFileSync(filePath, 'utf8');

const regex = /\["about","services","projects","team"\]/;
const match = content.match(regex);
if (match) {
    console.log("Found IDs at " + match.index);
    console.log(content.substring(match.index, match.index + 500));
} else {
    console.log("Not found");
    // Try single quotes
    if (content.match(/\['about','services','projects','team'\]/)) {
        console.log("Found with single quotes");
    }
}
