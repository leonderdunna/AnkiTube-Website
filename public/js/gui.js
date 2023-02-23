function getVideoGrid(videos, parentDeckId) {
    let vidGrid = document.createElement("div")
    vidGrid.classList.add("vid-grid")

    for (let video of videos) {
        vidGrid.append(getVideoPreview(video, parentDeckId))
    }

    let add = document.createElement("button")
    add.textContent = "Video Hinzufügen"
    add.addEventListener("click", async () => {
        let name = prompt("Video Name")
        if (name == null || name === "") return
        let id = prompt("Video ID")
        if (id == null || id === "") return
        let video = {name: name, id: id}
        await addVideo(video, parentDeckId)
        await navigateToVideo(video, parentDeckId)
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
    del.addEventListener("click", async () => {
        await removeVideo(video.id, deckId)
        await navigateToDeck(deckId)
    })

    vidGrid.append(name, del, openButton)

    return vidGrid
}

function getPathDiv(path) {
    let pd = document.createElement("h2")
    for (let p of path) {
        let ps = document.createElement("span")
        ps.textContent = path.indexOf(p) === path.length - 1 ? p.name : p.name + " / "
        ps.classList.add("path-link")
        ps.addEventListener("click", () => {
            navigateToDeck(p.uuid)
        })
        pd.append(ps)
    }
    return pd
}

function getDeckPage(deck) {
    console.log("startgetdeckPage", deck)

    let deckDiv = document.createElement("div")
    deckDiv.append(getPathDiv(deck.path))

    /*  //Könnte man mal ergenzen. bin ich jetzt aber zu Faul und ist denke ich nichts so wichtig
        let move = document.createElement("button")
        move.textContent = "Verschieben"
        deckDiv.append(move)
    */

    let download = document.createElement("button")
    download.textContent = "Herunterladen"
    download.addEventListener("click", async () => {
        downloadFile(makeTextFile(JSON.stringify(makeDeckBaseDeck(deckStructureToCrowdAnki(await getDeckById(deck.path.at(-1).uuid))))))
    })
    deckDiv.append(download)

    let del = document.createElement("button")
    del.textContent = "Löschen"
    del.addEventListener("click", async () => {
        await removeDeck(deck)
        console.log("del", deck.path.at(-2))
        deck.path.length > 1 ? await navigateToDeck(deck.path.at(-2).uuid) : await navigateToMain()
    })
    deckDiv.append(del)

    let vidTitle = document.createElement("h3")
    vidTitle.textContent = "Videos";
    deckDiv.append(vidTitle)

    deckDiv.append(getVideoGrid(deck.videos, deck.path.at(-1).uuid))

    let decksTitle = document.createElement("h3")
    decksTitle.textContent = "Decks"

    deckDiv.append(decksTitle, getDeckGrid(deck.children.map(e => getDeckById(e)), deck.path))

    return deckDiv

}

function getDeckGrid(decks, path) {
    let decksDiv = document.createElement("div")
    decksDiv.classList.add("decks-grid")
    for (let deck of decks) {
        let deckDiv = document.createElement("div")
        deckDiv.classList.add("deck")
        let deckName = document.createElement("h2")
        deckName.textContent = deck.path.at(-1).name;

        let downloadButton = document.createElement("button")
        downloadButton.textContent = "Herunterladen"
        let editButton = document.createElement("button")
        editButton.textContent = "Öffnen"


        //CLICK LISTENERS
        editButton.addEventListener("click", async () => {
            await navigateToDeck(deck.path.at(-1).uuid)
        })
        downloadButton.addEventListener("click", async () => {
            //TODO Download enthält glaube ich noch keine karten lol
            console.log(deck)
            downloadFile(makeTextFile(
                JSON.stringify(makeDeckBaseDeck(
                    deckStructureToCrowdAnki(
                        await getDeckById(deck.path.at(-1).uuid))))))
        })

        deckDiv.append(deckName, downloadButton, editButton)

        decksDiv.append(deckDiv)
    }
    let add = document.createElement("button")
    add.textContent = "Deck Hinzufügen"

    add.addEventListener("click", async () => {
        let name = prompt("Deck Name")
        if (name == null || name === "") return
        let newDeckId = await createDeck(name, path)
        if (path.length > 0)
            await addChild(newDeckId, path.at(-1).uuid)
        await navigateToDeck(newDeckId)
    })

    decksDiv.append(add)

    return decksDiv;

}

async function getVideoPage(video, parentDeckId) {

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
    console.log(await getCardsByVideoId(video.id))
    cards.append(...await getCardsByVideoId(video.id).then(r => r.map(e => getCardComponent(e))))

    let add = document.createElement("button")
    add.textContent = "Neue Karte"

    let select = document.createElement("select")
    let options = [{name: "Lückentext", value: "Cloze"}, {name: "Standard", value: "Basic"}].map((e) => {
        let o = document.createElement("option")
        o.textContent = e.name;
        o.value = e.value;
        return o
    })
    select.append(...options)

    add.addEventListener("click", () => {
        //TODO
        cards.append(getCardComponent(newCard(select.value, video.id)))
    })


    videoPage.append(videoTitle, videoId, back, document.createElement("br"), vid, cards, add, select)
    return videoPage

}

function getCardComponent(card) {

    let cardComponent = document.createElement("div")
    cardComponent.classList.add("card")
    let fields = []

    if (card.type === "Basic") {
        let q = document.createElement("input")
        q.placeholder = "Frage"
        q.value = card.question
        let a = document.createElement("input")
        a.placeholder = "Antwort"
        a.value = card.answer

        q.addEventListener("change", () => {
            card.question = q.value;

            saveCard(card).then()

        })
        a.addEventListener("change", () => {
            card.answer = a.value;

            saveCard(card).then()

        })


        fields.push(q, document.createElement("br"), a)
    }
    if (card.type === "Cloze") {
        let t = document.createElement("input")
        t.placeholder = "{{c1::Lückentext}}"
        t.value = card.text

        t.addEventListener("change", () => {
            card.text = t.value;

            saveCard(card)

        })

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
    //navigateToVideo("asödlfkj")
}

function clearPage() {
    while (document.querySelector(".page")) {
        document.querySelector(".page").remove()
    }
}

async function navigateToMain() {

    let deckList = await getDeckList()
    clearPage()
    let grid = getDeckGrid(deckList, [])
    grid.classList.add("page")
    document.body.append(grid)
    console.log("→ Main")
}

async function navigateToDeck(id) {
    await aktualisieren(true, false)
    clearPage()
    let deck = getDeckById(id)
    let page = getDeckPage(deck)
    page.classList.add("page")
    document.body.append(page)
    console.log("→ Deck: " + id)
}


async function navigateToVideo(video, parentDeckId) {
    await aktualisieren(false, true)
    clearPage()
    let vid = await getVideoPage(video, parentDeckId)
    vid.classList.add("page")
    document.body.append(vid)
    console.log("→ Video: " + video.id)
}

async function init() {
    document.querySelector("h1").addEventListener("click", navigateToMain)
    await navigateToMain();
}

init()
test()