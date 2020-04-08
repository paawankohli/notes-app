const fs = require('fs');
const JSONify = JSON.stringify;
const objectify = JSON.parse;

const chalk = require('chalk');
const error = chalk.red.inverse;
const success = chalk.green.inverse;

// loadNotes() from data.json
const loadNotes = () => {
    try {
        const notesJSON = fs.readFileSync("data.json").toString();
        return objectify(notesJSON);
    } catch (e) {
        // console.log("File didnt exist! Creating a file....");
        return [];
    }
};

// storeNotes(data) to data.json
const storeNotes = (data) => {
    fs.writeFileSync("data.json", JSONify(data));
};

// return a single object, note with the given title
const getNote = (title) => {

    // Using filter method:
    // const notes = loadNotes().filter((note) => note.title === title);

    // using find method:
    const note = loadNotes().find( (note) => note.title === title);
    
    if (note === undefined) {
        console.log(error("No such note found!"));
    }
    else {
        console.log(success("Note found! Your note is: "));
        console.log("Title: " + note.title);
        console.log("Body: " + note.body);
    }
};

// adds the given note
const addNote = (title, body) => {
    const notes = loadNotes();
    
    // duplicates array contains notes which have the same title as note to be added
    // const duplicates = notes.filter((note) => note.title === title);
    
    // duplicate contains note with the same title as to be added. More efficient than above used filter method
    const duplicate = notes.find( (note) => note.title === title);

    if (duplicate === undefined) {
        notes.push({
            title: title,
            body: body
        });
        console.log(success("Note added!"));
    }
    else {
        console.log(error("Duplicate note exists!"));
    }

    storeNotes(notes);
};

// remove a single object, note with the given title
const removeNote = (title) => {
    const notes = loadNotes();

    // contains all notes except removed one
    const omitted = notes.filter((note) => title !== note.title);

    if (notes.length === omitted.length) {
        console.log(error("No such node found"));
    }
    else {
        console.log(success("Note removed succesfully!"));
    }

    storeNotes(omitted);
};

// returns all notes as array
const getNotes = () => {
    const notes = loadNotes();

    if (notes.length === 0) {
        console.log(error("Notes file empty"));
    }
    else {
        console.log(success("Here are your notes: "));
    }

    notes.forEach((note) => {
        console.log(note.title);
    })
};


// export to app.js
module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    getNotes: getNotes
};