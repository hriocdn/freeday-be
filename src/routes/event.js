// ---------------------------
// Routes for Event
// ---------------------------

const express = require('express');
const eventController = require('../controllers/eventController.js');
const authentication = require('../middlewares/authentication.js');
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/events', authentication, eventController.index);
router.get('/event-show/:event', authentication, eventController.show);
router.post('/events', authentication, eventController.create);
router.put('/event', authentication, eventController.update);

module.exports = router