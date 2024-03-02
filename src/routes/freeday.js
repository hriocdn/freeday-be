// ---------------------------
// Routes for Freeday
// ---------------------------

const express = require('express');
const freedayController = require('../controllers/freedayController.js');
const authentication = require('../middlewares/authentication.js');
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/fdcs', authentication, freedayController.index);
router.get('/fdc-show/:event', freedayController.show);
router.post('/fdcs', authentication, freedayController.create);
router.put('/fdc', authentication, freedayController.update);
router.put('/fdc-item', freedayController.update_rate);
router.put('/fdc-status', authentication, freedayController.update_status);

module.exports = router