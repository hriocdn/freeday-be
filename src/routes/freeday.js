// ---------------------------
// Routes for Freeday
// ---------------------------

const express = require('express');
const freedayController = require('../controllers/freedayController.js');
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/fdcs', freedayController.index);
router.get('/fdc-show/:event', freedayController.show);
router.post('/fdcs', freedayController.create);
router.put('/fdc', freedayController.update);
router.put('/fdc-item', freedayController.update_rate);
router.put('/fdc-status', freedayController.update_status);

module.exports = router