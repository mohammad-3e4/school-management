import { FaAngleDown, FaArrowsRotate, FaXmark } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  addNewBook,
  clearError,
  clearMessages,
  uploadBooks
} from "../../redux/librarySlice";
import { useSelector, useDispatch } from "react-redux";
import { booksValues } from "../InitialValues";
import { bookValidation } from "../validation";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import Loader from "../../BaseFiles/Loader";
import { FiUpload } from "react-icons/fi";
const AddBooks = () => {
  const { loading, error, message } = useSelector((state) => state.library);
  const [rotate, setRotate] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  const formik = useFormik({
    initialValues: booksValues,
    validationSchema: bookValidation,
    onSubmit: async (values) => {
      console.log(values);
      dispatch(addNewBook(values));
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("data", selectedFile);
      dispatch(uploadBooks({ formData }));
    }
  };
  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1 m-auto w-[98%]">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          Add New Book
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
        <div className="w-full">
            <div className="relative w-full">
              <div className="relative">
                <input
                  id="file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className={`border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                />
                <span
                  onClick={handleUpload}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
                >
                  <FiUpload
                    className="h-6 w-6 cursor-pointer text-green-600"
                    aria-hidden="true"
                    title="upload csv"
                  />
                </span>
              </div>
            </div>
          </div>
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
      style={{width:'98%'}}
        className={`flex bg-white justify-center m-auto ${
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
                          formik.touched.book_name &&
                          formik.errors.book_name
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.book_name &&
                      formik.errors.book_name && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.book_name}
                        </p>
                      )}
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="quantity"
                      >
                        Quantity
                      </label>
                      <input
                        id="quantity"
                        type="number"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.quantity &&
                          formik.errors.quantity
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.quantity &&
                      formik.errors.quantity && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.quantity}
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
                          formik.touched.price &&
                          formik.errors.price
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.price &&
                      formik.errors.price && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.price}
                        </p>
                      )}
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="row"
                      >
                        Row
                      </label>
                      <input
                        id="row_no"
                        type="text"
                        name="row_no"
                        value={formik.values.row_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.row_no &&
                          formik.errors.row_no
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.row_no &&
                      formik.errors.row_no && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.row_no}
                        </p>
                      )}
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="section"
                      >
                        Section
                      </label>
                      <input
                        id="section"
                        type="text"
                        name="section"
                        value={formik.values.section}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 ${
                          formik.touched.section &&
                          formik.errors.section
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {formik.touched.section &&
                      formik.errors.section && (
                        <p className="text-red-500 text-xs mt-1">
                          {formik.errors.section}
                        </p>
                      )}
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="subject"
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        className="border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150  "
                      />
                    </div>
                  </div>
                  <div className="w-full  lg:w-3/12 px-2">
                    <div className="relative w-full mb-3">
                      <label
                        className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                        htmlFor="class_name"
                      >
                        Class
                      </label>
                      <input
                        id="class_name"
                        type="text"
                        name="class_name"
                        value={formik.values.class_name}
                        onChange={formik.handleChange}
                        className="border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150  "
                      />
                    </div>
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
                    onClick={()=>formik.resetForm()}
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

export default AddBooks;
