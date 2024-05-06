import React from "react";
import Loader from "../../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
// import { addStudentValues } from "../InitialValues";
import { Link } from "react-router-dom";
import { getStudents } from "../../../redux/studentSlice";
import Select from "../../../BaseFiles/Select";
import {
  clearErrors,
  clearMessage,
  editMarks,
  getMarksHeader,
  getMaxMarks,
  getSubjectMarks,
} from "../../../redux/marksSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";

const UploadMarksPrimary = () => {
  const dispatch = useDispatch();
  const currentUrl = window.location.href;
  const [rotate, setRotate] = useState(false);

  const { students } = useSelector((state) => state.student);
  const { selectedClass, selectedSubject } = useSelector(
    (state) => state.classes
  );
  const { loading, error, message, subjectMarks, marksHeader } = useSelector(
    (state) => state.marks
  );
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    dispatch(getStudents(selectedClass));
  
    if (selectedClass && selectedSubject) {
      dispatch(getMaxMarks(selectedClass.toLowerCase()));
      dispatch(getMarksHeader(selectedClass.toLowerCase()));
      dispatch(getSubjectMarks({ selectedClass, selectedSubject }));
    }
    
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
  
    if (message) {
      console.log(message); // Log the message when it exists
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [
    dispatch,
    getSubjectMarks,
    getMaxMarks,
    getMarksHeader,
    selectedClass,
    selectedSubject,
    error,
    message,
  ]);
  
  const updatedMarks = [];

  const handleInputChange = (studentId, header, value) => {
    const existingStudentIndex = updatedMarks.findIndex(
      (mark) => mark.student_id === studentId
    );
    if (existingStudentIndex !== -1) {
      updatedMarks[existingStudentIndex][header] = value;
    } else {
      const newMark = { student_id: studentId };
      newMark[header] = value;
      updatedMarks.push(newMark);
    }
  };

  const handleSubmit = () => {
    dispatch(editMarks({ updatedMarks, selectedClass, selectedSubject }));
  };

  console.log(message);

  return (
    <section className="py-1  w-full m-auto pb-20">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/2">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4] || ""}`}
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
          <Select checkSubject={true} />
          <button onClick={() => handleSubmit()}> save</button>
          <FaAngleDown className="text-yellow-700 cursor-pointer" />
          <FaArrowsRotate
            className={`text-green-700 cursor-pointer ${
              rotate
                ? "rotate-180 transition-transform duration-1000"
                : "transition-transform"
            }`}
            // onClick={handleRefresh}
          />
          <FaXmark className="text-red-700 cursor-pointer" />
        </div>
      </div>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div
        className={`flex bg-white justify-center ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      ></div>

      {loading ? (
        <Loader />
      ) : (
        <div className="px-2 overflow-x-auto">
          {selectedClass?.split("-")[0] < 9 ? (
            <>
              <table className="w-full text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative shadow bg-white">
                <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-yellow-600 text-white text-center text-lg"><th colSpan={15}>Term 1</th></tr>

                  <tr className="bg-[#233459] text-white">
                    <th style={{ width: "auto" }}>Roll No</th>
                    <th style={{ width: "auto" }}>Student Name</th>
                    {marksHeader
                      ?.filter(
                        (header) =>
                          !header.includes("term2") &&
                          header !== "marks_id" &&
                          header !== "student_id" &&
                          header !== "subject_name"
                      )
                      .map((header) => (
                        <th
                          className="text-center"
                          key={header}
                          style={{ width: "auto" }}
                        >
                          {header
                            .replace(/(_term1)|(_pt\d+)/g, "")
                            .replaceAll("_", " ")}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student) => (
                    <tr key={student.id}>
                      <td
                        className="bg-yellow-600 border text-center font-semibold"
                        style={{ width: "auto" }}
                      >
                        {student.roll_no}
                      </td>
                      <td
                        className="bg-yellow-600 border font-semibold"
                        style={{ width: "auto" }}
                      >
                        {student.student_name}
                      </td>
                      {marksHeader
                        ?.filter((header) => !header.includes("term2"))
                        .map((header) => {
                          if (
                            header !== "marks_id" &&
                            header !== "student_id" &&
                            header !== "subject_name" &&
                            header !== "total_marks_term1" &&
                            !header.includes("final_grade")
                          ) {
                            return (
                              <td key={header} style={{ width: "auto" }}>
                                <input
                                  type="number"
                                  className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                  placeholder={
                                    subjectMarks?.find(
                                      (mark) =>
                                        mark.student_id === student.student_id
                                    )?.[header] || ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      student.student_id,
                                      header,
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                            );
                          } else if (header === "total_marks_term1") {
                            const portfoilo_term1 = parseFloat(
                              subjectMarks?.find(
                                (mark) => mark.student_id === student.student_id
                              )?.portfoilo_term1 || 0
                            );
                            const weightage_term1 = parseFloat(
                              subjectMarks?.find(
                                (mark) => mark.student_id === student.student_id
                              )?.weightage_term1 || 0
                            );
                            const sub_enrich_act_term1 = parseFloat(
                              subjectMarks?.find(
                                (mark) => mark.student_id === student.student_id
                              )?.sub_enrich_act_term1 || 0
                            );
                            const hly_exam_term1 = parseFloat(
                              subjectMarks?.find(
                                (mark) => mark.student_id === student.student_id
                              )?.hly_exam_term1 || 0
                            );
                            const total =
                              portfoilo_term1 +
                              weightage_term1 +
                              sub_enrich_act_term1 +
                              hly_exam_term1;

                            const totalMarks = total;
                            let grade = "";
                            if (totalMarks >= 90) {
                              grade = "A1";
                            } else if (totalMarks >= 80) {
                              grade = "A2";
                            } else if (totalMarks >= 70) {
                              grade = "B1";
                            } else if (totalMarks >= 60) {
                              grade = "B2";
                            } else if (totalMarks >= 50) {
                              grade = "C1";
                            } else if (totalMarks >= 40) {
                              grade = "C2";
                            } else {
                              grade = "D";
                            }
                            return (
                              <>
                                <td key={header} style={{ width: "auto" }}>
                                  <input
                                    type="number"
                                    className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                    placeholder={total || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        student.student_id,
                                        header,
                                        totalMarks
                                      )
                                    }
                                  />
                                </td>
                                <td key={header} style={{ width: "auto" }}>
                                  <input
                                    type="number"
                                    className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                    placeholder={grade || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        student.student_id,
                                        header,
                                        grade
                                      )
                                    }
                                  />
                                </td>
                              </>
                            );
                          } else {
                            return null; // Return null for headers that don't need special treatment
                          }
                        })}
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="w-full mt-5 text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative shadow bg-white">
                <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-yellow-600 text-white text-center text-lg"><th colSpan={15}>Term 2</th></tr>

                  <tr className="bg-[#233459] text-white">
                    <th style={{ width: "auto" }}>Roll No</th>
                    <th style={{ width: "auto" }}>Student Name</th>
                    {marksHeader
                      ?.filter(
                        (header) =>
                          !header.includes("term1") &&
                          header !== "marks_id" &&
                          header !== "student_id" &&
                          header !== "subject_name"
                      )
                      .map((header) => (
                        <th
                          className="text-center"
                          key={header}
                          style={{ width: "auto" }}
                        >
                          {header
                            .replace(/(_term2)|(_pt\d+)/g, "")
                            .replaceAll("_", " ")}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student) => (
                    <tr key={student.id}>
                      <td
                        className="bg-yellow-600 border text-center font-semibold"
                        style={{ width: "auto" }}
                      >
                        {student.roll_no}
                      </td>
                      <td
                        className="bg-yellow-600 border font-semibold"
                        style={{ width: "auto" }}
                      >
                        {student.student_name}
                      </td>
                      {marksHeader
                        ?.filter((header) => !header.includes("term1"))
                        .map((header) => {
                          if (
                            header !== "marks_id" &&
                            header !== "student_id" &&
                            header !== "subject_name" &&
                            header !== "total_marks_term2" &&
                            !header.includes("final_grade")
                          ) {
                            return (
                              <td key={header} style={{ width: "auto" }}>
                                <input
                                  type="number"
                                  className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                  placeholder={
                                    subjectMarks?.find(
                                      (mark) =>
                                        mark.student_id === student.student_id
                                    )?.[header] || ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      student.student_id,
                                      header,
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                            );
                          } else if (header === "total_marks_term2") {
                            const portfoilo_term2 = parseFloat(
                              subjectMarks?.find(
                                (mark) => mark.student_id === student.student_id
                              )?.portfoilo_term2 || 0
                            );
                            const weightage_term2 = parseFloat(
                              subjectMarks?.find(
                                (mark) => mark.student_id === student.student_id
                              )?.weightage_term2 || 0
                            );
                            const sub_enrich_act_term2 = parseFloat(
                              subjectMarks?.find(
                                (mark) => mark.student_id === student.student_id
                              )?.sub_enrich_act_term2 || 0
                            );
                            const annual_exam_term2 = parseFloat(
                              subjectMarks?.find(
                                (mark) => mark.student_id === student.student_id
                              )?.annual_exam_term2 || 0
                            );
                            const total2 =
                              portfoilo_term2 +
                              weightage_term2 +
                              sub_enrich_act_term2 +
                              annual_exam_term2;

                            const totalMarks2 = total2;
                            let grade2 = "";
                            if (totalMarks2 >= 90) {
                              grade2 = "A1";
                            } else if (totalMarks2 >= 80) {
                              grade2 = "A2";
                            } else if (totalMarks2 >= 70) {
                              grade2 = "B1";
                            } else if (totalMarks2 >= 60) {
                              grade2 = "B2";
                            } else if (totalMarks2 >= 50) {
                              grade2 = "C1";
                            } else if (totalMarks2 >= 40) {
                              grade2 = "C2";
                            } else {
                              grade2 = "D";
                            }
                            return (
                              <>
                                <td key={header} style={{ width: "auto" }}>
                                  <input
                                    type="number"
                                    className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                    placeholder={total2 || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        student.student_id,
                                        header,
                                        totalMarks2
                                      )
                                    }
                                  />
                                </td>
                                <td key={header} style={{ width: "auto" }}>
                                  <input
                                    type="number"
                                    className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                    placeholder={grade2 || ""}
                                    onChange={(e) =>
                                      handleInputChange(
                                        student.student_id,
                                        header,
                                        grade2
                                      )
                                    }
                                  />
                                </td>
                              </>
                            );
                          } else {
                            return null; // Return null for headers that don't need special treatment
                          }
                        })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : selectedClass?.split("-")[0] == 9 ? (
            <table className="w-full text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative shadow bg-white">
              <thead className="text-[8px] text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-[#233459] text-white">
                  <th style={{ width: "auto" }}>Roll No</th>
                  <th style={{ width: "auto" }}>Student Name</th>
                  {marksHeader
                    ?.filter(
                      (header) =>
                        header !== "marks_id" &&
                        header !== "student_id" &&
                        header !== "subject_name"
                    )
                    .map((header) => (
                      <th
                        className="text-center"
                        key={header}
                        style={{ width: "auto" }}
                      >
                        {header.replaceAll("_", " ")}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {students?.map((student) => (
                  <tr key={student.id} className="text-[8px]">
                    <td
                      className="bg-yellow-600 border text-center font-semibold"
                      style={{ width: "auto" }}
                    >
                      {student.roll_no}
                    </td>
                    <td
                      className="bg-yellow-600 border font-semibold"
                      style={{ width: "auto" }}
                    >
                      {student.student_name}
                    </td>
                    {marksHeader?.map((header) => {
                      if (
                        header !== "marks_id" &&
                        header !== "student_id" &&
                        header !== "subject_name" &&
                        header !== "grand_total" &&
                        !header.includes("final_grade")
                      ) {
                        return (
                          <td key={header} style={{ width: "auto" }}>
                            <input
                              type="number"
                              className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                              placeholder={
                                subjectMarks?.find(
                                  (mark) =>
                                    mark.student_id === student.student_id
                                )?.[header] || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  student.student_id,
                                  header,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      } else if (header === "grand_total") {
                        const periodic_test = parseFloat(
                          subjectMarks?.find(
                            (mark) => mark.student_id === student.student_id
                          )?.periodic_test || 0
                        );
                        const Portfolio = parseFloat(
                          subjectMarks?.find(
                            (mark) => mark.student_id === student.student_id
                          )?.Portfolio || 0
                        );
                        const Sub_Enrichment = parseFloat(
                          subjectMarks?.find(
                            (mark) => mark.student_id === student.student_id
                          )?.Sub_Enrichment || 0
                        );
                        const annual_exam = parseFloat(
                          subjectMarks?.find(
                            (mark) => mark.student_id === student.student_id
                          )?.annual_exam || 0
                        );
                        const total =
                          periodic_test +
                          Portfolio +
                          Sub_Enrichment +
                          annual_exam;

                        const totalMarks = total;
                        let grade = "";
                        if (totalMarks >= 90) {
                          grade = "A1";
                        } else if (totalMarks >= 80) {
                          grade = "A2";
                        } else if (totalMarks >= 70) {
                          grade = "B1";
                        } else if (totalMarks >= 60) {
                          grade = "B2";
                        } else if (totalMarks >= 50) {
                          grade = "C1";
                        } else if (totalMarks >= 40) {
                          grade = "C2";
                        } else {
                          grade = "D";
                        }
                        return (
                          <>
                            <td key={header} style={{ width: "auto" }}>
                              <input
                                type="number"
                                className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                placeholder={total || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    student.student_id,
                                    header,
                                    totalMarks
                                  )
                                }
                              />
                            </td>
                            <td key={header} style={{ width: "auto" }}>
                              <input
                                type="number"
                                className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                placeholder={grade || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    student.student_id,
                                    header,
                                    grade
                                  )
                                }
                              />
                            </td>
                          </>
                        );
                      } else {
                        return null; // Return null for headers that don't need special treatment
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative shadow bg-white">
              <thead className="text-[10px] text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-[#233459] text-white">
                  <th
                    className="text-center h-8 w-10"
                    style={{ width: "auto" }}
                  >
                    Roll
                  </th>
                  <th className="text-center" style={{ width: "auto" }}>
                    Name
                  </th>
                  {marksHeader
                    ?.filter(
                      (header) =>
                        header !== "mark_id" &&
                        header !== "student_id" &&
                        header !== "subject_name"
                    )
                    .map((header) => (
                      <th
                        className="text-center"
                        key={header}
                        style={{ width: "auto" }}
                      >
                        {header.replaceAll("_", " ")}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {students?.map((student) => (
                  <tr key={student.id} className="text-[10px]">
                    <td
                      className="bg-yellow-600 border text-center font-semibold"
                      style={{ width: "auto" }}
                    >
                      {student.roll_no}
                    </td>
                    <td
                      className="bg-yellow-600 border font-semibold text-[10px] text-center"
                      style={{ width: "auto" }}
                    >
                      {student.student_name}
                    </td>
                    {marksHeader?.map((header) => {
                      if (
                        header !== "mark_id" &&
                        header !== "student_id" &&
                        header !== "subject_name" &&
                        header !== "grand_total" &&
                        !header.includes("final_grade")
                      ) {
                        return (
                          <td key={header} style={{ width: "auto" }}>
                            <input
                              type="number"
                              className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                              placeholder={
                                subjectMarks?.find(
                                  (mark) =>
                                    mark.student_id === student.student_id
                                )?.[header] || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  student.student_id,
                                  header,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        );
                      } else if (header === "grand_total") {
                        const theory_obt = parseFloat(
                          subjectMarks?.find(
                            (mark) => mark.student_id === student.student_id
                          )?.theory_obt || 0
                        );
                        const practical_obt = parseFloat(
                          subjectMarks?.find(
                            (mark) => mark.student_id === student.student_id
                          )?.practical_obt || 0
                        );

                        const total = theory_obt + practical_obt;

                        const totalMarks = total;
                        let grade = "";
                        if (totalMarks >= 90) {
                          grade = "A1";
                        } else if (totalMarks >= 80) {
                          grade = "A2";
                        } else if (totalMarks >= 70) {
                          grade = "B1";
                        } else if (totalMarks >= 60) {
                          grade = "B2";
                        } else if (totalMarks >= 50) {
                          grade = "C1";
                        } else if (totalMarks >= 40) {
                          grade = "C2";
                        } else {
                          grade = "D";
                        }
                        return (
                          <>
                           
                            <td key={header} style={{ width: "auto" }}>
                              <input
                                type="number"
                                className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                placeholder={grade || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    student.student_id,
                                    header,
                                    grade
                                  )
                                }
                              />
                            </td>
                            <td key={header} style={{ width: "auto" }}>
                              <input
                                type="number"
                                className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                value={totalMarks || ""}
                                onChange={(e) =>
                                  handleInputChange(
                                    student.student_id,
                                    header,
                                    totalMarks
                                  )
                                }
                              />
                            </td>
                          </>
                        );
                      } else {
                        return null; // Return null for headers that don't need special treatment
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </section>
  );
};

export default UploadMarksPrimary;

