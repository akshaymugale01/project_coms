import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Table from "../../components/table/Table";
import { BiEdit } from "react-icons/bi";
import TaxDetailsList from './TaxDetailsList';
import AdminHRMS from './AdminHrms';
import { BsEye } from 'react-icons/bs';
import { useSelector } from "react-redux";

const ViewRecords = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const themeColor = useSelector((state) => state.theme.color);

    const columns = [
       {
          name: "Logs",
    
          cell: (row) => (
            <div className="flex items-center gap-4">
              <button onClick={() => setIsModalOpen(true)}
           
              >
                <BsEye size={15} />
              </button>
            </div>
          ),
        },
        {
          name: "Date",
          selector: (row) => row.Date,
          sortable: true,
        },
        {
          name: "Check In/Out",
          selector: (row) => row.check,
          sortable: true,
        },
        {
          name: "Shift Time",
          selector: (row) => row.shift,
          sortable: true,
        },
        {
          name: "Working/Deviation Hrs.",
          selector: (row) => row.working,
          sortable: true,
        },
        {
            name: "Break Hrs.",
            selector: (row) => row.break,
            sortable: true,
          },
        {
            name: "Status",
            selector: (row) => row.Status,
            sortable: true,
          },
      
      ];
      const columns1 = [
        // {
        //    name: "Logs",
     
        //    cell: (row) => (
        //      <div className="flex items-center gap-4">
        //        <button onClick={() => setIsModalOpen(true)}
            
        //        >
        //          <BsEye size={15} />
        //        </button>
        //      </div>
        //    ),
        //  },
         {
           name: "Time",
           selector: (row) => row.Date,
           sortable: true,
         },
         {
           name: "Capture Type",
           selector: (row) => row.check,
           sortable: true,
         },
         {
           name: "Location",
           selector: (row) => row.shift,
           sortable: true,
         },
         {
           name: "Comments",
           selector: (row) => row.working,
           sortable: true,
         },
        //  {
        //      name: "Break Hrs.",
        //      selector: (row) => row.break,
        //      sortable: true,
        //    },
        //  {
        //      name: "Status",
        //      selector: (row) => row.Status,
        //      sortable: true,
        //    },
       
       ];
    
      const data = [
        {
            Date: "01 Jul Mon",
          check: "08:45 AM to 10:00 PM",
          working: "13:15 Hrs / 04:15 Hrs",
          shift:"09:00 AM to 06:00 PM",
          break: "00:00 Hrs",
    
          Status:"Present",
    
        },
    
      ];
  return (
    <div className='flex ml-20'>
        {/* <TaxDetailsList/> */}
        <AdminHRMS/>
        <div className=" w-full flex m-3 flex-col overflow-hidden">
        <Link 
             to={"/admin/hrms/attendance-records"}
              className="bg-black h-10 mt-1  w-20 text-white py-1 px-4 rounded-lg"
              style={{ background: themeColor }}
            >
             Back
            </Link>
        <p className='font-bold'>
        Attendance Records</p>
        <div className=" flex justify-between my-5">
          <input
            type="text"
            placeholder="Search Employee "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
           
          />
         
        </div>
        
        <Table columns={columns} data={data} isPagination={true} />
        {isModalOpen && (
           <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-2/3">
            <p className='mb-2 mt-1'>Attendance Logs</p>
            <Table columns={columns1} data={data} isPagination={true} />
            <button onClick={() => setIsModalOpen(false)} className="bg-black h-10 mt-1  w-24 text-white py-1 px-4 rounded-lg">close</button>
            </div>
            </div>
        )}
      </div>
    </div>
  )
}

export default ViewRecords