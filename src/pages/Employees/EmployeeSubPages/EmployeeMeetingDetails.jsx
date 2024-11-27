import React from "react";
import Detail from "../../../containers/Detail";
import DataTable from "react-data-table-component";
import { FaDownload } from "react-icons/fa";

const EmployeeMeetingDetails = () => {
  const meetingDetails = [
    { title: "Title :", description: "Website Discussion" },
    { title: "Date :", description: "24/05/2024" },
    { title: "Start Time :", description: "12:30 PM" },
    { title: "End Time :", description: "02:30 PM" },
    { title: "Status :", description: "Upcoming" },
  ];

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Organisation",
      selector: (row) => row.organisation,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: "Email id",
      selector: (row) => row.email,
      sortable: true,
    },
  ];
  const data = [
    {
      name: "Akshat Shrawat",
      organisation: "Vibecopilot",
      department: "Sale",
      email: "akshat.shrawat@vibecopilot.ai",
    },
    {
      name: "Anurag Sharma",
      organisation: "Vibecopilot",
      department: "Sale",
      email: "anurag.sharma@vibecopilot.ai",
    },
    {
      name: "Kunal Sah",
      organisation: "Vibecopilot",
      department: "IT",
      email: "kunal.sah@vibecopilot.ai",
    },
  ];

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

  return (
    <div className="flex flex-col justify-around ">
      <Detail heading={"Meeting Details"} details={meetingDetails} />
      <div className="my-5">
      <div className="border border-gray-500 my-2" />
        <div className="flex md:flex-row flex-col md:items-center justify-end gap-4 mx-2">
          <button className="border-2 border-black p-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 rounded-md font-medium">
            Summary
          </button>
          <button className="border-2 border-black p-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 rounded-md font-medium">
            Task
          </button>
          <button className="border-2 border-black p-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 rounded-md font-medium flex items-center justify-center gap-2">
          <FaDownload/>
            Meeting Video
          </button>
          <button className="border-2 border-black p-1 px-4 hover:bg-black hover:text-white transition-all ease-in-out duration-300 rounded-md font-medium flex items-center justify-center gap-2">
            <FaDownload/>
            Meeting Transcript
          </button>
        </div>
        <div className="border border-gray-500 my-2" />
        <DataTable
          responsive
          title="Attendees List"
          //   selectableRows
          columns={columns}
          data={data}
          customStyles={customStyle}
          // pagination
          fixedHeader
          // fixedHeaderScrollHeight="420px"
          //   selectableRowsHighlight
          //   highlightOnHover/
        />
      </div>
    </div>
  );
};

export default EmployeeMeetingDetails;
