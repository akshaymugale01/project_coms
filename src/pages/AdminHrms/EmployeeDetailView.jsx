import React from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EmployeeDetailView = ({ employee, closeDetail }) => {
  const themeColor = useSelector((state) => state.theme.color);

  return (
    <div className="fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg z-50 p-4">
        <div className='flex justify-between'>
         <h3 className="text-lg font-semibold mb-4">Selected Employee Details</h3>
      <button className="text-gray-600 hover:text-gray-900" onClick={closeDetail}>X</button></div>
      <div className="flex flex-col ">
        
      <div className='flex gap-2'>
            <div className='mt-2'>
          <span className="bg-gray-200 p-2 rounded-full mt-2 mr-2">{employee.code}</span></div>
          <div className='flex flex-col mb-2'>
          <p className="font-semibold text-sm">{employee.name}</p>
          <p className='font-sm'>Business & Operations Manager</p></div>
          <div className='ml-5'>
          <Link 
             to={"/admin/hrms/view-records"}
              className="bg-black h-10 mt-1  w-30 text-white py-1 px-4 rounded-lg"
              style={{ background: themeColor }}
            >
              View Records
            </Link></div>
          </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Attendance Details</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-green-500">Present</span>
          <span>0 days</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-red-500">Absent</span>
          <span>0 days</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-black">Invalid Record</span>
          <span>0 days</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-orange-500">Approved Leaves</span>
          <span>0 days</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-500">Holidays</span>
          <span>0 days</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-yellow-500">Weekly Off</span>
          <span>0 days</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-blue-500">Early Mark/Late Mark</span>
          <span>0 days</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-yellow-500">Total Worked Hours</span>
          <span>0 days</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailView;
