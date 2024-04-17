import React, { useEffect, useRef } from 'react';
import { useDispatch,useSelector } from "react-redux";
import Chart from 'chart.js/auto';
import { getFees, loading, error, message, } from "../../redux/feesSlice";
import { clearErrors,  clearMessage, getSalary} from "../../redux/salarySlice"
const AccountChart = () => {
  const dispatch = useDispatch();

  const { loading, error, message, fees } = useSelector(
    (state) => state.fees
  );
  const {salary } = useSelector((state) => state.salary);
  const chartRef = useRef(null);
  let myChart;

  useEffect(() => {
    dispatch(getSalary());
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

////////////////////////////////////////////////////////

function getLastSixMonthsTotalFees(data) {
  const currentDate = new Date();
  const lastSixMonths = {};
  currentDate.setMonth(currentDate.getMonth() - 6);
  const filteredData = data?.filter(entry => entry.months && entry.total_fees);
  for (let i = 0; i < 6; i++) {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i + 1, 0);
      const monthlyData = filteredData?.filter(entry => {
          const entryMonths = entry.months.split(",");
          return entryMonths.some(month => new Date(entry.date_time).getMonth() === startDate.getMonth());
      });
      const totalFees = monthlyData?.reduce((acc, entry) => acc + parseFloat(entry.paid_fees), 0);
      lastSixMonths[startDate.toLocaleString('en-us', { month: 'long' })] = totalFees;
  }

  return lastSixMonths;
}


function getLastSixMonthsSalaryData(data) {
  const currentDate = new Date();
  const lastSixMonthsData = {};
  currentDate.setMonth(currentDate.getMonth() - 6);
  for (let i = 0; i < 6; i++) {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i + 1, 0);
      const monthlyData = data?.filter(entry => {
          const entryDate = new Date(entry.date);
          return entryDate >= startDate && entryDate <= endDate;
      });
      const totalAmount = monthlyData?.reduce((acc, entry) => acc + entry.amount, 0);
      lastSixMonthsData[startDate.toLocaleString('en-us', { month: 'long' })] = totalAmount;
  }

  return lastSixMonthsData;
}




const currentDate = new Date();
function calculateMonthlyProfit(fees, salary) {
  const profit = {};
  for (const month in fees) {
    if (fees.hasOwnProperty(month) && salary.hasOwnProperty(month)) {
      profit[month] = fees[month] - salary[month];
    }
  }
  return profit;
}

let lastSixMonthsTotalFees
let lastSixMonthsSalaryData
let monthlyProfit
useEffect(()=>{
   lastSixMonthsTotalFees = getLastSixMonthsTotalFees(fees);
   lastSixMonthsSalaryData = getLastSixMonthsSalaryData(salary);
   monthlyProfit = calculateMonthlyProfit(lastSixMonthsTotalFees, lastSixMonthsSalaryData);

},[getLastSixMonthsTotalFees,getLastSixMonthsSalaryData,calculateMonthlyProfit,fees,salary])

///////////////////////////////////////////////////


useEffect(() => {
  // Destroy the previous chart instance before creating a new one
  if (myChart) {
    myChart.destroy();
  }

  const ctx = chartRef.current.getContext('2d');
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(lastSixMonthsTotalFees), // Using month names as labels
      datasets: [
        {
          label: 'Collection Fees',
          data: Object.values(lastSixMonthsTotalFees),
          backgroundColor: '#2563eb',
          borderColor: '#2563eb',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Expenses',
          data: Object.values(lastSixMonthsSalaryData),
          backgroundColor: '#ef4444', // Apply Tailwind CSS color class
          borderColor: '#ef4444',
          tension: 0.1,
          fill: false,
        },
        {
          label: 'Profit',
          data: Object.values(monthlyProfit),
          backgroundColor: '#22c55e', // Apply Tailwind CSS color class
          borderColor: '#22c55e',
          tension: 0.1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Cleanup function to destroy the chart when the component unmounts
  return () => {
    if (myChart) {
      myChart.destroy();
    }
  };
}, []);

  return <canvas ref={chartRef} className="w-full h-full" />;
};

export default AccountChart;
