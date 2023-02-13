function main() {
    let addDiv = document.createElement("div")
    let addLabel = document.createElement("button")
    addLabel.classList.add("add")
    addDiv.classList.add("deck")
    addLabel.textContent = "+"
    addLabel.addEventListener("click", () => {
        let name = prompt("Deckname")
        if (name != null && name !== "") {
            let deck = {
                name: name,
                uuid: Math.random(),
                children: [],
                ids: []
            }
            fetch(server.decks, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(deck)
            }).then(r => r.json()).then((res) => {
                console.log(res)
                deck_struct.push(deck)
                document.body.append(getDeckDiv(deck))
            })


        }
    })
    addDiv.append(addLabel)

    document.body.append(addDiv)
    document.getElementById("download-extension-link").addEventListener("click",()=>{
        window.open("https://github.com/leonderdunna/AnkiTube")
    })
    document.getElementById("reload-link").addEventListener("click",()=>{
        location.reload()
    })
    document.getElementById("howto-link").addEventListener("click",()=>{
        window.open("./howto.html")
    })
    document.getElementById("report-link").addEventListener("click",()=>{
        window.open("https://github.com/leonderdunna/AnkiTube/issues")
    })

    fetch(server.cards).then(r => r.json())
        .then((c) => {
            cards = c
            cards_ready = true

        })
    fetch(server.decks).then(r => r.json())
        .then((decks) => {
            deck_struct = decks
            for (let deck of deck_struct) {
                document.body.append(getDeckDiv(deck))
            }
        })

}

function getDeckDiv(deck) {
    let deckDiv = document.createElement("div")
    deckDiv.classList.add("deck", deck.uuid)
    let name = document.createElement("span")
    name.textContent = deck.name
    deckDiv.append(name)

    let addDeckButton = document.createElement("button")
    addDeckButton.textContent = "+ Deck"
    addDeckButton.addEventListener("click", () => {
        let name = prompt("Deckname")
        if (name != null && name !== "") {
            deck.children.push({
                name: name,
                uuid: Math.random(),
                ids: [],
                children: []
            })
            console.log(deck)
            fetch(server.decks, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(getBaseDeck(deck.uuid))
            }).then(r => r.json()).then((res) => {
                console.log(res)
                let p = document.getElementsByClassName(deck.uuid)[0].parentElement
                document.getElementsByClassName(deck.uuid)[0].remove()
                p.append(getDeckDiv(deck))
            })


        }
    })
    deckDiv.append(addDeckButton)

    let addVideoButton = document.createElement("button")
    addVideoButton.textContent = "+ Video"
    addVideoButton.addEventListener("click", () => {
        let id = prompt("Video ID")
        if (id != null && id !== "") {
            deck.ids.push(id)
            console.log(deck)
            fetch(server.decks, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(getBaseDeck(deck.uuid))
            }).then(r => r.json()).then((res) => {
                console.log(res)
                let p = document.getElementsByClassName(deck.uuid)[0].parentElement
                document.getElementsByClassName(deck.uuid)[0].remove()
                p.append(getDeckDiv(deck))
            })
        }
    })
    deckDiv.append(addVideoButton)

    let deletebutton = document.createElement("button")
    deletebutton.textContent = "X"
    deletebutton.addEventListener("click", () => {
        deckDiv.remove()
        removeDeck(deck)
    })
    deckDiv.append(deletebutton)

    let downloadbutton = document.createElement("button")
    downloadbutton.textContent = "↓"
    downloadbutton.addEventListener("click", () => {
        downloadFile(makeTextFile(JSON.stringify(makeDeckBaseDeck(deckStructureToCrowdAnki(deck)))))
    })
    deckDiv.append(downloadbutton)


    if (deck.ids.length > 0) {

        let ids = document.createElement("details")
        let ids_name = document.createElement("summary")
        ids_name.textContent = "Videos: " + deck.ids.length
        ids.append(ids_name)
        let id_ul = document.createElement("ul")
        for (let id of deck.ids) {
            let i = document.createElement("li")
            i.textContent = id
            let löschenbutton = document.createElement("button")
            löschenbutton.textContent = "X"
            löschenbutton.addEventListener("click", () => {
                deck.ids.splice(deck.ids.indexOf(id), 1)
                i.remove()

                fetch(server.decks, {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(getBaseDeck(deck.uuid))
                }).then(r => r.json()).then((res) => {

                    ids_name.textContent = "Videos: " + deck.ids.length
                    if (deck.ids.length === 0)
                        ids.remove()
                })
            })
            i.append(löschenbutton)


            let editButton = document.createElement("button")
            editButton.textContent = "Bearbeiten"
            editButton.addEventListener("click",()=>{
                document.getElementsByClassName("card-edit-main")[0]?.remove()
                document.body.append(getMainPanel("AnkiTube",id))
            })
            i.append(editButton)

            id_ul.append(i)
        }
        ids.append(id_ul)
        deckDiv.append(ids)
    }

    if (deck.children.length > 0) {
        let subDeckUl = document.createElement("ul")
        for (let subdeck of deck.children) {
            let subdeckli = document.createElement("li")
            subdeckli.append(getDeckDiv(subdeck))
            subDeckUl.append(subdeckli)
        }
        deckDiv.append(subDeckUl)
    }


    return deckDiv


}


main()