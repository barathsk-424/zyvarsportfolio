const fs = require('fs');
const vm = require('vm');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
let content = fs.readFileSync(filePath, 'utf8');

const startStr = ',(0,H.jsxs)(Y.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.7},className:`hero-buttons`,';
const endStr = 'children:`Our Story`})]})';

const startIdx = content.indexOf(startStr);
if (startIdx !== -1) {
    const endIdx = content.indexOf(endStr, startIdx);
    
    if (endIdx !== -1) {
        const fullStringToRemove = content.substring(startIdx, endIdx + endStr.length);
        console.log("Found buttons block. Removing exact string length:", fullStringToRemove.length);
        
        // Remove it
        const newContent = content.replace(fullStringToRemove, '');
        
        try {
            // Verify syntax using vm.Script
            new vm.Script(newContent);
            fs.writeFileSync(filePath, newContent);
            console.log("Successfully removed the buttons and verified syntax!");
        } catch (e) {
            console.log("Syntax error after replacement! Removal aborted.", e);
        }
    } else {
        console.log("Error: Start string found, but end string not found.");
    }
} else {
    console.log("Error: Start string not found in index.js.");
}
