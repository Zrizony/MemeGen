'use strict'

function onInit() {
  renderGallery()
}

function renderGallery() {
  const imgs = getImgForDisplay()
  let strHTMLs = imgs.map(
    (img) => `
  <img src="imgs/${img.id}.jpg" alt="" class="img${img.id}" onclick="onSelectImg(${img.id})" />`
  )

  document.querySelector('.gallery-container').innerHTML = strHTMLs.join('')
}

function onSelectImg(imgId) {
  let img = getImgById(imgId)

  const elModal = document.querySelector('.modal')
  createMeme(img.id)
  elModal.classList.add('open')
}

function onCloseModal() {
  document.querySelector('.modal').classList.remove('open')
}
