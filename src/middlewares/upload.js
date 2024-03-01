// ---------------------------
// Upload CSV Middleware
// ---------------------------

const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    console.log(file.originalname);
    const dir = './public/uploads';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imgFilter = (_req, file, cb) => {
  console.log('Reading file in middleware', file.originalname);
  if (file == undefined) {
    cb('Please upload a file to proceed.', false);
  } else if (path.extname(file.originalname).includes('jpg') || path.extname(file.originalname).includes('jpeg') || path.extname(file.originalname).includes('png')) {
    cb(null, true);
  } else {
    cb('Please upload only image file as only image is supported for now.', false);
  }
};

module.exports = multer({
    storage: storage,
    fileFilter: imgFilter
});