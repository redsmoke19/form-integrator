let unlock = true;
function bodyLock(delay) {
  const body = document.querySelector('body');
  if (body.classList.contains('_lock')) {
    bodyLockRemove(delay);
  } else {
    bodyLockAdd(delay);
  }
}
function bodyLockRemove(delay) {
  const body = document.querySelector('body');
  if (unlock) {
    const lockPadding = document.querySelectorAll('._lp');
    setTimeout(() => {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
    }, delay);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
function bodyLockAdd(delay) {
  const body = document.querySelector('body');
  if (unlock) {
    const lockPadding = document.querySelectorAll('._lp');
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px';
    }
    body.style.paddingRight =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    body.classList.add('_lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
const getPopup = () => {
  const popupLink = document.querySelectorAll('._popup-link');
  const popups = document.querySelectorAll('.popup');
  for (let index = 0; index < popupLink.length; index++) {
    const el = popupLink[index];
    el.addEventListener('click', function (e) {
      if (unlock) {
        const item = el.getAttribute('href').replace('#', '');
        popupOpen(item);
      }
      e.preventDefault();
    });
  }
  for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__body')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
  function popupOpen(item) {
    const activePopup = document.querySelectorAll('.popup._active');
    if (activePopup.length > 0) {
      popupClose('', false);
    }
    const curentPopup = document.querySelector('.popup_' + item);
    if (curentPopup && unlock) {
      if (!document.querySelector('.menu__body._active')) {
        bodyLockAdd(500);
      }
      curentPopup.classList.add('_active');
      history.pushState('', '', '#' + item);
    }
  }
  function popupClose(item, bodyUnlock = true) {
    if (unlock) {
      if (!item) {
        for (let index = 0; index < popups.length; index++) {
          const popup = popups[index];
          popup.classList.remove('_active');
        }
      } else {
        item.classList.remove('_active');
      }
      if (!document.querySelector('.menu__body._active') && bodyUnlock) {
        bodyLockRemove(500);
      }
      history.pushState('', '', window.location.href.split('#')[0]);
    }
  }
  const popupCloseIcon = document.querySelectorAll(
    '.popup__close,._popup-close'
  );
  if (popupCloseIcon) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function () {
        popupClose(el.closest('.popup'));
      });
    }
  }
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
      popupClose();
    }
  });
};

const getLoginTabs = () => {
  const tabsLinks = document.querySelectorAll('.login-tabs__link');
  const tabsContent = document.querySelectorAll('.login-tabs__content');
  let tabName;
  tabsLinks.forEach(item => {
    item.addEventListener('click', selectTabNav);
  });

  function selectTabNav() {
    tabsLinks.forEach(item => {
      item.classList.remove('_active');
    });
    this.classList.add('_active');
    tabName = this.getAttribute('data-tabsid');
    selectTabContent(tabName);
  }

  function selectTabContent(tab) {
    tabsContent.forEach(item => {
      const classList = item.classList;
      if (classList.contains(tab)) {
        classList.add('_active');
      } else {
        classList.remove('_active');
      }
    });
  }
};

getLoginTabs();
getPopup();
