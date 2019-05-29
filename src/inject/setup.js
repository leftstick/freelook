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
  const userNameEle = document.querySelector('#O365_MeFlexPane_ButtonID')
  if (!userNameEle) {
    return setTimeout(configNotification, 1000)
  }

  try {
    const userName = userNameEle.getAttribute('title')
    const unreadSpan = document.querySelector('[aria-label="' + userName + '"]  div div div span div div span')

    const count = Number((unreadSpan.innerText || '').trim())

    if (window.lastUnreadCount === count) {
      return setTimeout(configNotification, 1000)
    }

    if (0 === count) {
      window.lastUnreadCount = 0
      return setTimeout(configNotification, 1000)
    }

    if (window.lastUnreadCount > count) {
      window.lastUnreadCount = count
      return setTimeout(configNotification, 1000)
    }

    window.lastUnreadCount = !window.lastUnreadCount ? 0 : window.lastUnreadCount

    const offset = count - window.lastUnreadCount

    if (offset === 1) {
      new Notification('New Messages', {
        body: 'You have one unread email',
        icon: 'assets/outlook_linux_black.png'
      })
    } else {
      new Notification('New Messages', {
        body: 'You have ' + offset + ' unread emails',
        icon: 'assets/outlook_linux_black.png'
      })
    }

    window.lastUnreadCount = count

    return setTimeout(configNotification, 1000)
  } catch (error) {
    console.error('error', error)
    return setTimeout(configNotification, 1000)
  }
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
