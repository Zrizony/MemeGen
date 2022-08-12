'use strict'

const STORAGE_KEY = 'memeDB'

var gMeme
var gCurrText

//---- create single meme ----//
function createMeme(imgId, pos) {
  gCurrText = 0
  gMeme = {
    selectedImgId: imgId.id,
    selectedLineIdx: gCurrText,
    lines: [
      {
        txt: '',
        size: 40,
        strokeSize: 8,
        textColor: 'white',
        strokeColor: 'black',
        pos,
        onFocus: false,
        isDrag: false,
      },
    ],
  }
}

//---- get meme to render safely ----//
function getMeme() {
  const meme = gMeme
  return meme
}

//------------Text Settings------------//
function createText(memeText, selectedLineIdx) {
  gMeme.lines[selectedLineIdx].text = memeText
}

function newTextLine(pos) {
  let newText = {
    txt: '',
    align: 'center',
    size: 40,
    strokeSize: 8,
    textColor: 'white',
    strokeColor: 'black',
    onFocus: false,
    isDrag: false,
    pos,
  }

  gMeme.lines.push(newText)
  gCurrText++
}

function changeTextFocus() {
  if (gCurrLine === gMeme.lines.length - 1) {
    gCurrLine = 0
  } else {
    gCurrLine++
  }
}

function deleteText(pos) {
  if (gMeme.lines.length === 1) {
    gMeme.lines[gCurrLine].text = ''
    gMeme.lines[gCurrLine].pos = pos
    document.querySelector('.edit-text input').value = ''
    return
  }
  gMeme.lines.splice(gCurrLine, 1)
  if (!gCurrLine === 0) gCurrLine--
}

function fontSizeUp() {
  gMeme.lines[gCurrLine].size += 2
}

function fontSizeDown() {
  if (!gMeme.lines[gCurrLine].size === 10) gMeme.lines[gCurrLine].size -= 2
}

function strokeSizeUp() {
  gMeme.lines[gCurrLine].strokeSize += 1
}

function strokeSizeDown() {
  if (!gMeme.lines[gCurrLine].strokeSize === 0) {
    gMeme.lines[gCurrLine].strokeSize -= 1
  }
}

function fontColorChange(fontColor) {
  gMeme.lines[gCurrLine].color = fontColor
}

function strokeColorChange(strokeColor) {
  gMeme.lines[gCurrLine].strokeColor = strokeColor
}

// handle text dragging //
function isTextClicked(clickedPos) {
  const { pos } = gMeme.lines[gCurrLine]
  const distance = Math.sqrt(
    (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
  )
  return distance <= 50
}

function setTextDrag(isDrag) {
  gMeme.lines[gCurrLine].isDrag = isDrag
}

function moveText(dx, dy) {
  gMeme.lines[gCurrLine].pos.x += dx
  gMeme.lines[gCurrLine].pos.y += dy
}

//----------------------------------------Private functions - use only in this file!

function _saveMemeToStorage() {
  _saveMemeToStorage(STORAGE_KEY, gMeme)
}
