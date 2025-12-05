import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FaSpinner, FaUser } from 'react-icons/fa';
import { MdHourglassEmpty } from 'react-icons/md';
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { Link } from "react-router-dom";
import HRMSAlert from "./HRMSAlert";
import { useSelector } from "react-redux";

const PendingRequest = () => {
  const [showModal, setShowModal] = useState(false);
  const themeColor = useSelector((state) => state.theme.color);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const columns = [
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={openModal} className="text-blue-500 hover:text-blue-700 focus:outline-none">
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
    {
      name: "Employee Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.Category,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.Start_Date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.End_Date,
      sortable: true,
    },
    {
      name: "Leave Days",
      selector: (row) => row.Leave_Days,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const data = [
    {
      Name: "Mittu",
      Category: "ABC",
      Start_Date: "23/10/2024",
      End_Date: "23/10/2024",
      Leave_Days: "10",
      status: "Upcoming",
    },
  ];
  
    const handleViewClick = (type) => {
      alert(`View button clicked for ${type}`);
    };
  
    const cardsData = [
      {
        title: 'Pending Regularization Requests',
        count: 21,
        onButtonClick: () => handleViewClick('Pending Regularization Requests'),
      },
      {
        title: 'Employee Unactivated Accounts',
        count: 3,
        onButtonClick: () => handleViewClick('Employee Unactivated Accounts'),
      },
    ]
  return (
   
    <div className="mt-5">
      <HRMSAlert/>
    
      <div className="flex   ml-20 mt-5 bg-gray-100 space-x-4">
     
        <div  className="bg-white rounded-lg shadow-md p-6 w-96  mx-4 my-4">
          <div className="flex gap-2 text-center">
            <div className="flex flex-col mt-2 gap-5">
          <MdHourglassEmpty size={25} />
            <div className="text-3xl font-bold mb-2">21</div></div>
            <div className="border-l-2 mt-1 border-black h-20 mx-5"></div>
            <div className="flex flex-col">

            <div className="text-gray-700 mb-4">Pending Regularization Requests</div>
            <Link 
             to={"/admin/hrms/Regularization-Requests"}
              className="bg-black h-10 mt-1  w-24 text-white py-1 px-4 rounded-lg"
              style={{ background: themeColor }}
            >
              <p className="text-center mt-1 mr-1">View</p>
            </Link>
            
            </div>
          </div>
        </div>

        <div  className="bg-white rounded-lg shadow-md p-6 w-96  mx-4 my-4">
          <div className="flex gap-2 text-center">
          <div className="flex flex-col mt-2 gap-5">
          <FaUser size={25} />
            <div className="text-3xl font-bold mb-2">3</div></div>
            <div className="border-l-2 mt-1 border-black h-20 mx-5"></div>
            <div className="flex flex-col">
            <div className="text-gray-700 mb-4">Employee Unactivated Accounts</div>
            <Link 
             to={"/admin/hrms/employee-directory"}
             style={{ background: themeColor }}
              className="bg-black mr-1 h-10 mt-1  w-24 text-white py-1 px-4 rounded-lg"
             
            >
              <p className="text-center mt-1 mr-1">View</p>
            </Link>
            
            </div>
          </div>
        </div>
      
    </div>
    </div>
   
    // </section>
  );
};

export default PendingRequest;