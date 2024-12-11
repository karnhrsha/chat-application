/* const express = require('express');
const bcrypt = require('bcryptjs'); // for hashing and comparing passwords
const jwt = require('jsonwebtoken'); // for creating authentication tokens
const db = require('../config/db.config');  // Import the MySQL connection

const router = express.Router();


// Registration Route
router.post('/feedback', async (req, res) => {
    const { name, email, feedback } = req.body;
    console.log('***Feedback API***', email);

        // Insert the new feedback into the database
        const insertQuery = 'INSERT INTO feedback (username, email, feedback) VALUES (?, ?, ?)';
        db.query(insertQuery, [name, email, feedback], (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error inserting feedback' });
                return; // Stop further execution
            }
            res.status(200).json({ message: 'Feedback Success' });
        });
});

module.exports = router; */

const express = require('express');
const poolPromise = require('../config/db.config'); // Import the MSSQL connection pool
const sql = require('mssql'); // Import the mssql library

const router = express.Router();

// Feedback Route
router.post('/feedback', async (req, res) => {
    const { name, email, feedback } = req.body;
    console.log('***Feedback API***', email);

    try {
        // Wait for the connection pool to resolve
        const pool = await poolPromise;

        // SQL Query
        const insertQuery = 'INSERT INTO feedback (username, email, feedback) VALUES (@name, @email, @feedback)';

        // Execute the query
        const result = await pool.request()
            .input('name', sql.VarChar, name)
            .input('email', sql.VarChar, email)
            .input('feedback', sql.VarChar, feedback)
            .query(insertQuery);

        res.status(200).json({ message: 'Feedback submitted successfully', result });
    } catch (error) {
        console.error('Error inserting feedback:', error);
        res.status(500).json({ message: 'Error inserting feedback', error });
    }
});

module.exports = router;

