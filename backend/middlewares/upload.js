const multer = require('multer');

// Set up multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'students/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname); // Use original file name
  }
});

// Create upload middleware
const uploadStudentsData = multer({ storage: storage });

module.exports = uploadStudentsData;
