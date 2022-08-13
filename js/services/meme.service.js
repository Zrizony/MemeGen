'use strict'

var gMeme
var gCurrLine

//---- create single meme ----//
function createMeme(imgId, pos) {
  gCurrLine = 0
  gMeme = {
    selectedImgId: imgId.id,
    selectedLineIdx: gCurrLine,
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
  gMeme.lines[selectedLineIdx].txt = memeText
}

//-- add new text line
function newTextLine(pos) {
  let newText = {
    txt: '',
    size: 40,
    strokeSize: 8,
    color: 'white',
    strokeColor: 'black',
    pos,
    isDrag: false,
  }

  gMeme.lines.push(newText)
  gCurrLine = gMeme.lines.length -1
}

//-- change text line focus
function changeTextFocus() {
  if (gCurrLine === gMeme.lines.length - 1) {
    gCurrLine = 0
  } else {
    gCurrLine++
  }
}

//-- delete focused text line
function deleteText(pos) {
  if (gMeme.lines.length === 1) {
    gMeme.lines[gCurrLine].txt = ''
    gMeme.lines[gCurrLine].pos = pos
    document.querySelector('.text-edit input').value = ''
    return
  }
  gMeme.lines.splice(gCurrLine, 1)
  if (!gCurrLine === 0) gCurrLine--
}

//-- changes font size
function fontSizeUp() {
  gMeme.lines[gCurrLine].size += 2
}

function fontSizeDown() {
  if (gMeme.lines[gCurrLine].size === 10) return
  gMeme.lines[gCurrLine].size -= 2
}

//-- changes stroke size
function strokeSizeUp() {
  gMeme.lines[gCurrLine].strokeSize += 1
}

function strokeSizeDown() {
  if (gMeme.lines[gCurrLine].strokeSize === 0) return
  gMeme.lines[gCurrLine].strokeSize -= 1
}

//-- changes font color
function fontColorChange(fontColor) {
  gMeme.lines[gCurrLine].textColor = fontColor
}

//-- changes stroke color
function strokeColorChange(strokeColor) {
  gMeme.lines[gCurrLine].strokeColor = strokeColor
}

//---- handle eventListeners ----//
function onDown(ev) {
  // Getting the clicked position
  const pos = getEvPos(ev)
  if (!isTextClicked(pos)) return
  setTextDrag(true)
  gStartPos = pos
  document.querySelector('.canvas-container canvas').style.cursor = 'grabbing'
}

function onMove(ev) {
  const meme = getMeme()

  if (!meme.lines[gCurrLine].isDrag) return
  const pos = getEvPos(ev)
  const dx = pos.x - gStartPos.x
  const dy = pos.y - gStartPos.y
  moveText(dx, dy)
  gStartPos = pos
  renderMeme()
}

function getEvPos(ev) {
  var pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  }
  // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault()
    ev = ev.changedTouches[0]
    pos = {
      x: ev.pageX - ev.target.offsetLeft,
      y: ev.pageY - ev.target.offsetTop,
    }
  }
  return pos
}

function onUp() {
  setTextDrag(false)
  gElCanvas.style.cursor = 'grab'
}

//---- handle text dragging ----//
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
