const app = require('./app');
const dotenv = require('dotenv');
const db = require('./config/db');
dotenv.config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

