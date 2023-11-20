const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();
const cors = require('cors');

// Create Express app
const app = express();

app.use(cors()); // Enable CORS

// Use body-parser middleware
app.use(bodyParser.json());

app.use(express.static('public'));

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Use these variables in your database connection logic

// MySQL connection settings
const connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName
});

// Connect to MySQL
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Define port
const port = process.env.PORT || 3000;

// Get all students
app.get('/students', (req, res) => {
    connection.query('SELECT * FROM students', (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
});
  
// Get student by ID
app.get('/students/:id', (req, res) => {
    const id = req.params.id;
    connection.query('SELECT * FROM students WHERE id = ?', [id], (error, result) => {
      if (error) throw error;
      res.status(200).json(result);
    });
});
  
// Create a new student
app.post('/students', (req, res) => {
    const student = req.body;
    connection.query('INSERT INTO students SET ?', student, (error, results) => {
      if (error) throw error;
      res.status(201).send(`Student added with ID: ${results.insertId}`);
    });
});
  
// Update an existing student
app.put('/students/:id', (req, res) => {
    const id = req.params.id;
    const student = req.body;
    connection.query('UPDATE students SET ? WHERE id = ?', [student, id], (error) => {
      if (error) throw error;
      res.status(200).send(`Student updated with ID: ${id}`);
    });
});

// Delete a student
app.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM students WHERE id = ?', [id], (error, result) => {
    if (error) throw error;
    res.status(200).send(`Student deleted with ID: ${id}`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

// Export the app for testing
module.exports = app;
