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

function uploadImage(ev, onImageReady) {
  var reader = new FileReader()

  reader.onload = (event) => {
    var img = new Image()
    img.src = event.target.result
    img.onload = onImageReady.bind(null, img)
  }

  reader.readAsDataURL(ev.target.files[0])
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

//*DONE - change line input live
function onTypingText() {
  const elText = document.querySelector('.text-edit input').value

  createText(elText, gCurrLine)
  addListeners()
  renderMeme()
}
//DOTO - change line focus
//DOTO - remove line
//DOTO - change font size
//DOTO - change text align side
//DOTO - change text color
//DOTO - change stroke color
//DOTO - add stickers functionality
//DOTO - add download onclick
//DOTO - add save onclick
//DOTO - add share to facebook onclick
//DOTO - drag text on cavnas
