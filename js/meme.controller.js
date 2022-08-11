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
  const meme = getMeme()
  console.log(' meme:', meme)

  const elImg = document.querySelector(`.img${meme.selectedImgId}`)
  console.log(' elMeme:', elImg)
  gCtx.drawImage(elImg, 1, 1, elImg.width, elImg.height)
  gCtx.font = '3rem Ariel'
  gCtx.fillText('Hello', gElCanvas.width / 2, gElCanvas.height / 2)
}
