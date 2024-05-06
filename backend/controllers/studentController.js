const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { v4: uuidv4 } = require("uuid");
const moment = require('moment');
// exports.createStudent = async (req, res, next) => {
//   res.send("ok")
//   try {
//     const studentBioData = req.body;

//     const tableName = "students";

//     const columns = Object.keys(studentBioData).join(", ");
//     const valuesPlaceholders = Object.keys(studentBioData)
//       .map(() => "?")
//       .join(", ");

//     const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;

//     const values = Object.values(studentBioData);

//     console.log(values);

//     await db.promise().query(insertQuery, values);

//     res.status(201).json({
//       success: true,
//       message: `Student bio-data created successfully`,
//     });
//   } catch (error) {
//     console.error("Error creating student bio-data:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

exports.getStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  let sql;
  let values;
  if (id) {
    sql = "SELECT * FROM students WHERE student_id = ?";
    values = [id];
  } else {
    return next(new ErrorHandler("Missing parameters", 400));
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, student: result[0] });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
});

exports.getStudents = asyncHandler(async (req, res, next) => {
  let sql = "SELECT * FROM students";

  const { class: studentClass } = req.query;
  const [clas, section] = studentClass.split("-");
   console.log(studentClass);
  if (studentClass === "undefined") {
    console.log("hii");
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        return next(new ErrorHandler("Error during retrieval", 500));
      }

      res.status(200).json({ success: true, students: result });
    });
  } else {
    sql += ` WHERE class_name = ? AND section =  ?;`;
    db.query(sql, [clas, section], (err, result) => {
      if (err) {
        console.error("Error during retrieval:", err);
        return next(new ErrorHandler("Error during retrieval", 500));
      }
      res.status(200).json({ success: true, students: result });
    });
  }
});

exports.updateStudent = asyncHandler(async (req, res, next) => {
  const updatedFields = req.body;
  const { id } = req.params;

  const updateFieldsString = Object.keys(updatedFields)
    .map((key) => `${key}="${updatedFields[key]}"`)
    .join(", ");

  const sql = `UPDATE students SET ${updateFieldsString} WHERE student_id = '${id}';`;

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

exports.deleteStudent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler("Admission number (id) is required", 400));
  }

  const sql = `DELETE FROM students WHERE student_id = ?`;

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

exports.markAbsentStudent = asyncHandler(async (req, res, next) => {
  const { student_id, attendance, typeCase } = req.body;
  if (!student_id) {
    return next(
      new ErrorHandler(`Student Id (${student_id}) is required`, 400)
    );
  }

  if (typeCase === "leave_date") {
    // Delete existing record with the same student_id and absent_date
    const deleteSql = `DELETE FROM attendance WHERE student_id = ? AND absent_date = ?`;
    const deleteValues = [student_id, attendance];
    db.query(deleteSql, deleteValues, (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error("Error during delete:", deleteErr);
        return next(new ErrorHandler("Error during delete", 500));
      }
      insertAttendanceRecord(student_id, attendance, typeCase, res, next);
    });
  } else {
    insertAttendanceRecord(student_id, attendance, typeCase, res, next);
  }
});

function insertAttendanceRecord(student_id, attendance, typeCase, res, next) {
  const sql = `INSERT INTO attendance (student_id, ${typeCase}) VALUES (?, ?)`;
  const values = [student_id, attendance];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error during insert:", err);
      return next(new ErrorHandler("Error during insert", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "Absent record inserted successfully",
      });
    } else {
      return next(new ErrorHandler("Failed to insert absent record", 500));
    }
  });
}

exports.markPresent = asyncHandler(async (req, res, next) => {
  const { student_id, attendance } = req.body;
  if (!student_id) {
    return next(
      new ErrorHandler(`Student Id (${student_id}) is required`, 400)
    );
  }

  const sqlDelete = `DELETE FROM attendance WHERE student_id = ? AND leave_date = ?`;
  const valuesDelete = [student_id, attendance];

  db.query(sqlDelete, valuesDelete, (err, result) => {
    if (err) {
      console.error("Error during delete:", err);
      return next(new ErrorHandler("Error during delete", 500));
    }

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ success: true, message: "Absent record deleted successfully" });
    } else {
      return next(new ErrorHandler("Failed to delete absent record", 500));
    }
  });
});

exports.getAbsents = asyncHandler(async (req, res, next) => {
  const sql = "SELECT * FROM attendance;";

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, absents: result });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
});

