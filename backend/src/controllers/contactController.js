const contactModel = require('../models/contactModel');

// Get all contacts
exports.getAllContacts = (req, res) => {
    contactModel.getAllContacts((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Add a new contact
exports.addContact = (req, res) => {
    const { name, email, message } = req.body;
    contactModel.addContact(name, email, message, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: results.insertId, name, email, message });
    });
};

// Update a contact
exports.updateContact = (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;
    contactModel.updateContact(id, name, email, message, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, name, email, message });
    });
};

// Delete a contact
exports.deleteContact = (req, res) => {
    const { id } = req.params;
    contactModel.deleteContact(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Contact deleted successfully' });
    });
};