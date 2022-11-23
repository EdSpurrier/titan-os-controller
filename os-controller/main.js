'use strict';

const { app, BrowserWindow} = require('electron')
const path = require('path')
const windowController = require('./components/window-controller');

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        x: 0,
        y: 750,
        width: 70,
        height: 250,
        title: "Zone Control",
        frame: false,
        alwaysOnTop: true,
        transparent: false,
        setResizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
    })

    mainWindow.unmaximize();
    mainWindow.setResizable(false);
    mainWindow.on('maximize', () => mainWindow.unmaximize());
    mainWindow.setFullScreenable(false);

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'src/index.html'))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

}

// This method will be called when Electron has finished988428
// initialization and is ready to create browser windows.7766
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

    windowController.init();
    

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




console.log('OS Controller Loaded');