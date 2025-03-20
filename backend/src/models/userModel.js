const db = require('../config/db');

const findUserByEmail = (email, callback) => {
    db.query('SELECT * FROM user WHERE email = ?', [email], callback);
};

const createUser = (name, email, password, callback) => {
    db.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password], callback);
};

module.exports = { findUserByEmail, createUser };
