const express = require('express')
const app = express()
const port = 3000

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