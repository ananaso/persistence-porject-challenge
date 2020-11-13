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

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
    res.status(200).json(results.rows)
    })
}

const getStudentsByName = (req, res) => {
    let name = req.query.search;
    name = `%${name.toLowerCase()}%`;

    pool.query(
        'SELECT name FROM students WHERE LOWER(name) LIKE $1', [name], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(results.rows)
        }
    )
}


const getGradesById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query('SELECT grades FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
          throw error
      }
  res.status(200).json(results.rows[0].grades)
  })
}


const register = (req, res) => {
  const name = req.body.name;
  if (name && name.length > 0) {
    pool.query('INSERT INTO students (name) VALUES ($1)', [name], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Student registered successfully`)
    })
  }
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id)
    const newGrades = req.body
    let grades;

    pool.query('SELECT grades FROM students WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
    grades = (results.rows[0].grades)
    })

    grades = {...grades, ...newGrades};
    

    pool.query(
        'UPDATE students SET grades = $2 WHERE id = $1', [id, grades], (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).send('Student grades successfully updated');
        }
    )
}

module.exports = {
  getStudents,
  getStudentById,
  register,
  updateStudent,
  getGradesById,
  getStudentsByName
}

