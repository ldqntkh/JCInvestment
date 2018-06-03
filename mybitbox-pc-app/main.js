const {
    app,
    BrowserWindow,
    globalShortcut
} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        'width': 512,
        'height': 285,
        'frame': false, //hide border of BrowserWindow
    });
    win.setMenu(null);
    win.setAlwaysOnTop(true, "floating");
    win.setVisibleOnAllWorkspaces(true);
    win.setFullScreenable(false);

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/Views/splashScreen.html'),
        protocol: 'file:',
        slashes: true
    }))

    globalShortcut.register('CommandOrControl+Y', () => {
        // Do stuff when Y and either Command/Control is pressed.
        win.reload();
    })
    globalShortcut.register('CommandOrControl+L', () => {
        // Do stuff when Y and either Command/Control is pressed.
        win.webContents.openDevTools()
    })
    // Open the DevTools.
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    setTimeout(function() {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'src/Views/index.html'),
            protocol: 'file:',
            slashes: true
        }));
        win.setFullScreen(true);
        let screen = require('electron').screen;
        let width = screen.getPrimaryDisplay().size.width,
            height = screen.getPrimaryDisplay().size.height;
        win.setSize(width, height);
        win.setPosition(0, 0);
    }, 155 * 1000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.