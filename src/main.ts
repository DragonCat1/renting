import { app, BrowserWindow } from 'electron'

app.on('ready',()=>{
  const win = new BrowserWindow({ width: 800, height: 600 })
  win.webContents.openDevTools()
  win.loadFile('index.html')
})
