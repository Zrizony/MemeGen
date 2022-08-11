'use strict'

var gElCanvas
var gCtx

function onToggleModal() {
  const modal = document.querySelector('.modal')
  modal.classList.toggle('open')
}

function renderMeme() {
  gElCanvas = document.getElementById('canvas')
  gCtx = canvas.getContext('2d')

  //-- meme object
  const meme = getMeme()
  console.log(' meme:', meme)

  //-- img HTML
  const elImg = document.querySelector(`.img${meme.selectedImgId}`)
  console.log(' elMeme:', elImg)

  //-- rendering image to canvas
  gCtx.drawImage(elImg, 1, 1, elImg.width, elImg.height)
}

//*DOTO - change line input live
function onSubmitText(event) {
  event.preventDefault()

  gElCanvas = document.getElementById('canvas')
  gCtx = canvas.getContext('2d')

  console.log(event)
  let txt = document.querySelector('.meme-form')

  gCtx.font = '3rem Arial'
  gCtx.fillText(txt, 0, gElCanvas.height / 2)
  gCtx.strokeStyle = 'white'
  gCtx.strokeText(txt, 0, gElCanvas.height / 2)
}
//DOTO - change line focus
//DOTO - add line
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
