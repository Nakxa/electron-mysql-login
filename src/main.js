const { app, BrowserWindow, Menu, ipcMain, Notification } = require('electron');
const path = require('path');

let window;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  window.loadFile('src/ui/index.html');

  // Create a custom menu
  const menuTemplate = [
    {
      label: 'Custom Menu',
      submenu: [
        {
          label: 'Custom Item 1',
          click() {
            console.log('Custom Item 1 clicked');
          },
        },
        {
          label: 'Custom Item 2',
          click() {
            console.log('Custom Item 2 clicked');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
