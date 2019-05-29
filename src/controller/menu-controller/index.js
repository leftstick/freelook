const { app, Menu, BrowserWindow } = require('electron')
const { join } = require('path')

class MenuController {
  constructor() {
    this.init()
  }

  init() {
    if (!app.isPackaged) {
      return
    }
    Menu.setApplicationMenu(
      Menu.buildFromTemplate([
        {
          label: 'Application',
          submenu: [
            {
              label: 'About Freelook',
              click: function() {
                new BrowserWindow({
                  parent: BrowserWindow.getFocusedWindow(),
                  width: 285,
                  height: 230,
                  center: true,
                  resizable: false,
                  minimizable: false,
                  maximizable: false,
                  show: true,
                  title: ''
                }).loadURL('file://' + join(__dirname, 'about.html'))
              }
            },
            {
              type: 'separator'
            },
            {
              label: 'Quit Freelook',
              accelerator: 'CmdOrCtrl+Q',
              click: function() {
                app.quit()
              }
            }
          ]
        },
        {
          label: 'Edit',
          submenu: [
            {
              label: 'Undo',
              accelerator: 'CmdOrCtrl+Z',
              selector: 'undo:',
              role: 'undo'
            },
            {
              label: 'Redo',
              accelerator: 'Shift+CmdOrCtrl+Z',
              selector: 'redo:',
              role: 'redo'
            },
            {
              type: 'separator'
            },
            {
              label: 'Cut',
              accelerator: 'CmdOrCtrl+X',
              selector: 'cut:',
              role: 'cut'
            },
            {
              label: 'Copy',
              accelerator: 'CmdOrCtrl+C',
              selector: 'copy:',
              role: 'copy'
            },
            {
              label: 'Paste',
              accelerator: 'CmdOrCtrl+V',
              selector: 'paste:',
              role: 'paste'
            },
            {
              label: 'Select All',
              accelerator: 'CmdOrCtrl+A',
              selector: 'selectAll:',
              role: 'selectall'
            }
          ]
        }
      ])
    )
  }
}

module.exports = MenuController
