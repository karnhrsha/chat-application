const express = require('express');
const bcrypt = require('bcrypt'); // for hashing and comparing passwords
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

module.exports = router;
