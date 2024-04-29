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


const MarksDetailEleven = () => {
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

  let thds;


    thds =[ "theory_max" ,"theory_obt" ,"practical_max" ,"practical_obt","grand_total","final_grade"]
    const mergedData = studentMark?.map(mark => {
        // Find the corresponding maxMark object for the current subject name
        const maxMark = maxMarks?.find(maxmark => maxmark.subject_name === mark.subject_name);
      
        // Create a new object with the required properties
        return {
          subject_name: mark.subject_name,
          theory_max: maxMark ? maxMark.theory_max : null,
          theory_obt: mark.theory_obt,
          practical_max: maxMark ? maxMark.practical_max : null,
          practical_obt: mark.practical_obt,
          grand_total: mark.grand_total,
          final_grade: mark.final_grade
        };
      });
      
      const renderTableRows = () => {
        return mergedData?.map((mark, index) => (
          <tr
            key={index}
            className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 capitalize"
          >
            <React.Fragment key={index}>
              <>
                <td className="px-2 py-2 border-r-2 border-gray-200">
                  {mark["subject_name"]}
                </td>
                {thds
                    .filter(item => item !== "marks_id" && item !== "student_id" )
                    .map((item, i) => (
                        <td className="px-2 py-2 border-r-2 border-gray-200">
                        {mark[item]}
                        </td>
                    ))}
    
              </>
            </React.Fragment>
         
          </tr>
        ));
      };
console.log(mergedData)
  return (
    <div className="px-2 pb-20">
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
            {thds?.filter(heading => heading !== "mark_id"  && heading !== "subject_name")?.map((heading, index) => (
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
                ))
                }

          
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

      
    </div>
  );
};

export default MarksDetailEleven;
