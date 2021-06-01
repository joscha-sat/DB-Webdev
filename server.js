// const path = require('path');
// app.use(express.static(path.join(__dirname, '/dist/Angular-SCSS')));

// Node.js + Express + MySQL Verbindung aufsetzen:

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  host: '195.37.176.178',
  port: 20133,
  user: '21_DB_Grp_2',
  password: `pS!'NWkk5hrb84ijZr3EPJ2+qqd/aV*4`,
  database: '21_DB_Gruppe2',
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

app.post('/register', (req, res) => {
  const email = req.body.newUser.email;
  const password = req.body.newUser.password;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log('error');
      throw err;
    } else {
      con.query(
        `INSERT INTO user (email, password) VALUES ('${email}', '${hash}')`,
        (err) => {
          if (err) {
            console.log('error');
            throw err;
          }
          console.log('registriert');
          return res.status(201).send({
            message: 'registriert',
          });
        }
      );
    }
  });
});

app.post('/addMovie', (req, res) => {
  const title = req.body.movie.title;
  const duration = req.body.movie.duration;
  const genre = req.body.movie.genre;
  const release_year = req.body.movie.release_year;
  const fks = req.body.movie.fks;
  const image = 'assets/' + req.body.movie.image;

  const sql =
    'INSERT INTO movie (title, duration, genre, release_year, fks, image)' +
    'VALUES (?, ? , ?, ?, ?, ?)';

  const values = [title, duration, genre, release_year, fks, image];

  con.query(sql, values, (err, result) => {
    if (err) {
      console.log('Datenbank-Speicherung fehlgeschlagen!');
      throw err;
    }
    console.log('Datenbank-Speicherung erfolgreich!');
    res.send(result);
  });
});

app.post('/login', (req, res) => {
  const email = req.body.loginData.email;
  const password = req.body.loginData.password;

  con.query(`SELECT * FROM user WHERE email = '${email}'`, (err, result) => {
    if (err) {
      throw err;
    }
    if (!result.length) {
      console.log('Email oder Passwort ist falsch!');
      return res.status(400).send({
        message: 'Email oder Passwort ist falsch!',
      });
    }
    bcrypt.compare(password, result[0]['password'], (pErr, pResult) => {
      if (pErr) {
        console.log('Email oder Passwort ist falsch!');
        throw pErr;
      }
      if (pResult) {
        const token = jwt.sign(
          {
            email: result[0].email,
            userid: result[0].userid,
          },
          'einGeheimnisZuHabenIstImmerGut-HierIstMeinGeheimnis',
          { expiresIn: '1h' }
        );
        console.log('logged in!');
        return res.status(200).send({
          message: 'logged in!',
          token,
          expiresIn: 3600,
          user: result[0],
        });
      }
      console.log('Email oder Passwort ist falsch!');
      return res.status(400).send({
        message: 'Email oder Passwort falsch!',
      });
    });
  });
});

// || GET Methoden / Daten abrufen || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getUsers', (req, res) => {
  const sql = 'SELECT * FROM user ';

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

app.get('/getMovies', (req, res) => {
  const sql = 'SELECT * FROM movie ';

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

// || DELETE Methoden / Daten löschen || ------------------------------------------------------------------------------------------------------------------------ //

app.delete('/deleteOneMovie/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM movie WHERE movie_id = ${id}`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('löschen fehlgeschlagen!');
      throw err;
    }
    console.log('löschen erfolgreich!');
    res.send(result);
  });
});
