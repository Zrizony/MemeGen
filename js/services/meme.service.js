'use strict'

var gMeme

function createMeme(selectedImgId) {
  gMeme = {
    selectedImgId,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'never gonna',
        size: 20,
        align: 'left',
        fillText: 'white',
        strokeText: 'black',
        isDrag: false,
      },
    ],
  }
}

function getMeme() {
  return gMeme
}
