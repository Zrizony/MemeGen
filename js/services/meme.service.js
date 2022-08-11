'use strict'

var gElCanvas
var gCtx
var gMeme

gElCanvas = document.getElementById('canvas')
gCtx = canvas.getContext('2d')

function createMeme(selectedImgId) {
  gMeme = [
    {
      selectedImgId,
      selectedLineIdx: 0,
      lines: [
        {
          txt: 'never gonna',
          size: 20,
          align: 'left',
          color: 'white',
        },
      ],
    },
  ]
}

function getMeme() {
  return gMeme
}
