let main_id = null
let main_data = {}

let main_url = "https://139-162-135-50.ip.linodeusercontent.com:80/card/"

function getMainPanel(group, id) {
    main_id = id
    let questionsDiv = document.createElement("div")
    questionsDiv.classList.add("anki-questions")
    main_data.ready = false

    let main = document.createElement("div")
    let titel = document.createElement("h2")
    titel.textContent = group + ": " + id;
    main.append(titel)

    let schließenButton = document.createElement("button")
    schließenButton.textContent = "Schließen"
    schließenButton.addEventListener("click",()=> {
        main.remove()
    })
    main.append(schließenButton)

    main.append(document.createElement("br"))

    let video = document.createElement("iframe")
    video.src = "https://www.youtube.com/embed/" + id
    let vid_details = document.createElement("details")
    let vid_summary = document.createElement("summary")
    vid_summary.textContent = "Video ansehen"
    vid_details.append(vid_summary)
    vid_details.append(video)

    main.append(vid_details)


    main.classList.add("card-edit-main", "anki-" + id, "deck")


    main.append(questionsDiv)

    main.append(getNewDiv())
    init_data(main_id).then(() => {
        main_data.ready = true
        console.log("karten geholt", main_data)

        for (let question of main_data.questions) {
            document.querySelector(".anki-questions").append(getQuestionDiv(question))
        }
    })

    return main
}

function getDownloadButton() {
    let dButton = document.createElement("button")
    dButton.addEventListener("click", () => {
        download()
    })
    dButton.textContent = "Herunterladen"
    return dButton
}

function download() {

    let text = "#html:true\n" +
        "#deck:Imports\n" +
        "#notetype column:1\n" +
        "#guid column: 2\n"
    for (let card of main_data.questions) {
        if (card.type === "Basic")
            text += card.type + ";" + card.id + ";" + card.question + ";" + card.answer + "\n"
        else {
            text += card.type + ";" + card.id + ";" + card.text + "\n"
        }
    }
    downloadFile(makeTextFile(text))

}

function downloadFile(filePath) {
    //Kopiert von:https://stackoverflow.com/questions/1066452/easiest-way-to-open-a-download-window-without-navigating-away-from-the-page
    let link = document.createElement('a');
    link.href = filePath;
    link.download = "export.txt";
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

async function init_data(id) {
    main_data.questions = await getQuestions(id)

}

function getQuestionDiv(question) {
    let questionDiv = document.createElement("div")
    questionDiv.classList.add("anki-question", "anki-" + question.id)


    let hr = document.createElement("hr")
    questionDiv.append(hr)
    let label = document.createElement("span")
    questionDiv.append(label)

    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Löschen"
    deleteButton.addEventListener("click", () => {
        deleteQuestion(question)
    })

    questionDiv.append(deleteButton)
    questionDiv.append(document.createElement("br"))

    if (question.type === "Cloze") {

        label.textContent = "Lückentext"

        let text = document.createElement("input")
        text.classList.add("anki-text-" + question.id)
        text.addEventListener("change", () => {
            question.text = document.querySelector(".anki-text-" + question.id).value
            upload(question)
        })
        text.value = question.text
        text.placeholder = "{{c1::Lückentext}}"
        questionDiv.append(text)
        return questionDiv
    }
    if (question.type === "Basic") {
        label.textContent = "Standard"
        let q = document.createElement("input")
        q.classList.add("anki-q-" + question.id)
        q.addEventListener("change", () => {
            question.question = document.querySelector(".anki-q-" + question.id).value
            upload(question)
        })
        q.value = question.question
        q.placeholder = "Frage"
        let a = document.createElement("input")
        a.classList.add("anki-a-" + question.id)
        a.addEventListener("change", () => {
            question.answer = document.querySelector(".anki-a-" + question.id).value
            upload(question)
        })
        a.value = question.answer
        a.placeholder = "Antwort"
        questionDiv.append(q)
        questionDiv.append(a)
        return questionDiv
    } else
        return question

}

async function upload(question) {
    //TODO online
    question.deck_id = main_id

    let res = await fetch(main_url, {method: "POST",headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(question)})
    console.log(await res.json())
}

function deleteQuestion(question) {
    //TODO online
    console.log(question)
    main_data.questions.splice(main_data.questions.indexOf(question), 1)
    document.querySelector(".anki-question.anki-" + question.id).remove()
    console.log(main_data)
    fetch(main_url + question.id, {method: "DELETE"}).then((r) => {
        console.log(r.json())
    })
}

function getNewDiv() {
    let newDiv = document.createElement("div")


    let typChose = document.createElement("select")
    typChose.classList.add("anki-type-chooser")

    let optionCloze = document.createElement("option")
    optionCloze.value = "Cloze"
    optionCloze.textContent = "Lückentext"

    let optionBasic = document.createElement("option")
    optionBasic.value = "Basic"
    optionBasic.textContent = "Standard"

    typChose.append(optionBasic)
    typChose.append(optionCloze)

    let createButton = document.createElement("button")
    createButton.textContent = "Karte erstellen"
    createButton.addEventListener("click", () => {
        addNewCard()
    })

    newDiv.append(createButton)

    newDiv.append(typChose)
    return newDiv
}

function addNewCard(type) {

    if (!type)
        type = document.querySelector("select.anki-type-chooser").value

    let card = {}
    card.time = 0
    card.type = type
    card.id = "anki-addon-" + Math.floor((Math.random() * 10000000000000000))

    if (type === "Cloze")
        card.text = "";
    else {
        card.question = ""
        card.answer = ""
    }

    document.querySelector(".anki-questions").append(getQuestionDiv(card))
    main_data.questions.push(card)
    return card
}

async function getQuestions(id) {
    //TODO: reale daten
    let res = await fetch(main_url + main_id)
    return res.json()
}