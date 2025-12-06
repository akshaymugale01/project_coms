import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { GrMapLocation } from "react-icons/gr";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import Navbar from "../../components/Navbar";
function EmployeeFieldSenseMeeting() {
  const column = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/field-sence-meeting-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },

    { name: "Meeting Title", selector: (row) => row.title, sortable: true },
    { name: "Meeting Date", selector: (row) => row.date, sortable: true },
    { name: "Meeting Time", selector: (row) => row.time, sortable: true },
    {
      name: "Participants",
      selector: (row) => row.participants,
      sortable: true,
    },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Travel Mode", selector: (row) => row.travelMode, sortable: true },
    { name: "Expenses", selector: (row) => row.expenses, sortable: true },
  ];

  const data = [
    {
      id: 1,
      title: "",
      date: "",
      time: "Elevator",
      participants: "2",
      location: "14/12/2020",
      travelMode: "Lockated Demo",
      expenses: "Pending",
      action: <BsEye />,
    },
    {
      id: 2,
      title: 309,
      date: "",
      time: "Air Conditioning",
      participants: "2",
      location: "27/07/2021",
      travelMode: "Lockated Demo",
      expenses: "Cancelled",
      action: <BsEye />,
    },
    {
      id: 3,
      title: 314,
      date: "",
      time: "Elevator",
      participants: "1",
      location: "14/12/2020",
      travelMode: "Lockated Demo",
      expenses: "Cancelled",

      action: <BsEye />,
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex flex-col overflow-hidden">
        <div className="flex justify-center my-2 w-full">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
            <NavLink
              to={"/employee/field-sense-meeting"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
              // onClick={() => setPage("fieldSenseMeeting")}
            >
              Meeting Management
            </NavLink>
            <NavLink
              to={"/employee/field-sense-leads"}
              className={({ isActive }) =>
                `p-1 ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`
              }
              // onClick={() => setPage("fieldSenseMeeting")}
            >
              Leads Management
            </NavLink>
          </div>
        </div>
        <div className="flex justify-end items-center sm:flex-row flex-col my-2 mx-3">
          <Link
            to={`/employee/field-sense-create-meeting`}
            className="border-2 border-black rounded-md flex font-semibold items-center  text-black p-1 px-4 "
          >
            <IoMdAdd size={20} />
            Create
          </Link>
        </div>
        <div className="mx-3">
          <Table columns={column} data={data} isPagination={true} />
        </div>
      </div>
    </section>
  );
}

export default EmployeeFieldSenseMeeting;
