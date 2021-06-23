// const path = require('path');
// app.use(express.static(path.join(__dirname, '/dist/Angular-SCSS')));

// Node.js + Express + MySQL Verbindung aufsetzen:

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/dist/dbweb')));

// application -------------------------------------------------------------
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/dbweb' });
});

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

  multipleStatements: true,
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

// | MULTER | ----------------------------------------------------------------- //

// mime type prüfen, nur jpg und png zulassen

const MIME_TYPE_MAP = {
  'image/png': 'png',

  'image/jpeg': 'jpg',

  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // mime type prüfen, ggfalls error ausgeben

    const isValid = MIME_TYPE_MAP[file.mimetype];

    let error = new Error('invalid mime type');

    if (isValid) {
      error = null;
    }

    // relativer pfad von server.js zum Ordner, wo die img gespeichert werden sollen

    cb(error, 'src/assets');
  },

  // Name des img: nur originalname + file_ending geht auch, aber hier best
  // practise mit random values sodass keine doppelten Namen passieren können.

  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');

    const file_ending = MIME_TYPE_MAP[file.mimetype];

    cb(null, name + '-' + Date.now() + '.' + file_ending);
  },
});

const upload = multer({ storage: storage });

// || POST Methoden / Daten hochladen || ------------------------------------------------------------------------------------------------------------------------ //

// || REGISTRIEREN || --------------------------------------------------------------------------------------------------------------------------- //

app.post('/register', (req, res) => {
  const name = req.body.newUser.name;
  const email = req.body.newUser.email;
  const password = req.body.newUser.password;
  const date_of_birth = req.body.newUser.date_of_birth;
  const admin_secret = req.body.newUser.admin_secret;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log('error');
      throw err;
    } else {
      const sql = `INSERT INTO user (date_of_birth, password, email, name, isAdmin ) VALUES ('${date_of_birth}', '${hash}', '${email}', '${name}', '${
        admin_secret === 45678
      }')`;

      con.query(sql, (err) => {
        if (err) {
          console.log('error');
          throw err;
        }
        console.log('registriert');
        return res.status(201).send({
          message: 'registriert',
        });
      });
    }
  });
});

// || EINLOGGEN || --------------------------------------------------------------------------------------------------------------------------- //

app.post('/login', (req, res) => {
  const email = req.body.loginData.email;
  const password = req.body.loginData.password;

  // erst prüfen, ob es den User anhand seiner Email gibt

  con.query(`SELECT * FROM user WHERE email = '${email}'`, (err, result) => {
    // Bei Error, Error werfen

    if (err) {
      throw err;
    }

    // Falls nicht, dann Error ausgeben | (!result.length) = kein Ergebnis in Form eines Users zu der Email gefunden

    if (!result.length) {
      console.log('Email oder Passwort ist falsch!');
      return res.status(400).send({
        message: 'Email oder Passwort ist falsch!',
      });
    }

    // Falls User anhand seiner Email gefunden wurde, dann das eingegebene Passwort mit dem Passwort aus der DB mit bcrypt prüfen

    bcrypt.compare(password, result[0]['password'], (pErr, pResult) => {
      // Bei Error, Error werfen

      if (pErr) {
        console.log('Email oder Passwort ist falsch!');
        throw pErr;
      }

      // Falls das Passwort übereinstimmt, dann ein jwt Token erstellen und wichtige Daten zurückgeben, wie Token,Ablaufzeit des Token und den User selbst

      if (pResult) {
        const token = jwt.sign(
          {
            email: result[0].email,
            userid: result[0].userid,
          },
          'einGeheimnisZuHabenIstImmerGut-HierIstMeinGeheimnis',
          { expiresIn: '3h' }
        );
        console.log('logged in!');
        return res.status(200).send({
          message: 'logged in!',
          token,
          expiresIn: 3600 * 3,
          user: result[0],
        });
      }

      // Falls etwas schief gegangen ist, Error ausgeben

      console.log('Email oder Passwort ist falsch!');
      return res.status(400).send({
        message: 'Email oder Passwort falsch!',
      });
    });
  });
});

// || FILM HINZUFÜGEN || --------------------------------------------------------------------------------------------------------------------------- //

app.post('/addMovie', upload.single('image'), (req, res) => {
  const movie = {
    duration: req.body.duration,
    title: req.body.title,
    release_year: req.body.release_year,
    fsk: req.body.fsk,
    genre: req.body.genre,
    image: 'assets/' + req.file.filename,
    trailer: req.body.trailer,
    description: req.body.description,
  };

  const sql = 'INSERT INTO movie SET ?';

  con.query(sql, movie, (err, result) => {
    if (err) {
      console.log('Datenbank-Speicherung fehlgeschlagen!');
      throw err;
    }
    console.log('Datenbank-Speicherung erfolgreich!');
    res.send(result);
  });
});

// || TICKET KAUFEN || --------------------------------------------------------------------------------------------------------------------------- //

app.post('/addTicket', (req, res) => {
  const ticket = {
    id_user: req.body.id_user,

    movie_name: req.body.movie_name,

    seat_row: req.body.seat_row,
    seat_number: req.body.seat_number,

    snack_name: req.body.snack_name,
    snack_size: req.body.snack_size,
    snack_price: req.body.snack_price,

    drink_name: req.body.drink_name,
    drink_size: req.body.drink_size,
    drink_price: req.body.drink_price,

    total_price: req.body.total_price,

    date_of_show: req.body.date_of_show,
    time_of_Show: req.body.time_of_Show,

    date_bought: req.body.date_bought,
  };

  console.log(ticket);

  const sql = 'INSERT INTO ticket SET ?';

  con.query(sql, ticket, (err, result) => {
    if (err) {
      console.log('Datenbank-Speicherung fehlgeschlagen!');
      throw err;
    }
    console.log('Datenbank-Speicherung erfolgreich!');
    res.send(result);
  });
});

