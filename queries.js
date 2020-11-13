const { text } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'rex',
  host: 'localhost',
  database: 'students',
  password: "",
  port: 5432,
})

const getStudents = (req, res) => {
  pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  })
}

const register = (req, res) => {
  const name = req.body.name;
  if (name && name.length > 0) {
    pool.query('INSERT INTO students (name) VALUES ($1)', [name], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.insertId);
      res.status(201).send(`Student registered with ID: ${results.insertId}`)
    })
  }
}

module.exports = {
  getStudents,
  register,
}