const multer = require('multer');
const path = require('path');

const noticeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, '../noticefiles/');
    console.log("Destination Path:", destinationPath);
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    console.log("Uploaded File:", file.originalname);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: noticeStorage });

module.exports = { noticeStorage, upload };
