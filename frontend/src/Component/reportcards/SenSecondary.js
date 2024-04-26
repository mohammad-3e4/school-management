import { useParams } from "react-router-dom";
import { getStudentById } from "../../redux/studentSlice";
import {
  clearErrors,
  clearMessage,
  getMarksByStudentId,getMaxMarks
} from "../../redux/marksSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import schoollogo from "./schoollogo.png";
import cbselogo from "./cbse-logo.png";

export default function SenSecondary() {
  const { loading, error, message, student } = useSelector(
    (state) => state.student
  );
  const { studentMark ,maxMarks} = useSelector((state) => state.marks);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getStudentById(id));
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
    // Ensure that the effect cleanup is handled properly
    return () => {
      dispatch(clearErrors());
      dispatch(clearMessage());
    };
  }, [dispatch, error, message, id]);
  useEffect(()=>{
    if(student && student?.class_name){
     let class_name=student?.class_name
     let section =student?.section
     dispatch(getMarksByStudentId({ id, class_name, section}));
     dispatch(getMaxMarks(student.class_name));
    } 
   },[dispatch,id, student?.class_name, student?.section])
  const calculateOverallTotal = () => {
    let t1_overallTotal = 0;
    let totalOutOf = 0;
    let fail_total = false;
    let Result;

    studentMark
      ?.filter((dataRow) => dataRow.subject_name.toLowerCase() !== "overall" && dataRow.subject_name !== "IT")
      ?.forEach((reportCard) => {
        let obtain = reportCard?.grand_total || 0;
        let total = parseInt(obtain);
        let totalOutOfLocal = 100;

        if (obtain > 32) {
          t1_overallTotal += total;
        } else {
          fail_total = true;
        }
        totalOutOf += totalOutOfLocal;
      });

    let t1_percentage = ((t1_overallTotal / totalOutOf) * 100).toFixed(2);

    let t1_grade;
    if (t1_percentage >= 90) {
      t1_grade = "A1";
    } else if (t1_percentage >= 81) {
      t1_grade = "A2";
    } else if (t1_percentage >= 71) {
      t1_grade = "B1";
    } else if (t1_percentage >= 61) {
      t1_grade = "B2";
    } else if (t1_percentage >= 51) {
      t1_grade = "C1";
    } else if (t1_percentage >= 41) {
      t1_grade = "C2";
    } else if (t1_percentage >= 34) {
      t1_grade = "D";
    } else {
      t1_grade = "E";
    }

    

    if (fail_total) {
      totalOutOf = "-";
      t1_overallTotal = "-";
      t1_percentage = "-";
      t1_grade = "-";
      Result = "Essential Repeat";
    } else {
      Result = `Promoted to ${Number(student?.class_name) + 1}th class`;
    }

    return {
      totalOutOf,
      t1_overallTotal,
      t1_percentage,
      t1_grade,
      Result,
    };
  };

  const overallData = calculateOverallTotal();
  console.log(student)
  console.log(studentMark)


  let thds;


  thds =[ "theory_max" ,"theory_obt" ,"practical_max" ,"practical_obt","grand_total","final_grade"]
  const mergedData = studentMark?.map(mark => {
      // Find the corresponding maxMark object for the current subject name
      const maxMark = maxMarks?.find(maxmark => maxmark.subject_name === mark.subject_name);
    
      // Create a new object with the required properties
      return {
        subject_name: mark.subject_name,
        theory_max: maxMark ? maxMark.theory_max : null,
        theory_obt: mark.theory_obt,
        practical_max: maxMark ? maxMark.practical_max : null,
        practical_obt: mark.practical_obt,
        grand_total: mark.grand_total,
        final_grade: mark.final_grade
      };
    });




  return (
    <>
      {/* /////////////////header////////////////////////////// */}
      <div className="border-2 border-gray-900 p-1">
        <div className="flex w-full ">
          <div className="w-2/12">
            {" "}
            <img className=" mx-auto pt-5" height="80px" width="120px" src={schoollogo} />
          </div>
          <div className="text-center px-12 py-5 w-8/12 ">
            <span className="text-2xl font-bold">REPORT CARD</span>
            <br />
            <span className="text-3xl font-semibold">
              Guru Nanak Khalsa Senior Secondary School
            </span>
            <br />
            (Affiliated to CBSE, Affiliation No - 2630003) <br />
            Sector 30B, Chandigarh (UT), Phone: 0172-2654693 <br />
            <div className="flex ">
            <span className="mx-auto">
              Email: gurunanak_30b@rediffmail.com
            </span>
            <span className="mx-auto">
              {" "}
              Website: www.gnkschool.info
            </span></div>
          </div>

          <div className="w-2/12 ">
            <img className=" mx-auto pt-5" height="80px" width="120px" src={cbselogo} />
          </div>
        </div>
        <div className="bg-pink-500 h-1 w-full mt-2"></div>
        {/* //////////////////////// header //////////////////////////// */}
        {/* //////////////////////// student detail //////////////////////////// */}
        <div className="text-md mt-2">
          <div className="flex justify-around px-32 py-5 border-2 border-gray-900">
            <div className="col capitalize ">
              <ul>
                <li className="flex items-center mb-2">
                  <span className="w-32 font-semibold">Student's Name</span>
                  <span>: {student?.student_name}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-32 font-semibold">Class & Section</span>
                  <span>: {student?.class_name + "-" + student?.section}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-32 font-semibold">Roll No.</span>
                  <span>: {student?.roll_no}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-32 font-semibold">Admission No.</span>
                  <span>: {student?.admission_no}</span>
                </li>
              </ul>
            </div>
            <div className="col">
              <ul>
                <li className="flex items-center mb-2">
                  <span className="w-32 font-semibold">Date of Birth</span>
                  <span>: {student?.date_of_birth}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-32 font-semibold">Father's Name</span>
                  <span>: {student?.father_name}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-32 font-semibold">Mother's Name</span>
                  <span>: {student?.mother_name}</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="w-32 font-semibold">Session</span>
                  <span>: 2023-2024</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* //////////////////////// student detail //////////////////////////// */}

        {/* //////////////////////// makrs detail //////////////////////////// */}
        <div>
          <h2 className="text-center font-semibold text-red-500 mt-3">
            Part:1 Scholastic Area{" "}
          </h2>
          <table className="w-full text-sm mytable">
            <thead>
             
              <tr className="text-center bg-green-500 text-white">
                {" "}
                <th rowSpan={2} className="w-1/13 bg-yellow-500 font-semibold text-left p-2 text-black">
                  Subject{" "}
                </th>
                <th className="w-1/13"> Theory Max</th>
                <th className="w-1/13"> Theory Obt</th>
                <th className="w-1/13"> Practical Max</th>
                <th className="w-1/13"> Practical Obt</th>
                <th className="w-1/13"> Overall Max</th>
                <th className="w-1/13"> Overall Obt</th>
                <th className="w-1/13"> Grade</th>
              </tr>
            </thead>
            <tbody>
                {mergedData
                    ?.filter(
                        (dataRow) => dataRow.subject_name.toLowerCase() !== "overall" && dataRow.subject_name.toLowerCase() !== "it"
                    )
                    ?.map((dataRow, index) => (
                  <tr className="capitalize text-center text-sm" key={index}>
                    <td className="uppercase text-left p-2 bg-yellow-500 font-semibold">
                      {dataRow.subject_name}
                    </td>
                    <td>{dataRow.theory_max}</td>
                    <td>{dataRow.theory_obt}</td>
                    <td>{dataRow.practical_max}</td>
                    <td>{dataRow.practical_obt}</td>
                    <td>{Number(dataRow.theory_max) + Number(dataRow.practical_max)}</td>
                    <td>{dataRow.grand_total}</td>
                    <td>{dataRow.final_grade}</td>
                
                  </tr>
                ))}

                {studentMark
                    ?.filter(
                        (dataRow) => dataRow.subject_name.toLowerCase() == "it"
                    )
                    ?.map((dataRow, index) => (
                  <tr className="capitalize text-center  ">
                        <td className=" uppercase text-left p-2 bg-yellow-500 font-semibold" >
                        INFORMATION TECHNOLOGY</td>
                        <td colSpan="3">Theory Marks :  {(dataRow.theory_obt) || ""}/{(dataRow.theory_max) || ""} </td>
                        <td colSpan="3"> practical Marks  :  {dataRow.practical_obt || ""}/{dataRow.practical_max || ""} </td>
                        <td colSpan="3"> Total Marks  :  { (parseInt(dataRow?.theory_obt) + parseInt(dataRow?.practical_obt))  || ""}/{(parseInt(dataRow?.theory_max) + parseInt(dataRow?.practical_max))  || ""} </td>
                        
                      </tr>    ))}

              <tr className="text-center font-semibold">
                <td className="uppercase text-left p-2 bg-yellow-500 ">
                  {" "}
                  Total
                </td>
                <td colSpan={3} className="bg-green-500 text-white">
                  Marks : {overallData.t1_overallTotal} /{" "}
                  {overallData.totalOutOf}
                </td>

                <td colSpan={3} className="bg-green-500 text-white">
                  {" "}
                  Percentage : {overallData.t1_percentage}
                </td>
                <td colSpan={2} className="bg-green-500 text-white">
                  Grade : {overallData.t1_grade}
                </td>
  
              </tr>
            </tbody>
          </table>
        </div>
        {/* //////////////////////// marks detail //////////////////////////// */}

     
        {/* //////////////////////// Result and attendance detail //////////////////////////// */}
        <div className="mt-2">
          <table className="w-full text-sm mytable">
            <tbody className="text-center">
              <tr className="text-center  bg-green-500 text-white ">
                {" "}
                <th  className="p-2 w-1/3">
                  {" "}
                  Term-1 Attendance
                </th>
                <th className="w-1/3"> Result</th>
                <th className="w-1/3"> Date</th>
              </tr>
              <tr className="text-center">
                {" "}
                <td className="w-1/4 p-2">852</td>
                <td className="w-1/4"> {overallData.Result}</td>
                <td className="w-1/4"> 30/03/2024</td>

              </tr>

               
            </tbody>
          </table>
        </div>
        {/* //////////////////////// Result and attendance detail  //////////////////////////// */}
        {/* //////////////////////// sign detail  //////////////////////////// */}
        <div className="flex justify-between text-center px-12 pt-32 font-semibold">
          <span>Class Teacher</span>
          <span>Principal / Headmistress</span>
          <span>Parent</span>
        </div>
        {/* //////////////////////// sign detail  //////////////////////////// */}
     
      </div>
    </>
  );
}
