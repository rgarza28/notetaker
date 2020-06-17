const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get("/", (reg, res) => {
    res.sendFile(path.join(`${__dirname}/public/index.html`));
});


app.get("/notes", (reg, res) => {
    res.sendFile(path.join(`${__dirname}/public/notes.html`));
});

app.get("/api/notes", (req, res) => res.json(notes));

app.post("/api/notes", (req, res) => {
    notes.push(req.body);
    uniqueId();
    fs.writeFileSync("db.json", JSON.stringify(notes))

    res.redirect("back");
});


app.delete("/api/notes/:id", (req, res) => {
    const deleted = notes.findIndex((i) => i.id == req.params.id);
    notes.splice(deleted, 1);
    reWrite();
    res.json(notes);
});

// Creation of Unique ID
function uniqueId() {
    notes.forEach((element, i) => element.id = i + 1);
};

let reWrite = () => {
    fs.writeFile("db.json", JSON.stringify(notes), (err) => {
        if (err) {
            throw err;
        };
    });
};

// Listen to PORT
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);

});





