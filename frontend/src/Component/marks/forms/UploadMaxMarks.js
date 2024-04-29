import React from "react";
import Loader from "../../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";
import { getStudents } from "../../../redux/studentSlice";
import Select from "../../../BaseFiles/Select";
import {
  clearErrors,
  clearMessage,
  editMaxMarks,
  getMaxMarksHeader,
  getMaxMarks,
} from "../../../redux/marksSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";

const UploadMaxMarks = () => {
  const dispatch = useDispatch();
  const currentUrl = window.location.href;
  const [rotate, setRotate] = useState(false);

  const { selectedClass } = useSelector(
    (state) => state.classes
  );
  const { loading, error, message,maxMarks, maxMarksHeader } = useSelector(
    (state) => state.marks
  );

  useEffect(() => {
  
    if (selectedClass ) {
      dispatch(getMaxMarks(selectedClass));
      dispatch(getMaxMarksHeader(selectedClass));
    }
    
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
  
    if (message) {
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [
    dispatch,
    getMaxMarks,
    getMaxMarksHeader,
    selectedClass,
    error,
    message,
  ]);
  
  const updatedMarks = [];

  const handleInputChange = (max_marks_id, header, value) => {
    const existingMArksIndex = updatedMarks.findIndex(
      (mark) => mark.max_marks_id === max_marks_id
    );
    if (existingMArksIndex !== -1) {
      updatedMarks[existingMArksIndex][header] = value;
    } else {
      const newMark = { max_marks_id: max_marks_id };
      newMark[header] = value;
      updatedMarks.push(newMark);
    }
  };

  const handleSubmit = () => {
    dispatch(editMaxMarks({ updatedMarks, selectedClass }));
  };


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
          {selectedClass?.split("-")[0] < 9 ? (
            <>
              <table className="w-full text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative shadow bg-white">
                <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-yellow-600 text-white text-center text-lg"><th colSpan={21}>Term 1</th></tr>

                  <tr className="bg-[#233459] text-white">
                  <th style={{ width: "auto" }}>Marks Id</th>
                    <th style={{ width: "auto" }}>Subject Name</th>
                    {maxMarksHeader
                      ?.filter(
                        (header) =>
                        !header.includes("subject_name") &&
                        !header.includes("id") &&
                          !header.includes("term2") &&
                          header !== "marks_id"
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
                  {maxMarks?.map((marks) => (
                    <tr key={marks.max_marks_id}>
                      <td
                        className="bg-yellow-600 border text-center font-semibold"
                        style={{ width: "auto" }}
                      >
                        {marks.max_marks_id}
                      </td>
                      <td
                        className="bg-yellow-600 border font-semibold"
                        style={{ width: "auto" }}
                      >
                        {marks.subject_name}
                      </td>
                      {maxMarksHeader
                        ?.filter((header) => 
                        !header.includes("subject_name") &&
                        !header.includes("student_id") &&
                        !header.includes("grade") &&
                          !header.includes("term2") &&
                          header !== "marks_id"
                      
                     )
                        .map((header) => {
                          if (
                            header !== "max_marks_id" &&
                            header !== "subject_name" 
                          ) {
                            return (
                              <td key={header} style={{ width: "auto" }}>
                                <input
                                  type="number"
                                  className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                  placeholder={
                                    marks?.[header] || ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      marks.max_marks_id,
                                      header,
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                            );
                          }
                           
                        })}
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="w-full text-gray-700 mt-5 mb-15 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative shadow bg-white">
                <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-yellow-600 text-white text-center text-lg"><th colSpan={21}>Term 2</th></tr>
                  <tr className="bg-[#233459] text-white">
                  <th style={{ width: "auto" }}>Marks Id</th>
                    <th style={{ width: "auto" }}>Subject Name</th>
                    {maxMarksHeader
                      ?.filter(
                        (header) =>
                        !header.includes("subject_name") &&
                        !header.includes("id") &&
                          !header.includes("term2") &&
                          header !== "marks_id"
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
                  {maxMarks?.map((marks) => (
                    <tr key={marks.max_marks_id}>
                      <td
                        className="bg-yellow-600 border text-center font-semibold"
                        style={{ width: "auto" }}
                      >
                        {marks.max_marks_id}
                      </td>
                      <td
                        className="bg-yellow-600 border font-semibold"
                        style={{ width: "auto" }}
                      >
                        {marks.subject_name}
                      </td>
                      {maxMarksHeader
                        ?.filter((header) => 
                        !header.includes("subject_name") &&
                        !header.includes("student_id") &&
                        !header.includes("grade") &&
                          !header.includes("term1") &&
                          header !== "marks_id"
                      
                     )
                        .map((header) => {
                          if (
                            header !== "max_marks_id" &&
                            header !== "subject_name" 
                          ) {
                            return (
                              <td key={header} style={{ width: "auto" }}>
                                <input
                                  type="number"
                                  className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                  placeholder={
                                    marks?.[header] || ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      marks.max_marks_id,
                                      header,
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                            );
                          }
                           
                        })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : selectedClass?.split("-")[0] == 9 ? (
            <table className="w-full text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative shadow bg-white">
              <thead className="text-[12px] text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-[#233459] text-white">
               
                  {maxMarksHeader
                    ?.filter(
                      (header) =>
                        header !== "id" &&
                        !header.includes("theory") &&
                        !header.includes("practical") &&
                        !header.includes("grade")

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
                  {maxMarks?.map((marks) => (
                    <tr key={marks.max_marks_id}>
                      <td
                        className="bg-yellow-600 border text-center font-semibold"
                        style={{ width: "auto" }}
                      >
                        {marks.max_marks_id}
                      </td>
                      <td
                        className="bg-yellow-600 border font-semibold"
                        style={{ width: "auto" }}
                      >
                        {marks.subject_name}
                      </td>
                      {maxMarksHeader
                        ?.filter(
                            (header) =>
                              header !== "max_marks_id" &&
                              header !== "subject_name" &&
                              !header.includes("obt") &&
                              !header.includes("periodic") &&
                              !header.includes("theory") &&
                              !header.includes("practical") &&
                              !header.includes("grade")
      
                          )
                        .map((header) => {
                          {
                            return (
                              <td key={header} style={{ width: "auto" }}>
                                <input
                                  type="number"
                                  className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                  placeholder={
                                    marks?.[header] || ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      marks.max_marks_id,
                                      header,
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                            );
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
                    ID
                  </th>
                  <th className="text-center" style={{ width: "auto" }}>
                    Subject Name
                  </th>
                  {maxMarksHeader
                    ?.filter(
                      (header) =>
                        header !== "max_marks_id" &&
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
                  {maxMarks?.map((marks) => (
                    <tr key={marks.max_marks_id}>
                      <td
                        className="bg-yellow-600 border text-center font-semibold"
                        style={{ width: "auto" }}
                      >
                        {marks.max_marks_id}
                      </td>
                      <td
                        className="bg-yellow-600 border font-semibold"
                        style={{ width: "auto" }}
                      >
                        {marks.subject_name}
                      </td>
                      {maxMarksHeader
                        ?.filter(
                            (header) =>
                              header !== "max_marks_id" &&
                              header !== "subject_name" &&
                              !header.includes("grade")
      
                          )
                        .map((header) => {
                          {
                            return (
                              <td key={header} style={{ width: "auto" }}>
                                <input
                                  type="number"
                                  className={` text-center border-0 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-white rounded-sm text-sm shadow focus:outline-none w-full ease-linear transition-all duration-150 border-red-500`}
                                  placeholder={
                                    marks?.[header] || ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      marks.max_marks_id,
                                      header,
                                      e.target.value
                                    )
                                  }
                                />
                              </td>
                            );
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

export default UploadMaxMarks;
