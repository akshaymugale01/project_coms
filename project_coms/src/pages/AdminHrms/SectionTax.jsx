import React, { useState, useRef } from "react";
import EmployeeSections from './EmployeeSections'
import EditEmployeeDirectory from "./EditEmployeeDirectory";
import Table from "../../components/table/Table";
import { Link, useParams } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { FaDownload } from "react-icons/fa";

const SectionTax = () => {
  const { id } = useParams();
  const column = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/tax-edit`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },

    { name: "Fiscal Year", selector: (row) => row.year, sortable: true },
    { name: "Total Section-80 C Declarations", selector: (row) => row.td, sortable: true },
    { name: "Total Other Declarations", selector: (row) => row.od, sortable: true },
  
    { name: "Total Rent Declarations", selector: (row) => row.rd, sortable: true },
    { name: "Total Perquisites", selector: (row) => row.tp, sortable: true },
    { name: "Total Other Income", selector: (row) => row.ti, sortable: true },
    
  ];
  

  const data = [
    {
      year:"2023-2024",
      td:"0",
      od:"0",
      rd:"0",
     tp:"0",
     ti:"0"
    }
  ]

 
  return (
    <div className='flex flex-col ml-20'>
        <EditEmployeeDirectory/>
       
        <div className='flex'>
            <div className=''>
                <EmployeeSections empId={id}  />
            </div>
            <div className=" w-full mt-10 p-5 border border-gray-300 shadow-lg rounded-md">
              <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-6">Tax  Information</h2>
            <button className="bg-black text-white mb-2 hover:bg-gray-700 font-semibold py-2 px-4 rounded">
              <div className="flex gap-2">
              <FaDownload/>
              Form 12B</div></button>
            </div>
            <Table columns={column} data={data} isPagination={true} />
    </div>
        </div>
    </div>
  )
}

export default SectionTax