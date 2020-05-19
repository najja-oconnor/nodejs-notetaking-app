const fs = require('fs')
const chalk = require('chalk')



//this function adds notes and creates 
const addNote = function (title, body) {
    const notes = loadNotes()

    const duplicateNote = notes.find((note)=> {
        note.title === title
    })

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

//This function removes notes by filtering out notes that have the same title.
const removeNote = function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}
//this function uses file system method writeFileSync to save notes in separate JSON file.
const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


const loadNotes = function () {
    //this code will fail, so I catched the error and returned a empty array.
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

// this function lists the notes
const listNotes = function () {
    const notesToList = loadNotes()
    console.log(chalk.yellow.inverse('Your Notes: '))
    notesToList.forEach(note => {
        console.log("Title:", note.title, "Body:", note.body)
    });
}
//this function searches for note by passing in the notes title
//if there is no note then a error will be logged to the console
const readNote = function (title) {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)
    
    if (note) {
        console.log(chalk.blue(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('No Note Found By That Title'))
    }

}

//this exports all the functions in this script.
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}