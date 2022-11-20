const { app, BrowserWindow, screen } = require('electron')
const path = require('path')
const { TitanCore } = require('titan-core');

// MODULES
const udpServer = require('./utils/udp-server')
const udpClient = require('./utils/udp-client')

var titanCore = new TitanCore();
var console = titanCore.console;

//  UDP CLIENT
udpClient.setup(titanCore);

//  UDP SERVER
udpServer.setup(titanCore, 4003);

udpServer.server.on('message', function(msg,info){

  let msgData = JSON.parse(msg.toString());

  if ( msgData['command'] == 'get-displays')  {
    const displays = screen.getAllDisplays()
    const display = displays.find((d) => d.bounds.x !== 0 || d.bounds.y !== 0) || displays[0];
    console.log("Gathering Display Info => Total = ", displays.length);
    let sendData = [{
      'action'  : msgData.action,
      'display-data' : displays
    }];
    udpClient.send(JSON.stringify(sendData), 4004);
  } else {
    console.logError("Unable to understand command => " +  msg.toString())
  };
});

udpServer.start();


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 10,
    height: 10,
    title: "Zone Control",
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    },
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'src/index.html'))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

