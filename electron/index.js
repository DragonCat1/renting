const { app, BrowserWindow } = require('electron')
const path = require('path')
let win
function createWindow () {   
  // 创建浏览器窗口
  win = new BrowserWindow({ width: 800, height: 600 })

  // 然后加载应用的 index.html。
  win.loadFile(path.resolve(__dirname,'index.html'))
}

app.on('ready', createWindow)
