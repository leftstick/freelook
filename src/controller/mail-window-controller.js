const { BrowserWindow, BrowserView, shell, ipcMain } = require('electron')
const settings = require('electron-settings')
const CssInjector = require('../js/css-injector')
const path = require('path')

const outlookUrl = 'https://partner.outlook.cn/owa/'

class MailWindowController {
    constructor() {
        this.init()
    }

    init() {
        // Get configurations.
        const showWindowFrame = settings.get('showWindowFrame', true)

        // Create the browser window.
        this.win = new BrowserWindow({
            x: 100,
            y: 100,
            width: 1400,
            height: 900,
            frame: showWindowFrame,
            autoHideMenuBar: true,
            show: false,
            icon: path.join(__dirname, '../../assets/outlook_linux_black.png'),
            webPreferences: {
                webSecurity: false,
                nodeIntegration: true,
                allowRunningInsecureContent: true,
                nativeWindowOpen: true,
                preload: path.join(__dirname, '../inject/setup.js')
            }
        })

        // and load the index.html of the app.
        this.win.loadURL(outlookUrl)

        // Show window handler
        ipcMain.on('show', (event) => {
            this.show()
        })

        //insert styles
        this.win.webContents.on('dom-ready', () => {
            this.win.webContents.insertCSS(CssInjector.main)
            if (!showWindowFrame) this.win.webContents.insertCSS(CssInjector.noFrame)

            this.win.show()
        })

        // Emitted when the window is closed.
        this.win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.win = null
        })

    }

    toggleWindow() {
        if (this.win.isFocused()) {
            this.win.hide()
        } else {
            this.show()
        }
    }

    show() {
        this.win.show()
        this.win.focus()
    }
}

module.exports = MailWindowController
