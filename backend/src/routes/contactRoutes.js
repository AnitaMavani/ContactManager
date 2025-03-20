const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateContact } = require('../middleware/contactValidation');
//const authenticateToken = require('../middleware/authMiddleware');

router.get('/', contactController.getAllContacts);
router.post('/', validateContact, contactController.addContact);
router.put('/:id', validateContact, contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;

