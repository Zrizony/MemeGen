'use strict'

const elSearchContainer = document.querySelector('.search-main')
const elMainGallery = document.querySelector('.gallery-main')
const elMainEdit = document.querySelector('.edit-main')

function onInit() {
  gElCanvas = document.getElementById('canvas')
  gCtx = canvas.getContext('2d')
  resizeCanvas()
  renderGallery()
}

//---- filtering images by searching keywords ----//
function onSearchInput() {
  renderGallery()
}

//---- rendering gallery ----//
function renderGallery() {
  // const currSearchValue = document.getElementById('search-input').value
  // console.log('currSearchValue:', currSearchValue)
  let imgs = getImgForDisplay()
  // if (!currSearchValue) {
  //   imgs = getImgForDisplay()
  // } else {
  //   imgs = getImgBySearchFilter(currSearchValue)
  // }

  let strHtmls = imgs.map(
    (img) =>
      `
    <img id="img${img.id}" class="gallery-img " src="${img.url}" onclick="onImgSelect(${img.id})">
    `
  )

  console.log(imgs)
  document.querySelector('.grid-container').innerHTML = strHtmls.join('')
}

//---- opening meme editor modal with selected image ----//
function onImgSelect(imgId) {
  const img = getImgById(imgId)
  const elCanvas = document.getElementById('canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  createMeme(img, center)
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
  const elCanvas = document.getElementById('canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  createMeme(0, center)
  uploadImage(ev, renderImg)
}

//---- loading images by search keyword ----//
function onSearchSubmit(e) {
  e.preventDefault()
  const elSearch = document.querySelector('.search-form input')
  const searchVal = elSearch.value

  elSearch.value = ''
}
