import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
//import Navbar from "../../../components/Navbar";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";

const AddVisitor = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/visitor-details/${row.id}`}>
            <span className="flex items-center gap-4">
              <BsEye size={15} />
              <Link to={`/admin/edit-visitor/${row.id}`}>
                <BiEdit size={15} />
              </Link>
            </span>
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
      name: "Additional Visitor",
      selector: (row) => row.additional_visitor,
      sortable: true,
    },
    {
      name: "Coming From",
      selector: (row) => row.coming_from,
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
      name: "Purpose",
      selector: (row) => row.purpose,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) => row.createdby,
      sortable: true,
    },
    {
      name: "Accept/Reject",
      selector: (row) =>
        row.status === "Upcoming" && (
          <div className="flex gap-2">
            <button className="p-1 px-4 bg-green-400 rounded-full hover:bg-green-600 text-white font-medium flex justify-center items-center gap-2 transition-all ease-in-out duration-300">
              <FaCheck />
            </button>
            <button className=" p-2 bg-red-400 rounded-full hover:bg-red-600 text-white font-medium flex justify-center items-center gap-2 transition-all ease-in-out duration-300">
              <IoClose />
            </button>
          </div>
        ),
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
      additional_visitor: "self",
      coming_from: 25,
      vehicle_number: 123,
      expected_date: "23/05/2024",
      expected_time: "05:30 PM",
      preference: "Online",
      purpose: "meeting",
      status: "Upcoming",
      createdby: "A",
    },

    {
      id: 2,
      mobile_number: 1234567890,
      visitor_name: "ABC",
      additional_visitor: "self",
      coming_from: 25,
      vehicle_number: 123,
      expected_date: "23/05/2024",
      expected_time: "05:30 PM",
      preference: "Online",
      purpose: "meeting",
      status: "Completed",
      createdby: "MP",
    },
    {
      id: 3,
      mobile_number: 1234567890,
      visitor_name: "DEF",
      additional_visitor: "self",
      coming_from: 25,
      vehicle_number: 123,
      expected_date: "23/05/2024",
      expected_time: "05:30 PM",
      preference: "Online",
      purpose: "meeting",
      status: "Cancelled",
      createdby: "N",
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
                id="upcoming"
                name="status"
                // checked={selectedStatus === "open"}
                checked={
                  selectedStatus === "upcoming" || selectedStatus === "upcoming"
                }
                // onChange={() => handleStatusChange("open")}
              />
              <label htmlFor="open" className="text-sm">
                upcoming
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
            to={"/admin/create-visitor"}
            style={{ background: themeColor }}
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

export default AddVisitor;
