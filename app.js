// Electron
const electron = require('electron');
const {app, BrowserWindow} = electron;
// Requires
const path = require('path');
const url = require('url');



// Global reference of the window object to prevent auto-close when it is garbage collected.
let mainWindow = null;

function createWindow(){

  // Computer window dimensions.
  const dimensions = electron.screen.getPrimaryDisplay().size;

  // Browser window creation.
  mainWindow = new BrowserWindow({
    'width' : dimensions.width - 100,
    'height' : dimensions.height - 100,
    'minWidth' : 768,
    'minHeight' : 300
  });

  // Load index.html in the main window.
  mainWindow.loadURL(url.format({
    'pathname' : path.join(__dirname, 'index.html'),
    'protocol' : 'file:',
    'slashes' : true
  }));

  // DevTools.
  // mainWindow.webContents.openDevTools()

  // Dereference the window object when the window is closed.
  mainWindow.on('closed', function(){
    mainWindow = null;
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
