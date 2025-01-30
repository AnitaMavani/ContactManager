const express = require('express');
const router = express.Router(); // ✅ Create a router instance

// Define your routes here
router.get('/contacts', (req, res) => {
    // Handler for GET /contacts
    res.send('Get all contacts');
});

router.post('/contacts', (req, res) => {
    // Handler for POST /contacts
    res.send('Create a new contact');
});

module.exports = router; // ✅ Export the router (not an object)