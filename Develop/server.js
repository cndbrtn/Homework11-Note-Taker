const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});

const notes = [];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const readNotes = JSON.parse(data)
        // console.log(readNotes);
        return res.json(readNotes);
    });
});

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    console.log(newNote);
    // notes.push(newNote);
    // console.log(notes)
    // const savedNote = JSON.stringify(notes)
    res.json(true);

    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const note = JSON.parse(data)
        note.push(newNote + ID);
        fs.writeFile("./db/db.json", JSON.stringify(note), "utf8", function (err) {
            if (err) throw err;
            console.log(`success?`)
        });
    })

});

// app.delete("/api/notes", (err, data) => {

// })