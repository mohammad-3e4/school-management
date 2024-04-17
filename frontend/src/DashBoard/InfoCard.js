import defaultuser from "../Static/basic/defaultuser.jpg"
import { useDispatch, useSelector } from "react-redux";

export default function InfoCard(){
  const { user } = useSelector((state) => state.user);
  return (
    <>
    <div className="h-auto text-xs tracking-widest ">
      <div className="flex justify-between items-center px-5 py-1 bg-gray-900 ">
              <p className="text-md font-bold text-white">Notice Board</p>
      </div>
      <div className="flex">
        <div className="w-1/4 h-auto p-1"> 
          <img className="w" src={defaultuser} />
        </div>
        <div className="flex w-3/4  justify-between mx-5 "> 
          <div className="w-1/2 border-b-2 ml-12 font-semibold">
            <ul className="">
            <li className="p-1">Name</li>
            <li className="p-1">Gender</li>
            <li className="p-1">Father Name</li>
            <li className="p-1">Mother Name</li>
            <li className="p-1">Date Of Birth</li>
          
            </ul>
          </div>
          <div className="w-1/2 border-b-2">
            <ul>
            <li className="p-1">{user?.student_name}</li>
            <li className="p-1">{user?.gender}</li>
            <li className="p-1">{user?.father_name}</li>
            <li className="p-1">{user?.mother_name}</li>
            <li className="p-1">{user?.date_of_birth}</li>
            
            </ul>
          </div>
        </div>

        <div></div>
      </div>
      <div className="flex">
        <div className="flex w-1/2 justify-between mx-5 my-2 ">
        <ul className="font-semibold">
            <li className="p-1">Email : </li>
            <li className="p-1">Admission No : </li>
            <li className="p-1">class : </li>
            <li className="p-1">Roll No : </li>
            <li className="p-1">Address : </li>

        </ul>
        <ul>
            <li className="p-1">{user?.email}</li>
            <li className="p-1">{user?.admission_no}</li>
            <li className="p-1">{user?.class_name} - {user?.section}</li>
            <li className="p-1">{user?.roll_no}</li>
            <li className="p-1">{user?.address}</li>
        </ul>
        </div>
        <div className="flex w-1/2 justify-space-between mx-5 my-2 ">
        <ul className="font-semibold">
        <li className="p-1">Admission Date : </li>
            <li className="p-1">Blood Group : </li>
            <li className="p-1">Religion : </li>
            <li className="p-1">Phone : </li>
        </ul>
        <ul>
        <li className="p-1">{user?.date_of_admission}</li>
            <li className="p-1">{user?.blood_group}</li>
            <li className="p-1">{user?.religion}</li>
            <li className="p-1">{user?.phone}</li>
        </ul>
        </div>

      </div>


    </div>
    </>
  )
}