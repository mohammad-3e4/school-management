import { useParams } from "react-router-dom";
import { getStudentById } from "../../redux/studentSlice";
import {
  clearErrors,
  clearMessage,
  getMarksByStudentId,
  getMaxMarks,
} from "../../redux/marksSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import schoollogo from "./schoollogo.png";
import cbselogo from "./cbse-logo.png";

export default function PrimaryTermTwo() {
  const { loading, error, message, student } = useSelector(
    (state) => state.student
  );
  const { studentMark } = useSelector((state) => state.marks);
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

  useEffect(() => {
    if (student && student?.class_name) {
      let class_name = student?.class_name;
      let section = student?.section;
      dispatch(getMarksByStudentId({ id, class_name, section }));
    }
  }, [dispatch, id, student?.class_name, student?.section]);

  function convertToGrade(mark) {
    if (mark >= 9) return "A";
    if (mark >= 7) return "B";
    if (mark >= 5) return "C";
    if (mark >= 3) return "D";
    return "E";
  }

  // Array of objects with marks

  // Iterate over each object and convert marks to grades
  const newData = studentMark?.map((obj) => {
    const newObj = {};
    Object.keys(obj).forEach((key) => {
      // Check if the key represents marks (assuming marks are numeric)
      if (!isNaN(obj[key])) {
        newObj[key] = convertToGrade(parseInt(obj[key]));
      } else {
        newObj[key] = obj[key]; // Preserve non-marks properties as is
      }
    });
    return newObj;
  });
  return (
    <>
      {/* /////////////////header////////////////////////////// */}
      <div className="border-2 border-gray-900 p-1">
        <div className="flex w-full ">
          <div className="w-2/12">
            {" "}
            <img
              className=" mx-auto pt-5"
              height="80px"
              width="120px"
              src={schoollogo}
            />
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
              <span className="mx-auto"> Website: www.gnkschool.info</span>
            </div>
          </div>

          <div className="w-2/12 ">
            <img
              className=" mx-auto pt-5"
              height="80px"
              width="120px"
              src={cbselogo}
            />
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
        <table className="w-full text-sm mytable font-semibold text-center">
          <thead className="bg-green-500 text-white">
            <th colSpan="8" className="table-heading ">
              Part A: Languages
            </th>
            <tr>
              <th
                colSpan="4"
                rowSpan="2"
                className="heading items-center justify-center w-1/2"
              >
                Aspects
              </th>

              <th colSpan="2" className="heading">
                English
              </th>

              <th colSpan="2" className="heading">
                Punjabi
              </th>
            </tr>

            <tr className="capitalize">
              <th colSpan="1" className="heading">
                Term 1
              </th>
              <th colSpan="1" className="heading">
                Term 2
              </th>

              <th colSpan="1" className="heading">
                Term 1
              </th>
              <th colSpan="1" className="heading">
                Term 2
              </th>
            </tr>
          </thead>
          <tbody className="capitalize ">
            <tr className="capitalize myborder">
              <td colSpan={2} rowSpan={3} className="text-left pl-4">
                {" "}
                Reading Skill
              </td>
              <td colSpan={2} className="text-left pl-4">
                {" "}
                Pronunciation
              </td>
              <td colSpan="1">{newData?.[1]?.term1_english_pronunciation}</td>
              <td colSpan="1">{newData?.[1]?.term2_english_pronunciation}</td>

              <td colSpan="1">
                {newData?.[4]?.term1_punjabi_pronunciation || "-"}
              </td>
              <td colSpan="1">
                {newData?.[4]?.term2_punjabi_pronunciation || "-"}
              </td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} className="text-left pl-4">
                {" "}
                Fluency
              </td>
              <td colSpan="1">{newData?.[1]?.term1_english_fluency}</td>
              <td colSpan="1">{newData?.[1]?.term2_english_fluency}</td>

              <td colSpan="1">{newData?.[4]?.term1_punjabi_fluency || "-"}</td>
              <td colSpan="1">{newData?.[4]?.term2_punjabi_fluency || "-"}</td>
            </tr>
            <tr>
              <td colSpan="2" className="text-left pl-4">
                {" "}
                Comprehensive{" "}
              </td>
              <td colSpan="1">{newData?.[1]?.term1_english_comprehension}</td>
              <td colSpan="1">{newData?.[1]?.term2_english_comprehension}</td>
              <td colSpan="1">
                {newData?.[4]?.term1_punjabi_comprehension || "-"}
              </td>
              <td colSpan="1">
                {newData?.[4]?.term2_punjabi_comprehension || "-"}
              </td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} rowSpan={5} className="text-left pl-4">
                {" "}
                Writing Skill
              </td>
              <td colSpan={2} className="text-left pl-4">
                {" "}
                Creative Writing
              </td>
              <td colSpan="1">
                {newData?.[1]?.term1_english_creative_writing}
              </td>
              <td colSpan="1">{newData?.[1]?.term2_english_creative_writing}</td>
              <td colSpan="1">
                {newData?.[4]?.term1_punjabi_creative_writing || "-"}
              </td>
              <td colSpan="1">
                {newData?.[4]?.term2_punjabi_creative_writing || "-"}
              </td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} className="text-left pl-4">
                {" "}
                Handwriting
              </td>
              <td colSpan="1">{newData?.[1]?.term1_english_handwriting}</td>
              <td colSpan="1">{newData?.[1]?.term2_english_handwriting}</td>
              <td colSpan="1">
                {newData?.[4]?.term1_punjabi_handwriting || "-"}
              </td>
              <td colSpan="1">
                {newData?.[4]?.term2_punjabi_handwriting || "-"}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="text-left pl-4">
                {" "}
                Grammar{" "}
              </td>
              <td colSpan="1">{newData?.[1]?.term1_english_grammar}</td>
              <td colSpan="1">{newData?.[1]?.term2_english_grammar}</td>
              <td colSpan="1">{newData?.[4]?.term1_punjabi_grammar || "-"}</td>
              <td colSpan="1">{newData?.[4]?.term2_punjabi_grammar || "-"}</td>
            </tr>
            <tr>
              <td colSpan="2" className="text-left pl-4">
                {" "}
                Spellings{" "}
              </td>
              <td colSpan="1">{newData?.[1]?.term1_english_spelling}</td>
              <td colSpan="1">{newData?.[1]?.term2_english_spelling}</td>
              <td colSpan="1">{newData?.[4]?.term1_punjabi_spelling || "-"}</td>
              <td colSpan="1">{newData?.[4]?.term2_punjabi_spelling || "-"}</td>
            </tr>{" "}
            <tr>
              <td colSpan="2" className="text-left pl-4">
                {" "}
                Vocabulary{" "}
              </td>
              <td colSpan="1">{newData?.[1]?.term1_english_vocabulary}</td>
              <td colSpan="1">{newData?.[1]?.term2_english_vocabulary}</td>
              <td colSpan="1">
                {newData?.[4]?.term1_punjabi_vocabulary || "-"}
              </td>
              <td colSpan="1">
                {newData?.[4]?.term2_punjabi_vocabulary || "-"}
              </td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} rowSpan={2} className="text-left pl-4">
                {" "}
                Speaking Skill
              </td>
              <td colSpan={2} className="text-left pl-4">
                {" "}
                Conversation
              </td>
              <td colSpan="1">{newData?.[1]?.term1_english_conversation}</td>
              <td colSpan="1">{newData?.[1]?.term2_english_conversation}</td>
              <td colSpan="1">
                {newData?.[4]?.term1_punjabi_conversation || "-"}
              </td>
              <td colSpan="1">
                {newData?.[4]?.term2_punjabi_conversation || "-"}
              </td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} className="text-left pl-4">
                {" "}
                Recitation
              </td>
              <td colSpan="1">{newData?.[1]?.term1_english_recitation}</td>
              <td colSpan="1">{newData?.[1]?.term2_english_recitation}</td>
              <td colSpan="1">
                {newData?.[4]?.term1_punjabi_recitation || "-"}
              </td>
              <td colSpan="1">
                {newData?.[4]?.term2_punjabi_recitation || "-"}
              </td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} rowSpan={1} className="text-left pl-4">
                {" "}
                Listening Skill
              </td>
              <td colSpan={2} className="text-left pl-4">
                {" "}
                Comprehensive
              </td>
              <td colSpan="1">
                {newData?.[1]?.term1_english_listening_comprehension}
              </td>
              <td colSpan="1">
                {newData?.[1]?.term2_english_listening_comprehension}
              </td>
              <td colSpan="1">
                {newData?.[4]?.term1_punjabi_listening_comprehension || "-"}
              </td>
              <td colSpan="1">
                {newData?.[4]?.term2_punjabi_listening_comprehension || "-"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* * <!-- Table Two******************************************************************************** -->  */}
        <table className="w-full text-sm mytable  font-semibold">
          <thead className="bg-green-500 text-white text-center">
            <th colSpan="4" className="table-heading w-1/2">
              Part B: Mathematics
            </th>
            <th colSpan="4" className="table-heading ">
              Part C : Games
            </th>
            <tr>
              <th
                colSpan="2"
                rowSpan="1"
                className="heading items-center justify-center w-1/6"
              >
                Aspects
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 1
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 2
              </th>

              <th
                colSpan="2"
                rowSpan="1"
                className="heading items-center justify-center w-1/6"
              >
                Aspects
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 1
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 2
              </th>
            </tr>
          </thead>
          <tbody className="capitalize ">
            <tr className="capitalize myborder">
              <td colSpan={2} className="pl-4">
                {" "}
                Concept
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[3]?.term1_mathematics_concept}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[3]?.term2_mathematics_concept}
              </td>
              <td colSpan={2} className="pl-4">
                {" "}
                Enthusiasm
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[2]?.term1_games_enthusiasm}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[2]?.term2_games_enthusiasm}
              </td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} className="pl-4">
                {" "}
                Activity
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[3]?.term1_mathematics_activity}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[3]?.term2_mathematics_activity}
              </td>
              <td colSpan={2} className="pl-4">
                {" "}
                Discipline
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[2]?.term1_games_discipline}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[2]?.term2_games_discipline}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="pl-4">
                {" "}
                Tables{" "}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[3]?.term1_mathematics_tables}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[3]?.term2_mathematics_tables}
              </td>
              <td colSpan="2" className="pl-4">
                {" "}
                Team-Spirit{" "}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[2]?.term1_games_team_spirit}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[2]?.term2_games_team_spirit}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="pl-4">
                {" "}
                Mental Ability{" "}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[3]?.term1_mathematics_mental_ability}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[3]?.term2_mathematics_mental_ability}
              </td>
              <td colSpan="2" className="pl-4">
                {" "}
                Talent{" "}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[2]?.term1_games_talent}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[2]?.term2_games_talent}
              </td>
            </tr>
          </tbody>
        </table>

        {/* * <!-- Table Three******************************************************************************** -->  */}
        <table className="w-full text-sm mytable font-semibold">
          <thead className="bg-green-500 text-white">
            <th colSpan="8" className="table-heading ">
              Part D: Health and Physical Education
            </th>
            <tr>
              <th
                colSpan="2"
                rowSpan="1"
                className="heading items-center justify-center w-1/2"
              >
                Aspects
              </th>

              <th colSpan="2" className="heading">
                Term 1
              </th>

              <th colSpan="2" className="heading">
                Term 2
              </th>
            </tr>
          </thead>
          <tbody className="capitalize ">
            <tr className="capitalize myborder">
              <td colSpan={2} className="pl-4"> Environmental Sensitivity</td>
              <td colSpan="2" className="text-center">{newData?.[2]?.term1_health_environment}</td>
              <td colSpan="2" className="text-center">{newData?.[2]?.term2_health_environment}</td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} className="pl-4"> Activity / Project</td>
              <td colSpan="2" className="text-center">{newData?.[2]?.term1_health_activity}</td>
              <td colSpan="2" className="text-center">{newData?.[2]?.term2_health_activity}</td>
            </tr>
            <tr>
              <td colSpan="2" className="pl-4"> Group Discussion </td>
              <td colSpan="2" className="text-center">{newData?.[2]?.term1_health_group_discussion}</td>
              <td colSpan="2" className="text-center">{newData?.[2]?.term2_health_group_discussion}</td>
            </tr>
          </tbody>
        </table>

        {/* * <!-- Table four ******************************************************************************** -->  */}
        <table className="w-full text-sm mytable font-semibold ">
          <thead className="bg-green-500 text-white">
            <th colSpan="4" className="table-heading ">
              Part E: Art / Craft
            </th>
            <th colSpan="4" className="table-heading ">
              Part F : Music / Dance
            </th>
            <tr>
              <th
                colSpan="2"
                rowSpan="1"
                className="heading items-center justify-center w-1/6"
              >
                Aspects
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 1
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 2
              </th>

              <th
                colSpan="2"
                rowSpan="1"
                className="heading items-center justify-center w-1/6"
              >
                Aspects
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 1
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 2
              </th>
            </tr>
          </thead>
          <tbody className="capitalize ">
            <tr className="capitalize myborder">
              <td colSpan={2} className="pl-4"> Interest</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_art_interest}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_art_interest}</td>
              <td colSpan={2} className="pl-4"> Interest</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_music_interest}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_music_interest}</td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} className="pl-4"> Creativity</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_art_creativity}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_art_creativity}</td>
              <td colSpan={2} className="pl-4"> Rhythm</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_music_rhythm}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_music_rhythm}</td>
            </tr>
            <tr>
              <td colSpan="2" className="pl-4"> Skill </td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_art_skill}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_art_skill}</td>
              <td colSpan="2" className="pl-4"> Melody </td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_music_melody}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_music_melody}</td>
            </tr>
          </tbody>
        </table>
        {/* * <!-- Table five ******************************************************************************** -->  */}
        <table className="w-full text-sm mytable font-semibold ">
          <thead className="bg-green-500 text-white">
            <th colSpan="8" className="table-heading ">
              Part G: Personality Development
            </th>
            <tr>
              <th
                colSpan="2"
                rowSpan="1"
                className="heading items-center justify-center w-1/6"
              >
                Aspects
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 1
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 2
              </th>

              <th
                colSpan="2"
                rowSpan="1"
                className="heading items-center justify-center w-1/6"
              >
                Aspects
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 1
              </th>

              <th colSpan="1" className="heading w-1/6">
                Term 2
              </th>
            </tr>
          </thead>
          <tbody className="capitalize ">
            <tr className="capitalize myborder">
              <td colSpan={2} className="pl-4"> Courteousness</td>
              <td colSpan="1" className="text-center">
                {newData?.[0]?.term1_personality_courteousness}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[0]?.term2_personality_courteousness}
              </td>
              <td colSpan={2} className="pl-4"> Confidence</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_personality_confidence}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_personality_confidence}</td>
            </tr>
            <tr className="capitalize myborder">
              <td colSpan={2} className="pl-4"> Care of Belongings</td>
              <td colSpan="1" className="text-center">
                {newData?.[0]?.term1_personality_care_of_belonging}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[0]?.term2_personality_care_of_belonging}
              </td>
              <td colSpan={2} className="pl-4"> Neatness</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_personality_neatness}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_personality_neatness}</td>
            </tr>
            <tr>
              <td colSpan="2" className="pl-4"> Regularity and Punctuality </td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_personality_regularity}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_personality_regularity}</td>
              <td colSpan="2" className="pl-4"> Initiative </td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_personality_initiative}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_personality_initiative}</td>
            </tr>
            <tr>
              <td colSpan="2" className="pl-4"> Self-Control </td>
              <td colSpan="1" className="text-center">
                {newData?.[0]?.term1_personality_self_control}
              </td>
              <td colSpan="1" className="text-center">
                {newData?.[0]?.term2_personality_self_control}
              </td>
              <td colSpan="2" className="pl-4"> Sharing And Caring </td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term1_personality_sharing}</td>
              <td colSpan="1" className="text-center">{newData?.[0]?.term2_personality_sharing}</td>
            </tr>
          </tbody>
        </table>

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
                  <th className="p-[6px]" colSpan={2}>
                    Scholastic Area(Grading on 8 Point Scale)
                  </th>
                </tr>
                <tr className="text-center bg-green-500 text-white">
                  <th className="p-[4.5px]" colSpan={1}>
                    Grade
                  </th>
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
                  <td>Grade</td>
                  <td>Grade Point</td>
                  <td>Grade Achievements</td>
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
