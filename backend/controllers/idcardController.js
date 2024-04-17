// import express from 'express';
// import cors from 'cors';
// import mysql from "mysql2/promise";

const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });


// const app = express();
// const port = 4999;

// app.use('/uploads', express.static('uploads'));
// app.use(express.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

exports.getIdcard = asyncHandler(async (req, res, next) => {
    let sql = "SELECT *, DATE_FORMAT(date_of_birth, '%m/%d/%Y') AS date_of_birth FROM students";
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        return next(new ErrorHandler("Error during retrieval", 500));
      }
  
      if (result.length > 0) {
        res.status(200).json({ success: true, books: result });
      } else {
        return next(new ErrorHandler("Student not found", 404));
      }
    });
  });
  

