const { session } = require('electron')

class InterceptorController {
  constructor() {
    this.init()
  }

  init() {
    session.defaultSession.webRequest.onCompleted(
      {
        urls: ['https://partner.outlook.cn/owa/service.svc?action=GetItem*']
      },
      details => {}
    )
  }
}

module.exports = InterceptorController
