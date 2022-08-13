
// Save Memes //

function onSavedClick() {
    renderSavedMemes()
    removeMenu()
}

function renderSavedMemes() {
    elMainSaved.style.display = 'grid'
    elMainEdit.style.display = 'none'
    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'

    let savedMemes = loadFromStorage('memeDB') || []

    let htmlStr = savedMemes.map(meme =>
        `<section class="saved-memes-container">
            <img onclick="onSavedMemeClick(this)" src="${meme}" alt="" class="saved-meme">
        </section>`
    )

    document.querySelector('.saved-memes-container').innerHTML = htmlStr.join('')
}

function onSavedMemeClick(ev) {
    console.log(ev.src);
    window.open(ev.src)

}