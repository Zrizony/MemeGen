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

  let wRatio = gElCanvas.width / img.width
  let hRatio = gElCanvas.height / img.height
  let ratio = Math.min(wRatio, hRatio)
  let centerShift_x = (gElCanvas.width - img.width * ratio) / 2
  let centerShift_y = (gElCanvas.height - img.height * ratio) / 2
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

  onRenderText()

  const elModal = document.querySelector('.modal')
  elModal.classList.add('open')
}

//*DONE - add line
function onRenderText() {
  const meme = getMeme()
  for (let i = 0; i < meme.lines.length; i++) {
    const newText = meme.lines[i]
    drawText(
      newText.txt,
      newText.size,
      newText.strokeSize,
      newText.textColor,
      newText.strokeColor,
      newText.x,
      newText.y
    )
    console.log('newText:', newText)
  }
}

function drawText(x, y, color, strokeColor, size, strokeSize, txt) {
  gCtx.beginPath()
  gCtx.font = `${size}px Impact `
  gCtx.lineJoin = 'miter'
  gCtx.miterLimit = 2
  gCtx.fillStyle = color
  gCtx.strokeStyle = strokeColor
  gCtx.lineWidth = strokeSize
  gCtx.strokeText(txt, x, y)
  gCtx.fill()
  gCtx.fillText(txt, x, y)
  gCtx.closePath()
}

function onAddNewText() {
  const elCanvas = document.querySelector('.canvas-container canvas')
  const center = { x: elCanvas.width, y: elCanvas.height }
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
}

//*DONE - add share to facebook onclick
function onShareToFacebook() {
  shareImg()
}

//DOTO - add stickers functionality
