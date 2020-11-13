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
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.get('/students', (req, res) => {
  if (req.query.search) {
    db.getStudentsByName(req, res);
  } else {
    db.getStudents(req, res);
  }
});

app.get('/students/:id', db.getStudentById);

app.post('/register', db.register);

app.post('/grades/:id', db.updateStudent);

app.get('/grades/:id', db.getGradesById);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})