// || GET Methoden / Daten abrufen || --------------------------------------------------------------------------------------------------------------------------- //

// || Einzelnen USER ABRUFEN-------------------------------------------------------------------------------------------------------------
app.get('/getUserById/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const sql = `SELECT * FROM user WHERE user_id = '${user_id}' `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});
// || ALLE USER ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

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

// || ALLE FILME ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

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

// || ALLE  FILME MIT EINEM GENRE ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getMoviesByGenre/:genre', (req, res) => {
  const genre = req.params.genre;

  if (genre === 'reset') {
    const sql = `SELECT * FROM movie`;

    con.query(sql, (err, result) => {
      if (err) {
        console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
        throw err;
      }
      res.send(result);
    });
  } else {
    const sql = `SELECT * FROM movie WHERE genre = '${genre}' `;

    con.query(sql, (err, result) => {
      if (err) {
        console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
        throw err;
      }
      res.send(result);
    });
  }
});

// || EINEN FILM ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getOneMovie/:movie_id', (req, res) => {
  const movie_id = req.params.movie_id;

  const sql = `SELECT * FROM movie WHERE movie_id = '${movie_id}' `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

// || EIN SNACK PREIS ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getSnackPrice/:snack_name/:snack_size', (req, res) => {
  const snack_name = req.params.snack_name;
  const snack_size = req.params.snack_size;

  const sql = `SELECT price FROM snacks WHERE snack_name = '${snack_name}' AND size = '${snack_size}'`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

// || SNACK-GRÖßEN ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getSnackSizes/:snack_name', (req, res) => {
  const snack_name = req.params.snack_name;

  const sql = `SELECT size FROM snacks WHERE snack_name = '${snack_name}'`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

// || SNACK-NAMEN ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getSnacks', (req, res) => {
  const sql = `SELECT DISTINCT snack_name FROM snacks `;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

// || EIN DRINK PREIS ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getDrinkPrice/:drink_name/:drink_size', (req, res) => {
  const drink_name = req.params.drink_name;
  const drink_size = req.params.drink_size;

  const sql = `SELECT price FROM drinks WHERE drink_name = '${drink_name}' AND size = '${drink_size}'`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

// || GETRÄNK-GRÖßEN ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getDrinkSizes/:drink_name', (req, res) => {
  const drink_name = req.params.drink_name;

  const sql = `SELECT size FROM drinks WHERE drink_name = '${drink_name}'`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

// || DRINK-NAMEN ABRUFEN || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getDrinks', (req, res) => {
  const sql = `SELECT DISTINCT drink_name FROM drinks`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

// || TICKETS Abrufen || --------------------------------------------------------------------------------------------------------------------------- //

app.get('/getTickets/:user_id', (req, res) => {
  const sql = `SELECT * FROM ticket WHERE id_user = '${req.params.user_id}'`;

  con.query(sql, (err, result) => {
    if (err) {
      console.log('Abrufen der Daten aus der Datenbank fehlgeschlagen!');
      throw err;
    }
    res.send(result);
  });
});

// || DELETE Methoden / Daten löschen || ------------------------------------------------------------------------------------------------------------------------ //

// || EINEN FILM NACH ID LÖSCHEN || --------------------------------------------------------------------------------------------------------------------------- //

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

// || PATCH Methoden / Daten verändern || ------------------------------------------------------------------------------------------------------------------------ //
app.patch('/updateUser/:user_id', (req, res) => {
  if (req.body.password.length >= 6) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        console.log('error');
        throw err;
      } else {
        const changedUser = {
          user_id: +req.body.user_id,
          name: req.body.name,
          email: req.body.email,
          password: hash,
          date_of_birth: req.body.date_of_birth,
        };

        console.log(changedUser);
        const sql = `UPDATE user SET ? WHERE user_id = ${req.body.user_id}`;

        con.query(sql, changedUser, (err) => {
          if (err) {
            console.log('error');
            throw err;
          }
          console.log('updated');
          return res.status(201).send({
            message: 'updated',
          });
        });
      }
    });
  } else {
    const user_id = +req.body.user_id;
    const name = req.body.name;
    const email = req.body.email;
    const date_of_birth = req.body.date_of_birth;

    // const values = [name, email, date_of_birth];

    const sql = `UPDATE user SET name = '${name}', email = '${email}', date_of_birth = '${date_of_birth}' WHERE user_id = ${user_id}`;

    con.query(sql, (err, result) => {
      if (err) {
        console.log('updaten fehlgeschlagen!');
        throw err;
      }
      console.log('updaten erfolgreich!');
      res.send(result);
    });
  }
});

app.patch('/updateMovie/:movie_id', upload.single('image'), (req, res) => {
  let image = req.body.image;

  if (req.file) {
    image = 'assets/' + req.file.filename;
  }

  const changedMovie = {
    movie_id: +req.body.movie_id,
    duration: +req.body.duration,
    title: req.body.title,
    release_year: +req.body.release_year,
    fsk: +req.body.fsk,
    genre: req.body.genre,
    image: image,
    trailer: req.body.trailer,
    description: req.body.description,
  };

  const sql = `UPDATE movie SET ? WHERE movie_id = ${req.params.movie_id}`;

  con.query(sql, changedMovie, (err, result) => {
    if (err) {
      console.log('updaten fehlgeschlagen!');
      throw err;
    }
    console.log('updaten erfolgreich!');
    res.send(result);
  });
});
