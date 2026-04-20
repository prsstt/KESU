const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow = null;
let loginWin = null;
let filterActive = false;

// Configure autoUpdater
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: '#0a0a0c',
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('window-min', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-max', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  }
});

// Browser login logic
ipcMain.on('open-login-window', () => {
  if (!mainWindow || loginWin) return; // Prevent opening multiple windows

  loginWin = new BrowserWindow({
    width: 500,
    height: 750,
    parent: mainWindow,
    modal: true,
    autoHideMenuBar: true,
    webPreferences: { nodeIntegration: false }
  });

  loginWin.loadURL('https://discord.com/login');

  const filter = { urls: ['https://discord.com/api/v*/users/@me*'] };
  let tokenFound = false;

  // Safely use default session which never gets destroyed before app quit
  if (!filterActive) {
    filterActive = true;
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
      if (!tokenFound && details.requestHeaders['Authorization']) {
        const token = details.requestHeaders['Authorization'];
        tokenFound = true;

        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.send('token-captured', token);
        }

        // Safely close window on next tick
        setImmediate(() => {
          if (loginWin && !loginWin.isDestroyed()) {
            loginWin.close();
          }
        });
      }
      callback({ requestHeaders: details.requestHeaders });
    });
  }

  loginWin.on('closed', () => {
    loginWin = null;
    // We don't remove the global webRequest listener to avoid "Object destroyed" errors.
    // Instead, the tokenFound variable resets on every new window open.
  });
});

app.whenReady().then(() => {
  createWindow();
  
  // Check for updates silently on startup
  try {
    autoUpdater.checkForUpdatesAndNotify();
  } catch (err) {
    console.log("Auto-updater skipped during local development.");
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('quit-app', () => {
  app.quit();
});

// Auto-updater event forwarders
autoUpdater.on('update-available', (info) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('updater-status', `Update v${info.version} available. Downloading...`);
  }
});

autoUpdater.on('update-downloaded', (info) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('updater-status', `Update v${info.version} downloaded. It will be installed on restart.`);
  }
});

autoUpdater.on('error', (err) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('updater-status', 'Update check failed.');
  }
});