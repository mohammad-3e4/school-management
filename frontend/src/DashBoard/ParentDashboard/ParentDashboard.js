import { React, useState } from "react";
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

export default function ParentDashboard() {
  const [refresh, setRefresh] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handlerefresh = () => {
    setIsRotated(!isRotated);
    setRefresh(true);
  };

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
            count={1500}
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

          <div className="w-full mt-5 ">
            <div className="flex justify-between items-center px-5 py-1 bg-gradient-to-r from-blue-300 to-blue-100">
              <p className="text-md font-bold text-red-900">All Exam Results</p>
              <div>
                <IoMdRefresh
                  className={`text-green-600 font-bold ${
                    isRotated ? "rotate" : ""
                  }`}
                  onClick={handlerefresh}
                />
              </div>
            </div>
            <div className="">
            <div className="bg-white  shadow-md p-4 text-gray-900 max-h-[25rem] overflow-y-auto">
                <MarksDetail id={2}/>
              </div>
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
