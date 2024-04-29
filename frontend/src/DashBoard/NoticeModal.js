import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addNotice, clearMessages, clearErrors } from "../redux/noticeSlice";
import ErrorAlert from "../BaseFiles/ErrorAlert";

import SuccessAlert from "../BaseFiles/SuccessAlert";
const NoticeModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.notices);
  const initialValues = {
    title: "",
    text: "",
    file: null,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    text: Yup.string().required("Description is required"),
    file: Yup.string().required("file is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("title", values.title);
      formData.append("text", values.text);
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      formData.append("date", currentDate);
      formData.append("time", currentTime);
      dispatch(addNotice(formData));
    },
  });
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearErrors());
      }, 3000);
    }
    if (message) {
   
      setTimeout(() => {
        dispatch(clearMessages());
        onClose()
      }, 3000);
    }
  }, [error, message, formik,]);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Notice</h2>
            {message && <SuccessAlert message={message} />}

            {error && <ErrorAlert error={error} />}
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 tracking-widest text-xs mt-2">
                    {formik.errors.title}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="text" className="block text-gray-700">
                  Content:
                </label>
                <textarea
                  id="text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                ></textarea>
                {formik.touched.text && formik.errors.text && (
                  <p className="text-red-500 tracking-widest text-xs mt-2">
                    {formik.errors.text}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block text-gray-700">
                  Upload File:
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(event) => {
                    formik.setFieldValue("file", event.currentTarget.files[0]);
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NoticeModal;
