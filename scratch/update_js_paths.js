
const fs = require('fs');
let content = fs.readFileSync('assets/index.js', 'utf8');
// Replace ./assets/ with ./images/ for all media files
// Note: We need to be careful not to break legitimate assets folder references if any.
// But in this flattened structure, all media moved to images/.
content = content.split('./assets/').join('./images/');
fs.writeFileSync('assets/index.js', content);
console.log('Successfully updated assets path in index.js');
