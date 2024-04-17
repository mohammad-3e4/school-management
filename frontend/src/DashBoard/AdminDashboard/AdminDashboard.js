import React from "react";
import { MdGroups } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";
import { FaRupeeSign, FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import AccountChart from "./AccountChart";
import NoticeBoard from "../NoticeBoard";
import LogsFiles from "./LogsFiles";
import NoticeModal from "../NoticeModal";
import SocialMedia from "../SocialMedia";
import IconBox from "../IconBox";
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearErrors,  clearMessage, getStudents} from "../../redux/studentSlice";
import { getFees } from "../../redux/feesSlice";
import { getStaff} from "../../redux/staffSlice";


export default function AdminDashboard() {
  const dispatch = useDispatch();
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [refresh ,setRefresh]=useState(false)
  const { loading, error, message, students } = useSelector(
    (state) => state.student
  );
  const { fees } = useSelector(
    (state) => state.fees
  );
  const {staff } = useSelector(
    (state) => state.staff
  );
  useEffect(() => {
    dispatch(getStudents('undefined'));
    dispatch(getStaff());
    dispatch(getFees());
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


  const openNoticeModal = () => {
    setIsNoticeModalOpen(true);
  };

  const closeNoticeModal = () => {
    setIsNoticeModalOpen(false);
  };
  const [isRotated, setIsRotated] = useState(false);

  const handlerefresh = () => {
    setIsRotated(!isRotated);
    setRefresh(true)
  };

  const uniqueParents = {};
  students?.forEach(entry => {
    const key = `${entry.father_name}_${entry.phone}`;
    uniqueParents[key] = true;
});
const numUniqueParents = Object.keys(uniqueParents).length;


function sumFeesFromMarchToMarch(fees) {
  let sum = 0;
  const filteredData = fees?.filter(entry => {
      const date = new Date(entry.date_time);
      const month = date.getMonth();
      return (month >= 2 && month <= 11); 
  });

  filteredData?.forEach(entry => {
      sum += Number(entry.paid_fees);
  });

  return sum;
}
const totalFees = sumFeesFromMarchToMarch(fees);



  return (
    <>
      <div className="h-auto w-full">
        <div className="lg:flex lg:justify-between">
          <IconBox icon={<MdGroups className="text-green-500 text-4xl mx-2" />} title={"Students"} count={students?.length} textsize={'text-xl'}/>
          <IconBox icon={<GiTeacher className="text-yellow-800 text-4xl mx-2" />} title={"Staff"} count={staff?.length} textsize={'text-xl'}/>
          <IconBox icon={<MdFamilyRestroom className="text-blue-800 text-4xl mx-2" />} title={"Parents"} count={numUniqueParents} textsize={'text-xl'}/>
          <IconBox icon={<FaRupeeSign className="text-pink-800 text-4xl mx-2" />} title={"Earning"} count={totalFees} textsize={'text-xl'}/>
        </div>
      </div>
      {/* ////////////////////// block 2 ///////////////  */}
      <div className="h-auto w-full lg:flex justify-between">
        <div className=" m-4 lg:w-1/2 bg-white">
          <div className="flex justify-between items-center px-5 py-1  border-b-2 border-gray-400">
            <p className="text-md font-bold text-red-900">
              Fee Collection And Expense
            </p>
            <div>
              <IoMdRefresh
                className={`text-blue-900 font-bold ${
                  isRotated ? "rotate" : ""
                }`}
                // onClick={handleChartRefresh}
              />
            </div>
          </div>
          <div>
            <AccountChart />
          </div>
        </div>

        <div className="lg:w-1/2  m-4">
          <div className="flex w-full justify-between ">
            <SocialMedia gradientClass={"from-blue-800 to-blue-200"} icon={<FaFacebook className="text-4xl mx-2" />} title={"Like Us on Facebook"} count={6500} /> 
            <SocialMedia gradientClass={"from-purple-500 to-pink-500"} icon={<FaInstagram className="text-4xl mx-2" />} title={"Follow Us on InstaGram"} count={4000} /> 
          </div>
          <div className="flex w-full justify-between mt-2">
            <SocialMedia gradientClass={"from-blue-200 to-blue-800"} icon={<FaTwitter className="text-4xl mx-2" />} title={"Connect with Us on Twitter"} count={1500} /> 
            <SocialMedia gradientClass={"from-blue-800 to-blue-200"} icon={<FaLinkedinIn className="text-4xl mx-2" />} title={"Connect with Us on Linkedin"} count={3000} /> 
          </div>
        </div>
      </div>

      {/* ////////////////////// block 3 ///////////////  */}
      <div className="h-auto w-full lg:flex justify-between">
        <div className="lg:flex m-4 lg:w-1/2 bg-white">
          <div className=" lg:w-full bg-white">
            <div className="flex justify-between items-center px-5 py-1 bg-gradient-to-r from-pink-300 to-pink-100  border-b-2 border-gray-400">
              <p className="text-md font-bold text-red-900">Notice Board</p>
              <div className="flex justify-between w-[50px]">
              <FaPlus onClick={openNoticeModal} className=" text-green-600" />

                <IoMdRefresh
                  className={`text-green-600 font-bold ${
                    isRotated ? "rotate" : ""
                  }`}
                  onClick={handlerefresh}
                />
              </div>
            </div>
            <div className="">
              <div className="bg-white shadow-md p-4 rounded-lg text-gray-900 max-h-[20rem] overflow-y-auto">
                <NoticeBoard refresh={refresh} setRefresh={setRefresh}/>
              </div>
            </div>
            <NoticeModal
              isOpen={isNoticeModalOpen}
              onClose={closeNoticeModal}
            />
          </div>
{/* 
          <div className="lg:ml-4 lg:w-1/2 bg-white">
            <div className="flex justify-between items-center px-5 py-1 bg-gradient-to-r from-green-500 to-green-100 border-b-2 border-gray-400">
              <p className="text-md font-bold  text-white">Recent Activity</p>
              <div>
                <IoMdRefresh
                  className={`text-green-600 font-bold ${
                    isRotated ? "rotate" : ""
                  }`}
                  // onClick={handleRecentRefresh}
                />
              </div>
            </div>
            <div className="">
              <div className="bg-white shadow-md p-4 rounded-lg text-gray-900 max-h-[20rem] overflow-y-auto">
                <LogsFiles />
              </div>
            </div>
          </div> */}
        </div>

        <div className=" m-4 lg:w-1/2 bg-white">
          <div className="flex justify-between items-center bg-gradient-to-r from-amber-500 to-amber-100 px-5 py-1  border-b-2 border-gray-400">
            <p className="text-md font-bold text-red-900">Event Calender</p>
            <div>
              <IoMdRefresh
                className={`text-green-600 font-bold ${
                  isRotated ? "rotate" : ""
                }`}
                // onClick={handleEventrefresh}
              />
            </div>
          </div>
          <div className="">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
