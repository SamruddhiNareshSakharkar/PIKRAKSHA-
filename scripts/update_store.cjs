const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.js', 'utf8');

code = code.replace("const STORAGE_KEY = 'PIKRAKSHA_STORE_V6';", "const STORAGE_KEY = 'PIKRAKSHA_STORE_V7';");
code = code.replace('isLoggedIn: true', 'isLoggedIn: false');

fs.writeFileSync('src/store/useStore.js', code, 'utf8');
console.log('useStore.js updated successfully');

