const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/students', db.getStudents);

app.post('/register', db.register);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})