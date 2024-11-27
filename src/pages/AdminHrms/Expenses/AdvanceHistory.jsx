import React, { useState } from "react";
import AdminHRMS from "../AdminHrms";
import ExpenseDetailsNav from "./ExpenseDetailsNav";
import PendingReports from "./PendingReports";
import CompletedReports from "./CompletedReports";
import { MdKeyboardArrowDown } from "react-icons/md";
import ProcessHistoryNav from "./ProcessHistoryNav";
import { FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import Table from "../../../components/table/Table";
import { BsEye } from "react-icons/bs";

const AdvanceHistory = () => {
  
  const columns = [
    {
      name: "Run date",
      selector: (row) => row.name,
    //   selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Advance Expense Report Details",
      selector: (row) => row.title,
      sortable: true,
    },
   
    {
      name: "Amount",
      selector: (row) => row.reimbursable,
      sortable: true,
    },
   
    
    {
      name: "Action",
      selector: (row) => (
        <div className="flex justify-center gap-2">
          <button
            // onClick={() => handleEditApplication(row.id)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
          >
            <BsEye size={15} />
          </button>
         
        
        </div>
      ),
      sortable: true,
    },
  ];

  const data = [
    {
name:"10/09/2024",
title: "Traveling",
submittedOn:"10/09/2024",
reimbursable: "400",
bill:"0",
status:"Level 1 approval pending"
    }
  ]
  return (
    <div className="flex">
      <AdminHRMS />
      <div className="ml-20">
        <ProcessHistoryNav />
      </div>
      {/* <div> */}

          <div className="w-full flex mx-3 flex-col overflow-hidden">
      <div className="flex gap-2 justify-between m-2 items-center">
        <input
          type="text"
          placeholder="Search by employee"
          //   value={searchText}
          //   onChange={handleSearch}
          className="border border-gray-400 w-96 placeholder:text-sm rounded-md p-2"
        />

        <button
          //   onClick={() => setIsModalOpen(true)}
          //   style={{ background: themeColor }}
          className="bg-black text-white hover:bg-gray-700 font-medium py-1 px-4 rounded-md"
        >
          Filter
        </button>
      </div>
      <Table columns={columns} data={data} isPagination={true} />
    </div>
    </div>
  );
};



export default AdvanceHistory
