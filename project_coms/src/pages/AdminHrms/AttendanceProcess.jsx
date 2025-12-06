import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { BiEdit } from "react-icons/bi";
import { FaDownload, FaTrash } from "react-icons/fa";

const AttendanceProcess = () => {
  const columns = [
  
    {
      name: "ATTENDANCE PROCESS PERIOD",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "RUN DATE",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "PROCESS DETAILS",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "EXPORT TO LEAVE	",
      selector: (row) => row.State,
      sortable: true,
    },
    {
        name: "	EXPORT TO PAYROLL",
        selector: (row) => row.Country,
        sortable: true,
      },
   
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link 
          to={`/admin/edit-attendance-process/${row.id}`}
          >
            <BiEdit size={15} />
          </Link>
          <FaDownload size={15}/>
        </div>
      ),
    },
   
  ];

  const data = [
    {
      Name: "person 1",
      Location: "June-2024",
      Label: "04-07-2024",
      State: "No",
      City:"No of Processed Employees: 12",
      Country:"No",
      status:"completed"
    },

  ];

  return (
    <section className="flex ml-20">
     {/* <OrganisationSetting/> */}
     <AdminHRMS/>
      <div className=" w-full flex m-3 flex-col overflow-hidden">
      
        <div className=" flex justify-between my-5">
          <p className="font-semibold">Attendance Finalization</p>
          {/* <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
           
          /> */}
          {/* <Link
            to={"/templates/leave-templates"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link> */}
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
    </section>
  );
};

export default AttendanceProcess;