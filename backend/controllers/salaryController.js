const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });


exports.getSalary= asyncHandler(async (req, res, next) => {

    let sql = `SELECT staff.*, salary.* 
    FROM staff
    LEFT JOIN salary ON staff.staff_id = salary.staff_id;
    
    `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, salary: result });
    } else {
      return next(new ErrorHandler("Salary Data not Availabel", 404));
    }
  });
});


exports.getSalaryStructureById = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        let sql;
        let values;
        console.log(id)
        if (id) {
          sql = "SELECT * FROM salarystructure WHERE staff_id = ?";
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
            res.status(200).json({ success: true, memberSalary: result[0] });
          } else {
            return next(new ErrorHandler("Student not found", 404));
          }
        });
      });
// exports.getSalaryStucture = asyncHandler(async (req, res, next) => {

//   let sql = `SELECT * from Salary;
  
//   `;
// db.query(sql, (err, result) => {
//   if (err) {
//     console.error("Error during retrieval:", err);
//     return next(new ErrorHandler("Error during retrieval", 500));
//   }

//   if (result.length > 0) {
//     res.status(200).json({ success: true, feeStructure: result });
//   } else {
//     return next(new ErrorHandler("Fees Structure not Availabel", 404));
//   }
// });
// });

// exports.getFeeStructureByClass = asyncHandler(async (req, res, next) => {
//   const class_value=req.params.class_value
//   let sql = `SELECT * from fees_details where class_value='${class_value}';`;
// db.query(sql, (err, result) => {
//   if (err) {
//     console.error("Error during retrieval:", err);
//     return next(new ErrorHandler("Error during retrieval", 500));
//   }

//   if (result.length > 0) {
//     res.status(200).json({ success: true, feeStructure: result });
//   } else {
//     res.status(404).json({ success: false, message: `Fees Structure not available for class ${class_value}` });
//   }
// });
// });



// exports.getfeeByStudentID = asyncHandler(async (req, res, next) => {
//     const { id } = req.params;
//     let sql;
//     let values;
//     if (id) {
//       sql = `SELECT students.*, fees.* 
//       FROM students
//       JOIN fees ON students.student_id = fees.student_id
//       WHERE students.student_id = ?;`;
//       values = [id];
//     } else {
//       return next(new ErrorHandler("Missing parameters", 400));
//     }
  
//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.error("Error during retrieval:", err);
//         return next(new ErrorHandler("Error during retrieval", 500));
//       }
  
//       if (result.length > 0) {
//         res.status(200).json({ success: true, fees: result });
//       } else {
//         return next(new ErrorHandler("Student not found", 404));
//       }
//     });
//   });

//   exports.createFees = async (req, res, next) => {
//     try {
//       const feesData = req.body;
//       const tableName = "fees";
//       const columns = Object.keys(feesData).join(", ");
//       const valuesPlaceholders = Object.keys(feesData)
//         .map(() => "?")
//         .join(", ");
  
//       const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;
  
//       const values = Object.values(feesData);
  
//       await db.promise().query(insertQuery, values);
  
//       res.status(201).json({
//         success: true,
//         message: `Fees submitted successfully`,
//       });
//     } catch (error) {
//       console.error("Error creating fees data:", error);
//       res.status(500).json({ success: false, message: "Internal server error" });
//     }
//   };
exports.createSalary = async (req, res, next) => {
    try {
        const SalaryData = req.body;
        const staffId = SalaryData.staff_id;
        const tableName = "salarystructure";
        const columns = Object.keys(SalaryData).join(", ");
        const valuesPlaceholders = Object.keys(SalaryData)
            .map(() => "?")
            .join(", ");

        const checkQuery = `SELECT COUNT(*) as count FROM ${tableName} WHERE staff_id = ?`;
        const [rows] = await db.promise().query(checkQuery, [staffId]);
        const count = rows[0].count;

        let operation;
        let message;
        if (count > 0) {
            // Constructing the SET clause dynamically
            const setValues = Object.keys(SalaryData).map(key => `${key} = ?`).join(", ");
            const updateQuery = `UPDATE ${tableName} SET ${setValues} WHERE staff_id = ${staffId}`;
            const values = [...Object.values(SalaryData)]; // excluding staff_id from values
            await db.promise().query(updateQuery, values);
            operation = "updated";
            message = `Salary structure for staff_id ${staffId} updated successfully`;
        } else {
            const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;
            const values = Object.values(SalaryData);
            await db.promise().query(insertQuery, values);
            operation = "created";
            message = `Salary structure created successfully`;
        }

        res.status(201).json({
            success: true,
            message: message,
        });
    } catch (error) {
        console.error("Error creating/updating salary structure:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


exports.paySalary = async (req, res, next) => {
    try {
        const SalaryData = req.body;
        console.log(SalaryData)
        const staffId = SalaryData.staff_id;
        const tableName = "salary";
        const columns = Object.keys(SalaryData).join(", ");
        const valuesPlaceholders = Object.keys(SalaryData)
            .map(() => "?")
            .join(", ");

        const checkQuery = `SELECT COUNT(*) as count FROM ${tableName} WHERE staff_id = ?`;
        const [rows] = await db.promise().query(checkQuery, [staffId]);
        const count = rows[0].count;

        let operation;
        let message;
        if (count > 0) {
            // Constructing the SET clause dynamically
            const setValues = Object.keys(SalaryData).map(key => `${key} = ?`).join(", ");
            const updateQuery = `UPDATE ${tableName} SET ${setValues} WHERE staff_id = ${staffId}`;
            const values = [...Object.values(SalaryData)]; // excluding staff_id from values
            await db.promise().query(updateQuery, values);
            operation = "updated";
            message = `Salary pay update to staff_id ${staffId} successfully`;
        } else {
          const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;

            const values = Object.values(SalaryData);
            await db.promise().query(insertQuery, values);
            operation = "created";
            message = `Salary pay successfully`;
        }

        res.status(201).json({
            success: true,
            message: message,
        });
    } catch (error) {
        console.error("Error creating/updating salary pay:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
//   exports.updateFeeStructure = asyncHandler(async (req, res, next) => {
//     const values = req.body;
//     const { id } = req.params;
//     console.log(req.body)
//     const updateFieldsString = Object.keys(values)
//       .map((key) => `${key}="${values[key]}"`)
//       .join(", ");
  
//     const sql = `UPDATE fees_details SET ${updateFieldsString} WHERE Fees_detail_id = ${id};`;
//     console.log(sql)
//     db.query(sql, (err, result) => {
//       if (err) {
//         console.error("Error during update:", err);
//         next(new ErrorHandler("Error during update", 500));
//       }
  
//       if (result.affectedRows > 0) {
//         res.status(200).json({ success: true, message: "Update successful" });
//       } else {
//         next(new ErrorHandler("data not found or no changes applied", 404));
//       }
//     });
//   });

//   exports.deleteFeeStructure = asyncHandler(async (req, res, next) => {
//     const { id } = req.params;
   
//     if (!id) {
//       return next(new ErrorHandler("Admission number (id) is required", 400));
//     }
  
//     const sql = `DELETE FROM fees_details WHERE Fees_detail_id = ?`;
  
//     db.query(sql, [id], (err, result) => {
//       if (err) {
//         console.error("Error during deletion:", err);
//         return next(new ErrorHandler("Error during deletion", 500));
//       }
  
//       if (result.affectedRows > 0) {
//         res.status(200).json({ success: true, message: "Deletion successful" });
//       } else {
//         return next(
//           new ErrorHandler("structure not found or no changes applied", 404)
//         );
//       }
//     });
//   });