// src/controllers/contactController.js
const db = require('../config/db');

// Get all contacts
exports.getAllContacts = (req, res) => {
    db.query('SELECT * FROM contacts', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Add a new contact
exports.addContact = (req, res) => {
    const { name, email, message } = req.body;
    db.query(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name, email, message],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: results.insertId, name, email, message });
        }
    );
};

// Update a contact
exports.updateContact = (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;
    db.query(
        'UPDATE contacts SET name = ?, email = ?, message = ? WHERE id = ?',
        [name, email, message, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ id, name, email, message });
        }
    );
};

// Delete a contact
exports.deleteContact = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM contacts WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Contact deleted successfully' });
    });
};