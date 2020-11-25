import { app, BrowserWindow } from 'electron'


const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // shows the dev console
  window.webContents.openDevTools()

  // hide the default menu bar that comes with the browser window
  window.setMenuBarVisibility(true)

  window.loadFile(`./ts-out/renderer/index.html`);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
