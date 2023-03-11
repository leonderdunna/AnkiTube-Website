const model_uuid = {
    cloze: "05995762-aaef-11ed-9c2a-237115d9c292", basic: "58b7eb48-a586-11ed-a34c-9bbd37c88a3c"
}
const note_models = [
    {
        "__type__": "NoteModel",
        "crowdanki_uuid": "58b7eb48-a586-11ed-a34c-9bbd37c88a3c",
        "css": ".card {\n font-family: arial;\n font-size: 20px;\n text-align: center;\n color: black;\n background-color: white;\n}\n",
        "flds": [{
            "collapsed": false,
            "description": "",
            "font": "Arimo",
            "media": [],
            "name": "Front",
            "ord": 0,
            "plainText": false,
            "rtl": false,
            "size": 20,
            "sticky": false
        }, {
            "collapsed": false,
            "description": "",
            "font": "Arial",
            "media": [],
            "name": "Back",
            "ord": 1,
            "plainText": false,
            "rtl": false,
            "size": 20,
            "sticky": false
        }],
        "latexPost": "\\end{document}",
        "latexPre": "\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n",
        "latexsvg": false,
        "name": "Basic",
        "req": [[0, "any", [0]]],
        "sortf": 0,
        "tags": [],
        "tmpls": [{
            "afmt": "{{FrontSide}}\n\n<hr id=answer>\n\n{{Back}}",
            "bafmt": "",
            "bfont": "",
            "bqfmt": "",
            "bsize": 0,
            "did": null,
            "name": "Card 1",
            "ord": 0,
            "qfmt": "{{Front}}"
        }],
        "type": 0,
        "vers": []
    }, {
        "__type__": "NoteModel",
        "crowdanki_uuid": "05995762-aaef-11ed-9c2a-237115d9c292",
        "css": ".card {\n font-family: arial;\n font-size: 20px;\n text-align: center;\n color: black;\n background-color: white;\n}\n\n.cloze {\n font-weight: bold;\n color: blue;\n}\n.nightMode .cloze {\n color: lightblue;\n}",
        "flds": [{
            "collapsed": false,
            "description": "",
            "font": "Arial",
            "media": [],
            "name": "Text",
            "ord": 0,
            "plainText": false,
            "rtl": false,
            "size": 20,
            "sticky": false
        }],
        "latexPost": "\\end{document}",
        "latexPre": "\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n",
        "latexsvg": false,
        "name": "Cloze",
        "req": [[0, "any", [0]]],
        "sortf": 0,
        "tags": [],
        "tmpls": [{
            "afmt": "{{cloze:Text}}",
            "bafmt": "",
            "bfont": "",
            "bqfmt": "",
            "bsize": 0,
            "did": null,
            "name": "Cloze",
            "ord": 0,
            "qfmt": "{{cloze:Text}}"
        }],
        "type": 1,
        "vers": []
    }]
let main_textFile
const deck_configurations = [{
    "__type__": "DeckConfig",
    "autoplay": true,
    "buryInterdayLearning": true,
    "crowdanki_uuid": "58b6fa76-a586-11ed-a34c-9bbd37c88a3c",
    "dyn": false,
    "interdayLearningMix": 0,
    "lapse": {
        "delays": [10.0], "leechAction": 1, "leechFails": 8, "minInt": 1, "mult": 0.0
    },
    "maxTaken": 60,
    "name": "Default",
    "new": {
        "bury": true,
        "delays": [1.0, 10.0],
        "initialFactor": 2500,
        "ints": [1, 4, 0],
        "order": 1,
        "perDay": 10,
        "separate": true
    },
    "newGatherPriority": 1,
    "newMix": 1,
    "newPerDayMinimum": 0,
    "newSortOrder": 0,
    "replayq": true,
    "rev": {
        "bury": true,
        "ease4": 1.3,
        "fuzz": 0.05,
        "hardFactor": 1.2,
        "ivlFct": 1.0,
        "maxIvl": 36500,
        "minSpace": 1,
        "perDay": 9999
    },
    "reviewOrder": 0,
    "timer": 0
}]
const deck_config_uuid = "58b6fa76-a586-11ed-a34c-9bbd37c88a3c"

const server = {
    cards: "https://139-162-135-50.ip.linodeusercontent.com:80/card/",
    decks: "https://139-162-135-50.ip.linodeusercontent.com:80/deck/",

    //decks: "http://localhost:3000/deck/",
    //cards: "http://localhost:3000/card/",
}
const allDecksUuid = "AnkiTube-Imports" + Date.now()

async function getDecks() {
    let r = await fetch(server.decks).then(r => r.json())
    console.log("getDecks", r)
    return r
}

async function saveDeck(deck) {
    let r = await fetch(server.decks, {
        method: "post", headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }, body: JSON.stringify(deck)
    }).then(r => r.json())
    console.log(r)

}

