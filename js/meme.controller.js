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

//---- self explanatory ----//
function resizeCanvas() {
  gElCanvas.width = gElCanvasContainer.offsetWidth
  gElCanvas.height = gElCanvasContainer.offsetHeight
}

//---- rendering selected img into canvas ----//
function renderWebsiteImg(elImg) {
  gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function uploadImage(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = (event) => {
    var img = new Image()
    img.src = event.target.result
    img.onload = onImageReady.bind(null, img)
  }

  reader.readAsDataURL(ev.target.files[0])
}

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

//*DONE - add line
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
function onAddNewText() {
  const elCanvas = document.querySelector('.canvas-container canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  newTextLine(center)
  document.querySelector('.text-edit input').value = ''
}

//*DONE - change line input live
function onTypingText() {
  const elText = document.querySelector('.text-edit input').value

  createText(elText, gCurrLine)
  addListeners()
  renderMeme()
}

//*DONE - change font size
function onFontSizeUp() {
  fontSizeUp()
  renderMeme()
}

function onFontSizeDown() {
  fontSizeDown()
  renderMeme()
}

function onStrokeSizeUp() {
  strokeSizeUp()
  renderMeme()
}

function onStrokeSizeDown() {
  strokeSizeDown()
  renderMeme()
}

//*DONE - change text color
function onFontColorChange() {
  const elFontColorVal = document.querySelector('.font-color').value
  fontColorChange(elFontColorVal)
  renderMeme()
}

//*DONE - change stroke color
function onStrokeColorChange() {
  const elStrokeColorVal = document.querySelector('.stroke-color').value
  strokeColorChange(elStrokeColorVal)
  renderMeme()
}

//*DONE - change line focus
function onChangeLine() {
  changeTextFocus()
  const currTextLine = getMeme().lines[gCurrLine].txt
  document.querySelector('.text-edit input').value = currTextLine
}

//*DONE - remove line
function onDeleteText() {
  const elCanvas = document.getElementById('canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  deleteText(center)
  renderMeme()
  const currTextLine = getMeme().lines[gCurrLine].txt
  document.querySelector('.text-edit input').value = currTextLine
}

//*DONE - add download onclick
function onDownload() {
  const elDownload = document.querySelector('.edit-download button a')
  elDownload.download = 'meme.jpg'
  elDownload.href = gElCanvas.toDataURL()
}

//*DONE - add save onclick
function onSave() {
  saveImg()
  flashMsg('Saved meme')
}

//*DONE - add share to facebook onclick
function onShareToFacebook() {
  shareImg()
}

//DOTO - add stickers functionality

//---- flash msg to notify small updates ----//
function flashMsg(msg) {
  const el = document.querySelector('.flash-msg')
  el.innerText = msg
  el.classList.add('open')
  setTimeout(() => {
    el.classList.remove('open')
  }, 3000)
}
