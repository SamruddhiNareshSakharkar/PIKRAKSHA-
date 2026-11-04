const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- 1. Restoring source index.html ---');
fs.copyFileSync('index.source.html', 'index.html');

console.log('--- 2. Running vite build ---');
execSync('npx vite build', { stdio: 'inherit' });

console.log('--- 3. Cleaning and updating assets/ ---');
const distAssets = path.join('dist', 'assets');
const rootAssets = 'assets';

if (!fs.existsSync(rootAssets)) {
  fs.mkdirSync(rootAssets, { recursive: true });
}

// Remove old assets
for (const file of fs.readdirSync(rootAssets)) {
  fs.unlinkSync(path.join(rootAssets, file));
}

// Copy new assets
for (const file of fs.readdirSync(distAssets)) {
  fs.copyFileSync(path.join(distAssets, file), path.join(rootAssets, file));
  console.log(`Copied ${file} -> assets/${file}`);
}

console.log('--- 4. Updating root index.html and 404.html ---');
const builtHtml = fs.readFileSync(path.join('dist', 'index.html'), 'utf8');
fs.writeFileSync('index.html', builtHtml, 'utf8');
fs.writeFileSync('404.html', builtHtml, 'utf8');

console.log('--- 5. Ensuring .nojekyll ---');
fs.writeFileSync('.nojekyll', '', 'utf8');

console.log('=== BUILD & DEPLOY PREP COMPLETE ===');

