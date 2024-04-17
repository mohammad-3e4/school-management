const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });


exports.getFees = asyncHandler(async (req, res, next) => {
    let selectedClass = req.params.selectedClass;
    let sql = `SELECT students.*, fees.* 
    FROM students
    LEFT JOIN fees ON students.student_id = fees.student_id
    where students.class_name='${selectedClass.slice("-")[0]}';
    
    `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, fees: result });
    } else {
      return next(new ErrorHandler("Fees Data not Availabel", 404));
    }
  });
});


exports.getFeeStructure = asyncHandler(async (req, res, next) => {

  let sql = `SELECT * from fees_details;
  
  `;
db.query(sql, (err, result) => {
  if (err) {
    console.error("Error during retrieval:", err);
    return next(new ErrorHandler("Error during retrieval", 500));
  }

  if (result.length > 0) {
    res.status(200).json({ success: true, feeStructure: result });
  } else {
    return next(new ErrorHandler("Fees Structure not Availabel", 404));
  }
});
});

exports.getFeeStructureByClass = asyncHandler(async (req, res, next) => {
  const class_value=req.params.class_value
  let sql = `SELECT * from fees_details where class_value='${class_value}';`;
db.query(sql, (err, result) => {
  if (err) {
    console.error("Error during retrieval:", err);
    return next(new ErrorHandler("Error during retrieval", 500));
  }

  if (result.length > 0) {
    res.status(200).json({ success: true, feeStructure: result });
  } else {
    res.status(404).json({ success: false, message: `Fees Structure not available for class ${class_value}` });
  }
});
});



exports.getfeeByStudentID = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let sql;
    let values;
    if (id) {
      sql = `SELECT students.*, fees.* 
      FROM students
      JOIN fees ON students.student_id = fees.student_id
      WHERE students.student_id = ?;`;
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
        res.status(200).json({ success: true, fees: result });
      } else {
        res.status(200).json({ success: true, fees: [] });
        return next(new ErrorHandler("Student not found", 404));
      }
    });
  });

  exports.createFees = async (req, res, next) => {
    try {
      const feesData = req.body;
      const tableName = "fees";
      const columns = Object.keys(feesData).join(", ");
      const valuesPlaceholders = Object.keys(feesData)
        .map(() => "?")
        .join(", ");
  
      const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;
  
      const values = Object.values(feesData);
  
      await db.promise().query(insertQuery, values);
  
      res.status(201).json({
        success: true,
        message: `Fees submitted successfully`,
      });
    } catch (error) {
      console.error("Error creating fees data:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  exports.createFeeStructure = async (req, res, next) => {
    try {
      const feeStructureData = req.body;
      const tableName = "fees_details";
      const columns = Object.keys(feeStructureData).join(", ");
      const valuesPlaceholders = Object.keys(feeStructureData)
        .map(() => "?")
        .join(", ");
  
      const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;
  
      const values = Object.values(feeStructureData);
  
      await db.promise().query(insertQuery, values);
  
      res.status(201).json({
        success: true,
        message: `Fees structure created succesfully`,
      });
    } catch (error) {
      console.error("Error creating fees structure:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };


  exports.updateFeeStructure = asyncHandler(async (req, res, next) => {
    const values = req.body;
    const { id } = req.params;
    console.log(req.body)
    const updateFieldsString = Object.keys(values)
      .map((key) => `${key}="${values[key]}"`)
      .join(", ");
  
    const sql = `UPDATE fees_details SET ${updateFieldsString} WHERE Fees_detail_id = ${id};`;
    console.log(sql)
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error during update:", err);
        next(new ErrorHandler("Error during update", 500));
      }
  
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: "Update successful" });
      } else {
        next(new ErrorHandler("data not found or no changes applied", 404));
      }
    });
  });

  exports.deleteFeeStructure = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
   
    if (!id) {
      return next(new ErrorHandler("Admission number (id) is required", 400));
    }
  
    const sql = `DELETE FROM fees_details WHERE Fees_detail_id = ?`;
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error during deletion:", err);
        return next(new ErrorHandler("Error during deletion", 500));
      }
  
      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: "Deletion successful" });
      } else {
        return next(
          new ErrorHandler("structure not found or no changes applied", 404)
        );
      }
    });
  });