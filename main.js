const { app, BrowserWindow } = require('electron');
const path = require('path');

// Error Handling
process.on('uncaughtException', (error) => {
  console.error("Unexpected error: ", error);
});
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
    }
  });
  win.loadURL('http://localhost:3000');
}
// App Lifecycle
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
