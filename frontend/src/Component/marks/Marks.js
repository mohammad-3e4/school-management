import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useEffect, useState } from "react";
import { getMarks, clearErrors, clearMessage } from "../../redux/marksSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../BaseFiles/Select";
const Marks = () => {
  const currentUrl = window.location.href;
  const { loading, error, message, marks } = useSelector(
    (state) => state.marks
  );

  const { classes,selectedClass,selectedSubject} = useSelector(
    (state) => state.classes
  );
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);

  // Ensure selectedClass_name is properly initialized
  let selectedClass_name = '';
  if(selectedClass){
    selectedClass_name = selectedClass.replace('-', "_").toLowerCase();

  }

  useEffect(() => {
    if(selectedClass_name){
    dispatch(getMarks(selectedClass_name))};
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
  }, [dispatch, error, message, selectedClass_name]);

  const uniqueSubjects = new Set([
    "roll_no",
    "student_image",
    "student_name",
    "Report_Card",
  ]);
  marks?.forEach((item) => {
    uniqueSubjects.add(item.subject_name);
  });

  const thds = Array.from(uniqueSubjects);

  const groupedMarks = {};
  marks?.forEach((mark) => {
    const { roll_no } = mark;
    if (!groupedMarks[roll_no]) {
      groupedMarks[roll_no] = [];
    }
    groupedMarks[roll_no].push(mark);
  });
  const renderTableRows = () => {
    return Object.values(groupedMarks).map((marksForRollNo, rollNoIndex) => (
      <tr
        key={rollNoIndex}
        className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
      >
        {marksForRollNo.map((student, index) => (
          <React.Fragment key={index}>
            {index === 0 && ( 
              <>
                <td className="px-2 py-2 border-r-2 border-gray-200">
                  {student.roll_no}
                </td>

                <td className="px-2 py-2 text-center">
                  {" "}
                  <img
                    className="w-8 mx-auto d-block"
                    src={
                      student.gender === "Male"
                        ? "/default_male.png"
                        : "/default_female.png"
                    }
                  />
                </td>
                <td className="px-2 py-2 bg-green-300 text-black uppercase ">
                  {student.student_name}
                </td>
                <td className="px-2 py-2 flex cursor-pointer justify-around border-r-2 border-gray-200">
                  {student?.class_name == 9 ? (
                    <Link
                      to={`/secondary/${marksForRollNo[0].student_id}`}
                      target="_blank"
                    >
                      <img
                        className="w-8 mx-auto d-block"
                        src="term1.png"
                        alt="Report Card"
                      />
                    </Link>
                  ) : student?.class_name == 11 ? (
                    <Link
                      to={`/sensecondary/${marksForRollNo[0].student_id}`}
                      target="_blank"
                    >
                      <img
                        className="w-8 mx-auto d-block"
                        src="term1.png"
                        alt="Report Card"
                      />
                    </Link>
                  ) : (
                    <>
                      <Link
                        to={`/reportcard1/${marksForRollNo[0].student_id}`}
                        target="_blank"
                      >
                        <img
                          className="w-8 mx-auto d-block"
                          src="term1.png"
                          alt="Report Card"
                        />
                      </Link>
                      <Link
                        to={`/reportcard2/${marksForRollNo[0].student_id}`}
                        target="_blank"
                      >
                        <img
                          className="w-8 mx-auto d-block"
                          src="term2.png"
                          alt="Report Card"
                        />
                      </Link>
                    </>
                  )}
                </td>
              </>
            )}
            <>
              {student?.class_name == 9 || student?.class_name == 11 ? (
                <>
                  <td
                    colSpan={2}
                    className="px-2 py-2 border-r-2 border-gray-200"
                  >
                    {student.grand_total}
                  </td>
                </>
              ) : (
                <>
                  <td className="px-2 py-2">{student.total_marks_term1}</td>
                  <td className="px-2 py-2 border-r-2 border-gray-200">
                    {student.total_marks_term2}
                  </td>
                </>
              )}
            </>
          </React.Fragment>
        ))}
      {selectedClass?.split("-")[0] < 9 ? (
  <td className="">
    <Link to={`/marks/details/${marksForRollNo[0].student_id}`}>
      <FaEye className="h-5 w-5 cursor-pointer mx-auto" title="Details" />
    </Link>
  </td>
) : selectedClass?.split("-")[0] == 11 ? (
  <td className="">
    <Link to={`/marks/details/eleven/${marksForRollNo[0].student_id}`}>
      <FaEye className="h-5 w-5 cursor-pointer mx-auto" title="Details" />
    </Link>
  </td>
) : (
  <td className="">
    <Link to={`/marks/details/ninth/${marksForRollNo[0].student_id}`}>
      <FaEye className="h-5 w-5 cursor-pointer mx-auto" title="Details" />
    </Link>
  </td>
)}
      </tr>
    ));
  };
  let class_name = 11;
  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/2">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4] || ""}`}
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
        <Select checkSubject={false} />
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
      >
        {loading ? (
          <Loader />
        ) : (
          <table className="flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow w-full  px-4 mx-auto  bg-white">
            <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {thds?.map((heading, index) => (
                  <th
                    scope="col"
                    colSpan={
                      heading !== "roll_no" &&
                      heading !== "student_name" &&
                      heading !== "student_image" &&
                      heading !== "Report_Card"
                        ? 2
                        : 1
                    }
                    rowSpan={
                      heading === "roll_no" ||
                      heading === "student_name" ||
                      heading === "student_image" ||
                      heading === "Report_Card"
                        ? 2
                        : 1
                    }
                    key={index}
                    className={`py-2 text-center text-xs border-b-2 border-r-2 ${
                      heading === "student_name"
                        ? "bg-green-400 text-black"
                        : ""
                    } `}
                  >
                    {heading}
                  </th>
                ))}
                <th
                  scope="col"
                  rowSpan={2}
                  className="py-2 px-2 text-xs text-center border-b-2"
                >
                  Actions
                </th>
              </tr>
              {class_name == 9 || class_name == 11 ? (
                ""
              ) : (
                <tr>
                  {thds?.map((heading, index) => (
                    <React.Fragment key={index}>
                      {!(
                        heading === "roll_no" ||
                        heading === "student_name" ||
                        heading === "student_image" ||
                        heading === "Report_Card"
                      ) && (
                        <>
                          <th
                            scope="col"
                            className="py-2 text-center text-xs border-b-2"
                          >
                            term1
                          </th>
                          <th
                            scope="col"
                            className="py-2 text-center text-xs border-b-2 border-r-2"
                          >
                            term2
                          </th>
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {marks?.length ===0 ? (
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
        )}
      </div>
    </section>
  );
};

export default Marks;
