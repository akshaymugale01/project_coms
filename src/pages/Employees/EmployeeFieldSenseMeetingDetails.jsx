import React from "react";
import Navbar from "../../components/Navbar";
import { FaDownload } from "react-icons/fa";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";

function EmployeeFieldSenseMeetingDetails() {
  const themeColor = useSelector((state) => state.theme.color);
  const column = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Organization",
      selector: (row) => row.organization,
      sortable: true,
    },
    { name: "Department", selector: (row) => row.department, sortable: true },
    { name: "Email Id", selector: (row) => row.email, sortable: true },
  ];

  const data = [
    {
      id: 1,
      name: "karan",
      organization: "GoPhygital",
      department: "IT",
      email: "karan@gmail.com",
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden mb-5">
        <h2
          className="text-center text-xl font-bold my-5 p-2 bg-black rounded-md text-white "
          style={{ background: themeColor }}
        >
          Field Sence Meeting Details
        </h2>
        <div className="flex justify-center">
          <div className="w-4/5 my-5">
            <div className="md:grid grid-cols-3 ">
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold">Title:</p>
                <p className="text-sm font-normal ">Project Discussion</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold">Date:</p>
                <p className="text-sm font-normal ">21-jun-2024</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold">Time:</p>
                <p className="text-sm font-normal ">2:00 Pm</p>
              </div>
            </div>
            <div className="md:grid grid-cols-3 md:my-3">
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold">Participants :</p>
                <p className="text-sm font-normal ">3</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold">Meeting Agenda:</p>
                <p className="text-sm font-normal ">Project</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold">Meeting Location:</p>
                <p className="text-sm font-normal ">Mumbai</p>
              </div>
            </div>
            <div className="md:grid grid-cols-3 md:my-3">
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold">Travel Mode :</p>
                <p className="text-sm font-normal ">Car</p>
              </div>
              <div className="grid grid-cols-2 items-center">
                <p className="font-semibold">Expenses:</p>
                <p className="text-sm font-normal ">Meals</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-b border-black py-3">
          <button className="border-2 border-black p-1 px-4 rounded-md">
            Notes
          </button>
          <button className="border-2 border-black p-1 px-4 rounded-md flex gap-3">
            <FaDownload />
            Audio
          </button>
        </div>
        <div className="my-5">
          <Table columns={column} data={data} isPagination={true} />
        </div>
      </div>
    </section>
  );
}

export default EmployeeFieldSenseMeetingDetails;
