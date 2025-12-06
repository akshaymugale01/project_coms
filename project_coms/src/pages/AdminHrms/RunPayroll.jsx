import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaArrowLeft, FaArrowRight, FaDownload } from 'react-icons/fa';
import AdminHRMS from './AdminHrms';
import { MdSettings, MdAnnouncement, MdPostAdd } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaEllipsisH } from 'react-icons/fa';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RunPayroll = () => {

  const data = {
    labels: ['Apr 24', 'May 24', 'Jun 24', 'Jul 24', 'Aug 24', 'Sep 24', 'Oct 24'],
    datasets: [
      {
        label: 'Total CTC',
        data: [4, 4.3, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Total Allowances',
        data: [3, 3.2, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Total Employer Contributions & Other Benefits',
        data: [2, 2.1, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Total Net Salary',
        data: [3.5, 3.6, 0, 0, 0, 0, 0],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'CTC Payout',
      },
    },
  };

  return (
    <div className="ml-20">
      <AdminHRMS />
      <div className="flex bg-gray-100 p-4">
        <div className="w-2/3 bg-white rounded-lg shadow-md p-6">
          <header className="flex items-center justify-between pb-4 border-b">
            <div>
              <h1 className="text-2xl font-semibold">Payroll Summary</h1>
              <p>Payroll summary of all employees under admin can access data from below section.</p>
            </div>
            <span className="text-xl text-gray-600">VibeCopilot AI</span>
          </header>
          <div className="mt-4">
            <CardSlider />
            <div className="mt-6">
              <div className='flex justify-between'>
              <h2 className="text-xl font-semibold mb-2">CTC Payout</h2>
              <div className='flex gap-2'>
              <select name="" id="" className='border p-2 border-black  w-64 rounded-md '><option value="">2024-2025</option></select>
              <button><FaDownload/></button>
              </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <Bar data={data} options={options} />
              </div>
            </div>
          </div>
        </div>
        <Summary />
      </div>
    </div>
  );
};

const CardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cards = [
    { status: "Completed", month: "May-2024", amount: "Rs. 0.0" },
    { status: "Upcoming", month: "Jun-2024", amount: "Rs. 0.0" },
    { status: "Upcoming", month: "Jul-2024", amount: "--" },
    { status: "Upcoming", month: "Aug-2024", amount: "--" },
    { status: "Upcoming", month: "Sep-2024", amount: "--" },
    { status: "Upcoming", month: "Oct-2024", amount: "--" },
    { status: "Upcoming", month: "Nov-2024", amount: "--" },
    { status: "Upcoming", month: "Dec-2024", amount: "--" },
    { status: "Upcoming", month: "Jan-2025", amount: "--" },
    { status: "Upcoming", month: "Feb-2025", amount: "--" },
    { status: "Upcoming", month: "Mar-2025", amount: "--" },
  ];

  const cardsToShow = 6;

  const nextCards = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCards = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="flex items-center space-x-4">
      <FaArrowLeft onClick={prevCards} className="cursor-pointer text-gray-600" />
      <div className="flex space-x-4 overflow-hidden">
        {cards.slice(currentIndex, currentIndex + cardsToShow).map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <FaArrowRight onClick={nextCards} className="cursor-pointer text-gray-600" />
    </div>
  );
};

const Card = ({ status, month, amount }) => (
  <div className="flex-1 bg-gray-100 rounded-lg p-4 text-center">
    <p className="text-lg font-medium">{status}</p>
    <p className="text-sm text-gray-600">{month}</p>
    <p className="text-xl font-semibold">{amount}</p>
  </div>
);

const Summary = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return(
  <div className="w-2/3 bg-white rounded-lg shadow-md p-6 ml-4">
    <div className='flex justify-between'>
    <h2 className="text-xl font-semibold mb-4">Summary</h2>
    <p>June-2024</p></div>
    <div>
      <div className='flex flex-col items-center justify-center'>
    <div className="flex flex-col items-center justify-center w-40 h-40 rounded-full border-4 border-green-500">
      <div className="text-small text-center font-bold ">Total Employees</div>
      <div className="text-2xl font-extrabold">22</div>
    </div></div>
      <div className="flex justify-between mt-4">
        <p className="font-medium">Status:</p>
        <p className="text-green-500">Completed - Pending for Approval</p>
      </div>
      <div className="flex justify-between mt-4">
        <p className="font-medium">Last Run On:</p>
        <p>04-07-2024</p>
        </div>
        <div className='flex justify-between mt-4'>
        <p className="font-medium">Last Run By:</p>
        <p>Shreya Mayekar</p>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4">
        <div>
          <p className="font-medium">Processed Employees</p>
          <p className="text-2xl">22</p>
        </div>
        <div>
          <p className="font-medium">FnF Employees</p>
          <p className="text-2xl">2</p>
        </div> 
        <div>
          <p className="font-medium">Pending Employees</p>
          <p className="text-2xl">0</p>
        </div>
        <div>
          <p className="font-medium">Hold Employees</p>
          <p className="text-2xl">0</p>
        </div>
      </div>
     
        <div className='flex justify-between mt-2'>
          <p className="font-small">Total Gross</p>
          <p className="">4,16,480.0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className="font-small">Total Employer PF</p>
          <p className="">0.0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className="font-small">Total Employer ESIC</p>
          <p className="">0.0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className="font-small">Total Employer LWF</p>
          <p className="">0.0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className="font-small">Total Other Benefits</p>
          <p className="">0.0</p>
        </div>
        <div className='flex justify-between mt-2'>
          <p className="font-small">Total CTC</p>
          <p className="">4,16,480.0</p>
        </div>
      
    </div>
    {expanded && (
            <div className="absolute bottom-2 right-10 mt-10 w-48 bg-white rounded-lg shadow-lg z-30">
              <ul className="py-1">
                <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer flex items-center">
                  {/* <MdSettings size={20} className="mr-2" /> */}
                  Approve Payroll
                </li>
                <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer flex items-center">
                  {/* <MdAnnouncement size={20} className="mr-2" /> */}
                  Re-run Payroll
                </li>
                <li className="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer flex items-center">
                  {/* <MdPostAdd size={20} className="mr-2" /> */}
                  Clear Payroll
                </li>
              </ul>
            </div>
          )}
    <div className="mt-6 flex justify-between">
      <button className="bg-orange-500 text-white py-2 px-4 rounded">Register</button>
      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">View Payroll</button>
      <div
              className="bg-blue-500 text-white border border-r-2 rounded-full"
              onClick={toggleExpand}
              style={{
                cursor: "pointer",
                padding: "10px",
                borderRadius: "50%",
              }}
            >
              <FaEllipsisH size={18} />
            </div>
          </div>
        </div>
  //   </div>
  // </div>
)
            }

export default RunPayroll;
