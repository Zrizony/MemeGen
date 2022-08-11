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

  //-- canvas settings
  gCtx.drawImage(elImg, 1, 1, elImg.width, elImg.height)
  gCtx.font = '3rem Arial'
  gCtx.fillText(meme.lines[0].txt, gElCanvas.width / 2, gElCanvas.height / 2)
  gCtx.strokeStyle = 'red'
  gCtx.strokeText(meme.lines[0].txt, gElCanvas.width / 2, gElCanvas.height / 2)
}
