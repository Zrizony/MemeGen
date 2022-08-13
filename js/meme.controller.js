'use strict'

let gElCanvas
let gCtx
let gStartPos
let gUploadImg

const gElCanvasContainer = document.querySelector('.canvas-container')
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

//---- opening editor modal ----//
function onToggleModal() {
  const modal = document.querySelector('.modal')
  modal.classList.toggle('open')
}

//---- changing canvas size to fit image size ----//
function resizeCanvas() {
  gElCanvas.width = gElCanvasContainer.offsetWidth
  gElCanvas.height = gElCanvasContainer.offsetHeight
}

//---- rendering selected img into canvas ----//
function renderWebsiteImg(elImg) {
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

//-- uplaoding image from user computer
function uploadImage(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = (event) => {
    var img = new Image()
    img.src = event.target.result
    img.onload = onImageReady.bind(null, img)
  }

  reader.readAsDataURL(ev.target.files[0])
}

//-- rendering image from user computer
function renderImg(img) {
  gUploadImg = img

  const hRatio = gElCanvas.width / img.width
  const vRatio = gElCanvas.height / img.height
  const ratio = Math.min(hRatio, vRatio)
  var centerShift_x = (gElCanvas.width - img.width * ratio) / 2
  var centerShift_y = (gElCanvas.height - img.height * ratio) / 2
  gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
  gCtx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  )
}

//-- rendering meme on canvas
function renderMeme() {
  const currMeme = getMeme()

  const elImg = document.getElementById(`img${currMeme.selectedImgId}`)

  if (!elImg) {
    renderImg(gUploadImg)
  } else {
    renderWebsiteImg(elImg)
  }
  renderText()
}

//-- rendering text
function renderText() {
  const meme = getMeme()
  for (let i = 0; i < meme.lines.length; i++) {
    const newText = meme.lines[i]
    drawText(
      newText.pos.x,
      newText.pos.y,
      newText.textColor,
      newText.strokeColor,
      newText.size,
      newText.strokeSize,
      newText.txt
    )
  }
}

//-- setting default text look and changing it by user onclicks
function drawText(x, y, TextColor, strokeColor, size, strokeSize, text) {
  gCtx.beginPath()
  gCtx.font = `${size}px Impact `
  gCtx.lineJoin = 'miter'
  gCtx.miterLimit = 2
  gCtx.fillStyle = TextColor
  gCtx.strokeStyle = strokeColor
  gCtx.lineWidth = strokeSize
  gCtx.strokeText(text, x, y)
  gCtx.fill()
  gCtx.fillText(text, x, y)
  gCtx.closePath()
}

//---- Editor onclicks ----//

//-- adding new text line
function onAddNewText() {
  const elCanvas = document.querySelector('.canvas-container canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  newTextLine(center)
  document.querySelector('.text-edit input').value = ''
}

//-- rendering text on meme on input
function onTypingText() {
  const elText = document.querySelector('.text-edit input').value

  createText(elText, gCurrLine)
  addListeners()
  renderMeme()
}

//-- change font size
function onFontSizeUp() {
  fontSizeUp()
  renderMeme()
}

function onFontSizeDown() {
  fontSizeDown()
  renderMeme()
}

//-- change stroke size
function onStrokeSizeUp() {
  strokeSizeUp()
  renderMeme()
}

function onStrokeSizeDown() {
  strokeSizeDown()
  renderMeme()
}

//-- change font color
function onFontColorChange() {
  const elFontColorVal = document.querySelector('.font-color').value
  fontColorChange(elFontColorVal)
  renderMeme()
}

//-- change stroke color
function onStrokeColorChange() {
  const elStrokeColorVal = document.querySelector('.stroke-color').value
  strokeColorChange(elStrokeColorVal)
  renderMeme()
}

//-- change text line focus
function onChangeLine() {
  changeTextFocus()
  const currTextLine = getMeme().lines[gCurrLine].txt
  document.querySelector('.text-edit input').value = currTextLine
}

//-- delete focused text line
function onDeleteText() {
  const elCanvas = document.getElementById('canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  deleteText(center)
  renderMeme()
  const currTextLine = getMeme().lines[gCurrLine].txt
  document.querySelector('.text-edit input').value = currTextLine
}

//-- download meme
function onDownload() {
  const elDownload = document.querySelector('.btn-download a')
  elDownload.download = 'meme.jpg'
  elDownload.href = gElCanvas.toDataURL()
}

//-- save meme
function onSave() {
  saveImg()
  flashMsg('Saved meme')
}

//-- share meme to facebook
function onShareToFacebook() {
  shareImg()
}

//---- flash msg to notify small updates ----//
function flashMsg(msg) {
  const el = document.querySelector('.flash-msg')
  el.innerText = msg
  el.classList.add('open')
  setTimeout(() => {
    el.classList.remove('open')
  }, 3000)
}

//---- adding listeners ----//
function addListeners() {
  addMouseListeners()
  addTouchListeners()
  window.addEventListener('resize', () => {
    resizeCanvas()
    renderCanvas()
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}