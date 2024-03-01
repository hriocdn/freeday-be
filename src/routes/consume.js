// ---------------------------
// Routes for Consume
// ---------------------------

const express = require('express');
const consumeController = require('../controllers/consumeController.js');
const upload = require('../middlewares/upload.js');
const router = express.Router();

router.use(express.json())
router.use(express.urlencoded({extended: false}))

router.get('/consumes', consumeController.index);
router.get('/consume-search', consumeController.index_name);
router.get('/consume-show/:consume', consumeController.show);
router.post('/consumes', consumeController.create);
router.put('/consume', consumeController.update);
router.post('/upload-img-consume', upload.single('file'), consumeController.update_img);

module.exports = router