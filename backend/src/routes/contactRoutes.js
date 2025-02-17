// src/routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST route to insert a new contact
router.post('/contacts', (req, res) => {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    // Insert into the database
    db.query(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name, email, message],
        (err, results) => {
            if (err) {
                console.error('❌ Error inserting contact:', err);
                return res.status(500).json({ error: err.message });
            }
            console.log('✅ Contact inserted:', results);
            res.json({ id: results.insertId, name, email, message });
        }
    );
});

// GET route to fetch all contacts
router.get('/contacts', (req, res) => {
    db.query('SELECT * FROM contacts', (err, results) => {
        if (err) {
            console.error('❌ Error fetching contacts:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('✅ Contacts fetched:', results);
        res.json(results);
    });
});

// PUT route to update a contact
router.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;

    db.query(
        'UPDATE contacts SET name = ?, email = ?, message = ? WHERE id = ?',
        [name, email, message, id],
        (err, results) => {
            if (err) {
                console.error('❌ Error updating contact:', err);
                return res.status(500).json({ error: err.message });
            }
            console.log('✅ Contact updated:', results);
            res.json({ id, name, email, message });
        }
    );
});

// DELETE route to delete a contact
router.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM contacts WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('❌ Error deleting contact:', err);
            return res.status(500).json({ error: err.message });
        }
        console.log('✅ Contact deleted:', results);
        res.json({ message: 'Contact deleted successfully' });
    });
});


module.exports = router;