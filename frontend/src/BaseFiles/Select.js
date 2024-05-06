import { getClasses, setClassOrSubject } from "../redux/classesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import setClassOrSubject from "../redux/classesSlice"
const Select = ({ checkSubject, isSelect = true }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState();
  const [data, setData] = useState([{ class_name: "" }]);
  const { classes, loading } = useSelector((state) => state.classes);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      let filterKeysWithValueYes;
      const fetchData = async (classes) => {
        setData(classes);
        try {
          if (classes && classes.length > 0) {
            if (user.role === "admin") {
              filterKeysWithValueYes = (item) => ({
                classvalue: item.class_value,
                class_name: item.class_name,
                subjects: Object.keys(item).filter(
                  (key) =>
                    key !== "class_name" &&
                    key !== "class_value" &&
                    key !== "class_id" &&
                    item[key] !== "no"
                ),
              });
            } else if (user.role === "teacher") {
              filterKeysWithValueYes = (item) => ({
                classvalue: item.class_value,
                class_name: item.class_name,
                subjects: Object.keys(item).filter(
                  (key) =>
                    key !== "class_name" &&
                    key !== "class_id" &&
                    item[key] == user.staff_id
                ),
              });
            }

            const filteredData = classes
              .map(filterKeysWithValueYes)
              .filter((item) => item.subjects.length > 0);

            setData(filteredData);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData(classes);
    }
  }, [loading, user]);

  useEffect(() => {
    if (selectedClass) {
      data.forEach((item) => {
        if (item.class_name === selectedClass) {
          setSubjects(item.subjects);
        }
      });
    }
  }, [selectedClass, data]);
  useEffect(() => {
    if (selectedClass) {
      dispatch(setClassOrSubject({ selectedClass, selectedSubject }));
    }
  }, [dispatch, selectedClass, selectedSubject]);
  
  return (
    <>
      <div className="flex items-center space-x-4 jus">
        <div>
          <select
            id="classSelect"
            value={selectedClass ? selectedClass.class_value : ""}
            onChange={(e) => setSelectedClass(e.target.value)}
            className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150`}
            style={{ width: "150px" }} // Set the desired width
          >
            {user.role === "admin" && isSelect && (
              <option value="undefined">All Students</option>
            )}

            {data?.map((classes) => (
              <>
                <option key={classes.class_name} value={classes.class_value}>
                  {classes.class_name}
                </option>
              </>
            ))}
          </select>
        </div>

        {selectedClass && checkSubject && (
          <div>
            <select
              id="subjectSelect"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`border-0 px-3 py-2 placeholder-blueGray-300  focus:bg-white text-gray-600  bg-gray-200 rounded-sm text-sm shadow focus:outline-none  w-full ease-linear transition-all duration-150`}
              style={{ width: "200px" }} 
            >
              <option value="">select subject</option>
              {subjects?.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
};
export default Select;
