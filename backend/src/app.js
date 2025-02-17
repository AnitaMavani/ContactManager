// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', contactRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});