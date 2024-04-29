import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  clearError,
  clearMessages,
  issueBookToId,
} from "../../redux/librarySlice";
import { useSelector, useDispatch } from "react-redux";
import { issueBooksValues } from "../InitialValues";
import { issueBookValidation } from "../validation";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import Loader from "../../BaseFiles/Loader";
const IssuedForm = () => {
  const [rotate, setRotate] = useState(false);
  const { loading, error, message } = useSelector((state) => state.library);

  const dispatch = useDispatch();
  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  const formik = useFormik({
    initialValues: issueBooksValues,
    validationSchema: issueBookValidation,
    onSubmit: async (values) => {
      dispatch(issueBookToId(values));
    },
  });
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
    if (message) {
      formik.resetForm();
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    }
  }, [error, message, formik, dispatch]);

  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1 m-auto w-[98%]">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Issued Book Form
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
      {error && <ErrorAlert error={error} />}
      {message && <SuccessAlert message={message} />}
      <div
        className={`flex bg-white justify-center m-auto w-[98%]${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full  px-4 mx-auto mt-1 bg-white">
            <div className="flex-auto px-4 py-10 pt-0">
              <form className="py-3" onSubmit={formik.handleSubmit}>
                <h6 className="text-gray-600   text-sm px-2 mt-3 mb-6 font-bold uppercase">
                  Book Information
                  <div className="h-1 bg-gray-700 w-16 my-3"></div>
                </h6>
                <div className="flex flex-wrap mb-5">
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="book_name"
                      >
                        Book Name
                      </label>
                      <input
                        id="book_name"
                        type="text"
                        name="book_name"
                        value={formik.values.book_name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.book_name && formik.errors.book_name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.book_name && formik.errors.book_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.book_name}
                      </p>
                    )}
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="student_admission_no"
                      >
                        Student ID
                      </label>
                      <input
                        id="student_id"
                        type="number"
                        name="student_id"
                        value={formik.values.student_id}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.student_id && formik.errors.student_id
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.student_id && formik.errors.student_id && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.student_id}
                      </p>
                    )}
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="issue_date"
                      >
                        Issue Date
                      </label>
                      <input
                        id="issue_date"
                        type="date"
                        name="issue_date"
                        value={formik.values.issue_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.issue_date && formik.errors.issue_date
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.issue_date && formik.errors.issue_date && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.issue_date}
                      </p>
                    )}
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="return_date"
                      >
                        Return Date
                      </label>
                      <input
                        id="return_date"
                        type="date"
                        name="return_date"
                        value={formik.values.return_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.return_date &&
                          formik.errors.return_date
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.return_date &&
                      formik.errors.return_date && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.return_date}
                        </p>
                      )}
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <input
                        id="price"
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.price && formik.errors.price
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.price && formik.errors.price && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.price}
                      </p>
                    )}
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="day"
                      >
                        Day
                      </label>
                      <input
                        id="day"
                        type="text"
                        name="day"
                        value={formik.values.day}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.day && formik.errors.day
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.day && formik.errors.day && (
                      <p className="text-red-500 text-xs mt-1">
                        {formik.errors.day}
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
                    onClick={() => formik.resetForm()}
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

export default IssuedForm;
