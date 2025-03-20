const db = require('../config/db');

const getAllContacts = (callback) => {
    db.query('SELECT * FROM contacts', callback);
};

const addContact = (name, email, message, callback) => {
    db.query(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name, email, message],
        callback
    );
};

const updateContact = (id, name, email, message, callback) => {
    db.query(
        'UPDATE contacts SET name = ?, email = ?, message = ? WHERE id = ?',
        [name, email, message, id],
        callback
    );
};

const deleteContact = (id, callback) => {
    db.query('DELETE FROM contacts WHERE id = ?', [id], callback);
};

module.exports = {
    getAllContacts,
    addContact,
    updateContact,
    deleteContact,
};
