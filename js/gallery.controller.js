'use strict'

const elSearchContainer = document.querySelector('.search-main')
const elMainGallery = document.querySelector('.gallery-main')
const elMainEdit = document.querySelector('.edit-main')
const elMainSaved = document.querySelector('.saved-main')
const elSearch = document.querySelector('#search-input')

let fontSizes

//---- initializing onload ----//
function onInit() {
  elSearch.value = ''
  gElCanvas = document.getElementById('canvas')
  gCtx = canvas.getContext('2d')

  elSearchContainer.style.display = 'flex'
  elMainGallery.style.display = 'grid'
  elMainSaved.style.display = 'none'

  resizeCanvas()
  createKeyWords()
  renderKeywords()

  renderGallery()
}

//---- filtering images by searching keywords ----//
function onSearchInput() {
  renderGallery()
}

function onSearchSubmit(e) {
  e.preventDefault()
  const elSearch = document.querySelector('.search-form input')
  const searchVal = elSearch.value

  elSearch.value = ''
}

//---- keywords functions ----//
//-- changing clicked word size and filtering gallery with this keyword
function onWordClick(ev) {
  document.getElementById('search-input').value = ev.innerHTML.toString()
  onSearchInput()
  renderKeywords()
  for (let i = 0; i < Object.keys(fontSizes).length; i++) {
    if (ev.innerHTML.toString() === Object.keys(fontSizes)[i].toString()) {
      if (fontSizes[Object.keys(fontSizes)[i]] >= 100) return
      fontSizes[Object.keys(fontSizes)[i]] += Object.keys(fontSizes).length - 1
    } else {
      if (fontSizes[Object.keys(fontSizes)[i]] <= 10) return
      fontSizes[Object.keys(fontSizes)[i]] -= 1
    }
  }
  saveToStorage('keywordsDB', fontSizes)
}

//-- rendering keywords
function renderKeywords() {
  let htmlStr = ``

  for (let i = 0; i < Object.keys(fontSizes).length; i++) {
    htmlStr += `<span onclick="onWordClick(this)" class="keyword keyword${
      i + 1
    }">${Object.keys(fontSizes)[i]}</span><span>   </span>`
  }

  document.querySelector('.search-keywords').innerHTML = htmlStr

  for (let i = 0; i < Object.keys(fontSizes).length; i++) {
    const word = Object.keys(fontSizes)[i]

    document.querySelector(
      `.keyword${i + 1}`
    ).style.fontSize = `${fontSizes[word]}px`
  }
}

//-- creating keywords for fast onclick filtering
function createKeyWords() {
  let newFontSizes = loadFromStorage('keywordsDB') || null
  if (!newFontSizes) {
    newFontSizes = { classic: 55, movie: 15, politics: 60, funny: 30 }
  }
  fontSizes = newFontSizes
  saveToStorage('keywordsDB', fontSizes)
}

//---- rendering gallery ----//
function renderGallery() {
  const elGrid = document.querySelector('.grid-container')
  const currSearchValue = document.getElementById('search-input').value
  let gallery
  if (!currSearchValue) {
    gallery = getImgForDisplay()
  } else {
    gallery = getImgBySearchFilter(currSearchValue)
  }

  let htmlStr = gallery.map(
    (img) =>
      `
    <img id="img${img.id}" class="gallery-img gallery-img${img.id}" src="${img.url}" alt="" onclick="onImgSelect(${img.id})">
    `
  )
  elGrid.innerHTML = htmlStr.join('')
}

//---- opening meme editor modal with selected image ----//
function onImgSelect(imgId) {
  const elCanvas = document.getElementById('canvas')
  const img = getImgById(imgId)
  const elImg = document.querySelector(`.gallery-img${img.id}`)

  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  createMeme(img, center)
  renderWebsiteImg(elImg)

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

  const elModal = document.querySelector('.modal')
  elModal.classList.add('open')
}

//---- loading images by search keyword ----//
function onSearchSubmit(e) {
  e.preventDefault()
  const elSearch = document.querySelector('.search-form input')
  const searchVal = elSearch.value

  elSearch.value = ''
}
