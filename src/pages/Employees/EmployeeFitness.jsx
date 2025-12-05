import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";

const EmployeeFitness = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/fitness-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Trainer",
      selector: (row) => row.trainer,
      sortable: true,
    },

    {
      name: "Relationship",
      selector: (row) => row.relationship,
      sortable: true,
    },
    { name: "age", selector: (row) => row.age, sortable: true },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Appointment Date",
      selector: (row) => row.appointment_date,
      sortable: true,
    },
    {
      name: "Appointment Time",
      selector: (row) => row.appointment_time,
      sortable: true,
    },
    {
      name: "Preference",
      selector: (row) => row.preference,
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
      name: "Kunal",
      trainer: "trainer",
      relationship: "self",
      age: 25,
      gender: "Male",
      appointment_date: "23/05/2024",
      appointment_time: "05:30 PM",
      preference: "Online",
      status: "Upcoming",
    },
  
    {
        id:2,
      name: "Kunal",
      trainer: "trainer 2",
      relationship: "self",
      age: 25,
      gender: "Male",
      appointment_date: "23/05/2024",
      appointment_time: "05:30 PM",
      preference: "Offline",
      status: "Completed",
    },
    {
        id: 3,
      name: "Kunal",
      trainer: "Trainer",
      relationship: "self",
      age: 25,
      gender: "Male",
      appointment_date: "23/05/2024",
      appointment_time: "05:30 PM",
      preference: "Online",
      status: "Cancelled",
    },
  
  ];

  return (
    <section className="flex">
      <Navbar />
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
            to={"/employee/book-fitness"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Book an Appointment
          </Link>
        </div>
        <Table
          responsive
          //   selectableRows
          columns={columns}
          data={data}
          // customStyles={customStyle}
          // pagination
          // fixedHeader
          // // fixedHeaderScrollHeight="450px"
          // selectableRowsHighlight
          // highlightOnHover
        />
      </div>
    </section>
  );
};




export default EmployeeFitness