exports.getStudentAbsents = catchAsyncErrors(async (req, res, next) => {
  const studentId = req.params.studentId; 

  const sql = "SELECT * FROM attendance WHERE student_id = ?";

  db.query(sql, [studentId], (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }
  
    if (result.length > 0) {
      res.status(200).json({ success: true, absents: result });
    } else {
      res.status(200).json({ success: true, absents: [] });
    }
  });
});

exports.uploadDocuments = asyncHandler(async (req, res, next) => {
  const studentId = req.params.student_id;
  const documentName = req.body.document_name;
  const file = req.files.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const folderPath = path.join(
      __dirname,
      "..",
      "..",
      "frontend",
      "public",
      documentName
    );

    fs.mkdirSync(folderPath, { recursive: true });

    // Move the uploaded file to the folder
    const [_, fileType] = file.name.split(".");

    const fileName = `${studentId}_${documentName}.${fileType}`;
    const filePath = path.join(folderPath, fileName);
    await file.mv(filePath);
    await updateDocumentName(studentId, documentName, fileName);

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

exports.getStudentDocumentsById = asyncHandler(async (req, res, next) => {
  const sql = "SELECT * FROM student_documents WHERE student_id =?;";
  const { student_id } = req.params;
  db.query(sql, [student_id], (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, documents: result[0] });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
});
exports.deleteStudentDocument = asyncHandler(async (req, res, next) => {
  const { student_id } = req.params;
  const { document_name } = req.body;

  let query =
    "DELETE FROM student_documents WHERE student_id = ? AND document_name = ?";
  let params = [student_id, document_name];

  // Check which columns are present in the request body and add them to the query and parameters

  db.query(query, params, (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }

    if (result.affectedRows > 0) {
      res
        .status(200)
        .json({ success: true, message: "Document deleted successfully" });
    } else {
      return next(new ErrorHandler("Document not found", 404));
    }
  });
});

function updateDocumentName(studentId, documentName, value) {
  return new Promise((resolve, reject) => {
    const checkQuery = `SELECT COUNT(*) AS count FROM student_documents WHERE student_id = ?`;
    db.query(checkQuery, [studentId], (err, results) => {
      if (err) {
        reject(err);
        return;
      }

      const rowCount = results[0].count;
      if (rowCount > 0) {
        const updateQuery = `UPDATE student_documents SET ${documentName} = ? WHERE student_id = ?`;
        db.query(updateQuery, [value, studentId], (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });
      } else {
        const insertQuery = `INSERT INTO student_documents (student_id, ${documentName}) VALUES (?, ?)`;
        db.query(insertQuery, [studentId, value], (err, results) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(results);
        });
      }
    });
  });
}

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


exports.uploadStudents = asyncHandler(async (req, res) => {
  // Check if files were uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded" });
  }

  // Access the uploaded file
  const csvFile = req.files.data; // Assuming the field name in the form is 'data'
 console.log(csvFile);
  const uploadPath = `./students/${csvFile.name}`;
  csvFile.mv(uploadPath, async (err) => {
    if (err) {
      console.error("Error uploading student data:", err);
      return res.status(500).json({ error: "Error uploading student data" });
    }

    try {
      const csvData = await extractCsvData(uploadPath);
      for (const row of csvData) {
        let columns = "";
        let values = "";
        for (const column in row) {
          let value = row[column];
          
          // if (column === 'date_of_birth' || column === 'date_of_admission') {
          //   value = moment(value, 'MM/DD/YYYY').format('YYYY-MM-DD');
          // }
          columns += `${column}, `;
          values += `'${value}', `;
        }

        // Remove the trailing comma and space from columns and values strings
        columns = columns.slice(0, -2);
        values = values.slice(0, -2);
      
        const insertQuery = `INSERT INTO students (${columns}) VALUES (${values})`;
        try {
          await db.promise().query(insertQuery);
        } catch (error) {
          // Check if the error is due to duplicate entry
          if (error.code === 'ER_DUP_ENTRY') {
            const errorMessage = `Duplicate entry for admission number: ${row.admission_no}`;
            return res.status(400).json({ error: errorMessage });
          } else {
            throw error; // Rethrow other errors
          }
        }
      }
      
      // Send response after processing all rows
      res.status(200).json({ message: "Data saved successfully" });
    } catch (error) {
      console.error("Error processing CSV data:", error);
      // Handle error and send appropriate response
      return res.status(500).json({ error: "Error processing CSV data" });
    }
  });
});
