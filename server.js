// const path = require('path');
// app.use(express.static(path.join(__dirname, '/dist/Angular-SCSS')));

// Node.js + Express + MySQL Verbindung aufsetzen:

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// damit verschiedene Host interagieren können

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// create Connection zu MySQL

const con = mysql.createConnection({
  host: 'w01a5f2a.kasserver.com',
  port: 3306,
  user: 'd03677fe',
  password: 'bAgbzsDzMVBRmUX2',
  database: 'd03677fe',
});

// Connect

con.connect((err) => {
  if (err) {
    console.log('Verbindung zu MySQL fehlgeschlagen');
    throw err;
  }
  console.log('Verbindung zu MySQL hergestellt');
});

// PORT

app.listen(3000, function () {
  console.log('App lauscht auf Port 3000');
});

// || HTTP - METHODEN || ---------------------------------------------------------------------------------------------------------------------------------------- //

// || POST Methoden / Daten hochladen || ------------------------------------------------------------------------------------------------------------------------ //

app.post('/addUser', (req, res) => {
  const geburtsdatum = req.body.user.geburtsdatum;
  const passwort = req.body.user.passwort;
  const email = req.body.user.email;
  const name = req.body.user.name;

  const sql =
    'INSERT INTO kunde (geburtsdatum, passwort, email, name)' +
    'VALUES (?, ? , ?, ?)';

  const values = [geburtsdatum, passwort, email, name];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.log('Datenbank-Speicherung fehlgeschlagen!');
      throw err;
    }
    console.log('Datenbank-Speicherung erfolgreich!');
    res.send(result);
  });
});

// || GET Methoden / Daten abrufen || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getUser', (req, res) => {
  const sql = 'SELECT * FROM kunde ';

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});
