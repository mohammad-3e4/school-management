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

export default function Termtwo() {
  const { loading, error, message, student } = useSelector(
    (state) => state.student
  );
  const { studentMark,maxMarks } = useSelector((state) => state.marks);
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
    let t2_overallTotal = 0;
    let totalOutOf = 0;
    let fail_total = false;
    let Result;

    studentMark
      ?.filter((dataRow) => dataRow.subject_name.toLowerCase() !== "overall")
      ?.forEach((reportCard) => {
        const obtain = reportCard?.total_marks_term1 || 0;
        const obtain2 = reportCard?.total_marks_term2 || 0;
        const total = parseInt(obtain);
        const total2 = parseInt(obtain2);
        const totalOutOfLocal = 100;

        if (obtain > 32 || obtain2 > 32) {
          t1_overallTotal += total;
          t2_overallTotal += total2;
        } else {
          fail_total = true;
        }
        totalOutOf += totalOutOfLocal;
      });

    const t1_percentage = ((t1_overallTotal / totalOutOf) * 100).toFixed(2);
    const t2_percentage = ((t2_overallTotal / totalOutOf) * 100).toFixed(2);

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

    let t2_grade;
    if (t2_percentage >= 90) {
      t2_grade = "A1";
    } else if (t2_percentage >= 81) {
      t2_grade = "A2";
    } else if (t2_percentage >= 71) {
      t2_grade = "B1";
    } else if (t2_percentage >= 61) {
      t2_grade = "B2";
    } else if (t2_percentage >= 51) {
      t2_grade = "C1";
    } else if (t2_percentage >= 41) {
      t2_grade = "C2";
    } else if (t2_percentage >= 34) {
      t2_grade = "D";
    } else {
      t2_grade = "E";
    }

    if (fail_total) {
      totalOutOf = "-";
      t1_overallTotal = "-";
      t1_percentage = "-";
      t1_grade = "-";
      t2_overallTotal = "-";
      t2_percentage = "-";
      t2_grade = "-";
      Result = "Essential Repeat";
    } else {
      Result = `Promoted to ${Number(student?.class_name) + 1}th class`;
    }

    return {
      totalOutOf,
      t1_overallTotal,
      t1_percentage,
      t1_grade,
      t2_overallTotal,
      t2_percentage,
      t2_grade,
      Result,
    };
  };

  const overallData = calculateOverallTotal();
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
              <tr className="text-center  text-white ">
                <th className="bg-yellow-500"></th>
                <th colSpan={6} className="w-6/13 bg-green-500">
                  TERM-1
                </th>
                <th colSpan={6} className="w-6/13 bg-blue-500">
                  TERM-2
                </th>
              </tr>
              <tr className="text-center bg-green-500 text-white">
                {" "}
                <th className="w-1/13 bg-yellow-500 font-semibold text-left p-2 text-black">
                  Subject{" "}
                </th>
                <th className="w-1/13"> Periodic test {maxMarks?.[0].weightage_term1}</th>
                <th className="w-1/13"> Note Book {maxMarks?.[0].portfoilo_term1}</th>
                <th className="w-1/13"> Sub. Enrichment {maxMarks?.[0].sub_enrich_act_term1}</th>
                <th className="w-1/13"> Half Yearly {maxMarks?.[0].hly_exam_term1} </th>
                <th className="w-1/13"> Total {maxMarks?.[0].total_marks_term1}</th>
                <th className="w-1/13"> Grade</th>
                <th className="w-1/13 bg-blue-500"> Periodic test {maxMarks?.[0].weightage_term2}</th>
                <th className="w-1/13 bg-blue-500"> Note Book {maxMarks?.[0].portfoilo_term2}</th>
                <th className="w-1/13 bg-blue-500"> Sub. Enrichment {maxMarks?.[0].sub_enrich_act_term2}</th>
                <th className="w-1/13 bg-blue-500"> Yearly {maxMarks?.[0].annual_exam_term2} </th>
                <th className="w-1/13 bg-blue-500"> Total {maxMarks?.[0].total_marks_term2}</th>
                <th className="w-1/13 bg-blue-500"> Grade</th>
              </tr>
            </thead>
            <tbody>
              {studentMark
                ?.filter(
                  (dataRow) => dataRow.subject_name.toLowerCase() !== "overall"
                )
                ?.map((dataRow, index) => (
                  <tr className="capitalize text-center text-sm" key={index}>
                    <td className="uppercase text-left p-2 bg-yellow-500 font-semibold">
                      {dataRow.subject_name}
                    </td>
                    <td>{dataRow.weightage_term1}</td>
                    <td>{dataRow.portfoilo_term1}</td>
                    <td>{dataRow.sub_enrich_act_term1}</td>
                    <td>{dataRow.hly_exam_term1}</td>
                    <td>{dataRow.total_marks_term1}</td>
                    <td>{dataRow.final_grade_term1}</td>
                    <td>{dataRow.weightage_term2}</td>
                    <td>{dataRow.portfoilo_term2}</td>
                    <td>{dataRow.sub_enrich_act_term2}</td>
                    <td>{dataRow.annual_exam_term2}</td>
                    <td>{dataRow.total_marks_term2}</td>
                    <td>{dataRow.final_grade_term2}</td>
                  </tr>
                ))}

              <tr className="text-center font-semibold">
                <td className="uppercase text-left p-2 bg-yellow-500 ">
                  {" "}
                  Total
                </td>
                <td colSpan={2} className="bg-green-500 text-white">
                  Marks : {overallData.t1_overallTotal} /{" "}
                  {overallData.totalOutOf}
                </td>

                <td colSpan={2} className="bg-green-500 text-white">
                  {" "}
                  Percentage : {overallData.t1_percentage}
                </td>
                <td colSpan={2} className="bg-green-500 text-white">
                  Grade : {overallData.t1_grade}
                </td>
                <td className="bg-blue-500 text-white" colSpan={2}>
                  Marks :{overallData.t2_overallTotal} /{" "}
                  {overallData.totalOutOf}{" "}
                </td>

                <td className="bg-blue-500 text-white" colSpan={2}>
                  Percentage : {overallData.t2_percentage}
                </td>
                <td className="bg-blue-500 text-white" colSpan={2}>
                  Grade : {overallData.t2_grade}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* //////////////////////// marks detail //////////////////////////// */}

        {/* //////////////////////// scholastic detail //////////////////////////// */}
        <div>
          <h2 className="text-center font-semibold text-red-500 mt-3">
            Part 2: Co-Scholastic Activities (Grading On A 3 Point Scale)
          </h2>
          <table className="w-full text-sm mytable">
            <thead>
              <tr className="text-center bg-green-500 text-white">
                {" "}
                <th className="w-1/6 p-2"> Activities</th>
                <th className="w-1/6"> Term 1 Grade</th>
                <th className="w-1/6"> Term 2 Grade</th>
                <th className="w-1/6"> Activities</th>
                <th className="w-1/6"> Term 1 Grade</th>
                <th className="w-1/6"> Term 2 Grade</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="p-1">A</td>
                <td>A</td>
                <td>A</td>
                <td>A</td>
                <td>A</td>
                <td>A</td>
              </tr>
              <tr>
                <td className="p-1">B</td>
                <td>B</td>
                <td>B</td>
                <td>B</td>
                <td>B</td>
                <td>B</td>
              </tr>
              <tr>
                <td className="p-1">C</td>
                <td>C</td>
                <td>C</td>
                <td>C</td>
                <td>C</td>
                <td>C</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* //////////////////////// scholastic detail //////////////////////////// */}
        {/* //////////////////////// Result and attendance detail //////////////////////////// */}
        <div className="mt-2">
          <table className="w-full text-sm mytable">
            <tbody className="text-center">
              <tr className="text-center bg-green-500 text-white ">
                {" "}
                <th className="w-1/4 p-2 ">
                  {" "}
                  Term-1 Attendance
                </th>
                <th className="w-1/4 ">  Term-2 Attendance</th>
                <th className="w-1/4 p-2 ">
                  {" "}
                   Result
                </th>
                <th className="w-1/4">Date</th>
              </tr>
              <tr className="text-center">
                {" "}
                <td className=" p-2">852 </td>
                <td className="">852</td>
                <td className=" p-2  "> {overallData.Result}</td>
                <td className=""> 30/03/2024</td>
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
        {/* //////////////////////// grading detail  //////////////////////////// */}
        <div className="border-2 border-gray-900">
        <h2 className="text-center font-semibold text-red-500 mt-1">
            Grading System
          </h2>
        <div className="flex mytable mt-4">
          <table className="w-1/2 text-sm">
            <thead>
              <tr className="text-center bg-green-500 text-white">
                <th className="p-[6px]" colSpan={2}>Scholastic Area(Grading on 8 Point Scale)</th>
              </tr>
              <tr className="text-center bg-green-500 text-white">
                <th className="p-[4.5px]" colSpan={1}>Grade</th>
                <th colSpan={1}> Marks Range</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>A1</td>
                <td>91-100</td>
              </tr>
              <tr>
                {" "}
                <td>A</td>
                <td>81-90</td>
              </tr>
              <tr>
                {" "}
                <td>B1</td>
                <td>71-80</td>
              </tr>
              <tr>
                {" "}
                <td>B</td> <td>61-70</td>
              </tr>
              <tr>
                {" "}
                <td>C1</td> <td>51-60</td>
              </tr>
              <tr>
                {" "}
                <td>C</td> <td>41-50</td>
              </tr>
              <tr>
                {" "}
                <td>D</td> <td>33-40</td>
              </tr>
              <tr>
                {" "}
                <td>E (Needs Improvement)</td> <td>0-32</td>{" "}
              </tr>
            </tbody>
          </table>
          <table className="w-1/2 text-sm">
            <thead>
              <tr className="text-center bg-green-500 text-white">
                <th colSpan={3}>
                  Co-Scholastic Activities : Part 2 <br />
                  Discipline : Part 3<br />
                  (Grading on 3 Point Scale)
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr className="font-semibold">
                <td >Grade</td>
                <td >Grade Point</td>
                <td >Grade Achievements</td>
              </tr>
              <tr>
                {" "}
                <td>A</td>
                <td>3</td>
                <td>Outstanding</td>
              </tr>
              <tr>
                {" "}
                <td>B</td>
                <td>2</td>
                <td>Very Good</td>
              </tr>
              <tr>
                {" "}
                <td>C</td> <td>1</td>
                <td>Fair</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        {/* //////////////////////// grading detail  //////////////////////////// */}
      </div>
    </>
  );
}
