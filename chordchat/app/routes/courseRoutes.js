const express = require('express');
const db = require('../config/db.config');  // Import the MySQL connection

const router = express.Router();

// Backend: API to enroll in a course
router.post('/enroll', async (req, res) => {
    const { userId, courseId } = req.body;
    
    if (!userId || !courseId) {
        return res.status(400).json({ message: 'User ID and Course ID are required' });
    }
    console.log("====>", userId, courseId);

    // Insert into courses table
    const enrollQuery = 'INSERT INTO user_courses (user_id, course_id) VALUES (?, ?)';
    db.query(enrollQuery, [userId, courseId], (error, results) => {
        if (error) {
            console.log('Error enrolling user:', error);
            return res.status(500).json({ message: 'Error enrolling in course' });
        }
        
        res.status(200).json({ message: 'Successfully enrolled in the course' });
    });
});

// Backend: API to get all courses for a specific user
router.get('/courses/:userId', async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    // Query to fetch courses for the given user ID
    const coursesQuery = `
    SELECT c.course_id, c.course_name, c.description 
    FROM courses c
    JOIN user_courses uc ON c.course_id = uc.course_id
    WHERE uc.user_id = ?
    `;

    db.query(coursesQuery, [userId], (error, results) => {
        if (error) {
            console.error('Error fetching courses:', error);
            return res.status(500).json({ message: 'Error retrieving courses' });
        }
        
        if (results.length === 0) {
            results = [];
        }

        res.status(200).json({ courses: results });
    });
});


module.exports = router;
