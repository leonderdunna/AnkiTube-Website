function getVideoGrid(videos, parentDeckId) {
    let vidGrid = document.createElement("div")
    vidGrid.classList.add("vid-grid")

    for (let video of videos) {
        vidGrid.append(getVideoPreview(video))
    }

    let add = document.createElement("button")
    add.textContent = "Video Hinzufügen"
    add.addEventListener("click", () => {
        let name = prompt("Video Name")
        if (name == null || name === "") return
        let id = prompt("Video ID")
        if (id == null || id === "") return
        let video = {name: name, id: id}
        addVideo(video, parentDeckId)
        navigateToVideo(video, parentDeckId)
    })

    vidGrid.append(add)

    return vidGrid

}

function getVideoPreview(video, deckId) {
    let vidGrid = document.createElement("div")
    vidGrid.classList.add("vid")

    let name = document.createElement("h2")
    name.textContent = video.name;

    let openButton = document.createElement("button")
    openButton.textContent = "Öffnen"
    openButton.addEventListener("click", () => {
        navigateToVideo(video, deckId)
    })


    let del = document.createElement("button")
    del.textContent = "Löschen"
    del.addEventListener("click",()=>{
        removeVideo(video.id,deckId)
        navigateToDeck(deckId)
    })

    vidGrid.append(name, del, openButton)

    return vidGrid
}

function getDeckPage(deck) {

    let deckDiv = document.createElement("div")
    let name = document.createElement("h2")
    name.textContent = deck.path.join(" / ");
    deckDiv.append(name)


    let move = document.createElement("button")
    move.textContent = "Verschieben"
    deckDiv.append(move)


    let download = document.createElement("button")
    download.textContent = "Herunterladen"
    download.addEventListener("click",async () => {
        downloadFile(makeTextFile(JSON.stringify(makeDeckBaseDeck(deckStructureToCrowdAnki(await getDeckById(deck.uuid))))))
    })
    deckDiv.append(download)

    let del = document.createElement("button")
    del.textContent = "Löschen"
    deckDiv.append(del)

    let vidTitle = document.createElement("h3")
    vidTitle.textContent = "Videos";
    deckDiv.append(vidTitle)

    deckDiv.append(getVideoGrid(deck.videos))

    let decksTitle = document.createElement("h3")
    decksTitle.textContent = "Decks"

    deckDiv.append(decksTitle, getDeckGrid(deck.children, deck.uuid))

    return deckDiv

}

function getDeckGrid(decks, parentDeckId) {
    let decksDiv = document.createElement("div")
    decksDiv.classList.add("decks-grid")
    for (let deck of decks) {
        let deckDiv = document.createElement("div")
        deckDiv.classList.add("deck")
        let deckName = document.createElement("h2")
        deckName.textContent = deck.name;

        let downloadButton = document.createElement("button")
        downloadButton.textContent = "Herunterladen"
        let editButton = document.createElement("button")
        editButton.textContent = "Öffnen"


        //CLICK LISTENERS
        editButton.addEventListener("click", () => {
            navigateToDeck(deck.uuid).then()
        })
        downloadButton.addEventListener("click", async () => {
            console.log(deck)
            downloadFile(makeTextFile(
                JSON.stringify(makeDeckBaseDeck(
                    deckStructureToCrowdAnki(
                        await getDeckById(deck.uuid))))))
        })

        deckDiv.append(deckName, downloadButton, editButton)

        decksDiv.append(deckDiv)
    }
    let add = document.createElement("button")
    add.textContent = "Deck Hinzufügen"

    add.addEventListener("click", () => {
        let newDeckId = createDeck(prompt("Deck Name"))
        if (parentDeckId != null)
            addChild(newDeckId, parentDeckId)
        navigateToDeck(newDeckId)
    })

    decksDiv.append(add)

    return decksDiv;

}

function getVideoPage(video, parentDeckId) {

    let back = document.createElement("button")
    back.textContent = "Zurück"
    back.addEventListener("click", () => {
        navigateToDeck(parentDeckId)
    })
    let videoPage = document.createElement("div")
    let videoTitle = document.createElement("h2")
    let vid = document.createElement("iframe")
    vid.src = "https://www.youtube.com/embed/" + video.id
    videoTitle.textContent = video.name
    let videoId = document.createElement("span")
    videoId.textContent = "id: " + video.id
    let cards = document.createElement("div")
    cards.append(...getCardsByVideoId(video.id).map(e => getCardComponent(e)))

    let add = document.createElement("button")
    add.textContent = "Neue Karte"


    videoPage.append(videoTitle, videoId, back, document.createElement("br"), vid, cards, add)
    return videoPage

}

function getCardComponent(card) {

    let cardComponent = document.createElement("div")
    let fields = []

    if (card.type === "Basic") {
        let q = document.createElement("input")
        q.placeholder = "Frage"
        q.value = card.question
        let a = document.createElement("input")
        a.placeholder = "Antwort"
        a.value = card.answer

        fields.push(q, document.createElement("br"), a)
    }
    if (card.type === "Cloze") {
        let t = document.createElement("input")
        t.placeholder = "{{c1::Lückentext}}"
        t.value = card.text

        fields.push(t)
    }

    let del = document.createElement("button")
    del.textContent = "Löschen"

    let fieldsComp = document.createElement("div")
    fieldsComp.append(...fields)

    cardComponent.append(fieldsComp, del)

    return cardComponent

}

function test() {
    //navigateToDeck("asödlfkj").then()
}

function clearPage() {
    while (document.querySelector(".page")) {
        document.querySelector(".page").remove()
    }
}

async function navigateToMain() {
    let deckList = await getDeckList()
    clearPage()
    let grid = getDeckGrid(deckList)
    grid.classList.add("page")
    document.body.append(grid)
    console.log("→ Main")
}

async function navigateToDeck(id) {
    clearPage()
    let deck = await getDeckById(id)
    let page = getDeckPage(deck)
    page.classList.add("page")
    document.body.append(page)
    console.log("→ Deck: " + id)
}

async function navigateToVideo(video, parentDeckId) {
    clearPage()
    let vid = getVideoPage(video, parentDeckId)
    vid.classList.add("page")
    document.body.append(vid)
    console.log("→ Video: " + video.id)
}

function init() {
    document.querySelector("h1").addEventListener("click", navigateToMain)
    navigateToMain();
}

init()
test()