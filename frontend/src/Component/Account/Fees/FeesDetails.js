import React from "react";
import Loader from "../../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearErrors,
  clearMessage,
  getFeesByStudentId,
  getFeeStructureByClass,
} from "../../../redux/feesSlice";
import { getStudentById } from "../../../redux/studentSlice";

import { useParams } from "react-router-dom";

const FeesDetails = () => {
  const { id } = useParams() ;
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);
  const [class_name, setClass_name] = useState();
  const { loading, error, message, studentFees, feeStructure } = useSelector(
    (state) => state.fees
  );
  const { student } = useSelector((state) => state.student);

  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  useEffect(() => {
    if (student?.class_name) {
      setClass_name(student.class_name);
    }
  }, [student]);

  useEffect(() => {
    if (class_name) {
      dispatch(getFeeStructureByClass(class_name));
    }
  }, [class_name, dispatch]);

  useEffect(() => {
    dispatch(getFeesByStudentId(id));
    dispatch(getStudentById(id));
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

  function renderTable(item) {
    let monthlength=item?.months?.split(",").length
    return (
      <>
        <table className="w-1/2 text-[14px] border-2 border-gray-900">
          <thead>
            <tr className="border-b-2 border-gray-900">
              <th
                colSpan={2}
                className="w-1/4 px-5 py-3 text-center bg-gray-800 text-white"
              >
                Student Detail
              </th>
              <th className="w-1/4 px-5 py-3 text-left">Fees</th>
              <th className="w-1/4 px-5 py-3 text-left">Total</th>
              <th className="w-1/4 px-5 py-3 text-left">Paid</th>
              <th className="w-1/4 px-5 py-3 text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">Name</td>
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                {item?.student_name}
              </td>
              <td className="w-1/4 px-5 py-2">Basic</td>
              <td className="w-1/4 px-5 py-2">
                {feeStructure?.[0]?.Basic_fees * monthlength}
              </td>
              <td className="w-1/4 px-5 py-2">{item?.basic_fees}</td>
              <td className="w-1/4 px-5 py-2">
                {Number(feeStructure?.[0]?.Basic_fees) * monthlength -
                  Number(item?.basic_fees)}
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">Class</td>
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                {item?.class_name + "-" + item?.section}
              </td>
              <td className="w-1/4 px-5 py-2">Tution</td>
              <td className="w-1/4 px-5 py-2">
                {feeStructure?.[0]?.tution_fees * monthlength}
              </td>
              <td className="w-1/4 px-5 py-2">{item?.tution_fees}</td>
              <td className="w-1/4 px-5 py-2">
                {Number(feeStructure?.[0]?.tution_fees) * monthlength -
                  Number(item?.tution_fees)}
              </td>
             
            </tr>
            <tr className="border-b border-gray-300">
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                Roll No
              </td>
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                {item?.roll_no}
              </td>
              <td className="w-1/4 px-5 py-2">Parking</td>
              <td className="w-1/4 px-5 py-2">
                {feeStructure?.[0]?.parking_fees * monthlength}
              </td>
              <td className="w-1/4 px-5 py-2">{item?.parking_fees}</td>
              <td className="w-1/4 px-5 py-2">
                {Number(feeStructure?.[0]?.parking_fees) * monthlength -
                  Number(item?.parking_fees)}
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">Father</td>
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                {item?.father_name}
              </td>
              <td className="w-1/4 px-5 py-2">Bus</td>
              <td className="w-1/4 px-5 py-2">{item?.total_bus_fees * monthlength}</td>
              <td className="w-1/4 px-5 py-2">{item?.paid_bus_fees}</td>
              <td className="w-1/4 px-5 py-2">
                {Number(item?.total_bus_fees) * monthlength - Number(item?.paid_bus_fees)}
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">Method</td>
              <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                {item?.payment_method}
              </td>

              <td className="w-1/4 px-5 py-2">Total</td>
              <td className="w-1/4 px-5 py-2">
                {(Number(feeStructure?.[0]?.Basic_fees) +
                  Number(feeStructure?.[0]?.tution_fees) +
                  Number(feeStructure?.[0]?.parking_fees) +
                  Number(item?.total_bus_fees))* monthlength}
              </td>
              <td className="w-1/4 px-5 py-2">
                {Number(item?.basic_fees) +
                  Number(item?.tution_fees) +
                  Number(item?.parking_fees) +
                  Number(item?.paid_bus_fees)}
              </td>
              <td className="w-1/4 px-5 py-2">
                {" "}
                {Number(feeStructure?.[0]?.Basic_fees) * monthlength -
                  Number(item?.basic_fees) +
                  Number(feeStructure?.[0]?.tution_fees) * monthlength -
                  Number(item?.tution_fees) +
                  Number(feeStructure?.[0]?.parking_fees) * monthlength -
                  Number(item?.parking_fees) +
                  Number(item?.total_bus_fees) * monthlength -
                  Number(item?.paid_bus_fees) +
                  Number(item?.total_bus_fees)* monthlength -
                  Number(item?.paid_bus_fees)}
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td
                colSpan={2}
                className="w-1/4 px-5 py-2 bg-gray-800 text-white"
              >
                Duration
              </td>
              <td colSpan={4} className="w-1/4 px-5 py-2">
                {item?.months?.split(",").join(" | ")}
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td
                colSpan={2}
                className="w-1/4 px-5 py-2 bg-gray-800 text-white"
              >
                Accountand Sign
              </td>
              <td colSpan={4} className="w-1/4 px-5 py-2 ">
                {" "}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }

  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          About {student?.student_name}
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
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div
        className={`flex bg-white justify-center ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : 
          studentFees?.length >0 ?
        (
          
          <div className="w-full ">
            <div className="w-full  px-4 mt-4 py-4 bg-white">
              <div className="h-auto text-sm tracking-wide ">
                <div className="lg:flex gap-5 justify-between p-2">
                  {studentFees?.map((item, index) => renderTable(item))}
                </div>
              </div>
            </div>
          </div>
        ) :<p>no data found</p>}
      </div>
    </section>
  );
};

export default FeesDetails;
