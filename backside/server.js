const express = require('express')
var cors = require('cors');
const app = express()
const port = 6969

app.use(cors())

const sqlite3 = require('sqlite3')
let db = new sqlite3.Database('./snapfit.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to database.');
});

app.get('/shirts', (req, res) => {
  let sql = 'SELECT * FROM shirts'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows)
    console.log('Sent that shit back')  
  });
})

app.post('/shirts', (req, res) => {
  console.log('recieved rerquest')
  let photo = req.body;
  console.log(photo)
  let sql = `INSERT INTO shirts (photo) VALUES (\'${photo}\')`
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    console.log('Popped that shit up')  
  });
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

/*
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});
*/