import { React, useEffect, useState } from "react";
import { PiExamLight } from "react-icons/pi";
import { FaMoneyCheckDollar, FaInstagram } from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import SocialMedia from "../SocialMedia";
import NoticeBoard from "../NoticeBoard";
import { IoMdRefresh } from "react-icons/io";
import defaultuser from "../../Static/basic/defaultuser.jpg";
import IconBox from "../IconBox";
import InfoCard from "../InfoCard";
import MarksDetail from "../../Component/marks/MarksDetail"
import { useDispatch, useSelector } from "react-redux";
import { getFeesByStudentId,getFeeStructureByClass } from "../../redux/feesSlice";
export default function StudentDashboard() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { studentFees, feeStructure } = useSelector(
    (state) => state.fees
  );

  const handlerefresh = () => {
    setIsRotated(!isRotated);
    setRefresh(true);
  };


  useEffect(() => {
    if (user && user?.class_name) {
    // dispatch(getFeesByStudentId(user?.student_id))
  };
  }, [dispatch,user?.student_id]);

  useEffect(() => {
    if (user && user?.class_name) {
      // dispatch(getFeeStructureByClass(user?.class_name));
    }
  }, [user?.class_name, dispatch]);
  return (
    <>
      <div className="h-auto w-full">
        <div className="lg:flex lg:justify-between">
          <IconBox
            icon={<PiExamLight className=" text-4xl mx-2 text-white" />}
            title={"Upcoming Exam"}
            count={"05"}
            bgcolor={"from-green-900 to-green-400 text-white"}
            textsize={"text-lg"}
          />
          <IconBox
            icon={<FaMoneyCheckDollar className=" text-4xl mx-2 text-white" />}
            title={"Due Fees"}
            count={studentFees?.[0]?.due_fees}
            bgcolor={"from-red-900 to-red-400 text-white"}
            textsize={"text-lg"}
          />
          <IconBox
            icon={<MdEventAvailable className="text-4xl mx-2 text-white" />}
            title={"Event"}
            count={"02"}
            bgcolor={"from-blue-900 to-blue-400 text-white"}
            textsize={"text-lg"}
          />
          <IconBox
            icon={<IoDocumentText className="text-4xl mx-2 text-white" />}
            title={"Document"}
            count={"04"}
            bgcolor={"from-yellow-900 to-yellow-400 text-white"}
            textsize={"text-md"}
          />
        </div>
      </div>

      {/* ////////////////////// block 2 ///////////////  */}
      <div className="lg:flex justify-around p-5">
        <div className="w-1/2 mr-8 bg-white shadow-lg">
          <InfoCard />
        </div>

        <div className="lg:w-1/2  ">
          <div className="w-full flex justify-between items-center px-5 py-1 bg-gradient-to-r from-red-300 to-red-100">
            <p className="text-md font-bold text-red-900">Notice Board</p>
            <div>
              <IoMdRefresh
                className={`text-green-600 font-bold ${
                  isRotated ? "rotate" : ""
                }`}
                onClick={handlerefresh}
              />
            </div>
          </div>
          <div className=" ">
            <div className="bg-white  shadow-md p-2  text-gray-900 max-h-[25rem] overflow-y-auto">
              <NoticeBoard refresh={refresh} setRefresh={setRefresh} />
            </div>
          </div>
        </div>
      </div>
      {/* ////////////////////// block 2 ///////////////  */}

      {/* ////////////////////// block 3 ///////////////  */}

      <div className="h-auto w-full">
        <div className="lg:flex lg:justify-between px-3">
          <SocialMedia
            gradientClass={"from-blue-800 to-blue-200"}
            icon={<FaFacebook className="text-4xl mx-2" />}
            title={"Connect with Us on Facebook"}
            count={6500}
          />
          <SocialMedia
            gradientClass={"from-purple-500 to-pink-500"}
            icon={<FaInstagram className="text-4xl mx-2" />}
            title={"Follow Us on InstaGram"}
            count={4000}
          />
          <SocialMedia
            gradientClass={"from-blue-200 to-blue-800"}
            icon={<FaTwitter className="text-4xl mx-2" />}
            title={"Connect with Us on Twitter"}
            count={1500}
          />
          <SocialMedia
            gradientClass={"from-blue-800 to-blue-200"}
            icon={<FaLinkedinIn className="text-4xl mx-2" />}
            title={"Connect with Us on Linkedin"}
            count={3000}
          />
        </div>
      </div>
      {/* ////////////////////// block 3 ///////////////  */}
    </>
  );
}
