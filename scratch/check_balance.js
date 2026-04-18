const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/scratch/test_build.js';
const content = fs.readFileSync(filePath, 'utf8');

const orderList = [{name: 'full file', s: content}];

orderList.forEach((item) => {
    let p = 0; let b = 0; let c = 0;
    for(let i=0; i<item.s.length; i++) {
        if (item.s[i] === '(') p++;
        if (item.s[i] === ')') p--;
        if (item.s[i] === '[') b++;
        if (item.s[i] === ']') b--;
        if (item.s[i] === '{') c++;
        if (item.s[i] === '}') c--;
    }
    console.log(`${item.name} -> parens: ${p}, brackets: ${b}, curlies: ${c}`);
});
