// Node.js + Express + MySQL Verbindung aufsetzen:

let express = require('express');
let path = require('path');
let mysql = require('mysql');

let app = express();

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

let con = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'DBPasswort2!',
  database: 'dbweb',
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

app.get('/getUser', (req, res) => {
  let sql = 'SELECT * FROM kunde ';

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});
