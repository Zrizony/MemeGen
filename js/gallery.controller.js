'use strict'

const elSearchContainer = document.querySelector('.search-main')
const elMainGallery = document.querySelector('.gallery-main')
const elMainEdit = document.querySelector('.main-edit')

function onInit() {
  gElCanvas = document.getElementById('canvas')
  gCtx = canvas.getContext('2d')
  // resizeCanvas()
  renderGallery()
}

//---- filtering images by searching keywords ----//
function onSearchInput() {
  renderGallery()
}

//---- rendering gallery ----//
function renderGallery() {
  const currSearchValue = document.querySelector('.search-input').value
  const imgs = getImgForDisplay()
  if (!currSearchValue) {
    imgs = getImgForDisplay()
  } else {
    imgs = getImgBySearchFilter(currSearchValue)
  }
  let strHTMLs = imgs.map(
    (img) => `
  <img src="imgs/${img.id}.jpg" alt="" class="img${img.id}" onclick="onImgSelect(${img.id})" />`
  )

  document.querySelector('.gallery-main').innerHTML = strHTMLs.join('')
}

//---- opening meme editor modal with selected image ----//
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

//---- Uploading user image to canvas ----//
function onImgUpload(ev) {
  const elCanvas = document.querySelector('.canvas-container canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  createMeme(0, center)
  uploadImage(ev, renderImg)
}
