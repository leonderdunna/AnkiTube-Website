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
let main_textFile = null
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
const example_cards = [
    {
        "_id": "63e80265ab7b5ef8326690cf",
        "id": "anki-addon-5889320815654693",
        "deck_id": "2ITUIJhiRMQ",
        "type": "Basic",
        "question": "Was macht Substitution in der Prädikatenlogik?",
        "answer": "\\( S = \\{ x \\Rightarrow s,y \\Rightarrow t \\} \\) <br /> diese Substitution \\( S \\) ersetzt in einer Formel, alle freien \\( x \\) und \\(y\\) durch \\(s\\) und \\(t\\)",
        "time": 0,
        "__v": 0
    }, {
        "_id": "63e80510ab7b5ef8326690e7",
        "id": "anki-addon-3647871503801243",
        "deck_id": "2ITUIJhiRMQ",
        "type": "Basic",
        "question": "Was bedeutet \"Kollisionsfreiheit\" in Bezug auf Substitutionen in  der Prädikatenlogik?",
        "answer": "Es existieren keine freien Variablen, auf die die Substitution abbildet.",
        "time": 0,
        "__v": 0
    }]
let cards = []

let deck_struct = []
let test_deck_struct = [
    {
        "path": [{"name": "Informatik", "uuid": 12345}],
        "videos": [{"id": "2ITUIJhiRMQ", "name": "TestVideo"}],
        "children": [0.14823029756437367, 0.418341933906744, 0.9691239255238973]
    }, {
        "name": "Prädikatenlogik",
        "path": [{"name": "Informatik", "uuid": 12345}, {"name": "Prädikatenlogik", "uuid": 0.14823029756437367}],
        "uuid": 0.14823029756437367,
        "videos": [],
        "children": []
    }, {
        "name": "Aussagenlogik",
        "path": [{"name": "Informatik", "uuid": 12345}, {"name": "Aussagenlogik", "uuid": 0.418341933906744}],
        "uuid": 0.418341933906744,
        "videos": [],
        "children": []
    }, {
        "name": "Test",
        "path": [{"name": "Informatik", "uuid": 12345}, {"name": "Test", "uuid": 0.9691239255238973}],
        "uuid": 0.9691239255238973,
        "videos": [],
        "children": [0.2045287673159022]
    }, {
        "name": "Mehr Test",
        "path": [{"name": "Informatik", "uuid": 12345}, {"name": "Test", "uuid": 0.9691239255238973}, {
            "name": "Mehr Test",
            "uuid": 0.2045287673159022
        }],
        "uuid": 0.2045287673159022,
        "videos": [],
        "children": []
    }]

const server = {
    //cards: "https://139-162-135-50.ip.linodeusercontent.com:80/card/",
    //decks: "https://139-162-135-50.ip.linodeusercontent.com:80/deck/",f

    decks: "http://localhost:3000/deck/",
    cards: "http://localhost:3000/card/",
}
const allDecksUuid = "AnkiTube-Imports" + Date.now()

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


async function addVideo(video, parentDeckId) {


    //Test ID
    if(video.id.includes("v="))
        video.id = video.id.match(/v=([^&]*)/)[1]

    console.log(video.id)

    let d = getDeckById(parentDeckId)
    d.videos.push(video)
    await saveDeck(d)
}

async function downloadAll() {
    await aktualisieren(true, true)
    let ca = getEmptyCrowdAnkiDeck("AnkiTube Imports " + new Date().toString(), allDecksUuid)
    for (let deck of deck_struct.filter(e => e.path.length <= 1)) {
        ca.children.push(await deckStructureToCrowdAnki(deck))
    }
    downloadFile(makeTextFile(JSON.stringify(makeDeckBaseDeck(ca))))

}

function newCard(type,vid_id) {
    let c = {
        type: type,
        id: "AnkiTube-Website-" + Math.random(),
        deck_id: vid_id
    }
    if (type === "Cloze")
        c.text = "";
    if (type === "Basic") {
        c.answer = "";
        c.question = "";
    }
    return c

}

async function aktualisieren(decks, cards) {
    if (decks !== false)
        deck_struct = await fetch(server.decks).then(r => r.json())
    if (cards !== false)
        cards = await fetch(server.cards).then(r => r.json())
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

async function getCardsByVideoId(id) {
    let r =  await fetch(server.cards + id).then(r => r.json())
    console.log("getCardsByvidId",r,id)
    return r

}

async function removeVideo(vidID, deckID) {
    console.log(deckID, vidID)
    let deck = getDeckById(deckID)
    let vids = deck.videos
    let vidIds = vids.map(e => e.id)
    console.log(vidIds, deck, vids)
    vids.splice(vidIds.indexOf(vidID), 1)
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

    let ca = getEmptyCrowdAnkiDeck(deck.path.at(-1).name, deck.path.at(-1).uuid)

    for (let vid of deck.videos) {
        let notes = await getCardsByVideoId(vid.id)
        ca.notes.push(...notes.map(e => cardToNote(e)))
    }
    for (let childID of deck.children) {
        ca.children.push(await deckStructureToCrowdAnki(getDeckById(childID)))
    }
    console.log(ca)
    return ca

}

async function createDeck(name, path) {
    //todo create the deck and return its id

    let uuid = Math.random()
    path = path.map(e => e)
    path.push({name: name, uuid: uuid})
    let deck = {name: name, path: path, uuid: uuid, videos: [], children: []}
    deck_struct.push(deck)

    await saveDeck(deck)
    return (deck.uuid)
}

async function addChild(childId, parentId) {
    //TODO

    let d = getDeckById(parentId)
    d.children.push(childId)
    await saveDeck(d)
}

function downloadFile(filePath) {
    //Kopiert von:https://stackoverflow.com/questions/1066452/easiest-way-to-open-a-download-window-without-navigating-away-from-the-page
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
        await removeChild(deck.path.at(-1).uuid, getDeckById(deck.path.at(-2).uuid))

    }


}

async function removeChild(childID, deck) {
    let c = [...deck.children]
    console.log("bevore removechild", childID, c, deck.children.indexOf(childID))

    deck.children.splice(c.indexOf(childID), 1)
    console.log("after removechild", childID, deck.children)
    await saveDeck(deck)
}


async function getDeckList() {
    await aktualisieren(true, false)
    return deck_struct.filter(e => e.path.length === 1)
}

function getDeckById(id) {
    //TODO
    let deck = deck_struct.filter((e) => e.path.at(-1).uuid === id)[0]

    console.log("getDeckById", id, deck, deck_struct)

    return deck
}

