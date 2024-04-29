const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });
const path = require('path');
const fs = require('fs');



exports.createNotice = async (req, res, next) => {

  const  title = req.body.title;
  const text = req.body.text;
  const  date = req.body.date;
  const  time  = req.body.time;
  const file = req.files.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const folderPath = path.join(
    __dirname,
    "..",
    "noticefiles"
  );

  fs.mkdirSync(folderPath, { recursive: true });

  // Move the uploaded file to the folder


  
  const filePath = path.join(folderPath, file.name);
  await file.mv(filePath);
  
  const query = 'INSERT INTO noticeboard (title, content, file, date, time) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, text, file.name, date, time], (error, results, fields) => {
      if (error) {
          console.error('Error saving file information:', error);
          res.status(500).json({ error: 'Internal server error' });
      } else {
          res.status(200).json({ message: 'File uploaded successfully' });
      }
  });
};

exports.getNotice = catchAsyncErrors(async (request, response, next) => {
  const sql = "SELECT * FROM noticeboard";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      response.status(200).json({ success: true, notice: result }); 
    } else {
      return next(new ErrorHandler("Notice not found", 404)); 
    }
  });
});


exports.getNoticeFlie = catchAsyncErrors(async (req, res, next) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, `../noticefiles/${fileName}`);
  if (fs.existsSync(filePath)) {
    console.log(filePath)
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).send('File not found');
  }
});
