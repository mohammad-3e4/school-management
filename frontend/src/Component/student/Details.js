import React from "react";
import Loader from "../../BaseFiles/Loader";
import {
  FaAngleDown,
  FaArrowsRotate,
  FaXmark,
  FaCheck,
  FaPen,
} from "react-icons/fa6";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { useFormik } from "formik";
import {
  clearErrors,
  clearMessage,
  getStudentById,
  uploadDocuments,
  getDocumentsById,
  deleteDocument,
  updateStudent,
} from "../../redux/studentSlice";
import { addStudentValues } from "../InitialValues";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDoumentName] = useState("");

  const [editable, setEditable] = useState(false);

  const [rotate, setRotate] = useState(false);
  const { loading, error, message, student, documents } = useSelector(
    (state) => state.student
  );
  const { user } = useSelector((state) => state.user);

  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };
  useEffect(() => {
    dispatch(getStudentById(id));
    if (user.role === "admin") {
      dispatch(getDocumentsById(id));
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
  }, [dispatch, error, message]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("document_name", documentName);
      dispatch(uploadDocuments({ id, formData }));
    }
  };
  const handleDownload = (imageUrl) => {
    if (documents) {
      console.log(imageUrl);
      console.log(`/${imageUrl}/${documents[imageUrl]}`);
      const anchor = document.createElement("a");
      anchor.href = `/${imageUrl}/${documents[imageUrl]}`;
      anchor.download = documents[imageUrl];
      anchor.click();
      URL.revokeObjectURL(anchor.href);
    }

    // Clean up
  };

  const formik = useFormik({
    initialValues: addStudentValues,
    onSubmit: (values) => {
      const filteredData = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== "" && value !== null
        )
      );
      if (Object.keys(filteredData).length > 0) {
        dispatch(
          updateStudent({
            studentId: student.student_id,
            updatedData: filteredData,
          })
        );
      } else {
        alert("No Changes were made");
      }
      setEditable(false);
    },
  });
  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1 w-[98%] m-auto">
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
          <FaXmark
            className="text-red-700 cursor-pointer"
            onClick={() => navigate("/all/students")}
          />
        </div>
      </div>
      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}
      <div
        className={`flex bg-white justify-center w-[98%] m-auto ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full  px-4 mt-4 py-4 bg-white mb-10">
            <div className="h-auto text-sm tracking-wide ">
              <div className="flex justify-end gap-5 py-2">
                {editable ? (
                  <FaCheck
                    className="text-green-700 w-4 h-4 cursor-pointer"
                    onClick={formik.handleSubmit}
                  />
                ) : (
                  <FaPen
                    className="text-gray-700 w-4 h-4 cursor-pointer"
                    onClick={() => setEditable(true)}
                  />
                )}
                <FaXmark
                  className="text-red-700 w-5 h-5 cursor-pointer"
                  onClick={() => setEditable(false)}
                />
              </div>
              <div className="flex">
                <div className="w-1/4 ">
                  <img className="w-28" src="/default_male.png" />
                </div>
                <div className="flex w-2/4  justify-between mx-5 ">
                  <div className="w-1/2 ml-12 font-sans">
                    <ul className="">
                      <li className="p-1 ">
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                          Name
                        </span>
                      </li>
                      <li className="p-1">
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                          Gender
                        </span>
                      </li>
                      <li className="p-1">
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                          Father Name
                        </span>
                      </li>
                      <li className="p-1">
                        {" "}
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                          Mother Name
                        </span>
                      </li>
                      <li className="p-1">
                        {" "}
                        <span className=" bg-gray-500 rounded-full text-white px-4">
                          Date of Birth
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="w-1/2 capitalize font-sans font-semibold text-gray-700">
                    <ul>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="student_name"
                                onChange={formik.handleChange}
                                defaultValue={student.student_name}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <li className="p-1">{student?.student_name}</li>
                      )}
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="gender"
                                onChange={formik.handleChange}
                                defaultValue={student?.gender}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <li className="p-1">{student?.gender}</li>
                      )}
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="father_name"
                                onChange={formik.handleChange}
                                defaultValue={student?.father_name}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <li className="p-1">{student?.father_name}</li>
                      )}
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="mother_name"
                                onChange={formik.handleChange}
                                defaultValue={student?.mother_name}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <li className="p-1">{student?.mother_name}</li>
                      )}
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="date_of_birth"
                                onChange={formik.handleChange}
                                defaultValue={new Date(
                                  student?.date_of_birth
                                ).toLocaleDateString()}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <li className="p-1">
                          {" "}
                          {new Date(
                            student?.date_of_birth
                          ).toLocaleDateString()}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className="flex w-1/4  justify-between mx-5 ">
                  <div className="mb-5">
                    <div className="w-full  px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                          htmlFor="document_name"
                        >
                          document name
                        </label>
                        <select
                          id="document_name"
                          type="text"
                          onChange={(e) => setDoumentName(e.target.value)}
                          className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                        >
                          <option value="">Choose one</option>
                          <option value="aadhaar_card">Aadhar Card</option>
                          <option value="last_mark_sheet">Mark Sheet</option>
                          <option value="character_certificate">
                            Character certificate
                          </option>
                          <option value="cast_certificate">
                            Caste Certificate
                          </option>
                          <option value="parents_aadhaar_card">
                            Parents Id
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="w-full  px-2">
                      <div className="relative w-full mb-3">
                        <label
                          className="block capitalize tracking-widest text-gray-600  text-xs font-bold mb-2"
                          htmlFor="documents"
                        >
                          Upload (PDF and Images only)
                        </label>

                        <div className="mt-2 relative">
                          <input
                            id="documents"
                            type="file"
                            accept=".pdf, image/*"
                            onChange={handleFileChange}
                            className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                          />
                          <span
                            onClick={handleUpload}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer"
                          >
                            <FiUpload
                              className="h-6 w-6 cursor-pointer text-green-600"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-10" />
              <div className="flex flex-wrap md:flex-nowrap">
                <div className="flex w-1/4 justify-between m-1 text-xs border-r-4 ">
                  <ul className="text-end px-3 w-full">
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Email:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="email"
                                id="email"
                                onChange={formik.handleChange}
                                defaultValue={student?.email}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.email
                      )}
                    </li>

                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Admission date:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="date_of_admission"
                                onChange={formik.handleChange}
                                defaultValue={new Date(
                                  student?.date_of_admission
                                ).toLocaleDateString()}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        new Date(
                          student?.date_of_admission
                        ).toLocaleDateString()
                      )}
                    </li>
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Class:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="class_name"
                                onChange={formik.handleChange}
                                defaultValue={student?.class_name}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.class_name
                      )}
                    </li>
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Address:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="address"
                                onChange={formik.handleChange}
                                defaultValue={student?.address}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.address
                      )}
                    </li>
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Phone:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="phone"
                                onChange={formik.handleChange}
                                defaultValue={student?.phone}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.phone
                      )}
                    </li>
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Religion:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="religion"
                                onChange={formik.handleChange}
                                defaultValue={student?.religion}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.religion
                      )}
                    </li>
                  </ul>
                </div>
                <div className="flex w-1/4 justify-between m-1 text-xs border-r-4 ">
                  <ul className="text-end px-3 w-full">
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Admission No:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="admission_no"
                                onChange={formik.handleChange}
                                defaultValue={student?.admission_no}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.admission_no
                      )}
                    </li>

                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Roll no:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="roll_no"
                                onChange={formik.handleChange}
                                defaultValue={student?.roll_no}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.roll_no
                      )}
                    </li>
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Category:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="reserve_category"
                                onChange={formik.handleChange}
                                defaultValue={student?.reserve_category}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.reserve_category
                      )}
                    </li>
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Alt Phone:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="alternative_phone_no"
                                onChange={formik.handleChange}
                                defaultValue={student?.alternative_phone_no}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.alternative_phone_no
                      )}
                    </li>
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Father occupation:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="father_occupation"
                                onChange={formik.handleChange}
                                defaultValue={student?.father_occupation}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.father_occupation
                      )}
                    </li>
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>mother occupation:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="mother_occupation"
                                onChange={formik.handleChange}
                                defaultValue={student?.mother_occupation}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.mother_occupation
                      )}
                    </li>
                  </ul>
                </div>
                <div className="flex w-1/4 justify-between m-1 text-xs border-r-4 ">
                  <ul className="text-end px-3 w-full">
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Quota:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="quota"
                                onChange={formik.handleChange}
                                defaultValue={student?.quota}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.quota || "-"
                      )}
                    </li>

                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>Height:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="height"
                                onChange={formik.handleChange}
                                defaultValue={student?.height}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.height || 6
                      )}
                    </li>
                    <li className="p-1 flex gap-5 items-center justify-between">
                      <strong>weight:</strong>
                      {editable ? (
                        <div className="w-full">
                          <div className="relative w-full mb-1">
                            <div className=" relative">
                              <input
                                type="text"
                                id="weight"
                                onChange={formik.handleChange}
                                defaultValue={student?.weight}
                                className={`border-0 px-3 py-1 placeholder-blueGray-300 font-normal  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 `}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        student?.weight || 50
                      )}
                    </li>
                  </ul>
                </div>

                <div className="flex w-1/4 justify-between capitalize mx-5 my-2 text-xs ">
                  <ul className="font-semibold">
                    {documents &&
                      Object.keys(documents)?.map(
                        (key, index) =>
                          key !== "student_id" &&
                          key !== "photo" && (
                            <li
                              className={`p-1 ${
                                documents[key] === null
                                  ? "text-gray-400"
                                  : "cursor-pointer hover:underline text-blue-400"
                              }`}
                              onClick={() =>
                                documents[key] !== null && handleDownload(key)
                              }
                              key={index}
                            >
                              {key.replaceAll("_", " ")}
                            </li>
                          )
                      )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Details;
