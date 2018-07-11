const electron = require('electron')
const {app, BrowserWindow} = require('electron');
var ipc = require('electron').ipcMain;
var wallpaper = require('./App/app.js');

let win
var username = 'jaymonkey02';

  function createWindow () {

    // Create the browser window.
    win = new BrowserWindow({
      width: 200,
      height: 200
    })

    // and load the index.html of the app.
    win.loadFile('./app/index.html');

    //Open developer console
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
      win = null;
    })

  }

  app.on('ready', createWindow)

  app.on('window-all-closed', () => {
     // On macOS it is common for applications and their menu bar
     // to stay active until the user quits explicitly with Cmd + Q
     if (process.platform !== 'darwin') {
       app.quit()
     }
   })

  app.on('activate', () => {
     // On macOS it's common to re-create a window in the app when the
     // dock icon is clicked and there are no other windows open.
     if (win === null) {
       createWindow()
     }
   })

   process.on('uncaughtException', () => {
     console.log('An error occured!')
   })

//Runs the Wallpaper Changing code
ipc.on('run-app', (event, arg) => {
    username = arg;
    console.log(arg);
    console.log('ChangeWallpaper');
    wallpaper.ChangeWallpaper(arg);

})

setInterval( () => {
  if(username){
    wallpaper.ChangeWallpaper(username);
  } else {
    console.log('No username');
  }
}, 60000)
