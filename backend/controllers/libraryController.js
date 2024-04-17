const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

// ***************************************************************All Books**************************************************
exports.getBooks = asyncHandler(async (req, res, next) => {
  let sql = "SELECT * FROM books";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }
    if (result.length > 0) {
      res.status(200).json({ success: true, books: result });
    } else {
      return next(new ErrorHandler("books not found", 404));
    }
  });
});

// ***************************************************************Add Books**************************************************

exports.addBooks = asyncHandler(async (req, res, next) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  let placeholders = keys.map(() => "?").join(",");
  let columns = keys.join(",");

  db.query(
    `INSERT INTO books (${columns}) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        if (err.code === "ER_BAD_FIELD_ERROR") {
          return res.status(400).json({
            success: false,
            message: `One or more columns (${columns}) do not exist in the table`,
          });
        } else {
          return next(new ErrorHandler("Error during retrieval", 500));
        }
      }

      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ success: true, message: "Book added successfully" });
      } else {
        return next(new ErrorHandler("Failed to add book", 500));
      }
    }
  );
});

// ***************************************************************Add Issued Books**************************************************

exports.addissuedBooks = asyncHandler(async (req, res, next) => {
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);

  // Construct placeholders for prepared statement
  let placeholders = keys.map(() => "?").join(",");
  // Get column names
  let columns = keys.join(",");

  db.query(
    // Dynamically construct SQL query with column names and placeholders
    `INSERT INTO issued_books (${columns}) VALUES (${placeholders})`,
    values,
    (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        // Check if the error is related to an unknown column
        if (err.code === "ER_BAD_FIELD_ERROR") {
          return res.status(400).json({
            success: false,
            error: `One or more columns (${columns}) do not exist in the table`,
          });
        } else {
          return next(new ErrorHandler("Error during retrieval", 500));
        }
      }

      if (result.affectedRows > 0) {
        res
          .status(200)
          .json({ success: true, message: "Book added successfully" });
      } else {
        return next(new ErrorHandler("Failed to add book", 500));
      }
    }
  );
});

// ***************************************************************All Issued Books**************************************************

exports.getissuedBooks = asyncHandler(async (req, res, next) => {
  let sql =
    "SELECT * , DATE_FORMAT(issue_date, '%d/%m/%Y') AS issue_date,DATE_FORMAT(return_date, '%d/%m/%Y') AS return_date FROM issued_books";

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

// ******************************************************Delete Books**********************************************

exports.deleteBook = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Admission number (id) is required", 400));
  }

  const sql = `DELETE FROM books WHERE books_id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Deletion successful" });
    } else {
      return next(
        new ErrorHandler("Student not found or no changes applied", 404)
      );
    }
  });
});

// ******************************************************Update Books**********************************************

exports.updateBook = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const updatedFields = req.body;
  const { id } = req.params;

  const updateFieldsString = Object.keys(updatedFields)
    .map((key) => `${key}="${updatedFields[key]}"`)
    .join(", ");

  const sql = `UPDATE books SET ${updateFieldsString} WHERE book_id = '${id}';`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during update:", err);
      next(new ErrorHandler("Error during update", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Update successful" });
    } else {
      next(new ErrorHandler("User not found or no changes applied", 404));
    }
  });
});

const extractCsvData = async (filePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

exports.uploadBooks = asyncHandler(async (req, res) => {
  // Check if files were uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded" });
  }

  // Access the uploaded file
  const csvFile = req.files.data; // Assuming the field name in the form is 'data'
  console.log(csvFile);
  const uploadPath = `./books/${csvFile.name}`;

  csvFile.mv(uploadPath, async (err) => {
    if (err) {
      console.error("Error uploading books data:", err);
      return res.status(500).json({ error: "Error uploading books data" });
    }

    try {
      const csvData = await extractCsvData(uploadPath);
      console.log(csvData);
      for (const row of csvData) {
        let columns = "";
        let values = "";
        for (const column in row) {
          let value = row[column];
          columns += `${column}, `;
          values += `'${value}', `;
        }

        // Remove the trailing comma and space from columns and values strings
        columns = columns.slice(0, -2);
        values = values.slice(0, -2);

        const insertQuery = `INSERT INTO books (${columns}) VALUES (${values})`;
        try {
          await db.promise().query(insertQuery);
        } catch (error) {
          // Check if the error is due to duplicate entry

          return res.status(400).json({ error: error.message });
        }
      }

      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error("Error processing CSV data:", error.message);

      return res.status(500).json({ error: "Error processing CSV data" });
    }
  });
});
