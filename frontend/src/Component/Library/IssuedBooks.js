import { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleDown, FaArrowsRotate, FaXmark, FaEye } from "react-icons/fa6";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import {useSelector, useDispatch} from 'react-redux'
import {getIssuedBooks, clearError, clearMessages} from '../../redux/librarySlice'

export default function IssuedBooks() {
  const dispatch = useDispatch();
  const {issuedBooks, loading, error, message} = useSelector((state)=>state.library)
  const [books, setBooks] = useState([]);
  const [rotate, setRotate] = useState(false);

  const handleRefresh = () => {
    setRotate(true);
    setTimeout(() => {
      setRotate(false);
    }, 1000);
  };

  const currentUrl = window.location.href;
  const thds = [
    "Book Name",
    "Student Admission No.",
    "Issued Date",
    "Return Date",
    "Price",
    "Day",
    "Action",
  ];

  useEffect(() => {
   dispatch(getIssuedBooks())
  }, [dispatch]);



  return (
    <>
      <div className="flex flex-wrap justify-between shadow bg-white py-2 mb-1 m-auto w-[98%]">
        <h6 className="text-gray-700 text-xl capitalize font-semibold font-sans px-4 tracking-wider w-1/2">
          {`${currentUrl.split("/")[3]}  ${currentUrl.split("/")[4]}`}
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
      <div>
        <table className="flex-auto m-auto w-[98%] pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow px-4 mx-auto  bg-white">
          <thead className="text-xs  text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {thds.map((heading, index) => (
                <th
                  scope="col"
                  key={index}
                  className={`py-4  text-xs border-b-2 ${
                    index === 0 ? "px-2" : "px-2"
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {issuedBooks?.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-2 py-2">{item.book_name}</td>
                <td className="px-2 py-2">{item.student_id}</td>
                <td className="px-2 py-2">{item.issue_date}</td>
                <td className="px-2 py-2">{item.return_date}</td>
                <td className="px-2 py-2">{item.price}</td>
                <td className="px-2 py-2">{item.day}</td>
                <td className="px-2 py-4 flex gap-3 items-center ">
                  <FaEye className="h-4 w-4 cursor-pointer" title="Details" />
                  <BsPencilSquare
                    className="h-4 w-4 text-green-700 cursor-pointer"
                    title="Edit"
                  />
                  <FaRegTrashAlt
                    className="h-4 w-4 text-red-700 cursor-pointer"
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
