// src/config/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root@1234', // Replace with your MySQL password
    database: 'contact_db', // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to MySQL:', err);
    } else {
        console.log('✅ Connected to MySQL database: test_db');
        // Test a simple query
        db.query('SELECT 1 + 1 AS solution', (err, results) => {
            if (err) {
                console.error('❌ Test query failed:', err);
            } else {
                console.log('✅ Test query result:', results[0].solution); // Should log "2"
            }
        });
    }
});

module.exports = db;