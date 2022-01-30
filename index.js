const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const { szunetel, dolomit, bezar } = require("./modules/mysql");
const port = 4444;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get('/questions', (req, res) => {
    questions((err, questions) => {
        if (err) throw err;
        res.render("questions", { questions });
    });
});

app.get("/szunetel", (req, res) => {
    szunetel((err, szunetel) => {
        if (err) throw err;
        res.render("szunetel", { szunetel });
    });
});

app.get("/dolomit", (req, res) => {
    dolomit((err, dolomit) => {
        if (err) throw err;
        res.render("dolomit", { dolomit });
    });
});

app.get("/bezar", (req, res) => {
    bezar((err, bezar) => {
        if (err) throw err;
        res.render("bezar", { bezar });
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "public/error.html"))
});


app.listen(port);