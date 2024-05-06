import React, { useEffect, useState } from "react";
import {
  FaAngleDown,
  FaArrowsRotate,
  FaXmark,
  FaArrowRightLong,
  FaCheck,
  FaBan,
} from "react-icons/fa6";
import { TbUserCancel } from "react-icons/tb";
import Loader from "../../BaseFiles/Loader";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../BaseFiles/Select";
import {
  getStudents,
  toggleAttendance,
  getStudentAbsents,
  clearMessage,
  deleteEntry,
} from "../../redux/studentSlice";
import { getAllDatesOfMonth } from "../../actions";

const Attendance = () => {
  const [rotate, setRotate] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const dispatch = useDispatch();
  const { loading, error, message, students, absents } = useSelector(
    (state) => state.student
  );

  const currentUrl = window.location.href;
  useEffect(() => {
    // dispatch(getAbsents());
    dispatch(getStudentAbsents(1));
    if (message) {
      dispatch(clearMessage());
    }
  }, [dispatch, message]);

  const { dates, monthName } = getAllDatesOfMonth(selectedMonth, 2024);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const chunkedDates = [];
  for (let i = 0; i < dates.length; i += 7) {
    chunkedDates.push(dates.slice(i, i + 7));
  }
  return (
    <section className="py-1 w-full m-auto">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/3">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4]}`}
        </h6>
        <div className="w-2/3 flex gap-2 justify-end px-4 items-center">
          <div className=" text-xs w-1/2 font-sans tracking-wider">
            Month{" "}
            <select
              className={`border-0 px-2 w-1/2 placeholder-blueGray-300 focus:bg-white text-gray-600 bg-gray-200 rounded-sm text-sm shadow focus:outline-none ease-linear transition-all duration-150`}
              value={selectedMonth}
              onChange={handleChange}
            >
              {[...Array(12).keys()].map((index) => (
                <option key={index} value={index}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "short",
                  })}
                </option>
              ))}
            </select>
            - Year: {new Date().getFullYear()}
          </div>

          <FaAngleDown className="text-yellow-700 cursor-pointer" />
          <FaArrowsRotate
            className={`text-green-700 cursor-pointer ${
              rotate
                ? "rotate-180 transition-transform duration-1000"
                : "transition-transform"
            }`}
          />
          <FaXmark className="text-red-700 cursor-pointer" />
        </div>
      </div>

      <div
        className={`flex bg-white justify-center ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="">
            <div className="bg-white border-b-2 max-w-full"></div>
            <table className="max-w-full flex-auto pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow bg-white">
              <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {dates.slice(0, 7).map((date, index) => {
                    return (
                      <>
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "short",
                        }) === "Sun" ? (
                          <td
                            key={index}
                            scope="col "
                            className="text-xs w-40 h-20 text-center border bg-yellow-500  font-sans font-semibold text-gray-900"
                          >
                            <div className="flex items-center justify-center text-center">
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                          </td>
                        ) : (
                          <td
                            key={index}
                            scope="col "
                            className="text-xs w-40 h-20 text-center border bg-[#233459]  text-white font-sans font-semibold"
                          >
                            <div className="flex items-center justify-center text-center">
                              {new Date(date).toLocaleDateString("en-US", {
                                weekday: "short",
                              })}
                            </div>
                          </td>
                        )}
                      </>
                    );
                  })}
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                {absents?.length === 0 && students?.length === 0 ? (
                  <tr>
                    <td className="text-center py-5" colSpan={dates.length + 2}>
                      No data found
                    </td>
                  </tr>
                ) : (
                  <>
                    {chunkedDates.map((week, rowIndex) => {
                      return (
                        <tr
                          key={rowIndex}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          {week.map((day, columnIndex) => {
                            const isLeave = absents?.some((record) => {
                              const leaveDate = new Date(record.leave_date)
                                .toISOString()
                                .split("T")[0];
                              const weekDate = new Date(day)
                                .toISOString()
                                .split("T")[0];
                              return leaveDate === weekDate;
                            });

                            return (
                              <td
                                key={columnIndex}
                                className={`w-40 h-20 font-medium text-gray-900 whitespace-nowrap dark:text-white border ${
                                  isLeave ? "bg-red-500 text-white" : ""
                                }`}
                              >
                                <div className="flex items-center justify-center">
                                  {new Date(day).getDate()}
                                </div>
                                {isLeave && (
                                  <div className="text-xs text-white">
                                    Leave
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Attendance;
