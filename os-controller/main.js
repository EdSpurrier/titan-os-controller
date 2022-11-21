'use strict';

const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')

const windowController = require('./components/window-controller');


var useWindow = true;


const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        title: "Zone Control",
        frame: true,
        alwaysOnTop: true,
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


    
    //  tray is declared out to prevent garbage collection
    //  https://www.electronjs.org/docs/faq#my-apps-windowtray-disappeared-after-a-few-minutes
    let tray = null;
    mainWindow.on('minimize', () => {
        if (tray) { return mainWindow.hide(); }
        //  tray documentation at - https://github.com/electron/electron/blob/main/docs/api/menu-item.md
        tray = new Tray('icons/titan.png');
        const template = [
            {
                label: 'CodeSpeedy',
                icon: 'icons/titan.png',
                enabled: false,
            },
            {
                type: 'separator',
            },
            {
                label: 'Show App', click: function () {
                    mainWindow.show();
                },
            },
            {
                label: 'Quit', click: function () {
                    mainWindow.close();
                },
            },
        ];
        const contextMenu = Menu.buildFromTemplate(template);
        tray.setContextMenu(contextMenu);
        tray.setToolTip('CodeSpeedy');
        mainWindow.hide();
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

    windowController.init();
    
    
    if(!useWindow) {
        return;
    }

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