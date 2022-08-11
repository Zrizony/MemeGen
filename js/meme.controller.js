'use strict'

var gElCanvas
var gCtx
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

//---- opening editor modal
function onToggleModal() {
  const modal = document.querySelector('.modal')
  modal.classList.toggle('open')
}

//---- rendering selected img into canvas
function renderMeme() {
  gElCanvas = document.getElementById('canvas')
  gCtx = canvas.getContext('2d')

  //-- meme object
  const meme = getMeme()
  console.log(' meme:', meme)

  //-- img HTML
  const elImg = document.querySelector(`.img${meme.selectedImgId}`)
  console.log(' elMeme:', elImg)

  //-- img into cavnas
  gCtx.drawImage(elImg, 1, 1, elImg.width, elImg.height)
}

//*DOTO - change line input live
function renderText() {
  gElCanvas = document.getElementById('canvas')
  gCtx = canvas.getContext('2d')

  let txt = createText()

  gCtx.font = '3rem Impact'
  gCtx.textAlign = 'center'
  gCtx.textBaseline = 'middle'
  gCtx.fillStyle = 'white'
  gCtx.fillText(txt, gElCanvas.width / 2, gElCanvas.height / 2)
  gCtx.strokeStyle = 'black'
  gCtx.strokeText(txt, gElCanvas.width / 2, gElCanvas.height / 2)

  gCurrText++
  document.querySelector('.meme-text').value = ''
}

//DOTO - add line
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
