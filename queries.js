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

module.exports = {getStudents,}