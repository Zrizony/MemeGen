'use strict'

const STORAGE_KEY = 'memeDB'

var gMeme
var gCurrText = 0

function createMeme(selectedImgId) {
  gMeme = {
    selectedImgId,
    selectedLineIdx: 0,
    lines: [
      {
        txt: '',
        size: 20,
        align: 'left',
        fillText: 'white',
        strokeText: 'black',
        onFocus: false,
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
  gMeme.lines[gCurrText].txt = document.querySelector('.meme-text').value

  let text = gMeme.lines[gCurrText].txt
  console.log('text:', text)

  gMeme.lines.push({
    txt: '',
    size: 20,
    align: 'left',
    fillText: 'white',
    strokeText: 'black',
    onFocus: false,
    isDrag: false,
  })
  console.log('gMeme.lines:', gMeme.lines)

  return text
}

//----------------------------------------Private functions - use only in this file!

function _saveMemeToStorage() {
  _saveMemeToStorage(STORAGE_KEY, gMeme)
}
