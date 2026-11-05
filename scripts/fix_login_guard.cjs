const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.js', 'utf8');

// Force isLoggedIn to ALWAYS be false on page load — user must sign in every time
code = code.replace(
  'currentUser: parsed.currentUser || defaultState.currentUser,',
  'currentUser: { ...(parsed.currentUser || defaultState.currentUser), isLoggedIn: false },'
);

fs.writeFileSync('src/store/useStore.js', code, 'utf8');
console.log('Done: getInitialState now always forces isLoggedIn: false on page load');

