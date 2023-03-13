function getStapelGrid(stapel, parentDeckId) {
    let vidGrid = document.createElement("div")
    vidGrid.classList.add("vid-grid")

    for (let s of stapel) {
        vidGrid.append(getStapelPreview(s, parentDeckId))
    }

    let add = document.createElement("button")
    add.textContent = "Stapel Hinzufügen"
    add.addEventListener("click", async () => {
        let name = prompt("Stapel Name")
        if (name == null || name === "") return
        let link = prompt("Website Link (optional)")

        let stapel = generateStapel(name, link)
        await addStapel(stapel, parentDeckId)
        await navigateToStapel(stapel, parentDeckId)
    })

    vidGrid.append(add)

    return vidGrid

}

function getStapelPreview(stapel, deckId) {
    let vidGrid = document.createElement("div")
    vidGrid.classList.add("vid")

    let name = document.createElement("h2")
    name.textContent = stapel.name;

    let openButton = document.createElement("button")
    openButton.textContent = "Öffnen"
    openButton.addEventListener("click", () => {
        navigateToStapel(stapel, deckId)
    })


    let del = document.createElement("button")
    del.textContent = "Löschen"
    del.addEventListener("click", async () => {
        await removeStapel(stapel.id, deckId)
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

async function getDeckPage(deck) {
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
        downloadFile(makeTextFile(JSON.stringify(makeDeckBaseDeck(await deckStructureToCrowdAnki(await getDeckById(deck.path.at(-1).uuid))))))
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
    vidTitle.textContent = "Stapel";
    deckDiv.append(vidTitle)

    deckDiv.append(getStapelGrid(deck.stapel, deck.path.at(-1).uuid))

    let decksTitle = document.createElement("h3")
    decksTitle.textContent = "Decks"

    deckDiv.append(decksTitle, await getDeckGrid(await Promise.all(deck.children.map(async e => await getDeckById(e))), deck.path))

    return deckDiv

}

function getDeckGrid(decks, path) {
    console.log("getGrid", decks, path)
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
                    await deckStructureToCrowdAnki(
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

async function getStapelPage(stapel, parentDeckId) {

    let back = document.createElement("button")
    back.textContent = "Zurück"
    back.addEventListener("click", () => {
        navigateToDeck(parentDeckId)
    })
    let stapelPage = document.createElement("div")
    let stapelTitle = document.createElement("h2")

    let siteDiv = document.createElement("div")
    let showSite = document.createElement("input")
    showSite.name = "showSite"
    showSite.id = "showSite"
    let showLabl = document.createElement("label")
    showLabl.for = "showSite"
    showLabl.textContent = "Material anzeigen"
    showSite.type = "checkbox"

    showSite.addEventListener("change",()=>{
        let box = document.querySelector("#showSite")
        if(box.checked){
            siteDiv.append(site)
        } else{
            site.remove()
        }
    })


    let site;
    if (stapel.type !== "none") {
        site = document.createElement("iframe")
        let id = stapel.id.replaceAll("[__]", "/")

        if (stapel.type === "youtube")
            site.src = "https://www.youtube.com/embed/" + id
        if (stapel.type === "odysee")
            site.src = "https://odysee.com/$/embed/" + id + "?r=9EqVxCnfSEaYxDvcsTVkbmqTjt24F2ti"
        if (stapel.type === "web")
            site.src = id;
        if (stapel.type === "ipfs") {
            site.src = "ipfs://" + id;
        }

    } else site = ""

    site.id="site"
    siteDiv.append(showSite,showLabl, document.createElement("br"))

    stapelTitle.textContent = stapel.name
    let stapelId = document.createElement("span")
    stapelId.textContent = "id: " + stapel.id
    let cards = document.createElement("div")
    console.log(await getCardsByStapelId(stapel.id))
    cards.append(...await getCardsByStapelId(stapel.id).then(r => r.map(e => getCardComponent(e))))

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
        cards.append(getCardComponent(newCard(select.value, stapel.id)))
    })


    stapelPage.append(stapelTitle, stapelId, back, siteDiv,document.createElement("br"), cards, add, select)
    return stapelPage

}

function getCardComponent(card) {

    let cardComponent = document.createElement("div")
    cardComponent.classList.add("card")
    let fields = []

    if (card.type === "Basic") {
        let q = document.createElement("input")
        q.placeholder = "Frage"
        q.value = card.question
        let a = document.createElement("textarea")
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
        let t = document.createElement("textarea")
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
    del.addEventListener("click", async () => {
        cardComponent.remove();
        await removeCard(card)
    })

    let fieldsComp = document.createElement("div")
    fieldsComp.append(...fields)

    cardComponent.append(fieldsComp, del)

    return cardComponent

}

function test() {
    //navigateToStapel("asödlfkj")
}

function clearPage() {
    while (document.querySelector(".page")) {
        document.querySelector(".page").remove()
    }
}

async function navigateToMain() {
    let params = new URLSearchParams(window.location.search)
    params.delete("page")
    params.delete("id")
    //TODO wieder anstellen
    //history.replaceState(null, null, "/?" + params.toString())


    let deckList = await getDeckList()
    clearPage()
    let grid = getDeckGrid(deckList, [])
    grid.classList.add("page")
    document.body.append(grid)
    //console.log("→ Main")
}

async function navigateToDeck(id) {

    console.log("search", window.location.search)
    let params = new URLSearchParams(window.location.search)
    params.set("page", "deck")
    params.set("id", id)
    //TODO wieder anstellenf
    //history.replaceState(null, null, "/?" + params.toString())

    clearPage()
    let deck = await getDeckById(id)

    if (deck === undefined) {
        alert("Deck nicht gefunden")
        await navigateToMain()
    }
    let page = await getDeckPage(deck)
    page.classList.add("page")
    document.body.append(page)
    console.log("→ Deck: " + id)
}


async function navigateToStapel(stapel, parentDeckId) {

    clearPage()
    let vid = await getStapelPage(stapel, parentDeckId)
    vid.classList.add("page")
    document.body.append(vid)
    console.log("→ Stapel: " + stapel.id)
}

async function init() {

    document.querySelector("h1").addEventListener("click", navigateToMain)
    let params = new URLSearchParams(window.location.search)
    if (params.get("page") === "deck")
        await navigateToDeck(params.get("id"))
    else await navigateToMain()
}

init()
test()