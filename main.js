const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

let mainWindow = null;
let loginWin = null;
let filterActive = false;
let tokenFound = false;

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
    icon: path.join(__dirname, 'build', 'icon.ico'),
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

  tokenFound = false;

  loginWin = new BrowserWindow({
    width: 500,
    height: 750,
    parent: mainWindow,
    modal: true,
    autoHideMenuBar: true,
    webPreferences: { 
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Block WebAuthn to prevent "Insert Security Key" Windows prompt
  loginWin.webContents.on('dom-ready', () => {
    loginWin.webContents.executeJavaScript(`
      if (window.navigator.credentials) {
        const origGet = window.navigator.credentials.get;
        window.navigator.credentials.get = function(options) {
          if (options && options.publicKey) {
            return Promise.reject(new DOMException("WebAuthn is disabled to prevent OS prompts.", "NotAllowedError"));
          }
          return origGet.call(window.navigator.credentials, options);
        };
      }
    `);
  });

  loginWin.loadURL('https://discord.com/login');

  const filter = { urls: ['https://discord.com/api/v*/users/@me*'] };

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

ipcMain.on('open-external', (event, url) => {
  const { shell } = require('electron');
  shell.openExternal(url);
});

ipcMain.on('clear-session', () => {
  session.defaultSession.clearStorageData();
});

// Auto-updater event forwarders
autoUpdater.on('update-available', (info) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('updater-status', `Update v${info.version} available. Downloading...`);
  }
});

autoUpdater.on('update-downloaded', (info) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('updater-status', `Update v${info.version} downloaded. Restarting in 3 seconds...`);
  }
  setTimeout(() => {
    autoUpdater.quitAndInstall();
  }, 3000);
});

autoUpdater.on('error', (err) => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('updater-status', 'Update check failed.');
  }
});