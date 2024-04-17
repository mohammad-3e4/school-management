import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getSalary,
  clearErrors,
  clearMessage,
} from "../../../redux/salarySlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../../BaseFiles/SuccessAlert";
import { MdOutlinePendingActions } from "react-icons/md";
export default function Salaries() {
  const currentUrl = window.location.href;
  const [rotate, setRotate] = useState(false);

  const { loading, error, message, salary } = useSelector(
    (state) => state.salary
  );
  console.log(salary);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalary());
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
  }, [dispatch, error, message]);

  const thds = [
    "ID",
    "Photo",
    "Name",
    "Salary",
    "Bonus",
    "Leave",
    "Total Amount",
    "status",
    "Date",
    "Action",
  ];

  return (
    <section className="py-1  w-full m-auto ">
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/2">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4] || ""}`}
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
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
          <table className="capitalize mb-20 flex-auto text-xs text-left rtl:text-right text-[8px] text-gray-800 dark:text-gray-400 relative overflow-x-auto shadow w-full  px-4 mx-auto  bg-white">
            <colgroup>
              {thds?.map((item, index) => (
                <col
                  key={index}
                  style={
                    item !== "ID" ? { width: `${100 / thds.length}%` } : null
                  }
                />
              ))}
            </colgroup>
            <thead className="text-[8px] text-gray-700 capitalize bg-white dark:bg-gray-800 dark:text-gray-400">
              <tr>
                {thds?.map((heading, index) => (
                  <th
                    scope="col"
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
              </tr>
            </thead>
            <tbody>
              {salary?.length === 0 ? (
                <tr>
                  <td colSpan={thds.length + 1} className="text-center py-5">
                    No data found
                  </td>
                </tr>
              ) : (
                salary?.map((salary, index) => (
                  <tr key={index}>
                    <td className="py-2 text-center text-[10px] border-b-2">
                      #{salary?.salary_id}
                    </td>
                    <td className="py-2 text-center text-sm border-b-2">
                      {" "}
                      <img
                        className="w-6 mx-auto d-block"
                        src={
                          salary?.gender === "Male"
                            ? "/default_male.png"
                            : "/default_female.png"
                        }
                      />
                    </td>
                    <td className="py-2 text-left text-[12px] border-b-2">
                      {salary?.staff_name}
                    </td>
                    <td className="py-2 text-center text-[12px] border-b-2">
                      {salary?.amount}
                    </td>
                    <td className="py-2 text-center text-[12px] border-b-2">
                      {salary?.bonus}
                    </td>{" "}
                    <td className="py-2 text-center text-[12px] border-b-2">
                      {salary?.leave_in}
                    </td>
                    <td className="py-2 text-center text-[12px] border-b-2">
                      {salary?.total_amount}
                    </td>
                    <td className="py-2 item-center text-[12px] border-b-2">
                      {salary?.status > "due" || salary?.status == null ? (
                        <div class="flex items-center w-full mx-auto">
                          <div class="h-2.5 w-2.5 rounded-full ml-5 bg-red-500 me-2 "></div>{" "}
                          Due
                        </div>
                      ) : (
                        <div class="flex items-center">
                          <div class="h-2.5 w-2.5 rounded-full ml-5 bg-green-500 me-2"></div>{" "}
                          Paid
                        </div>
                      )}
                    </td>
                    <td className="py-2 text-center text-[12px] border-b-2">
                      {salary?.date}
                    </td>
                    <td className="py-2 text-center text-[12px] border-b-2 ">
                      {" "}
                      <Link to={`/fees/details/${salary?.staff_id}`}>
                        <MdOutlinePendingActions
                          className="h-4 w-4 text-blue cursor-pointer mx-auto d-block"
                          title="Details"
                        />
                      </Link>
                    </td>
                    {/* Include additional columns here as needed */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
