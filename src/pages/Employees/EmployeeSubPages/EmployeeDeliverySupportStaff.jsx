import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";

import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";


const EmployeeDeliverySupportStaff = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");


  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/delivery-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobile_number,
      sortable: true,
    },
    {
      name: "Visitor Name",
      selector: (row) => row.visitor_name,
      sortable: true,
    },
    {
      name: "Vehicle Number",
      selector: (row) => row.vehicle_number,
      sortable: true,
    },
    {
      name: "Expected Date",
      selector: (row) => row.expected_date,
      sortable: true,
    },
    {
      name: "Expected Time",
      selector: (row) => row.expected_time,
      sortable: true,
    },
    {
      name: "Notes",
      selector: (row) => row.notes,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Cancellation",
      selector: (row) => (row.status === "Upcoming" && <button className="text-red-400 font-medium">Cancel</button>),
      sortable: true,
    },
  ];


  //custom style
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: "black",
        color: "white",


        fontSize: "10px",
      },
    },
    headCells: {
      style: {
        textTransform: "upperCase",
      },
    },
  };
  const data = [
    {
        id: 1,
       mobile_number: 1234567890,
      visitor_name: "doc",
      vehicle_number: 123,
      expected_date: "23/05/2024",
      expected_time: "05:30 PM",
      notes:"abcd",
      purpose:"meeting",
      status: "Upcoming",
    },
 
    {
      id: 2,
       mobile_number: 1234567890,
      visitor_name: "doc",
      vehicle_number: 123,
      expected_date: "23/05/2024",
      expected_time: "05:30 PM",
      notes:"abcd",
      purpose:"meeting",
      status: "Completed",
  },
  {
    id: 3,
    mobile_number: 1234567890,
   visitor_name: "doc",
   vehicle_number: 123,
   expected_date: "23/05/2024",
   expected_time: "05:30 PM",
   notes:"abcd",
   purpose:"meeting",
   status: "Cancelled",
},
 
  ];


  return (
    <section className="flex">
     
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex md:flex-row flex-col gap-5 justify-between mt-10 my-2">
          <div className="sm:flex grid grid-cols-2 items-center justify-center  gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === "all"}
                onChange={() => handleStatusChange("all")}
              />
              <label htmlFor="all" className="text-sm">
                All
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="upcomming"
                name="status"
                // checked={selectedStatus === "open"}
                checked={
                  selectedStatus === "upcomming" ||
                  selectedStatus === "upcomming"
                }
                // onChange={() => handleStatusChange("open")}
              />
              <label htmlFor="open" className="text-sm">
                upcomming
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="completed"
                name="status"
                checked={selectedStatus === "completed"}
                onChange={() => handleStatusChange("completed")}
              />
              <label htmlFor="completed" className="text-sm">
                Completed
              </label>
            </div>


            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cancelled"
                name="status"
                checked={selectedStatus === "cancelled"}
                //   onChange={() => handleStatusChange("cancelled")}
              />
              <label htmlFor="completed" className="text-sm">
                Cancelled
              </label>
            </div>
          </div>
          <Link
            to={"/employee/create-visitor"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
        </div>
        <DataTable
          responsive
          //   selectableRows
          columns={columns}
          data={data}
          customStyles={customStyle}
          pagination
          fixedHeader
          // fixedHeaderScrollHeight="450px"
          selectableRowsHighlight
          highlightOnHover
        />
      </div>
    </section>
  );
};


export default EmployeeDeliverySupportStaff



