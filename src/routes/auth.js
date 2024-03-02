// ---------------------------
// Routes for Auth
// ---------------------------

const express = require('express');
const authController = require('../controllers/authController.js');
const authentication = require('../middlewares/authentication.js');

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.post('/login', authController.login);
router.post('/logout', authentication, authController.logout);
router.put('/changepassa', authentication, authController.changepass);

module.exports = router