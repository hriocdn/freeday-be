// ---------------------------
// Routes for Event
// ---------------------------

const express = require('express');
const eventController = require('../controllers/eventController.js');
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/events', eventController.index);
router.get('/event-show/:event', eventController.show);
router.post('/events', eventController.create);
router.put('/event', eventController.update);

module.exports = router