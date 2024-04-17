import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeeStructure, clearErrors, clearMessage,updateFeeStructure ,deleteStructure} from "../../../redux/feesSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import ErrorAlert from "../../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../../BaseFiles/SuccessAlert";
import {createFeeStructureValues} from "../../InitialValues"
import { useFormik } from "formik";
import { FaRegTrashAlt, FaCheck } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";

export default function FeeStructure() {
  const currentUrl = window.location.href;
  const [rotate, setRotate] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editablefee, setEditablefee] = useState(null);
  const { loading, error, message, feeStructure } = useSelector((state) => state.fees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeeStructure());
    if (error) {
      const errorInterval = setInterval(() => {
        dispatch(clearErrors());
      }, 3000);
      return () => clearInterval(errorInterval);
    }
    if (message) {
        setEditMode(false);
        setEditablefee(null);
      const messageInterval = setInterval(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearInterval(messageInterval);
    }
  }, [dispatch, error, message]);

  const thds = [
    "ID",
    "class",
    "Basic fees",
    "tution fees",
    "parking fees",
    "obc relaxation",
    "SC relaxation",
    "EWS relaxation",
    "BPL relaxation",
    "ST relaxation",
    "QUOTA relaxation",
    "OTHER relaxation",
    "due date",
    "Action"
  ];
  const handleEdit = (fee) => {
    setEditablefee(fee);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditablefee(null);
  };

  const formik = useFormik({
    initialValues: createFeeStructureValues,
    onSubmit: (values) => {
      const filteredData = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== "" && value !== null
        )
      );

      dispatch(
        updateFeeStructure({
          id: editablefee.Fees_detail_id,
          updatedData: filteredData,
        })
      );
    },
  });
  return (
    <section className="py-1  w-full m-auto">
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
          <table className="capitalize flex-auto text-xs text-left rtl:text-right text-gray-800 dark:text-gray-400 relative overflow-x-auto shadow w-full  px-4 mx-auto  bg-white">
           <colgroup>
  {thds?.map((item, index) => (
    <col key={index} style={item !== "ID"  ? { width: `${100 / thds.length}%` } : null} />
  ))}
</colgroup>
            <thead className="text-xs text-gray-700 capitalize bg-white dark:bg-gray-800 dark:text-gray-400">
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
              {feeStructure?.length === 0 ? (
                <tr>
                  <td colSpan={thds.length + 1} className="text-center py-5">
                    No data found
                  </td>
                </tr>
              ) : (
                feeStructure?.map((fee, index) => (

                  <tr key={index} className="text-center">
                     <td className="px-2 py-2 ">
                      
                        {fee.Fees_detail_id}
                 
                    </td>
                    <td className="px-2 py-2 text-left">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="class_value"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.class_value}
                        />
                      ) : (
                        fee.class_value
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="Basic_fees"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.Basic_fees}
                        />
                      ) : (
                        fee.Basic_fees
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="tution_fees"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.tution_fees}
                        />
                      ) : (
                        fee.tution_fees
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="parking_fees"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.parking_fees}
                        />
                      ) : (
                        fee.parking_fees
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="obc_relaxation"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.obc_relaxation}
                        />
                      ) : (
                        fee.obc_relaxation
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="sc_relaxation"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.sc_relaxation}
                        />
                      ) : (
                        fee.sc_relaxation
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="ews_relaxation"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.ews_relaxation}
                        />
                      ) : (
                        fee.ews_relaxation
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="bpl_relaxation"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.bpl_relaxation}
                        />
                      ) : (
                        fee.bpl_relaxation
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="st_relaxation"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.st_relaxation}
                        />
                      ) : (
                        fee.st_relaxation
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="quota_relaxation"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.quota_relaxation}
                        />
                      ) : (
                        fee.quota_relaxation
                      )}
                    </td>
                    <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="other_realxation"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.other_realxation}
                        />
                      ) : (
                        fee.other_realxation
                      )}
                    </td>   
                      <td className="px-2 py-2">
                      {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <input
                          id="due_date"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={fee.due_date}
                        />
                      ) : (
                        fee.due_date
                      )}
                    </td>
              

                    
                    <td className="px-2 py-4 flex gap-3 items-center ">
                    {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <FaXmark
                          className="h-4 w-4 text-red-700 cursor-pointer"
                          onClick={handleCancelEdit}
                          title="cancel"
                        />
                      ) : (
                        <Link to={`/student/details/${fee.Fees_detail_id}`}>
                          <FaEye
                            className="h-4 w-4 cursor-pointer"
                            title="Details"
                          />
                        </Link>
                      )}
                   {editMode &&
                      editablefee &&
                      editablefee.Fees_detail_id === fee.Fees_detail_id ? (
                        <FaCheck
                          className="h-4 w-4 text-green-700 cursor-pointer"
                          onClick={formik.handleSubmit}
                          title="Submit Changes"
                        />
                      ) : (
                        <BsPencilSquare
                          className="h-4 w-4 text-green-700 cursor-pointer"
                          onClick={() => handleEdit(fee)}
                          title="Edit"
                        />
                      )}
                      <FaRegTrashAlt
                        className="h-4 w-4 text-red-700 cursor-pointer"
                        onClick={() =>
                          dispatch(deleteStructure(fee.Fees_detail_id))
                        }
                        title="Delete"
                      />
                    </td>

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
