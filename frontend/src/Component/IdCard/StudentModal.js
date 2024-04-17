import React, { useState } from 'react';

const StudentModal = ({ selectedStudent, onClose }) => {
  const [isPrinted, setIsPrinted] = useState(false);


  const handlePrint = () => {
    window.print();
    setIsPrinted(true);
  };
  const handleClose = () => {
    setIsPrinted(false);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center" onClick={handleClose}>
      <div className="bg-none w-[600px] p-5 rounded-lg">
        <div className="bg-contain border w-[500px] bg-blue-100 p-3 rounded-lg mx-auto">
          <div className="flex p-3 bg-[#002749] w-full mb-5">
            <div className="w-[30%] flex justify-center items-center">
              <img
                className="h-[90px] w-[90px]"               

                src="http://localhost:3000/static/media/schoollogo.b9091902eb092e0ba2e4.png"
                alt="logo"
              />
            </div>
            <div className="p-3 text-center">
              <p className="font-bold text-2xl text-white">G.N.K School-Chandigarh</p>
              <p className="text-xs text-white">
                <span className="text-yellow-300">Mobile:</span> +91-6284623516 <br />
                <span className="text-yellow-300">Email:</span> gurunanak_30b@rediffmail.com
              </p>
            </div>
          </div>
          <div className="w-full  flex p-3">
            <div className="border rounded-md w-[30%] flex justify-center items-center">
              <img
                className="h-full rounded-md w-[80%] "
                alt={selectedStudent.student_image}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsjeD3D1igOWLVRCcFSNDVqDeGQBcT0B1UFw&usqp=CAU"
              />
            </div>
            <div className="flex justify-center ms-5">
              <div className="text-gray-500">
                <p className="p-1 text-red-500 font-semibold">Name:</p>
                <p className="p-1 text-red-500 font-semibold">Class:</p>
                <p className="p-1 text-red-500 font-semibold">D.O.B:</p>
                <p className="p-1 text-red-500 font-semibold">Roll:</p>
                <p className="p-1 text-red-500 font-semibold">Address:</p>
                <p className="p-1 text-red-500 font-semibold">Phone:</p>
              </div>
              <div className="ms-5">
                <p className="p-1 text-[#002749] font-semibold">{selectedStudent.student_name}</p>
                <p className="p-1 text-[#002749] font-semibold">{selectedStudent.class_name}</p>
                <p className="p-1 text-[#002749] font-semibold">{new Date(selectedStudent.date_of_birth).toLocaleString()}</p>
                <p className="p-1 text-[#002749] font-semibold">{selectedStudent.roll_no}</p>
                <p className="p-1 text-[#002749] font-semibold">{selectedStudent.address}</p>
                <p className="p-1 text-[#002749] font-semibold">{selectedStudent.phone}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Print Button with conditional rendering based on isPrinted state */}
        {!isPrinted && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handlePrint}
              id="printButton" // Add an ID for easier CSS targeting
            >
              Print ID Card
            </button>
          </div>
        )}
        {/* CSS to hide the button during printing */}
        <style>
          {`
            @media print {
              #printButton {
                display: none;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default StudentModal;
