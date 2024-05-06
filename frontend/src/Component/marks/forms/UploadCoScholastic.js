import React from "react";
import Loader from "../../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";
// import { addStudentValues } from "../InitialValues";
import { getStudents } from "../../../redux/studentSlice";
import Select from "../../../BaseFiles/Select";
import {
  clearErrors,
  clearMessage,
  getScholasticMarks,
  editScholasticMarks,
  getScholasticHeader,
} from "../../../redux/marksSlice";
import { useDispatch, useSelector } from "react-redux";

const UploadScholastic = () => {
  const dispatch = useDispatch();
  const currentUrl = window.location.href;
  const [rotate, setRotate] = useState(false);

  const { students } = useSelector((state) => state.student);
  const { selectedClass } = useSelector((state) => state.classes);
  const { loading, error, message, scholasticMarks, scholasticheader } =
    useSelector((state) => state.marks);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    dispatch(getStudents(selectedClass));
    dispatch(getScholasticHeader());
    if (selectedClass) {
      dispatch(getScholasticMarks({ selectedClass }));
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
  }, [dispatch, selectedClass, error, message]);

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
    dispatch(editScholasticMarks({ updatedMarks, selectedClass }));
  };

  console.log(message);

  return (
    <section className="py-1  w-full m-auto pb-20">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/2">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4] || ""}`}
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
          <Select checkSubject={false} />
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
          <table className="w-full text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative shadow bg-white">
            <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
             

              <tr className="bg-[#233459] text-white">
                <th style={{ width: "auto" }}>Roll No</th>
                <th style={{ width: "auto" }}>Student Name</th>
                {scholasticheader
                  ?.filter((header) => {
                    if (selectedClass?.split("-")[0] < 7) {
                      return (
                        header === "Art_and_Education_term1" ||
                        header === "computer_term1" ||
                        header === "gk_term1" ||
                        header === "Art_and_Education_term2" ||
                        header === "computer_term2" ||
                        header === "gk_term2"
                      );
                    } else if (
                      selectedClass?.split("-")[0] > 6 &&
                      selectedClass?.split("-")[0] < 9
                    ) {
                      return (
                        header === "work_education_term1" ||
                        header === "computer_term1" ||
                        header === "drawing_term1" ||
                        header === "home_science_term1" ||
                        header === "work_education_term2" ||
                        header === "computer_term2" ||
                        header === "drawing_term2" ||
                        header === "home_science_term2" 
                      );
                    } else if (selectedClass?.split("-")[0] == 9) {
                      return (
                        header === "work_education_term1" ||
                        header === "Art_and_Education_term1" ||
                        header === "health_term1"
                      );
                    } else {
                      return null;
                    }
                  })
                  .map((header) => (
                    <th
                      className="text-center"
                      key={header}
                      style={{ width: "auto" }}
                    >
                      {header
                        .replace(/(_term1)|(_pt\d+)|(_term2)/g, "")
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
                  {scholasticheader
  ?.filter((header) => {
    if (selectedClass?.split("-")[0] < 7) {
      return (
        header === "Art_and_Education_term1" ||
        header === "computer_term1" ||
        header === "gk_term1" ||
        header === "Art_and_Education_term2" ||
        header === "computer_term2" ||
        header === "gk_term2"
      );
    } else if (
      selectedClass?.split("-")[0] > 6 &&
      selectedClass?.split("-")[0] < 9
    ) {
      return (
        header === "work_education_term1" ||
        header === "computer_term1" ||
        header === "drawing_term1" ||
        header === "home_science_term1" ||
        header === "work_education_term2" ||
        header === "computer_term2" ||
        header === "drawing_term2" ||
        header === "home_science_term2"
      );
    } else if (selectedClass?.split("-")[0] == 9) {
      return (
        header === "work_education_term1" ||
        header === "Art_and_Education_term1" ||
        header === "health_term1"
      );
    } else {
      return null;
    }
  })
  .map((header) => (
    <td key={header} style={{ width: "auto" }}>
      {header !== "id" &&
      header !== "student_name" &&
      header !== "class_name" &&
      header !== "roll_no" &&
      header !== "student_id" ? (
        <input
          type="text"
          className={`text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
          placeholder={
            scholasticMarks?.find(
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
      ) : null}
    </td>
  ))}

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default UploadScholastic;
