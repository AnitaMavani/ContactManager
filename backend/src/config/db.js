require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database: contact_db');

        // Test query to verify the connection
        db.query('SELECT 1 + 1 AS solution', (err, results) => {
            if (err) {
                console.error('Test query failed:', err);
            } else {
                console.log('Test query result:', results[0].solution);
            }
        });
    }
});

module.exports = db;