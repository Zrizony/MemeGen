'use strict'

const STORAGE_KEY = 'memeDB'

var gMeme

function createMeme(selectedImgId, pos) {
  gMeme = {
    selectedImgId,
    selectedLineIdx: 0,
    lines: [
      {
        pos,
        txt: '',
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

//------------Text Settings------------//
function createText() {
  gMeme.lines[0].txt = document.querySelector('.meme-text').value

  let text = gMeme.lines[0].txt
  console.log('text:', text)

  return text
}

//----------------------------------------Private functions - use only in this file!

function _saveMemeToStorage() {
  _saveMemeToStorage(STORAGE_KEY, gMeme)
}
