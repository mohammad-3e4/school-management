const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });

//  Register new us
exports.getMarks = asyncHandler(async (req, res, next) => {
  const { selectedClass_name } = req.params;
  let sql;
  if (selectedClass_name) {
    sql = ` SELECT students.student_name,students.student_image,students.gender,students.student_id,students.class_name,
           students.roll_no AS roll_no,
           marks_${selectedClass_name}.* 
    FROM students
    JOIN marks_${selectedClass_name} AS marks_${selectedClass_name} ON students.student_id = marks_${selectedClass_name}.student_id;
    `;
  } else {
    return next(new ErrorHandler("Missing parameters", 400));
  }

  db.query(sql, (err, result) => {
    if (err) {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        res.status(200).json({ success: true, marks: [] });
      }
      // console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, marks: result });
    }  else if (result.length == 0) {
      res.status(200).json({ success: true, marks: [] });
    }else {
      return next(new ErrorHandler("Marks not Availabel", 404));
    }
  });
});
exports.getMarksBySubject = asyncHandler(async (req, res, next) => {
  const { selectedClass_name ,subject_name} = req.params;
  let sql;
  if (selectedClass_name) {
    sql = `
    SELECT
        students.student_name,
        students.student_id,
        students.class_name,
        students.roll_no AS roll_no,
        marks_${selectedClass_name.replace("-","_").toLowerCase()}.*
    FROM
        students
    JOIN
        marks_${selectedClass_name.replace("-","_").toLowerCase()} AS marks_${selectedClass_name.replace("-","_").toLowerCase()}
    ON
        students.student_id = marks_${selectedClass_name.replace("-","_").toLowerCase()}.student_id
    WHERE
        marks_${selectedClass_name.replace("-","_").toLowerCase()}.subject_name = "${subject_name}"
`;
  } else {
    return next(new ErrorHandler("Missing parameters", 400));
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, subjectMarks: result });
    } 
    else if (result.length == 0) {
      res.status(200).json({ success: true, subjectMarks: [] });
    } else {
      return next(new ErrorHandler("Marks not Availabel", 404));
    }
  });
});
exports.getMark = asyncHandler(async (req, res, next) => {
  const {class_name,section, id } = req.params;
  let sql;
  let values;
  if (id) {
    sql = `SELECT * FROM marks_${class_name}_${section} WHERE student_id = ?`;
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
      res.status(200).json({ success: true, mark: result });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
});

exports.getMarkHeader = asyncHandler(async (req, res, next) => {
  const {class_name } = req.params;
  let sql;
  if (class_name) {
    sql = `SHOW COLUMNS FROM marks_${class_name.replace("-","_")};`;
  } else {
    return next(new ErrorHandler("Missing parameters", 400));
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      const fieldKeys = result.map(row => row.Field);
    
    // Sending only the 'field' keys as response
    res.status(200).json({ success: true, marksHeader: fieldKeys });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
});

exports.getMaxMarkHeader = asyncHandler(async (req, res, next) => {
  const {class_name } = req.params;
  console.log("maxMarksHeader", class_name);
  let sql;
  if (class_name) {
    sql = `SHOW COLUMNS FROM max_marks_${class_name.split("-")[0].toLowerCase()};`;
  } else {
    return next(new ErrorHandler("Missing parameters", 400));
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      const fieldKeys = result.map(row => row.Field);
    
    // Sending only the 'field' keys as response
    res.status(200).json({ success: true, maxmarksHeader: fieldKeys });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
});
exports.getMaxMarks = asyncHandler(async (req, res, next) => {
  const { class_name } = req.params;
  let sql;
    sql = `SELECT * FROM max_marks_${class_name.split("-")[0].toLowerCase()}`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, maxMarks: result });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
});

exports.setMaxMarks = asyncHandler(async (req, res, next) => {
    try {
      const class_name=req.params.class_name
      const maxMarksData = req.body;
      const tableName = `max-marks_${class_name}`;
      const columns = Object.keys(maxMarksData).join(", ");
      const valuesPlaceholders = Object.keys(maxMarksData)
        .map(() => "?")
        .join(", ");
  
      const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${valuesPlaceholders})`;
  
      const values = Object.values(feesData);
  
      await db.promise().query(insertQuery, values);
  
      res.status(201).json({
        success: true,
        message: `Max Marks submitted successfully`,
      });
    } catch (error) {
      console.error("Error creating max marks data:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  exports.editMarks = asyncHandler(async (req, res, next) => {
    const updatedMarks = req.body;
    const { class_name, subject_name } = req.params;
      console.log("editMarks", class_name);
    const promises = updatedMarks.map((item) => {
        return new Promise((resolve, reject) => {
            let sqlSelect = `SELECT * FROM marks_${class_name.toLowerCase()} WHERE subject_name='${subject_name}' AND student_id=${item.student_id}`;
            db.query(sqlSelect, (err, rows) => {
                if (err) {
                    console.error("Error during SELECT:", err);
                    reject(new ErrorHandler("Error during SELECT", 500));
                } else {
                    if (rows.length > 0) {
                        // If entry exists, update it
                        let sqlUpdate = `UPDATE marks_${class_name.toLowerCase()} SET `;
                        Object.keys(item).forEach((key) => {
                            if (key !== "student_id") {
                                sqlUpdate += `${key}=${item[key]}, `;
                            }
                        });
                        sqlUpdate = sqlUpdate.slice(0, -2); // Removing trailing comma and space
                        sqlUpdate += ` WHERE subject_name='${subject_name}' AND student_id=${item.student_id};`;
                        
                        db.query(sqlUpdate, (err, result) => {
                            if (err) {
                                console.error("Error during update:", err);
                                reject(new ErrorHandler("Error during update", 500));
                            } else {
                                if (result.affectedRows > 0) {
                                    resolve(true); // Mark as updated
                                } else {
                                    resolve(false); // Mark as not updated
                                }
                            }
                        });
                    } else {
                        // If entry doesn't exist, insert it
                        let sqlInsert = `INSERT INTO marks_${class_name} (student_id, subject_name, `;
                        let insertFields = "";
                        let insertValues = "";
                        Object.keys(item).forEach((key) => {
                            if (key !== "student_id") {
                                sqlInsert += `${key}, `;
                                insertFields += `${key}, `;
                                insertValues += `${item[key]}, `;
                            }
                        });
                        sqlInsert = sqlInsert.slice(0, -2) + ") VALUES (" + item.student_id + ", '" + subject_name + "', " + insertValues.slice(0, -2) + ");";

                        db.query(sqlInsert, (err, result) => {
                            if (err) {
                                console.error("Error during insert:", err);
                                reject(new ErrorHandler("Error during insert", 500));
                            } else {
                                if (result.affectedRows > 0) {
                                    resolve(true); // Mark as inserted
                                } else {
                                    resolve(false); // Mark as not inserted
                                }
                            }
                        });
                    }
                }
            });
        });
    });

    Promise.all(promises)
        .then((results) => {
            if (results.includes(true)) {
                res.status(200).json({ success: true, message: "Marks update successful" });
            } else {
                next(new ErrorHandler("No changes applied", 404));
            }
        })
        .catch((error) => {
            next(error);
        });
});

exports.editMaxMarks = asyncHandler(async (req, res, next) => {
  const updatedMarks = req.body;
  const { class_name } = req.params;
console.log(class_name,updatedMarks)
  const promises = updatedMarks.map((item) => {
      return new Promise((resolve, reject) => {
          let sqlSelect = `SELECT * FROM max_marks_${class_name.toLowerCase()} WHERE max_marks_id=${item.max_marks_id}`;
          db.query(sqlSelect, (err, rows) => {
              if (err) {
                  console.error("Error during SELECT:", err);
                  reject(new ErrorHandler("Error during SELECT", 500));
              } else {
                  if (rows.length > 0) {
                      // If entry exists, update it
                      let sqlUpdate = `UPDATE max_marks_${class_name.toLowerCase()} SET `;
                      Object.keys(item).forEach((key) => {
                          if (key !== "max_marks_id") {
                              sqlUpdate += `${key}=${item[key]}, `;
                          }
                      });
                      sqlUpdate = sqlUpdate.slice(0, -2); // Removing trailing comma and space
                      sqlUpdate += ` where max_marks_id=${item.max_marks_id};`;
                      
                      db.query(sqlUpdate, (err, result) => {
                          if (err) {
                              console.error("Error during update:", err);
                              reject(new ErrorHandler("Error during update", 500));
                          } else {
                              if (result.affectedRows > 0) {
                                  resolve(true); // Mark as updated
                              } else {
                                  resolve(false); // Mark as not updated
                              }
                          }
                      });
                  } else {
                      // If entry doesn't exist, insert it
                      let sqlInsert = `INSERT INTO max_marks_${class_name.toLowerCase()} (max_marks_id`;
                      let insertFields = "";
                      let insertValues = "";
                      Object.keys(item).forEach((key) => {
                          if (key !== "max_marks_id") {
                              sqlInsert += `${key}, `;
                              insertFields += `${key}, `;
                              insertValues += `${item[key]}, `;
                          }
                      });
                      sqlInsert = sqlInsert.slice(0, -2) + ") VALUES (" + item.max_marks_id + ", " + insertValues.slice(0, -2) + ");";

                      db.query(sqlInsert, (err, result) => {
                          if (err) {
                              console.error("Error during insert:", err);
                              reject(new ErrorHandler("Error during insert", 500));
                          } else {
                              if (result.affectedRows > 0) {
                                  resolve(true); // Mark as inserted
                              } else {
                                  resolve(false); // Mark as not inserted
                              }
                          }
                      });
                  }
              }
          });
      });
  });

  Promise.all(promises)
      .then((results) => {
          if (results.includes(true)) {
              res.status(200).json({ success: true, message: "max Marks update successful" });
          } else {
              next(new ErrorHandler("No changes applied", 404));
          }
      })
      .catch((error) => {
          next(error);
      });
});
exports.getScholasticMarks = asyncHandler(async (req, res, next) => {
  const { selectedClass_name} = req.params;
  let clas=selectedClass_name?.split("-")[0]
  let section=selectedClass_name?.split("-")[1]
  let sql;
  if (selectedClass_name) {
    sql = `
    SELECT
        students.student_name,
        students.student_id,
        students.class_name,
        students.roll_no AS roll_no,
        scholastic.*
    FROM
        students
    JOIN
    scholastic AS scholastic
    ON
        students.student_id = scholastic.student_id
    WHERE
    students.class_name = "${clas}" and students.section = "${section}"
`;
  } else {
    return next(new ErrorHandler("Missing parameters", 400));
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, scholasticMarks: result });
    } 
    else if (result.length == 0) {
      res.status(200).json({ success: true, scholasticMarks: [] });
    } else {
      return next(new ErrorHandler("Marks not Availabel", 404));
    }
  });
});
exports.editScholasticMarks = asyncHandler(async (req, res, next) => {
  const updatedMarks = req.body;
  const promises = updatedMarks.map((item) => {
      return new Promise((resolve, reject) => {
          let sqlSelect = `SELECT * FROM scholastic WHERE student_id=${item.student_id}`;
          db.query(sqlSelect, (err, rows) => {
              if (err) {
                  console.error("Error during SELECT:", err);
                  reject(new ErrorHandler("Error during SELECT", 500));
              } else {
                  if (rows.length > 0) {
                      // If entry exists, update it
                      let sqlUpdate = `UPDATE scholastic SET `;
                      Object.keys(item).forEach((key) => {
                          if (key !== "id") {
                            const value = typeof item[key] === 'string' ? `'${item[key]}'` : item[key];
                              sqlUpdate += `${key}=${value}, `;
                          }
                      });
                      sqlUpdate = sqlUpdate.slice(0, -2); // Removing trailing comma and space
                      sqlUpdate += ` where student_id=${item.student_id};`;
                      
                      db.query(sqlUpdate, (err, result) => {
                          if (err) {
                              console.error("Error during update:", err);
                              reject(new ErrorHandler("Error during update", 500));
                          } else {
                              if (result.affectedRows > 0) {
                                  resolve(true); // Mark as updated
                              } else {
                                  resolve(false); // Mark as not updated
                              }
                          }
                      });
                  } else {
                        let sqlInsert = `INSERT INTO scholastic (`;
                        let insertFields = "";
                        let insertValues = "";
                        Object.keys(item).forEach((key) => {
                        if (key !== "id") {
                            sqlInsert += `${key}, `;
                            insertFields += `${key}, `;
                            // Check if the value is a string, if so, wrap it in quotes
                            const value = typeof item[key] === 'string' ? `'${item[key]}'` : item[key];
                            insertValues += `${value}, `;
                        }
                        });
                        sqlInsert = sqlInsert.slice(0, -2) + ") VALUES ("+ insertValues.slice(0, -2) + ");";


                      db.query(sqlInsert, (err, result) => {
                          if (err) {
                              console.error("Error during insert:", err);
                              reject(new ErrorHandler("Error during insert", 500));
                          } else {
                              if (result.affectedRows > 0) {
                                  resolve(true); // Mark as inserted
                              } else {
                                  resolve(false); // Mark as not inserted
                              }
                          }
                      });
                  }
              }
          });
      });
  });

  Promise.all(promises)
      .then((results) => {
          if (results.includes(true)) {
              res.status(200).json({ success: true, message: "max Marks update successful" });
          } else {
              next(new ErrorHandler("No changes applied", 404));
          }
      })
      .catch((error) => {
          next(error);
      });
});

exports.getScholasticHeader = asyncHandler(async (req, res, next) => {
  let sql;
    sql = `SHOW COLUMNS FROM scholastic;`;
    db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }
    else {
      const fieldKeys = result.map(row => row.Field);
    res.status(200).json({ success: true, scholasticHeader: fieldKeys });
    } 
  });
});
exports.getScholasticMark = asyncHandler(async (req, res, next) => {
  const {id} = req.params;
  let sql;
  if (id) {
    sql = `SELECT * from scholastic WHERE student_id = ${id};`;
  } else {
    return next(new ErrorHandler("Missing parameters", 400));
  }
  console.log(sql)
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Error during retrieval:", err);
      return next(new ErrorHandler("Error during retrieval", 500));
    }

    if (result.length > 0) {
      res.status(200).json({ success: true, scholastic: result });
    } else {
      return next(new ErrorHandler("Student not found", 404));
    }
  });
});