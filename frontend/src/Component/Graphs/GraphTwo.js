import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import Select from "../../BaseFiles/Select";

import {
    clearErrors,
    clearMessage,
    deleteStudent,
    getStudents,
    updateStudent,
    setSeacrh,
  } from "../../redux/studentSlice";
import { useDispatch, useSelector } from "react-redux";


export default function GraphTwo(){
  const dispatch = useDispatch();

    const { loading, error, message, students } = useSelector((state) => state.student);
  const { selectedClass } = useSelector((state) => state.classes);

    useEffect(() => {
        dispatch(getStudents(selectedClass));
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
      }, [dispatch, error, message, selectedClass]);


      const getgenderCounts = () => {
        if (!Array.isArray(students)) {
          return [];
        }
    
        const genderCounts = students.reduce((acc, student) => {
          const reserve_category = student.reserve_category || 'Other';
          const gender = student.gender || 'Other';
    
          if (!acc[reserve_category]) {
            acc[reserve_category] = { Male: 0, Female: 0 };
          }
    
          acc[reserve_category][gender]++;
          return acc;
        }, {});
    
        return genderCounts;
      };
    


  const createChartTwo = () => {
    const ctx = document.getElementById('charttwo')?.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    if (window.myChartTwo) {
      window.myChartTwo.destroy();
    }

    const genderCounts = getgenderCounts();

    const labels = ['Male', 'Female'];
    const categories = Object.keys(genderCounts);
    const datasets = categories.map((reserve_category, index) => ({
      label: reserve_category,
      data: [genderCounts[reserve_category]?.Male || 0, genderCounts[reserve_category]?.Female || 0],
      backgroundColor: index === 0 ? '#343cdc' : index === 1 ? '#3490dc' : index === 2 ? '#ff9900' : index === 3 ?"#db2777" : index === 4 ?"#475569" :'#55cc55', 
      borderColor: index === 0 ? '#343cdc' : index === 1 ? '#3490dc' : index === 2 ? '#ff9900' : index === 3 ? "#db2777":index === 4 ?"#475569" : '#55cc55',
      borderWidth: 1,
    }));

    window.myChartTwo = new Chart(ctx, {
        type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
         
        },
      },
    });
  };

  useEffect(() => {
    createChartTwo();
  }, [students])

  return (
    <div className='h-150 w-150 bg-white rounded-md'>
    <div>
    <Select subject={false}/>

    </div>
    <canvas className=' w-100 rounded-lg text-gray-100 py-2 px-3 leading-5' id="charttwo" ></canvas>


    </div>
  );
};
