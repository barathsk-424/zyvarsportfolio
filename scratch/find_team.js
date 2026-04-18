const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

// Find the team data array
const teamDataStart = content.indexOf('Xp=[{');
if (teamDataStart !== -1) {
    // Find the end of the array
    let bracketCount = 1;
    let end = teamDataStart + 4; // after '[{'
    for (let i = end; i < content.length; i++) {
        if (content[i] === '[') bracketCount++;
        else if (content[i] === ']') bracketCount--;
        if (bracketCount === 0) { end = i + 1; break; }
    }
    console.log("Team data:");
    console.log(content.substring(teamDataStart, end));
} else {
    console.log("Could not find team data");
}

// Find the team card component ($p)
const cardStart = content.indexOf('$p=({');
if (cardStart !== -1) {
    let parenCount = 1;
    let end = cardStart + 4;
    for (let i = end; i < content.length; i++) {
        if (content[i] === '(') parenCount++;
        else if (content[i] === ')') parenCount--;
        if (parenCount === 0) { end = i + 1; break; }
    }
    // Go a bit further to capture the full component
    console.log("\nTeam card component:");
    console.log(content.substring(cardStart, end));
} else {
    console.log("Could not find team card component");
}
