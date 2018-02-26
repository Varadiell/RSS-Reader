// Modules
const path = require('path');



// Function rootRequire for absolute requires
global.rootRequire = function(rootPath){
  return require(path.join(__dirname, '/' + rootPath));
};

// Start Electron
rootRequire('electron/electron.js');
