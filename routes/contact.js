const express = require('express');
const Controller = require('../controllers/contact')
const router = express.Router();

router.post('/addContact', Controller.createContact);
router.get('/contacts', Controller.getAllContacts);


module.exports = router;
