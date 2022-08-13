'use strict'

//---- opening about modal ----//
function onOpenAbout() {
    elNavLinks.classList.remove('active')
    document.querySelector('.about-modal').classList.add('open')
}

//---- closing about modal ----//
function onCloseAbout() {
    document.querySelector('.about-modal').classList.remove('open')
  }