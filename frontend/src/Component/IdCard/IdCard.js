import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";

import StudentModal from "./StudentModal";
import { UserIcon } from "@heroicons/react/24/outline";
import { FaRegIdCard } from "react-icons/fa";

export default function IdCard() {
  const [student, setStudent] = useState([]);
  const [rotate, setRotate] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleModalClose = () => {
    setSelectedStudent(null);
  };

  const currentUrl = window.location.href;
  const thds = [
    "Student Name",
    "Class",
    "D.O.B",
    "Roll No.",
    "Address",
    "Phone",
    "Id Card",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/idcard/card"
      );
      setStudent(response.data.books);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(student);

  return (
    <>
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/2">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4]}`}
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
          <FaAngleDown className="text-yellow-700 cursor-pointer" />
          <FaArrowsRotate
            className={`text-green-700 cursor-pointer ${
              rotate
                ? "rotate-180 transition-transform duration-1000"
                : "transition-transform"
            }`}
            onClick={handleRefresh}
          />
          <FaXmark className="text-red-700 cursor-pointer" />
        </div>
      </div>
      <div>
        <table
          className="flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow w-full px-4 mx-auto bg-white"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {thds.map((heading, index) => (
                <th
                  key={index}
                  className={`py-4 text-xs border-b-2 ${
                    index === 0 ? "px-2" : "px-2"
                  }`}
                  style={{ width: `${100 / thds.length}%` }} // Equal width for each th
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {student.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
              >
                <td className="px-2 py-2">{item.student_name}</td>
                <td className="px-2 py-2">{item.class_name}</td>
                <td className="px-2 py-2">{item.date_of_birth}</td>
                <td className="px-2 py-2">{item.roll_no}</td>
                <td className="px-2 py-2">{item.address}</td>
                <td className="px-2 py-2">{item.phone}</td>
                <td
                  className="px-2 py-4 flex gap-3 items-center text-blue-700 text-center cursor-pointer"
                  onClick={() => handleStudentClick(item)}
                >
                  <FaRegIdCard className="h-5 w-5 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedStudent && (
          <StudentModal
            selectedStudent={selectedStudent}
            onClose={handleModalClose}
          />
        )}
      </div>
    </>
  );
}

