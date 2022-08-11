'use strict'

function onInit() {
  renderGallery()
}

function renderGallery() {
  const imgs = getImgForDisplay()
  let strHTMLs = imgs.map(
    (img) => `
  <img src="imgs/${img.id}.jpg" alt="" class="img${img.id}" onclick="onImgSelect(${img.id})" />`
  )

  document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')
}

function onImgSelect(imgId) {
  const img = getImgById(imgId)

  const elModal = document.querySelector('.modal')
  elModal.querySelector('h3').innerText = 'In Progress...'
  elModal.classList.add('open')
}

function onCloseModal() {
  document.querySelector('.modal').classList.remove('open')
}
