import React from "react";
import Loader from "../../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { createFeesValues } from "../../InitialValues";
import { createFeesValidation } from "../../validation";
import CheckboxDropdown from "./CheckboxDropdown";
import {
  createFees,
  clearErrors,
  clearMessage,
  getFeeStructureByClass,
} from "../../../redux/feesSlice";
import { getStudentById } from "../../../redux/studentSlice";
import { useDispatch, useSelector } from "react-redux";
const CreateFees = () => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([])
  const { loading, error, message, feeStructure } = useSelector(
    (state) => state.fees
  );
  const { student } = useSelector((state) => state.student);
  const [rotate, setRotate] = useState(false);
  const [id, setId] = useState();
  const [class_name, setClass_name] = useState();

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

  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);

  const formik = useFormik({
    initialValues: createFeesValues,
    validationSchema: createFeesValidation,
    onSubmit: async (values) => {
      values.student_id = id;
      values.due_basic_fees = feeStructure?.[0]?.Basic_fees - values.basic_fees;
      values.due_tution_fees =
        feeStructure?.[0]?.tution_fees - values.tution_fees;
      values.due_bus_fees = values.total_bus_fees - values.paid_bus_fees;
      values.due_parking_fees =
        feeStructure?.[0]?.parking_fees - values.parking_fees;
      values.date_time = formattedDate;
      values.total_fees =
        Number(feeStructure?.[0]?.Basic_fees) +
        Number(feeStructure?.[0]?.tution_fees) +
        Number(values.total_bus_fees) +
        Number(feeStructure?.[0]?.parking_fees);
      values.paid_fees =
        formik.values?.basic_fees +
        formik.values?.tution_fees +
        formik.values?.parking_fees +
        values.paid_bus_fees;
      values.due_fees =
        Number(feeStructure?.[0]?.Basic_fees) +
        Number(feeStructure?.[0]?.tution_fees) +
        Number(values.total_bus_fees) +
        Number(feeStructure?.[0]?.parking_fees) -
        (values.basic_fees +
          values.tution_fees +
          values.parking_fees +
          values.paid_bus_fees);
          values.months=`${selectedMonths}`
      dispatch(createFees(values));
    },
  });

  useEffect(() => {
    setId(formik.values.student_id);
  }, [setId, formik.values.student_id]);
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



  const handlePrint = () => {
    var printContents = document.getElementById("fee_receipt").innerHTML;
    var styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map(tag => tag.outerHTML)
      .join("");
  
    var newWindow ="";
    newWindow.document.write(`
      <html>
        <head>
          ${styles}
        </head>
        <body>
          ${printContents}
        </body>
        <script>
         
          window.onload = function() {
            window.print();
           
          };
        </script>
      </html>
    `);
  };
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const [selectedMonths, setSelectedMonths] = useState([]);
  console.log(selectedMonths)
  const handleSelectChange = (selected) => {
    setSelectedMonths(selected);
  };

  return (
    <section className="py-1  w-full m-auto">
      <div className="lg:flex flex-wrap justify-between bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Create Fees Payment Form
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
                  <div id="fee_receipt" className="lg:flex w-3/4 p-3 justify-between  ">
                    <div className="w-1/2 font-sans">
                      <table className="w-full text-[14px] border-2 border-gray-900">
                        <thead>
                          <tr className="border-b-2 border-gray-900">
                            <th colSpan={2} className="w-1/4 px-5 py-3 text-center bg-gray-800 text-white">
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
                              {student?.student_name}
                            </td>
                            <td className="w-1/4 px-5 py-2">Basic</td>
                            <td className="w-1/4 px-5 py-2">
                              {feeStructure?.[0]?.Basic_fees * selectedMonths.length}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {formik.values?.basic_fees || "-"}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {feeStructure?.[0]?.Basic_fees  * selectedMonths.length -
                                formik.values?.basic_fees}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-300">
                            <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">Class</td>
                            <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                              {student?.class_name + "-" + student?.section}
                            </td>
                            <td className="w-1/4 px-5 py-2">Tution</td>
                            <td className="w-1/4 px-5 py-2">
                              {feeStructure?.[0]?.tution_fees  * selectedMonths.length}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {formik.values?.tution_fees || "-"}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {feeStructure?.[0]?.tution_fees   * selectedMonths.length -
                                formik.values?.tution_fees}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-300">
                            <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">Roll No</td>
                            <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">{student?.roll_no}</td>
                            <td className="w-1/4 px-5 py-2">Parking</td>
                            <td className="w-1/4 px-5 py-2">
                              {feeStructure?.[0]?.parking_fees  * selectedMonths.length}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {formik.values?.parking_fees || "-"}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {feeStructure?.[0]?.parking_fees  * selectedMonths.length -
                                formik.values?.parking_fees}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-300">
                            <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">Father</td>
                            <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">
                              {student?.father_name}
                            </td>
                            <td className="w-1/4 px-5 py-2">Bus</td>
                            <td className="w-1/4 px-5 py-2">
                              {formik.values.total_bus_fees  * selectedMonths.length}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {formik.values.paid_bus_fees  || "-"}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {formik.values.total_bus_fees  * selectedMonths.length-
                                formik.values.paid_bus_fees}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-300">
                            <td className="w-1/4 px-5 py-2 bg-gray-800 text-white">Method</td>
                            <td className="w-1/4 px-5 py-2 bg-gray-800 text-white"> {formik.values?.payment_method}   </td>

                            <td className="w-1/4 px-5 py-2">Total</td>
                            <td className="w-1/4 px-5 py-2">
                              {(Number(feeStructure?.[0]?.Basic_fees) +
                                Number(feeStructure?.[0]?.tution_fees) +
                                Number(formik.values?.total_bus_fees) +
                                Number(feeStructure?.[0]?.parking_fees)) * selectedMonths.length}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {formik.values.basic_fees +
                                formik.values.tution_fees +
                                formik.values.parking_fees +
                                formik.values.paid_bus_fees}
                            </td>
                            <td className="w-1/4 px-5 py-2">
                              {(Number(feeStructure?.[0]?.Basic_fees) +
                                Number(feeStructure?.[0]?.tution_fees) +
                                Number(formik.values?.total_bus_fees) +
                                Number(feeStructure?.[0]?.parking_fees)) * selectedMonths.length -
                                (formik.values.basic_fees +
                                  formik.values.tution_fees +
                                  formik.values.parking_fees +
                                  formik.values.paid_bus_fees)}
                            </td>
                          </tr>
                          <tr className="border-b border-gray-300">
                            <td colSpan={2} className="w-1/4 px-5 py-2 bg-gray-800 text-white">Duration</td>
                            <td colSpan={4} className="w-1/4 px-5 py-2 ">{selectedMonths && selectedMonths.length > 0 && selectedMonths.map((month, index) => (
  <span key={index}>
    {month}
    {index !== selectedMonths.length - 1 && ', '}
  </span>
))}</td>
                          
                          </tr>
                          <tr className="border-b border-gray-300">
                            <td colSpan={2} className="w-1/4 px-5 py-2 bg-gray-800 text-white">Accountand Sign</td>
                            <td colSpan={4} className="w-1/4 px-5 py-2 ">                  </td>
                          
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="w-full px-4 bg-white">
                  <div className="lg:flex-auto px-4 py-10 pt-0">
                    <form className="py-3" onSubmit={formik.handleSubmit}>
                      <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                        Student Information
                        <div className="h-1 bg-gray-700 w-16 my-3"></div>
                      </h6>
                      <div className="lg:lg:flex flex-wrap mb-5">
                        <div className="w-full lg:w-4/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                              htmlFor="student_id"
                            >
                              Student Id
                            </label>
                            <input
                              id="student_id"
                              type="number"
                              value={formik.values.student_id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                                formik.touched.student_id &&
                                formik.errors.student_id
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.student_id &&
                            formik.errors.student_id && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.student_id}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-4/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                              htmlFor="month"
                            >
                              Month
                            </label>
                            <CheckboxDropdown options={months} onChange={handleSelectChange} />
                          </div>
                        
                        </div>
                        <div className="w-full lg:w-4/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                              htmlFor="basic_fees"
                            >
                              Basic Fees({feeStructure?.[0]?.Basic_fees})
                            </label>
                            <input
                              id="basic_fees"
                              type="number"
                              value={formik.values.basic_fees}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                                formik.touched.basic_fees &&
                                formik.errors.basic_fees
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.basic_fees &&
                            formik.errors.basic_fees && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.basic_fees}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-4/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                              htmlFor="tution_fees"
                            >
                              Tution Fees({feeStructure?.[0]?.tution_fees})
                            </label>
                            <input
                              id="tution_fees"
                              type="number"
                              value={formik.values.tution_fees}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                                formik.touched.tution_fees &&
                                formik.errors.tution_fees
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.tution_fees &&
                            formik.errors.tution_fees && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.tution_fees}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-4/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                              htmlFor="parking_fees"
                            >
                              Parking Fees({feeStructure?.[0]?.parking_fees})
                            </label>
                            <input
                              id="parking_fees"
                              type="number"
                              value={formik.values?.parking_fees}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                                formik.touched.parking_fees &&
                                formik.errors.parking_fees
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.parking_fees &&
                            formik.errors.parking_fees && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.parking_fees}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-4/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                              htmlFor="total_bus_fees"
                            >
                              Total Bus Fees
                            </label>
                            <input
                              id="total_bus_fees"
                              type="number"
                              value={formik.values.total_bus_fees}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                                formik.touched.total_bus_fees &&
                                formik.errors.total_bus_fees
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.total_bus_fees &&
                            formik.errors.total_bus_fees && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.total_bus_fees}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-6/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                              htmlFor="paid_bus_fees"
                            >
                              Paid Bus Fees
                            </label>
                            <input
                              id="paid_bus_fees"
                              type="number"
                              value={formik.values?.paid_bus_fees}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                                formik.touched.paid_bus_fees &&
                                formik.errors.paid_bus_fees
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          </div>
                          {formik.touched.paid_bus_fees &&
                            formik.errors.paid_bus_fees && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.paid_bus_fees}
                              </p>
                            )}
                        </div>
                        <div className="w-full lg:w-6/12 px-2">
                          <div className="relative w-full mb-3">
                            <label
                              className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                              htmlFor="payment_method"
                            >
                              Method
                            </label>
                            <select
                              id="payment_method"
                              type="text"
                              value={formik.values?.payment_method}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                                formik.touched.payment_method &&
                                formik.errors.payment_method
                                  ? "border-red-500"
                                  : ""
                              }`}
                            >
                              <option value="">Choose a Option</option>
                              <option value="Online">Online</option>
                              <option value="Cash">Cash</option>
                              <option value="Cheque">Cheque</option>
                            </select>
                          </div>
                          {formik.touched.payment_method &&
                            formik.errors.payment_method && (
                              <p className="text-red-500 text-xs mt-1">
                                {formik.errors.payment_method}
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

export default CreateFees;
