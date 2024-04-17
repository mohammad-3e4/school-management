import React from "react";
import { Link } from "react-router-dom";
import Loader from "../../../BaseFiles/Loader";
import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import ErrorAlert from "../../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { createFeeStructureValues } from "../../InitialValues";
import { createFeeStructureValidation } from "../../validation";
import {
  createFeeStructure,
  clearErrors,
  clearMessage,
} from "../../../redux/feesSlice";
import { useDispatch, useSelector } from "react-redux";
const CreateFeeStructure = () => {
  const { loading, error, message } = useSelector((state) => state.fees);
  const [rotate, setRotate] = useState(false);

  const dispatch = useDispatch();
  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  const formik = useFormik({
    initialValues: createFeeStructureValues,
    validationSchema: createFeeStructureValidation,
    onSubmit: async (values) => {
      dispatch(createFeeStructure(values));
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

  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Create Fees Structure Form
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
        ) : (
          <div className="w-full  px-4 mx-auto mt-10 bg-white">
            <div className="flex-auto px-4 py-10 pt-0">
              <form className="py-3" onSubmit={formik.handleSubmit}>
                <div className="flex justify-between">
                <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                  Structure Information
                  <div className="h-1 bg-gray-700 w-16 my-3"></div>
                </h6>
                <Link to="/fees/structure"><button type="button" className=" h-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        All Fees Structure
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        </button>
                </Link>
                </div>
                <div className="flex flex-wrap mb-5">
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="class_value"
                      >
                        Select Class
                      </label>
                      <select
                        id="class_value"
                        type="text"
                        value={formik.values.class_value}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.class && formik.errors.class_value
                            ? "border-red-500"
                            : ""
                        }`}
                      >
                        <option value="">Choose a Class</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    {formik.touched.class_value && formik.errors.class_value && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.class_value}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="basic_fees"
                      >
                        Basic Fees
                      </label>
                      <input
                        id="basic_fees"
                        type="number"
                        value={formik.values.basic_fees}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.basic_fees && formik.errors.basic_fees
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.basic_fees && formik.errors.basic_fees && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.basic_fees}
                      </p>
                    )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="tution_fees"
                      >
                        Tution Fees
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
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="parking_fees"
                      >
                        Parking Fees
                      </label>
                      <input
                        id="parking_fees"
                        type="number"
                        value={formik.values.parking_fees}
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
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="due_date"
                      >
                        Due Date
                      </label>
                      <input
                        id="due_date"
                        type="number"
                        value={formik.values.due_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.due_date &&
                          formik.errors.due_date
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.due_date &&
                      formik.errors.due_date && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.due_date}
                        </p>
                      )}
                  </div>
                </div>

                <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                  Relaxation Information
                  <div className="h-1 bg-gray-700 w-16 my-3"></div>
                </h6>
                <div className="flex flex-wrap mb-5">
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="obc_relaxation"
                      >
                        OBC
                      </label>
                      <input
                        id="obc_relaxation"
                        type="number"
                        value={formik.values.obc_relaxation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.obc_relaxation &&
                          formik.errors.obc_relaxation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.obc_relaxation &&
                      formik.errors.obc_relaxation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.obc_relaxation}
                        </p>
                      )}
                  </div>
                  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="sc_relaxation"
                      >
                        SC
                      </label>
                      <input
                        id="sc_relaxation"
                        type="number"
                        value={formik.values.sc_relaxation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.sc_relaxation &&
                          formik.errors.sc_relaxation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.sc_relaxation &&
                      formik.errors.sc_relaxation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.sc_relaxation}
                        </p>
                      )}
                  </div>  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="ews_relaxation"
                      >
                        EWS
                      </label>
                      <input
                        id="ews_relaxation"
                        type="number"
                        value={formik.values.ews_relaxation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.ews_relaxation &&
                          formik.errors.ews_relaxation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.ews_relaxation &&
                      formik.errors.ews_relaxation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.ews_relaxation}
                        </p>
                      )}
                  </div>  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="bpl_relaxation"
                      >
                        BPL
                      </label>
                      <input
                        id="bpl_relaxation"
                        type="number"
                        value={formik.values.bpl_relaxation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.bpl_relaxation &&
                          formik.errors.bpl_relaxation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.bpl_relaxation &&
                      formik.errors.bpl_relaxation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.bpl_relaxation}
                        </p>
                      )}
                  </div>  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="st_relaxation"
                      >
                        ST
                      </label>
                      <input
                        id="st_relaxation"
                        type="number"
                        value={formik.values.st_relaxation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.st_relaxation &&
                          formik.errors.st_relaxation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.st_relaxation &&
                      formik.errors.st_relaxation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.st_relaxation}
                        </p>
                      )}
                  </div>  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="quota_relaxation"
                      >
                        QUOTA
                      </label>
                      <input
                        id="quota_relaxation"
                        type="number"
                        value={formik.values.quota_relaxation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.quota_relaxation &&
                          formik.errors.quota_relaxation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.quota_relaxation &&
                      formik.errors.quota_relaxation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.quota_relaxation}
                        </p>
                      )}
                  </div>  <div className="w-full lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="other_realxation"
                      >
                        OTHER
                      </label>
                      <input
                        id="other_realxation"
                        type="number"
                        value={formik.values.other_realxation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.other_realxation &&
                          formik.errors.other_realxation
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.other_realxation &&
                      formik.errors.other_realxation && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.other_realxation}
                        </p>
                      )}
                  </div>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300 py-3" />


                <div className="mx-3 flex justify-start">
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
        )}
      </div>
    </section>
  );
};

export default CreateFeeStructure;
