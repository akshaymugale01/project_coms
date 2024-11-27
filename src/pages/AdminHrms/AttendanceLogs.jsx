import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { BiEdit } from "react-icons/bi";
import { useSelector } from "react-redux";

const AttendanceLogs = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const columns = [
   
    {
      name: "Employee Name",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Employee Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Created AT",
      selector: (row) => row.create,
      sortable: true,
    },
    {
        name: "	Capture Type",
        selector: (row) => row.Country,
        sortable: true,
      },
    {
        name: "Location",
        selector: (row) => row.loc,
        sortable: true,
      },
      {
        name: "Comment",
        selector: (row) => row.Comment,
        sortable: true,
      },
    // {
    //   name: "Status",
    //   selector: (row) => row.status,
    //   sortable: true,
    // },
    {
        name: "Selfie Image",
        selector: (row) => row.selfie,
        sortable: true,
      },
      {
        name: "Action",
  
        cell: (row) => (
          <div className="flex items-center gap-4">
            <button className="bg-red-500 text-white border p-2">Reject</button>
          </div>
        ),
      },
  
  ];

  const data = [
    {
      Name: "person 1",
      Location: "Sami Saudagar",
      code:"BPC8",
      City: "29-07-2024	",
      State: "2:00PM",

      create:"01-07-2024 03:09 PM",
      Country:"regularization request	",
      loc:"Fetching Address..",
      Comment:"Check Out Regularization request",
      selfie:"NA"
    },

  ];

  return (
    <section className="flex ml-20">
     {/* <OrganisationSetting/> */}
     <AdminHRMS/>
      <div className=" w-full flex m-3 flex-col overflow-hidden">
       
        <div className=" flex justify-end gap-2 my-5">
          <input
            type="text"
            placeholder="Search by Employee name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
<input 
  className="border p-1 w-64 px-4 border-gray-500 rounded-md" 
  value="2024-07" 
  type="month" 
/>
          {/* <Link
            to={"/templates/leave-templates"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link> */}
          <button style={{background:themeColor}} className="border border-black text-white  p-2">Export</button>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
    </section>
  );
};

export default  AttendanceLogs;