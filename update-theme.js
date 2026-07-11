const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('dist')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('d:/Portfolio');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Greens to Purples
  content = content.replace(/emerald/g, 'purple');
  content = content.replace(/brand-green/g, 'brand-purple');
  content = content.replace(/16,\s*185,\s*129/g, '168, 85, 247');
  content = content.replace(/#10b981/gi, '#a855f7'); // emerald-500
  content = content.replace(/#059669/gi, '#9333ea'); // emerald-600
  content = content.replace(/#34d399/gi, '#c084fc'); // emerald-400

  // Backgrounds to Black
  content = content.replace(/bg-\[\#0d0d0d\]/gi, 'bg-black');
  content = content.replace(/bg-\[\#111111\]/gi, 'bg-black');
  content = content.replace(/bg-\[\#0a0a0a\]/gi, 'bg-black');
  content = content.replace(/bg-gray-900/g, 'bg-black');
  content = content.replace(/background-color:\s*#0d0d0d/gi, 'background-color: #000000');
  content = content.replace(/background-color:\s*#111/gi, 'background-color: #000');
  content = content.replace(/border-gray-900/g, 'border-black');
  
  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    changedCount++;
    console.log('Modified: ' + file);
  }
});
console.log('Total files modified: ' + changedCount);
