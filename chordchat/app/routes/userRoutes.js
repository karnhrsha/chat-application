// routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcrypt'); // for hashing and comparing passwords
const jwt = require('jsonwebtoken'); // for creating authentication tokens
const db = require('../config/db.config');  // Import the MySQL connection

const router = express.Router();

// Replace with a secure secret for production; store it securely in environment variables
const JWT_SECRET = 'your_jwt_secret_key';

// Registration Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('***Registration API***', email);

    // Check if the user already exists
    const checkQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkQuery, [email], async (error, results) => {
        if (error) return res.status(500).json({ message: 'Database error' });
        if (results.length > 0) {
            console.log('Duplicate Registration');
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(insertQuery, [name, email, hashedPassword], (error, results) => {
            if (error) {
                res.status(500).json({ message: 'Error registering user' });
                return; // Stop further execution
            }
            res.status(200).json({ message: 'Registration successful', username: name, userId: results.insertId, userEmail: email});
        });
    });
});

// Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log('***Login API Called***', email);

    // Check if the user exists
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (error, results) => {
        if (error) {
            console.error("Database error during user lookup:", error);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        // Compare the input password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token on successful login
        const token = jwt.sign({ id: user.user_id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h', // token expires in 1 hour
        });
        console.log('userid==>', user.user_id);

        res.status(200).json({ message: 'Login successful', token, username: user.username, userId: user.user_id, userEmail: user.email});
    });
});

module.exports = router;
