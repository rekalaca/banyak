const mysql = require('mysql');
const data = require('../data/config.json');
const connection = mysql.createConnection({

  host: data.dbhost,
  database: data.dbname,
  user: data.dbuser,
  password: data.dbpasswd,
  port: data.dbport
});

connection.connect((err) => {
  if (err) throw err;
  console.log("A csatlakozás létrejött!");
});

const szunetel = (callback) => {
  const mySelect =
    `SELECT DISTINCT telepules FROM telek WHERE allapot="S" ORDER BY telepules;`;
  connection.query(mySelect, (err, result) => {
    if (err) callback(err, null);
    callback(null, JSON.parse(JSON.stringify(result)));
  });
};

const dolomit = (callback) => {
  const mySelect =
    `SELECT DISTINCT telepules, fedoszint, fekuszint FROM telek, nyersanyag, kapcsolo WHERE nyersanyag.nev="dolomit" AND nyersanyag.id = kapcsolo.nyersanyagid AND kapcsolo.telekid = telek.id;`;
  connection.query(mySelect, (err, result) => {
    if (err) callback(err, null);
    callback(null, JSON.parse(JSON.stringify(result)));
  });
};

const bezar = (callback) => {
  const mySelect =
    `SELECT DISTINCT telepules FROM telek WHERE allapot = "B";`;
  connection.query(mySelect, (err, result) => {
    if (err) callback(err, null);
    callback(null, JSON.parse(JSON.stringify(result)));
  });
};





module.exports = { szunetel, dolomit, bezar };