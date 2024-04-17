import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { paySalaryValues } from "../../InitialValues";
import { paySalaryValidation } from "../../validation";
import {
  getSalaryStructureById,
  clearErrors,
  clearMessage,
  paySalary,
} from "../../../redux/salarySlice";
import { getStaffById } from "../../../redux/staffSlice";
import { useDispatch, useSelector } from "react-redux";
const PaySalary = () => {
  const { loading, error, message, memberPay } = useSelector(
    (state) => state.salary
  );
  const { member } = useSelector((state) => state.staff);
  const [rotate, setRotate] = useState(false);
  const [id, setId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getSalaryStructureById(id));
    }
  }, [dispatch, getSalaryStructureById, id]);

  useEffect(() => {
    if (id) {
      dispatch(getStaffById(id));
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

  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const formik = useFormik({
    initialValues: paySalaryValues,
    validationSchema: paySalaryValidation,
    onSubmit: async (values) => {
      values.amount=(Number(memberPay?.basic_salary) +Number(memberPay?.pa) +Number(memberPay?.extra_allowance) +Number(memberPay?.da) +
      Number(memberPay?.hra) + Number(formik.values.bonus));
      values.total_amount=(formik.values.leave_in >"2"? 
      ( (Number(memberPay?.basic_salary) +
         Number(memberPay?.pa) +
         Number(memberPay?.extra_allowance) +
         Number(memberPay?.da) +
         Number(memberPay?.hra)+
         Number(formik.values.bonus))-((Number(formik.values.leave_in)-2)*(Number(memberPay?.basic_salary)/30))) : (
           (Number(memberPay?.basic_salary) +
         Number(memberPay?.pa) +
         Number(memberPay?.extra_allowance) +
         Number(memberPay?.da) +
         Number(memberPay?.hra)+
         Number(formik.values.bonus))
         ))
      values.date=formattedDate
      dispatch(paySalary(values));
    },
  });
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
    if (message) {
      formik.resetForm();
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [error, message, loading, formik]);
  useEffect(() => {
    setId(formik.values.staff_id);
  }, [setId, formik.values.staff_id]);
  return (
    <section className="py-1  w-full m-auto">
      <div className="lg:flex flex-wrap justify-between bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Pay salary Form
        </h6>

        <div className="w-1/2 lg:flex gap-5 justify-end px-4 items-center">
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
        className={`lg:flex bg-white justify-center ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full">
            <div className="lg:flex w-full">
              <div
                id="fee_receipt"
                className="lg:flex w-3/4 p-3 justify-between  "
              >
                <div className="w-full font-sans">
                  <table className="w-full text-[14px] border-2 border-gray-900">
                    <thead>
                      <tr className="border-b-2 border-gray-900">
                        <th className="w-1/4 px-5 py-3 text-center bg-gray-800 text-white">
                          Key
                        </th>
                        <th className="w-1/4 px-5 py-3 text-left">Value</th>
                        <th className="w-1/4 px-5 py-3 text-center bg-gray-800 text-white">
                          Key
                        </th>
                        <th className="w-1/4 px-5 py-3 text-left">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                          Name
                        </td>
                        <td className="w-1/4 px-5 py-2 ">
                          {member?.staff_name}
                        </td>
                        <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                          Name
                        </td>
                        <td className="w-1/4 px-5 py-2 ">
                          {member?.staff_name}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          Basic Salary
                        </td>
                        <td className="w-1/2 px-5 py-2 ">
                          {memberPay?.basic_salary}
                        </td>
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          HRA
                        </td>
                        <td className="w-1/2 px-5 py-2 ">{memberPay?.hra}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          P.A
                        </td>
                        <td className="w-1/2 px-5 py-2 ">{memberPay?.pa}</td>
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          D.A
                        </td>
                        <td className="w-1/2 px-5 py-2 ">{memberPay?.da}</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          Extra Allowance
                        </td>
                        <td className="w-1/2 px-5 py-2 ">
                          {memberPay?.extra_allowance}
                        </td>
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          Bonus
                        </td>
                        <td className="w-1/2 px-5 py-2 ">
                          {formik.values.bonus}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-300"></tr>{" "}
                      <tr className="border-b border-gray-300">
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          Amount
                        </td>
                        <td className="w-1/2 px-5 py-2 ">
                          {Number(memberPay?.basic_salary) +
                            Number(memberPay?.pa) +
                            Number(memberPay?.extra_allowance) +
                            Number(memberPay?.da) +
                            Number(memberPay?.hra) +
                            Number(formik.values.bonus)}
                        </td>
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          leave_in
                        </td>
                        <td className="w-1/2 px-5 py-2 ">
                          {formik.values.leave_in}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          In hand salary
                        </td>
                        <td colSpan={2} className="w-1/4 px-5 py-2 ">
                          {formik.values.leave_in >"2"? 
                         ( (Number(memberPay?.basic_salary) +
                            Number(memberPay?.pa) +
                            Number(memberPay?.extra_allowance) +
                            Number(memberPay?.da) +
                            Number(memberPay?.hra)+
                            Number(formik.values.bonus))-((Number(formik.values.leave_in)-2)*(Number(memberPay?.basic_salary)/30))) : (
                              (Number(memberPay?.basic_salary) +
                            Number(memberPay?.pa) +
                            Number(memberPay?.extra_allowance) +
                            Number(memberPay?.da) +
                            Number(memberPay?.hra)+
                            Number(formik.values.bonus))
                            )}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="w-1/2 px-5 py-2 bg-gray-800 text-white">
                          Accountant Sign
                        </td>
                        <td colSpan={2} className="w-1/4 px-5 py-2 ">
                          {" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="w-full px-4 bg-white">
                <div className="lg:flex-auto px-4 py-10 pt-0">
                  <form className="py-3" onSubmit={formik.handleSubmit}>
                    <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                      Staff Information
                      <div className="h-1 bg-gray-700 w-16 my-3"></div>
                    </h6>
                    <div className="lg:lg:flex flex-wrap mb-5">
                      <div className="w-full lg:w-4/12 px-2">
                        <div className="relative w-full mb-3">
                          <label
                            className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                            htmlFor="staff_id"
                          >
                            Staff Id
                          </label>
                          <input
                            id="staff_id"
                            type="number"
                            value={formik.values.staff_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                              formik.touched.staff_id && formik.errors.staff_id
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        </div>
                        {formik.touched.staff_id && formik.errors.staff_id && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.staff_id}
                          </p>
                        )}
                      </div>

                      <div className="w-full lg:w-4/12 px-2">
                        <div className="relative w-full mb-3">
                          <label
                            className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                            htmlFor="bonus"
                          >
                            Bonus
                          </label>
                          <input
                            id="bonus"
                            type="number"
                            value={formik.values.bonus}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                              formik.touched.bonus && formik.errors.bonus
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        </div>
                        {formik.touched.bonus && formik.errors.bonus && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.bonus}
                          </p>
                        )}
                      </div>

                      <div className="w-full lg:w-4/12 px-2">
                        <div className="relative w-full mb-3">
                          <label
                            className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                            htmlFor="leave_in"
                          >
                            leave_in
                          </label>
                          <input
                            id="leave_in"
                            type="number"
                            value={formik.values.leave_in}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                              formik.touched.leave_in && formik.errors.leave_in
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        </div>
                        {formik.touched.leave_in && formik.errors.leave_in && (
                          <p className="text-red-500 text-xs mt-1">
                            {formik.errors.leave_in}
                          </p>
                        )}
                      </div>

                      <div className="w-full lg:w-6/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                              htmlFor="status"
                            >
                              Status
                            </label>
                            <select
                              id="status"
                              type="text"
                              value={formik.values?.status}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                                formik.touched.status &&
                                formik.errors.status
                                  ? "border-red-500"
                                  : ""
                              }`}
                            >
                              <option value="">Choose a Option</option>
                              <option value="Online">Paid</option>
                              <option value="Cash">Due</option>
                            </select>
                          </div>
                          {formik.touched.status &&
                            formik.errors.status && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.status}
                              </p>
                            )}
                        </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300 py-3" />

                    <div className="mx-3 lg:flex justify-start">
                      <button
                        className="bg-amber-500 text-white active:bg-yellow-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Submit
                      </button>
                      <button
                        className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        onClick={formik.resetForm}
                      >
                        Reset Form
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300 py-3" />
          </div>
        )}
      </div>
    </section>
  );
};

export default PaySalary;
