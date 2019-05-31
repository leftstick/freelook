const path = require('path')

titleChange()
configNotification()
removeMainToolButton()
changeBrandingText()

function changeBrandingText() {
  const texts = document.querySelectorAll('.o365cs-nav-brandingText')

  if (!texts || !texts.length) {
    return setTimeout(changeBrandingText, 500)
  }

  for (let i = 0; i < texts.length; i++) {
    const text = texts[i]
    if (text && text.innerText === 'Outlook') {
      text.innerHTML = 'Freelook'
    }
  }
}

function removeMainToolButton() {
  const btn = document.querySelector('#O365_MainLink_NavMenu')

  if (!btn) {
    return setTimeout(removeMainToolButton, 500)
  }

  btn.parentNode.removeChild(btn)
}

function configNotification() {
  const intercept = (urlmatch, callback) => {
    let send = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function() {
      this.addEventListener(
        'readystatechange',
        function() {
          if (this.responseURL.includes(urlmatch) && this.readyState === 4) {
            callback(this)
          }
        },
        false
      )
      send.apply(this, arguments)
    }
  }

  intercept('https://partner.outlook.cn/owa/service.svc?action=GetItem', req => {
    try {
      const responseContent = JSON.parse(req.response)
      const items = responseContent.Body.ResponseMessages.Items

      for (let i = 0; i < items.length; i++) {
        const innerItems = items[0].Items

        for (let j = 0; j < innerItems.length; j++) {
          const innerItem = innerItems[j]
          const subject = innerItem.Subject
          const isRead = innerItem.IsRead
          const from = innerItem.From.Mailbox.Name || innerItem.From.Mailbox.EmailAddress

          if (isRead) {
            continue
          }

          new Notification(subject, {
            body: `unread email from ${from}`,
            icon: 'file://' + path.join(__dirname, '..', '..', 'assets/outlook_macOS_unread@2x.png')
          })
        }
      }
    } catch (error) {
      console.error('error', error)
    }
  })
}

function titleChange() {
  const oldTitle = document.querySelector('.o365cs-nav-gallatinLogo')
  if (!oldTitle) {
    return setTimeout(titleChange, 100)
  }
  const titleParent = oldTitle.parentNode
  const newTitle = document.createElement('span')
  newTitle.innerHTML = 'by 右领军大都督'
  newTitle.className = oldTitle.className
  newTitle.classList.remove('ms-Icon--gallatin')
  newTitle.style.marginTop = '5px'

  titleParent.removeChild(oldTitle)
  titleParent.appendChild(newTitle)
}
