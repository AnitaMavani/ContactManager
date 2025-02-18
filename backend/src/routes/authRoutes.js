// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const [existingUser] = await db.promise().query(
            'SELECT * FROM user WHERE email = ?',
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const [result] = await db.promise().query(
            'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.json({ id: result.insertId, name, email });
    } catch (error) {
        console.error('❌ Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const [users] = await db.promise().query(
            'SELECT * FROM user WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const user = users[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token (optional)
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('❌ Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// router.get('/me', async (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, 'your_jwt_secret');
//         const [user] = await db.promise().query(
//             'SELECT id, name, email FROM user WHERE id = ?',
//             [decoded.id]
//         );

//         if (user.length === 0) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json(user[0]);
//     } catch (error) {
//         console.error('❌ Error fetching user data:', error);
//         res.status(500).json({ error: 'Failed to fetch user data' });
//     }
// });

// router.get('/test', (req, res) => {
//     res.json({ message: 'API is working!' });
// });

module.exports = router;