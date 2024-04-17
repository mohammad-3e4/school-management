import React from "react";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
// import { addStudentValues } from "../InitialValues";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { EditMarksValues } from "../InitialValues/index";
import { getStudentById } from "../../redux/studentSlice";
import {
  clearErrors,
  clearMessage,
  getMarksByStudentId,
  getMaxMarks,
  editMarks,
} from "../../redux/marksSlice";
import { getClassSubject } from "../../redux/classesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";

const MarksDetail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editableMarks, setEditableMarks] = useState(null);

  const { loading, error, message, studentMark, maxMarks } = useSelector(
    (state) => state.marks
  );
  const { student } = useSelector((state) => state.student);

  const currentUrl = window.location.href;

  useEffect(() => {
    if (id) {
      dispatch(getStudentById(id));
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
  }, [dispatch, error, message, id]);

  useEffect(() => {
    if (student && student.class_name) {
      let class_name = student?.class_name;
      let section = student?.section;
      if (student.class_name < 11) {
        dispatch(getMaxMarks(student.class_name));
      }
      dispatch(getClassSubject(`${student.class_name}-${student.section}`));
      dispatch(getMarksByStudentId({ id, class_name, section }));
    }
  }, [student, dispatch, id, student?.class_name, student?.section]);

  let thds;
  let thdstwo;

  if (studentMark) {
    if (student.class_name < 9) {
      thds = Object.keys(studentMark[0]).filter((item) =>
        item.includes("term1")
      );
      thdstwo = Object.keys(studentMark[0]).filter((item) =>
        item.includes("term2")
      );
    } else {
      thds = Object.keys(studentMark[0]);
    }
  }

  const handleEdit = (marks) => {
    setEditableMarks(marks);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditableMarks(null);
  };

  const formik = useFormik({
    initialValues: EditMarksValues,
    onSubmit: (values) => {
      const filteredData = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== "" && value !== null
        )
      );

      dispatch(
        editMarks({
          student_id: editableMarks.student_id,
          updatedData: filteredData,
        })
      );
    },
  });
  const renderTableRows = () => {
    return studentMark?.map((mark, index) => (
      <tr
        key={index}
        className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
      >
        <React.Fragment key={index}>
          <>
            <td className="px-2 py-2 border-r-2 border-gray-200">
              {mark["subject_name"]}
            </td>
            {thds.map((item, i) => (
              <td className="px-2 py-2 border-r-2 border-gray-200">
                {mark[item]}
              </td>
            ))}
          </>
        </React.Fragment>
        {id && (
          <td className="">
            <FaEye
              className="h-5 w-5 cursor-pointer mx-auto d-block"
              title="Details"
            />
          </td>
        )}
      </tr>
    ));
  };

  const renderTableRowstwo = () => {
    return studentMark?.map((mark, index) => (
      <tr
        key={index}
        className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
      >
        <React.Fragment key={index}>
          <>
            <td className="px-2 py-2 border-r-2 border-gray-200">
              {mark["subject_name"]}
            </td>

            {thdstwo.map((item, i) => (
              <td className="px-2 py-2 border-r-2 border-gray-200">
                {mark[item]}
              </td>
            ))}
          </>
        </React.Fragment>
        {id && (
          <td className="">
            <FaEye
              onClick={() => handleEdit(student)}
              className="h-5 w-5 cursor-pointer mx-auto d-block"
              title="Details"
            />
          </td>
        )}
      </tr>
    ));
  };
  return (
    <div className="px-2">
      <table className=" w-full overflow-x-auto capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative  shadow bg-white">
        <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
        {student?.class_name < 9 && (
          <tr className="bg-yellow-600 text-white">
            <th scope="row" colSpan={15} className="text-center text-lg">
              Term 1
            </th>
          </tr>)}
          <tr className="bg-[#233459] text-white">
            <th scope="col" className={`py-4 text-center text-xs border-b-2  `}>
              subject
            </th>
            {thds?.map((heading, index) => (
              <th
                style={
                  heading !== "ID" ? { width: `${100 / thds.length}%` } : null
                }
                scope="col"
                key={index}
                className={`py-4 text-center text-xs border-b-2  `}
              >
                {heading
                  .replace("_term1", " ")
                  .replace("_pt1", " ")
                  .replace("_pt2", " ")
                  .replace("_pt3", " ")
                  .replaceAll("_", " ")}
              </th>
            ))}

            {id && (
              <th
                scope="col"
                className="py-2 px-2 text-xs text-center border-b-2"
              >
                Actions
              </th>
            )}
          </tr>
          <tr className="text-center  bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize">
            {maxMarks?.length > 0 &&
              Object.keys(maxMarks[0]).map((item, i) =>
                !item.includes("term2") && !item.includes("id") ? (
                  item === "subject_name" ? (
                    <th
                      className="px-2 py-2 border-r-2 border-gray-200"
                      key={i}
                    >
                      Max Marks
                    </th>
                  ) : (
                    <th
                      className="px-2 py-2 border-r-2 border-gray-200"
                      key={i}
                    >
                      {maxMarks[0][item]}
                    </th>
                  )
                ) : null
              )}
          </tr>
        </thead>
        <tbody className="font-semibold ">
          {studentMark?.length === 0 ? (
            <tr>
              <td colSpan={thds.length + 1} className="text-center py-5">
                No data found
              </td>
            </tr>
          ) : (
            renderTableRows()
          )}
        </tbody>
      </table>

      {student?.class_name < 9 && (
        <table className=" mt-5 flex-auto pb-10 pt-0 text-xs text-left rtl:text-right  dark:text-gray-400 relative overflow-x-auto shadow   text-gray-700  capitalize font-semibold font-sans px-4 tracking-wider">
          <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-yellow-600 text-white">
              <th scope="row" colSpan={15} className="text-center text-lg">
                Term 1
              </th>
            </tr>
            <tr className="bg-[#233459] text-white">
              {" "}
              <th
                scope="col"
                className={`py-4 text-center text-xs border-b-2  `}
              >
                subject
              </th>
              {thdstwo?.map((heading, index) => (
                <th
                  style={
                    heading !== "ID" ? { width: `${100 / thds.length}%` } : null
                  }
                  scope="col"
                  key={index}
                  className={`py-4 text-center text-xs border-b-2  `}
                >
                  {heading
                    .replace("_term2", " ")
                    .replace("_pt1", " ")
                    .replace("_pt2", " ")
                    .replace("_pt3", " ")
                    .replaceAll("_", " ")}
                </th>
              ))}
              {id && (
                <th
                  scope="col"
                  className="py-2 px-2 text-xs text-center border-b-2"
                >
                  Actions
                </th>
              )}
            </tr>
            <tr className="text-center bg-yellow-600 border-b dark:bg-gray-800 dark:border-gray-700 capitalize">
              {maxMarks?.length > 0 &&
                Object.keys(maxMarks[0]).map((item, i) =>
                  !item.includes("term1") && !item.includes("id") ? (
                    item === "subject_name" ? (
                      <th
                        className="px-2 py-2 border-r-2 border-gray-200"
                        key={i}
                      >
                        Max Marks
                      </th>
                    ) : (
                      <th
                        className="px-2 py-2 border-r-2 border-gray-200"
                        key={i}
                      >
                        {maxMarks[0][item]}
                      </th>
                    )
                  ) : null
                )}
            </tr>
          </thead>
          <tbody>
            {studentMark?.length === 0 ? (
              <tr>
                <td colSpan={thds.length + 1} className="text-center py-5">
                  No data found
                </td>
              </tr>
            ) : (
              renderTableRowstwo()
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarksDetail;
