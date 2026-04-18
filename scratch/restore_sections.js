const fs = require('fs');
const filePath = 'c:/Users/sk barath/OneDrive/Desktop/zyvarsportfolio/assets/index.js';
const content = fs.readFileSync(filePath, 'utf8');

const heroCode = `(0,H.jsxs)(\`section\`,{className:\`hero\`,children:[(0,H.jsxs)(\`div\`,{className:\`floating-layer\`,children:[(0,H.jsx)(Y.div,{animate:{x:[0,50,0],y:[0,-30,0]},transition:{duration:15,repeat:1/0,ease:\`easeInOut\`},className:\`glow-accent\`,style:{top:\`10%\`,left:\`15%\`,background:\`var(--primary-light)\`,width:\`300px\`,height:\`300px\`}}),(0,H.jsx)(Y.div,{animate:{x:[0,-50,0],y:[0,40,0]},transition:{duration:12,repeat:1/0,ease:\`easeInOut\`,delay:2},className:\`glow-accent\`,style:{bottom:\`20%\`,right:\`10%\`,width:\`400px\`,height:\`400px\`}}),(0,H.jsx)(Y.div,{animate:{y:[-20,20,-20],rotate:[0,10,0]},transition:{duration:7,repeat:1/0,ease:\`easeInOut\`},style:{position:\`absolute\`,top:\`25%\`,right:\`20%\`,color:\`var(--primary)\`,opacity:.1},children:(0,H.jsx)(Pp,{size:120})}),(0,H.jsx)(Y.div,{animate:{y:[20,-20,20],rotate:[0,-15,0]},transition:{duration:9,repeat:1/0,ease:\`easeInOut\`,delay:1},style:{position:\`absolute\`,bottom:\`30%\`,left:\`15%\`,color:\`var(--primary-light)\`,opacity:.08},children:(0,H.jsx)(zp,{size:100})}),(0,H.jsx)(Y.div,{animate:{y:[-15,15,-15]},transition:{duration:6,repeat:1/0,ease:\`easeInOut\`,delay:.5},style:{position:\`absolute\`,top:\`40%\`,left:\`25%\`,color:\`var(--primary)\`,opacity:.05},children:(0,H.jsx)(jp,{size:80})})]}),(0,H.jsx)(\`div\`,{className:\`container\`,style:{position:\`relative\`,zIndex:2},children:(0,H.jsxs)(Y.div,{initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{duration:1.2,ease:[.16,1,.3,1]},style:{animation:\`float-y-slow 8s ease-in-out infinite\`,display:\`flex\`,flexDirection:\`column\`,alignItems:\`center\`},children:[(0,H.jsx)(Y.span,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},transition:{delay:.3},className:\`badge hero-badge\`,children:\`Digital Excellence\`}),(0,H.jsx)(\`h1\`,{className:\`gradient-text hero-title\`,children:\`We Build Websites for  Businesses  & Help Them Grow Online\`}),(0,H.jsx)(Y.p,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.5},className:\`hero-description\`,children:\`We craft clean, professional websites and manage every aspect — from ongoing updates to strategic social media marketing.\`})]})})]})`;

const teamCode = `(0,H.jsxs)(\`section\`,{id:\`team\`,className:\`container\`,children:[(0,H.jsx)(Qp,{badge:\`Expert Team\`,title:\`Meet Our Team\`}),(0,H.jsx)(\`div\`,{className:\`team-grid\`,children:e.map((e,t)=>(0,H.jsx)($p,{...e},t))})]})`;

// Find the end of the about section in the array
const aboutEndPattern = /id:\`about\`,className:\`container\`,children:\(0,H\.jsxs\)\(`div`,{style:{textAlign:`center`,display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`4rem`},children:\[.*\]}\)}\)/;
const match = content.match(aboutEndPattern);

if (match) {
    const insertPos = match.index + match[0].length;
    const newContent = content.substring(0, insertPos) + ',' + teamCode + ',' + heroCode + content.substring(insertPos);
    fs.writeFileSync(filePath, newContent);
    console.log("Successfully restored Team and Hero sections.");
} else {
    console.log("Could not find insertion point.");
}
