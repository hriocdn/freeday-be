// ---------------------------
// Routes for Dashboard
// ---------------------------

const express = require('express');
const dashboardController = require('../controllers/dashboardController.js');
const authentication = require('../middlewares/authentication.js');

const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/dashboard', dashboardController.dashboard);

module.exports = router