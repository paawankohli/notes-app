var notes = require("./notes.js");
var chalk = require("chalk");
var yargs = require("yargs");

const error = chalk.red.inverse;
const success = chalk.green.inverse;


yargs.command({
    command: "add",
    describe: "Add a new note!",
    builder: {
        title: {
            describe: "Add Note Title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Add Note Body",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: "remove",
    describe: "Remove a note!",
    builder: {
        title: {
            describe: "Add Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command: "list",
    describe: "List all notes!",
    handler() {
        notes.getNotes();
        
        // const arr = notes.getNotes();
        // if (arr.length === 0) {
        //     console.log(error("Notes file empty"));
        // }
        // else {
        //     console.log(success("Here are your notes: "));
        //     console.log(arr);
        // }
    }
});

yargs.command({
    command: "read",
    describe: "Read all notes!",
    builder: {
        title: {
            describe: "Add Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        const note = notes.getNote(argv.title);

        if (note === null) {
            console.log(error("No such note found!"));
        }
        else {
            console.log(success("Note found! Your note is: "));
            console.log(note);
        }
    }
});

// console.log(yargs.argv);
yargs.parse();