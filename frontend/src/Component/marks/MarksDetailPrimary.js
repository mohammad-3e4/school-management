import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../redux/studentSlice";
import {
  clearErrors,
  clearMessage,
  getMarksByStudentId,
  getMaxMarks,
} from "../../redux/marksSlice";
import { getClassSubject } from "../../redux/classesSlice";
import { useDispatch, useSelector } from "react-redux";

const MarksDetailPrimary = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

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

      dispatch(getMaxMarks(student.class_name));
      dispatch(getClassSubject(`${student.class_name}-${student.section}`));
      dispatch(getMarksByStudentId({ id, class_name, section }));
    }
  }, [student, dispatch, id, student?.class_name, student?.section]);

  let thdsart;
  let thdsmusic;
  let thdspersonality;
  let thdsmath;
  let thdsenglish;
  let thdshealth;
  let thdspunjabi;

  let thdsart2;
  let thdsmusic2;
  let thdspersonality2;
  let thdsmath2;
  let thdsenglish2;
  let thdshealth2;
  let thdspunjabi2;

  if (studentMark) {
    thdsart = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("1_art")
    );
    thdsmusic = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("1_music")
    );
    thdspersonality = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("1_personality")
    );
    thdsenglish = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("1_english")
    );
    thdshealth = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("1_health")
    );
    thdsmath = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("1_math")
    );
    thdspunjabi = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("1_punjabi")
    );

    thdsart2 = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("2_art")
    );
    thdsmusic2 = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("2_music")
    );
    thdspersonality2 = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("2_personality")
    );
    thdsenglish2 = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("2_english")
    );
    thdshealth2 = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("2_health")
    );
    thdsmath2 = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("2_math")
    );
    thdspunjabi2 = Object.keys(studentMark[0])?.filter((item) =>
      item.includes("2_punjabi")
    );
  }

  const renderTableRows = () => {
    const filteredMarks = studentMark?.filter(
      (mark) => mark.subject_name === "art"
    );
    return filteredMarks?.map((mark, index) => (
      <React.Fragment key={index}>
        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">Art term1</td>
          {thdsart?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>

        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">Art term2</td>
          {thdsart2?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>
      </React.Fragment>
    ));
  };

  const renderTableRowstwo = () => {
    const filteredMarks = studentMark?.filter(
      (mark) => mark.subject_name === "art"
    );
    return filteredMarks?.map((mark, index) => (
      <React.Fragment key={index}>
        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">Music term1</td>
          {thdsmusic?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>

        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">Music term2</td>
          {thdsmusic2?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>
      </React.Fragment>
    ));
  };

  const renderTableRowsthree = () => {
    const filteredMarks = studentMark?.filter(
      (mark) => mark.subject_name === "art"
    );
    return filteredMarks?.map((mark, index) => (
      <React.Fragment key={index}>
        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">
            Personality term1
          </td>
          {thdspersonality?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>

        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">
            Personality term2
          </td>
          {thdspersonality2?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>
      </React.Fragment>
    ));
  };

  const renderTableRowsfour = () => {
    const filteredMarks = studentMark?.filter(
      (mark) => mark.subject_name === "english"
    );
    return filteredMarks?.map((mark, index) => (
      <React.Fragment key={index}>
        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">
            English term1
          </td>
          {thdsenglish?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>

        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">
            English term2
          </td>
          {thdsenglish2?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>
      </React.Fragment>
    ));
  };
  const renderTableRowsfive = () => {
    const filteredMarks = studentMark?.filter(
      (mark) => mark.subject_name === "punjabi"
    );
    return filteredMarks?.map((mark, index) => (
      <React.Fragment key={index}>
        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">
            Punjabi term1
          </td>
          {thdspunjabi?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>

        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">
            Punjabi term2
          </td>
          {thdspunjabi2?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>
      </React.Fragment>
    ));
  };
  const renderTableRowssix = () => {
    const filteredMarks = studentMark?.filter(
      (mark) => mark.subject_name === "health"
    );
    return filteredMarks?.map((mark, index) => (
      <React.Fragment key={index}>
        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">Health term1</td>
          {thdshealth?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>

        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">Health term2</td>
          {thdshealth2?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>
      </React.Fragment>
    ));
  };

  const renderTableRowsseven = () => {
    const filteredMarks = studentMark?.filter(
      (mark) => mark.subject_name === "math"
    );
    return filteredMarks?.map((mark, index) => (
      <React.Fragment key={index}>
        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">Math term1</td>
          {thdsmath?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>

        <tr
          key={index}
          className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
        >
          <td className="px-2 py-2 border-r-2 border-gray-200">Health term2</td>
          {thdsmath2?.map((heading, i) => (
            <td className="px-2 py-2 border-r-2 border-gray-200" key={i}>
              {mark[heading]}
            </td>
          ))}
        </tr>
      </React.Fragment>
    ));
  };
  return (
    <div className="w-full px-2 pb-12">
      <div className="w-full bg-black text-white text-center text-lg">
        <p>
          Marks detail of {student?.student_name} student of class{" "}
          {student?.class_name}-{student?.section} .roll no = {student?.roll_no}
        </p>
      </div>
      <table className=" w-full overflow-x-auto text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
        <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-[#233459] text-white">
            <th scope="col" className={`py-4 text-center text-xs border-b-2  `}>
              subject
            </th>
            {thdsart?.map((heading, index) => (
              <th
                style={
                  heading !== "ID"
                    ? { width: `${100 / thdsart.length}%` }
                    : null
                }
                scope="col"
                key={index}
                className={`py-4 text-center text-xs border-b-2  `}
              >
                {heading
                  .replace("term1", " ")
                  .replace("term2", " ")
                  .replace("t1", " ")
                  .replace("t2", " ")
                  .replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-semibold ">
          {studentMark?.length === 0 ? (
            <tr>
              <td colSpan={thdsart.length + 1} className="text-center py-5">
                No data found
              </td>
            </tr>
          ) : (
            renderTableRows()
          )}
        </tbody>
      </table>
      <table className=" w-full overflow-x-auto text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
        <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-[#233459] text-white">
            <th scope="col" className={`py-4 text-center text-xs border-b-2  `}>
              subject
            </th>
            {thdsmusic?.map((heading, index) => (
              <th
                style={
                  heading !== "ID"
                    ? { width: `${100 / thdsmusic.length}%` }
                    : null
                }
                scope="col"
                key={index}
                className={`py-4 text-center text-xs border-b-2  `}
              >
                {heading
                  .replace("term1", " ")
                  .replace("term2", " ")
                  .replace("t1", " ")
                  .replace("t2", " ")
                  .replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-semibold ">
          {studentMark?.length === 0 ? (
            <tr>
              <td colSpan={thdsmusic.length + 1} className="text-center py-5">
                No data found
              </td>
            </tr>
          ) : (
            renderTableRowstwo()
          )}
        </tbody>
      </table>

      <table className=" w-full overflow-x-auto text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
        <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-[#233459] text-white">
            <th scope="col" className={`py-4 text-center text-xs border-b-2  `}>
              subject
            </th>
            {thdshealth?.map((heading, index) => (
              <th
                style={
                  heading !== "ID"
                    ? { width: `${100 / thdshealth.length}%` }
                    : null
                }
                scope="col"
                key={index}
                className={`py-4 text-center text-xs border-b-2  `}
              >
                {heading
                  .replace("term1", " ")
                  .replace("term2", " ")
                  .replace("t1", " ")
                  .replace("health", " ")
                  .replace("t2", " ")
                  .replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-semibold ">
          {studentMark?.length === 0 ? (
            <tr>
              <td colSpan={thdshealth.length + 1} className="text-center py-5">
                No data found
              </td>
            </tr>
          ) : (
            renderTableRowssix()
          )}
        </tbody>
      </table>

      <table className=" w-full overflow-x-auto text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
        <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-[#233459] text-white">
            <th scope="col" className={`py-4 text-center text-xs border-b-2  `}>
              subject
            </th>
            {thdsmath?.map((heading, index) => (
              <th
                style={
                  heading !== "ID"
                    ? { width: `${100 / thdsmath.length}%` }
                    : null
                }
                scope="col"
                key={index}
                className={`py-4 text-center text-xs border-b-2  `}
              >
                {heading
                  .replace("term1", " ")
                  .replace("term2", " ")
                  .replace("t1", " ")
                  .replace("math", " ")
                  .replace("t2", " ")
                  .replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-semibold ">
          {studentMark?.length === 0 ? (
            <tr>
              <td colSpan={thdsmath.length + 1} className="text-center py-5">
                No data found
              </td>
            </tr>
          ) : (
            renderTableRowsseven()
          )}
        </tbody>
      </table>
      <table className=" w-full overflow-x-auto text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
        <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-[#233459] text-white">
            <th scope="col" className={`py-4 text-center text-xs border-b-2  `}>
              subject
            </th>
            {thdspersonality?.map((heading, index) => (
              <th
                style={
                  heading !== "ID"
                    ? { width: `${100 / thdspersonality.length}%` }
                    : null
                }
                scope="col"
                key={index}
                className={`py-4 text-center text-xs border-b-2  `}
              >
                {heading
                  .replace("term1", " ")
                  .replace("term2", " ")
                  .replace("t1", " ")
                  .replace("personality", " ")
                  .replace("t2", " ")
                  .replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-semibold ">
          {studentMark?.length === 0 ? (
            <tr>
              <td
                colSpan={thdspersonality.length + 1}
                className="text-center py-5"
              >
                No data found
              </td>
            </tr>
          ) : (
            renderTableRowsthree()
          )}
        </tbody>
      </table>
      <table className=" w-full overflow-x-auto text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
        <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-[#233459] text-white">
            <th scope="col" className={`py-4 text-center text-xs border-b-2  `}>
              subject
            </th>
            {thdsenglish?.map((heading, index) => (
              <th
                style={
                  heading !== "ID"
                    ? { width: `${100 / thdsenglish.length}%` }
                    : null
                }
                scope="col"
                key={index}
                className={`py-4 text-center text-xs border-b-2  `}
              >
                {heading
                  .replace("term1", " ")
                  .replace("term2", " ")
                  .replace("t1", " ")
                  .replace("english", " ")
                  .replace("t2", " ")
                  .replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-semibold ">
          {studentMark?.length === 0 ? (
            <tr>
              <td colSpan={thdsenglish.length + 1} className="text-center py-5">
                No data found
              </td>
            </tr>
          ) : (
            renderTableRowsfour()
          )}
        </tbody>
      </table>
      <table className=" w-full overflow-x-auto text-gray-700 text-xl capitalize font-sans px-4 tracking-wider flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
        <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
          <tr className="bg-[#233459] text-white">
            <th scope="col" className={`py-4 text-center text-xs border-b-2  `}>
              subject
            </th>
            {thdspunjabi?.map((heading, index) => (
              <th
                style={
                  heading !== "ID"
                    ? { width: `${100 / thdspunjabi.length}%` }
                    : null
                }
                scope="col"
                key={index}
                className={`py-4 text-center text-xs border-b-2  `}
              >
                {heading
                  .replace("term1", " ")
                  .replace("term2", " ")
                  .replace("t1", " ")
                  .replace("punjabi", " ")
                  .replace("t2", " ")
                  .replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-semibold ">
          {studentMark?.length === 0 ? (
            <tr>
              <td colSpan={thdspunjabi.length + 1} className="text-center py-5">
                No data found
              </td>
            </tr>
          ) : (
            renderTableRowsfive()
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MarksDetailPrimary;