async function saveCard(card) {
    let r = await fetch(server.cards, {
        method: "POST", headers: {
            "Accept": "application/jaon",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
    }).then(r => r.json())
    console.log(r)
}

async function removeCard(card) {
    let r = await fetch(server.cards + card.id, {method: "DELETE"}).then(r => r.json())
    console.log(r)
}

async function addStapel(stapel, parentDeckId) {


    console.log(stapel)
    //Test ID
    if (stapel.id.includes("v="))
        stapel.id = stapel.id.match(/v=([^&]*)/)[1]

    console.log(stapel.id)

    let d = await getDeckById(parentDeckId)
    console.log(d)
    d.stapel.push(stapel)
    await saveDeck(d)
}

async function downloadAll() {

    let ca = getEmptyCrowdAnkiDeck("AnkiTube Imports " + new Date().toString(), allDecksUuid)
    for (let deck of await getDecks().then(r => r.filter(e => e.path.length <= 1))) {
        ca.children.push(await deckStructureToCrowdAnki(deck))
    }
    downloadFile(makeTextFile(JSON.stringify(makeDeckBaseDeck(ca))))

}

function newCard(type, stapel_id) {
    let c = {
        type: type,
        id: "AnkiTube-Website-" + Math.random(),
        deck_id: stapel_id
    }
    if (type === "Cloze")
        c.text = "";
    if (type === "Basic") {
        c.answer = "";
        c.question = "";
    }
    return c

}


function getEmptyCrowdAnkiDeck(name, uuid) {
    return {
        __type__: "Deck",
        children: [],
        crowdanki_uuid: uuid,
        deck_config_uuid: deck_config_uuid,
        media_files: [],
        name: name,
        notes: []
    }
}

async function getCardsByStapelId(id) {
    let r = await fetch(server.cards + id).then(r => r.json())
    console.log("getCardsBystapelId", r, id)
    return r

}

function generateStapel(name, link) {
    let stapel;
    if ([null, undefined, ""].includes(link))
        stapel = {name: name, id: (Math.random() + "").substring(2), type: "none"}

    else if (link.includes("youtube.com/watch?v="))
        stapel = {name: name, id: link.match(/v=([^&]*)/)[1], type: "youtube"}

    else if (link.includes("youtu.be/"))
        stapel = {name: name, id: link.match(/be\/([^?\/]*)/)[1], type: "youtube"}

    else if (link.includes("odysee.com"))
        stapel = {name: name, id: link.match(/odysee.com\/([^?]*)/)[1], type: "odysee"}

    else if (link.includes("ipfs://"))
        stapel = {name: name, id: link.match(/ipfs:\/\/([^?\/]*)/)[1], type: "ipfs"}


    else
        stapel = {name: name, id: link.replaceAll("&",""), type: "web"}

    stapel.id = stapel.id.replaceAll("/","[__]")
    return stapel

}

async function removeStapel(stapelID, deckID) {
    console.log(deckID, stapelID)
    let deck = await getDeckById(deckID)
    let stapels = deck.stapel
    let stapelIds = stapels.map(e => e.id)
    console.log(stapelIds, deck, stapels)
    stapels.splice(stapelIds.indexOf(stapelID), 1)
    console.log(deck)
    await saveDeck(deck)


}

function makeDeckBaseDeck(deck) {
    deck.deck_configurations = deck_configurations
    deck.note_models = note_models
    return deck
}

function cardToNote(card) {
    let note = {
        __type__: "Note", guid: card.id, tags: []
    }
    if (card.type === "Basic") {
        note.note_model_uuid = model_uuid.basic
        note.fields = [card.question, card.answer]
    }
    if (card.type === "Cloze") {
        note.note_model_uuid = model_uuid.cloze
        note.fields = [card.text]
    }
    return note
}

async function deckStructureToCrowdAnki(deck) {

    console.log("dstc",deck)
    let ca = getEmptyCrowdAnkiDeck(deck.path.at(-1).name, deck.path.at(-1).uuid + "")

    for (let stapel of deck.stapel) {
        let notes = await getCardsByStapelId(stapel.id)
        ca.notes.push(...notes.map(e => cardToNote(e)))
    }
    for (let childID of deck.children) {
        ca.children.push(await deckStructureToCrowdAnki(await getDeckById(childID)))
    }
    console.log(ca)
    return ca

}

async function createDeck(name, path) {
    //todo create the deck and return its id

    let uuid = Math.random()
    path = path.map(e => e)
    path.push({name: name, uuid: uuid})
    let deck = {name: name, path: path, uuid: uuid, stapel: [], children: []}


    await saveDeck(deck)
    return (deck.uuid)
}

async function addChild(childId, parentId) {
    //TODO

    let d = await getDeckById(parentId)
    d.children.push(childId)
    await saveDeck(d)
}

function downloadFile(filePath) {
    let link = document.createElement('a');
    link.href = filePath;
    link.download = "deck.json";
    link.click();
}

function makeTextFile(text) {
    let data = new Blob([text], {type: 'plain/text'});

    if (main_textFile !== null) {
        window.URL.revokeObjectURL(main_textFile);
    }

    main_textFile = window.URL.createObjectURL(data);

    return main_textFile;
}

async function removeDeck(deck) {
    await fetch(server.decks + deck.path.at(-1).uuid, {method: "DELETE"})

    if (deck.path.length > 1) {
        await removeChild(deck.path.at(-1).uuid, await getDeckById(deck.path.at(-2).uuid))

    }


}

async function removeChild(childID, deck) {
    console.log("rc", childID, deck)
    let c = [...deck.children]
    console.log("bevore removechild", childID, c, deck.children.indexOf(childID))

    deck.children.splice(c.indexOf(childID), 1)
    console.log("after removechild", childID, deck.children)
    await saveDeck(deck)
}


async function getDeckList() {
    return await getDecks().then(r => r.filter(e => e.path.length === 1))
}

async function getDeckById(id) {

    let r = await fetch(server.decks + id).then(r => r.json())

    return r[0]
}

