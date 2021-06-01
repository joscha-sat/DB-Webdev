// const path = require('path');
// app.use(express.static(path.join(__dirname, '/dist/Angular-SCSS')));

// Node.js + Express + MySQL Verbindung aufsetzen:

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');

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

// || POST Methode / Bild-String lokal Speichern || ------------------------------------------------------------------------------------------------------------- //

let MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype]; //null, wenn es kein jpg/png ist
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, 'src/assets');
  },
  filename: (req, file, cb) => {
    const name = file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

app.post('/uploadImage', upload.single('myFile'), (req, res) => {
  try {
    return res.status(201).json({
      message: 'File uploded successfully',
    });
  } catch (error) {
    console.error(error);
  }
});

// || POST Methoden / Daten hochladen || ------------------------------------------------------------------------------------------------------------------------ //

app.post('/addUser', (req, res) => {
  const geburtsdatum = req.body.user.geburtsdatum;
  const email = req.body.user.email;
  const name = req.body.user.name;
  const passwort = bcrypt.hashSync(req.body.user.passwort, 10);

  const sql =
    'INSERT INTO Kunde (geburtsdatum, passwort, email, name)' +
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

app.post('/addMovie', (req, res) => {
  const titel = req.body.movie.titel;
  const filmdauer = req.body.movie.filmdauer;
  const genre = req.body.movie.genre;
  const erscheinungsjahr = req.body.movie.erscheinungsjahr;
  const altersfreigabe = req.body.movie.altersfreigabe;
  const bild = 'assets/' + req.body.movie.bild;

  const sql =
    'INSERT INTO Film (titel, filmdauer, genre, erscheinungsjahr, altersfreigabe, bild)' +
    'VALUES (?, ? , ?, ?, ?, ?)';

  const values = [
    titel,
    filmdauer,
    genre,
    erscheinungsjahr,
    altersfreigabe,
    bild,
  ];

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
  const sql = 'SELECT * FROM Kunde ';

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

app.get('/getMovies', (req, res) => {
  const sql = 'SELECT * FROM Film ';

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

app.get('/loginUser/:email/:passwort', (req, res) => {
  const email = req.params.email;
  const passwort = bcrypt.hashSync(req.params.passwort, 10);

  const sql = `SELECT * FROM Kunde WHERE email = '${email}' AND passwort ='${passwort}'`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    console.log('User bekommen ' + email);
    res.send(result);
  });
});

// || DELETE Methoden / Daten löschen || ------------------------------------------------------------------------------------------------------------------------ //

app.delete('/deleteOneMovie/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM Film WHERE id = ${id}`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('löschen fehlgeschlagen!');
      throw err;
    }
    console.log('löschen erfolgreich!');
    res.send(result);
  });
});
