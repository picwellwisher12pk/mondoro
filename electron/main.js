const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { autoUpdater } = require('electron-updater');
const Store = require('electron-store');
const notifier = require('node-notifier');

let mainWindow;
let tray;

// Initialize store for settings
const store = new Store({
    defaults: {
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        autoStartBreak: true,
        autoStartPomodoro: false,
        notifications: true,
        minimizeToTray: true,
        theme: 'dark'
    }
});

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        frame: false,
        show: false, // Don't show the window until it's ready
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
            sandbox: true
        },
        backgroundColor: '#1A1A1A'
    });

    // Set CSP headers
    mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
        callback({
            responseHeaders: {
                ...details.responseHeaders,
                'Content-Security-Policy': [
                    "default-src 'self' http://localhost:*;",
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
                    "style-src 'self' 'unsafe-inline';",
                    "img-src 'self' data: https:;",
                    "connect-src 'self' http://localhost:*;",
                    "font-src 'self' data:;"
                ].join(' ')
            }
        });
    });

    // Show window when it's ready to prevent white flash
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Wait for Vite server to start
    const loadURL = async () => {
        try {
            if (isDev) {
                console.log('Loading development URL...');
                // Wait for Vite server to be ready
                await new Promise(resolve => setTimeout(resolve, 2000));
                await mainWindow.loadURL('http://localhost:5173');
                console.log('Development URL loaded successfully');
            } else {
                console.log('Loading production URL...');
                const prodPath = path.join(__dirname, '../dist/index.html');
                console.log('Production path:', prodPath);
                await mainWindow.loadURL(`file://${prodPath}`);
                console.log('Production URL loaded successfully');
            }
        } catch (err) {
            console.error('Failed to load URL:', err);
            // Retry after 1 second
            setTimeout(loadURL, 1000);
        }
    };

    await loadURL();

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    // Handle window controls
    ipcMain.on('minimize-window', () => {
        mainWindow.minimize();
    });

    ipcMain.on('maximize-window', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });

    ipcMain.on('close-window', () => {
        if (store.get('minimizeToTray')) {
            mainWindow.hide();
        } else {
            mainWindow.close();
        }
    });

    // Settings handlers
    ipcMain.handle('get-settings', () => store.store);
    ipcMain.on('set-settings', (_, settings) => {
        store.set(settings);
    });

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

function createTray() {
    try {
        // For now, we'll skip tray creation if icon is missing
        if (!isDev) {
            tray = new Tray(path.join(__dirname, 'icons/icon.png'));
            const contextMenu = Menu.buildFromTemplate([
                {
                    label: 'Open Mondoro',
                    click: () => mainWindow.show()
                },
                { type: 'separator' },
                {
                    label: 'Start Focus Session',
                    click: () => mainWindow.webContents.send('start-focus')
                },
                {
                    label: 'Start Break',
                    click: () => mainWindow.webContents.send('start-break')
                },
                { type: 'separator' },
                {
                    label: 'Quit',
                    click: () => app.quit()
                }
            ]);

            tray.setToolTip('Mondoro');
            tray.setContextMenu(contextMenu);

            tray.on('click', () => {
                mainWindow.show();
            });
        }
    } catch (err) {
        console.log('Failed to create tray:', err);
        // Continue without tray
    }
}

// Notification handler
ipcMain.on('show-notification', (_, { title, message }) => {
    if (store.get('notifications')) {
        notifier.notify({
            title,
            message,
            sound: true,
            wait: true,
            click: () => mainWindow.show()
        });
    }
});

// Register global shortcuts
app.whenReady().then(() => {
    createWindow();
    createTray();

    // Check for updates
    if (!isDev) {
        autoUpdater.checkForUpdatesAndNotify();
        // Check for updates every hour
        setInterval(() => {
            autoUpdater.checkForUpdatesAndNotify();
        }, 60 * 60 * 1000);
    }
});

// Auto updater events
autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update-available');
});

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update-downloaded');
});

ipcMain.on('install-update', () => {
    autoUpdater.quitAndInstall();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});