// Electron
const electron = require('electron');
const {app, BrowserWindow} = electron;

// Modules
const path = require('path');



// Hot-reload when editing Angular code
require('electron-reload')(path.join(__dirname, '../distAngular'), {
  'electron' : path.join('node_modules', '.bin', 'electron.cmd'),
  'hardResetMethod' : 'exit'
});

// Global reference of the window object to prevent auto-close when it is garbage collected.
let mainWindow = null;

function createWindow(){

  // Launch the express server
  rootRequire('express/express.js')(function(err, expressApp){

    // Handle error
    if(err) process.exit(1);

    // Express app
    app.expressApp = expressApp;

    // Computer window dimensions.
    const dimensions = electron.screen.getPrimaryDisplay().size;

    // Browser window creation.
    mainWindow = new BrowserWindow({
      'width' : dimensions.width - 100,
      'height' : dimensions.height - 100,
      'minWidth' : 600,
      'minHeight' : 400,
      'icon' : path.join(__dirname, '../distAngular/favicon.ico')
    });

    // Load index from Express in the main window.
    mainWindow.loadURL('http://localhost:' + app.expressApp.get('port'));

    // Focus on the main window.
    mainWindow.focus();

    // NODE_ENV development
    if(app.expressApp.get('node_env') === 'development'){
      // OpenDevTools
      mainWindow.webContents.openDevTools();
    }

    // NODE_ENV production
    if(app.expressApp.get('node_env') === 'production'){
      // Remove the menu
      mainWindow.setMenu(null);
    }

    // Dereference the window object when the window is closed.
    mainWindow.on('closed', function(){
      mainWindow = null;
    });

  });

}

// Initialization finished, create the window.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function(){
  // Exception for OS-X (the user quits explicitly with Cmd+Q).
  if(process.platform !== 'darwin') app.quit();
});

// Re-create a window for OS-X when the dock icon is clicked (all windows were closed).
app.on('activate', function(){
  if(mainWindow === null) createWindow();
});
