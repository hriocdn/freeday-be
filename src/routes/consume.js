// ---------------------------
// Routes for Consume
// ---------------------------

const express = require('express');
const consumeController = require('../controllers/consumeController.js');
const upload = require('../middlewares/upload.js');
const authentication = require('../middlewares/authentication.js');
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/consumes', authentication, consumeController.index);
router.get('/consume-search', authentication, consumeController.index_name);
router.get('/consume-show/:consume', authentication, consumeController.show);
router.post('/consumes', authentication, consumeController.create);
router.put('/consume', authentication, consumeController.update);
router.post('/upload-img-consume', authentication, upload.single('file'), consumeController.update_img);

module.exports = router