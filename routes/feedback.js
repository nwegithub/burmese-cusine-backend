
const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedback');

router.post('/createFeedback', controller.createFeedback);

router.get('/allFeedback', controller.getUserFeedback);

router.delete('/:id',controller.deleteFeedback);

module.exports = router;
