const express = require('express')
const bodyParser = require("body-parser");
const db = require('./db');

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/health-check',(req, res)=>{
  res.send('I am health ^_^!')
})

app.get('/connect-db',(req, res, next) => {
  db.raw('select VERSION() version')
  .then(([rows, columns]) => rows[0])
  .then((row) => res.json({ message: `Hello from MySQL ${row.version}` }))
  .catch(next);
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})
