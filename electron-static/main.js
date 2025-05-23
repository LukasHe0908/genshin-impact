const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');

let e = express();

// e.use(express.static('./static'))
e.use(express.static(path.join(__dirname, 'static')));

let s = e.listen(34855, 'localhost');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var win;
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 1080, height: 1920, frame: false });
  win.setFullScreen(false);

  // and load the index.html of the app.
  const port = s.address().port;
  win.loadURL(`http://localhost:${port}`);

  // win.once('ready-to-show', () => {
  //     win.show()
  // })

  // Open the DevTools.
  // win.webContents.openDevTools()
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should devare the corresponding element.
    win = null;
  });
  // require('electron').webFrame.setZoomLevelLimits(1,1);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // startServer();

  createWindow();
});
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
