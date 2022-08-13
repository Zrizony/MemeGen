
// Save Memes //

function onSavedClick() {
    elNavLinks.classList.remove('active')
    renderSavedMemes()
}

function renderSavedMemes() {
    elMainSaved.style.display = 'grid'
    elSearchContainer.style.display = 'none'
    elMainGallery.style.display = 'none'

    let savedMemes = loadFromStorage('memeDB') || []

    let htmlStr = savedMemes.map(meme =>
        `
            <img onclick="onSavedMemeClick(this)" src="${meme}" alt="" class="saved-meme">
        `
    )

    document.querySelector('.saved-memes-container').innerHTML = htmlStr.join('')
}

function onSavedMemeClick(ev) {
    console.log(ev.src);
    window.open(ev.src)

}