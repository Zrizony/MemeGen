'use strict'

function onInit() {
  gElCanvas = document.getElementById('canvas')
  gCtx = canvas.getContext('2d')

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
  console.log(imgId)
  const img = getImgById(imgId)
  // const elImg = document.querySelector('.img' + img.id)
  createMeme(imgId)
  renderMeme()

  const elModal = document.querySelector('.modal')
  elModal.classList.add('open')
}

//---- closing meme editor modal ----//
function onCloseModal() {
  document.querySelector('.modal').classList.remove('open')
}

function onImgUpload(ev) {
  const elCanvas = document.querySelector('.canvas-container canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  setNewMeme(0, center)
  loadImageFromInput(ev, renderImg)

  elSearchContainer.style.display = 'none'
  elMainGallery.style.display = 'none'
  elMainEdit.style.display = 'flex'
}
