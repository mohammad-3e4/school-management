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


export default function GraphOne(){
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
      return { Male: 0, Female: 0 };
    }

    const genderCounts = students?.reduce((acc, student) => {
        const maleCount = students?.filter((student) => student.gender === 'Male').length;
        const femaleCount = students?.filter((student) => student.gender === 'Female').length;
    
        return [maleCount, femaleCount]
    }, {});

    return genderCounts;
  };

  const createChartOne = () => {
    const ctx = document.getElementById('chartone')?.getContext('2d');

    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    if (window.myChartOne) {
      window.myChartOne.destroy();
    }

    const genderCounts = getgenderCounts();

    window.myChartOne = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [ 'Boys','Girls'],
        datasets: [{
          label: 'Graph between boys and girls',
          data: Object.values(genderCounts),
          backgroundColor: ['#dc8034', '#ef4444'],
          borderWidth: 1,
        }],
      },
      options: {
        scales: {
         
        },
      },
     
    });
  };
  useEffect(() => {
    createChartOne();
  }, [students]);

  return (
    <div className='h-150 w-150 bg-white rounded-md'>
    <div>
    <Select subject={false}/>

    </div>
    <canvas className=' w-100 rounded-lg text-gray-100  py-2 px-3 leading-5 ' id="chartone">


    </canvas>
    </div>
  );
};
