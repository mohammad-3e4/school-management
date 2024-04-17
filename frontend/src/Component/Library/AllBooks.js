import { useEffect, useState, useCallback } from "react";
import {
  FaAngleDown,
  FaEye,
  FaArrowsRotate,
  FaXmark,
  FaCheck,
  FaGear,
 
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { useFormik } from "formik";
import {
  getBooks,
  clearError,
  clearMessages,
  updateBook,
  deleteBook,
} from "../../redux/librarySlice";
import { useSelector, useDispatch } from "react-redux";
import { booksValues } from "../InitialValues";
import SuccessAlert from "../../BaseFiles/SuccessAlert";
import ErrorAlert from "../../BaseFiles/ErrorAlert";
import Loader from "../../BaseFiles/Loader";
import { Link } from "react-router-dom";
export default function AllBooks() {
  const { loading, error, message, books } = useSelector(
    (state) => state.library
  );
  const [rotate, setRotate] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [search, setSearchQuery] = useState('');
  const [allBooks, setAllBooks] = useState('');
  const [selectedBook, setSelectedBook] = useState('')

  const dispatch = useDispatch();
  const handleRefresh = () => {
    dispatch(getBooks());
    // setRotate(true);
    // setTimeout(() => {
    //   setRotate(false);
    // }, 1000);
  };

  const formik = useFormik({
    initialValues: booksValues,
    onSubmit: async (values) => {
      const filteredData = Object.fromEntries(
        Object.entries(values).filter(
          ([key, value]) => value !== "" && value !== null
        )
      );
      console.log(Object.keys(filteredData).length);
      if (Object.keys(filteredData).length > 0) {
        dispatch(
          updateBook({ bookId: editBook.book_id, values: filteredData })
        );
      } else {
        alert("No changes were made");
      }
    },
  });

  const currentUrl = window.location.href;
  const thds = [
    "Book Name",
    "Quantity",
    "Price",
    "Row",
    "Section",
    "Subject",
    "Class",
    "Action",
  ];

  const handleEdit = (book) => {
    setEditMode(true);
    setEditBook(book);
  };
  useEffect(() => {
    setAllBooks(books)
    dispatch(getBooks());
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
    if (message) {
      setEditMode(false);
      setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
    }
  }, [error, message, dispatch,]);
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditBook(null);
  };

  
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setAllBooks(
      books.filter((book) => book.book_name.toLowerCase().includes(query))
    );
    setSearchQuery(query);
  };
  return (
    <section className="py-1  w-full m-auto">
      <div className="flex flex-wrap justify-between bg-white py-2 mb-1 m-auto w-[98%]">
        <h6 className="text-gray-700 text-xl font-semibold font-sans px-4 tracking-wider w-1/2">
          All Books
        </h6>
        <div className="w-1/2 flex gap-5 justify-end px-4 items-center">
        <div className="w-full px-2">
            <div className="relative w-full">
              <input
                id="search"
                name="search"
                placeholder="search..."
                value={search}
                onInput={(e) => handleSearch(e)}
                type="text"
                className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150 border-red-500`}
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-600 cursor-pointer">
                <FaSearch
                  className="h-4 w-4 text-gray-600"
                  aria-hidden="true"
                />
              </span>
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
        className={`flex bg-white justify-center m-auto w-[98%] ${
          loading ? "h-[560px] items-center" : "h-full"
        }`}
      >
        {loading ? (
          <Loader />
        ) : (
          <table className="flex-auto  pb-10 pt-0 text-xs text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow   px-4 mx-auto  bg-white">
            <thead className="text-xs  text-gray-700 capitalize bg-white dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {thds.map((heading, index) => (
                  <th
                    scope="col"
                    key={index}
                    className={`py-4  text-xs border-b-2 ${
                      index === 0 ? "px-4" : "px-2"
                    }`}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {books?.length == 0 || books === null ? (
                <div className="text-center py-5">No data found</div>
              ) : (
                books?.map((book, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="col"
                      className="px-2 py-2"
                      style={{ width: `${100 / thds.length}%` }}
                    >
                      {editMode &&
                      editBook &&
                      editBook.book_id === book.book_id ? (
                        <input
                          id="book_name"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={book.book_name}
                        />
                      ) : (
                        <Link to={`/book/details/${book.book_id}`}>
                          {book.book_name}
                        </Link>
                      )}
                    </td>
                    <td
                      scope="col"
                      className="px-2 py-2"
                      style={{ width: `${100 / thds.length}%` }}
                    >
                      {editMode &&
                      editBook &&
                      editBook.book_id === book.book_id ? (
                        <input
                          id="quantity"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={book.quantity}
                        />
                      ) : (
                        book.quantity
                      )}
                    </td>
                    <td
                      scope="col"
                      className="px-2 py-2"
                      style={{ width: `${100 / thds.length}%` }}
                    >
                      {editMode &&
                      editBook &&
                      editBook.book_id === book.book_id ? (
                        <input
                          id="price"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={book.book_name}
                        />
                      ) : (
                        book.price
                      )}
                    </td>
                    <td
                      scope="col"
                      className="px-2 py-2"
                      style={{ width: `${100 / thds.length}%` }}
                    >
                      {editMode &&
                      editBook &&
                      editBook.book_id === book.book_id ? (
                        <input
                          id="row_no"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={book.row_no}
                        />
                      ) : (
                        book.row_no
                      )}
                    </td>
                    <td
                      scope="col"
                      className="px-2 py-2"
                      style={{ width: `${100 / thds.length}%` }}
                    >
                      {editMode &&
                      editBook &&
                      editBook.book_id === book.book_id ? (
                        <input
                          id="section"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={book.section}
                        />
                      ) : (
                        book.section
                      )}
                    </td>
                    <td
                      scope="col"
                      className="px-2 py-2"
                      style={{ width: `${100 / thds.length}%` }}
                    >
                      {editMode &&
                      editBook &&
                      editBook.book_id === book.book_id ? (
                        <input
                          id="subject"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={book.subject}
                        />
                      ) : (
                        book.subject
                      )}
                    </td>
                    <td
                      scope="col"
                      className="px-2 py-2"
                      style={{ width: `${100 / thds.length}%` }}
                    >
                      {editMode &&
                      editBook &&
                      editBook.book_id === book.book_id ? (
                        <input
                          id="class_name"
                          className="border-0 px-3 py-1 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150"
                          type="text"
                          onChange={formik.handleChange}
                          defaultValue={book.class_name}
                        />
                      ) : (
                        book.class_name
                      )}
                    </td>

                    <td className="px-2 py-4 flex gap-3 items-center ">
                      {editMode &&
                      editBook &&
                      editBook.book_id === book.book_id ? (
                        <FaXmark
                          className="h-4 w-4 text-red-700 cursor-pointer"
                          onClick={handleCancelEdit}
                          title="cancel"
                        />
                      ) : (
                        <IoSettingsOutline
                          className="h-4 w-4 cursor-pointer"
                          title="Details"
                          onClick={()=>setSelectedBook(book)}
                        />
                      )}
                      {editMode &&
                      editBook &&
                      editBook.book_id === book.book_id ? (
                        <FaCheck
                          className="h-4 w-4 text-green-700 cursor-pointer"
                          onClick={formik.handleSubmit}
                          title="Submit Changes"
                        />
                      ) : (
                        <BsPencilSquare
                          className="h-4 w-4 text-green-700 cursor-pointer"
                          onClick={() => handleEdit(book)}
                          title="Edit"
                        />
                      )}
                      <FaRegTrashAlt
                        className="h-4 w-4 text-red-700 cursor-pointer"
                        onClick={() => dispatch(deleteBook(book.book_id))}
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
