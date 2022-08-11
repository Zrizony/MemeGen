'use strict'

var gElCanvas
var gCtx

function onToggleModal() {
  const modal = document.querySelector('.modal')
  modal.classList.toggle('open')
}

function renderMeme() {
  gElCanvas = document.getElementById('viewport')
  gCtx = canvas.getContext('2d')

  const meme = getMeme()
  console.log('meme:', meme)

  const elMeme = document.querySelector(`.img${meme.selectedImgId}`)
  console.log('elMeme', elMeme)
  gCtx.drawImage(elMeme, 0, 0, elMeme.width, elMeme.height)
}
