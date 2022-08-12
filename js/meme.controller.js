'use strict'

var gElCanvas
var gCtx
var gStartPos
var gUserImg

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
const gElCanvasContainer = document.querySelector('.canvas-container')

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
function renderMeme() {
  //-- meme object
  const currMeme = getMeme()

  //-- img HTML
  const elImg = document.querySelector(`.img${currMeme.selectedImgId}`)

  //-- img into cavnas
  if (!elImg) {
    //-- render img uploaded by the user
    renderImg(gUserImg)
  } else {
    //--render img chosen from the website stock
    renderWebsiteImg(elImg)
  }

  renderText()
}

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
  gUserImg = img

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

//*DONE - add line
function renderText() {
  const meme = getMeme()
  for (let i = 0; i < meme.lines.length; i++) {
    const newText = meme.lines[i]
    drawText(
      newText.pos.x,
      newText.pos.y,
      newText.color,
      newText.strokeColor,
      newText.size,
      newText.strokeSize,
      newText.text
    )
  }
}

function drawText(x, y, color, strokeColor, size, strokeSize, text) {
  gCtx.beginPath()
  gCtx.font = `${size}px Impact `
  gCtx.lineJoin = 'miter'
  gCtx.miterLimit = 2
  gCtx.fillStyle = color
  gCtx.strokeStyle = strokeColor
  gCtx.lineWidth = strokeSize
  gCtx.strokeText(text, x, y)
  gCtx.fill()
  gCtx.fillText(text, x, y)
  gCtx.closePath()
}

function onAddNewText() {
  const elCanvas = document.querySelector('.canvas-container canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  newTextLine(center)
  document.querySelector('.edit-text input').value = ''
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
  const currTextLine = getMeme().lines[gCurrLine].text
  document.querySelector('.edit-text input').value = currTextLine
}

//*DONE - remove line
function onDeleteText() {
  const elCanvas = document.querySelector('.canvas-container canvas')
  const center = { x: elCanvas.width / 2, y: elCanvas.height / 2 }
  deleteText(center)
  renderMeme()
  const currTextLine = getMeme().lines[gCurrLine].text
  document.querySelector('.edit-text input').value = currTextLine
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
}

//*DONE - add share to facebook onclick
function onShareToFacebook() {
  shareImg()
}

//DOTO - add stickers functionality
