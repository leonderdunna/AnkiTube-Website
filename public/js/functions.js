const model_uuid = {
    cloze: "05995762-aaef-11ed-9c2a-237115d9c292", basic: "58b7eb48-a586-11ed-a34c-9bbd37c88a3c"
}
const note_models = [{
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
const example_cards = [{
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
let cards_ready = false
let deck_struct = []

const example_deck_structure = {
    name: "Informatik", path: ["Informatik"], uuid: 12345, videos: [{id: "2ITUIJhiRMQ", name: "TestVideo"}], children: [{
        name: "Aussagenlogik",
        path: ["Informatik", "Aussagenlogik"],
        uuid: 34567,
        videos: [{id: "2ITUIJhiRMQ", name: "TestVideo"}],
        children: [{
            name: "alpharegeln",
            path: ["Informatik", "Aussagenlogik", "Alpharegeln"],
            uuid: 2345,
            videos: [],
            children: []
        }]
    }, {
        name: "Prädikatenlogik", path: ["Informatik", "Prädikatenlogik"], uuid: "ne", videos: [], children: []
    }]
}
const server = {
    cards: "https://139-162-135-50.ip.linodeusercontent.com:80/card/",
    decks: "https://139-162-135-50.ip.linodeusercontent.com:80/deck/"
}

function addVideo(video, parentDeckId) {
 //TODO

}
function downloadAll(){
    //TODO
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

function getCardsByVideoId(id) {
    //TODO
    return example_cards
}

function removeVideo(vidID, deckID){

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

function deckStructureToCrowdAnki(deck) {

    let ca = getEmptyCrowdAnkiDeck(deck.name, deck.uuid)

    for (let vid of deck.videos) {
        let notes = cards.filter((e) => {
            return e.deck_id === vid.id;
        }).map(e => cardToNote(e))
        ca.notes.push(...notes)
    }
    for (let child of deck.children) {
        ca.children.push(deckStructureToCrowdAnki(child))
    }
    return ca

}

function createDeck(name){
    //todo create the deck and return its id
    return "1"
}

function addChild(childId, parentId){
    //TODO
}

function downloadFile(filePath) {
    //Kopiert von:https://stackoverflow.com/questions/1066452/easiest-way-to-open-a-download-window-without-navigating-away-from-the-page
    let link = document.createElement('a');
    link.href = filePath;
    link.download = "AnkiTube.json";
    link.click();
}

function makeTextFile(text) {
    let data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (main_textFile !== null) {
        window.URL.revokeObjectURL(main_textFile);
    }

    main_textFile = window.URL.createObjectURL(data);

    return main_textFile;
}

function removeDeck(deck) {
    for (let d of deck_struct) {
        if (d.uuid === deck.uuid) {
            deck_struct.splice(deck_struct.indexOf(deck), 1)
            fetch(server.decks + d.uuid, {
                method: "DELETE"
            }).then(r => r.json()).then((res) => {
                console.log(res)
            })
        }
        removeDeckRecursive(d, deck)
    }
}

function removeDeckRecursive(parent, toDelete) {
    for (let d of parent.children) {
        if (d.uuid === toDelete.uuid) {
            parent.children.splice(parent.children.indexOf(toDelete), 1)
            fetch(server.decks, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(getBaseDeck(parent.uuid))
            }).then(r => r.json()).then((res) => {
                console.log(res)
            })
        }
        removeDeckRecursive(d, toDelete)
    }
}

function getBaseDeck(uuid) {
    for (let deck of deck_struct) {
        if (deckContains(uuid, deck)) return deck
    }
    console.error("Deck konnte nicht gefunden werden")
    return false
}

async function getDeckList() {
    //TODO
    return [{name: "Mathe", id: "1"}, {name: "Informatik", id: "2"}, {
        name: "Datenbanken", id: "3"
    }, {name: "Programmieren", id: "4"}]
}

async function getDeckById(id) {
    //TODO
    return example_deck_structure
}

function deckContains(uuid, deck) {
    if (deck.uuid === uuid) return true
    for (let subdeck of deck.children) {
        if (deckContains(uuid, subdeck)) return true
    }
    return false
}