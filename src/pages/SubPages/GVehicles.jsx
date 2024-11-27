import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
//import Navbar from "../../../components/Navbar";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import Table from "../../components/table/Table";
import Navbar from "../../components/Navbar";
import Passes from "../Passes";

const GVehicles = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/gvehicles-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-gvehicles/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Vehicle Number",
      selector: (row) => row.Vehicle_Number,
      sortable: true,
    },

    {
      name: "In Date",
      selector: (row) => row.in_date,
      sortable: true,
    },
    {
      name: "In Time",
      selector: (row) => row.in_time,
      sortable: true,
    },
    {
      name: "Out Date",
      selector: (row) => row.out_date,
      sortable: true,
    },
    {
      name: "Out Time",
      selector: (row) => row.out_time,
      sortable: true,
    },

    // {
    //   name: "Cancellation",
    //   selector: (row) => (row.status === "Upcoming" && <button className="text-red-400 font-medium">Cancel</button>),
    //   sortable: true,
    // },
    // {
    //   name: "Approval",
    //   selector: (row) => (row.status === "Upcoming" &&
    //   <div className="flex justify-center gap-2">
    //       <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full"><TiTick size={20} /></button>
    //       <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full"><IoClose size={20}  /></button>
    //   </div>
    // ),
    //   sortable: true,
    // },
  ];

  //custom style
  const customStyle = {
    headRow: {
      style: {
        backgroundColor: themeColor,
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
      type: "Host",
      name: "Rajesh Kumar",
      Vehicle_Number: "MH88J9090",
      in_date: "25/05/2024",
      in_time: "04:02 PM	",
      out_date: "25/05/2024",
      out_time: "05:00 PM	",
    },
    {
      id: 2,
      type: "Staff",
      name: "Devesh Jain",
      Vehicle_Number: "MH44Y5678",
      in_date: "27/05/2024",
      in_time: "05:02 PM	",
      out_date: "27/05/2024",
      out_time: "06:00 PM	",
    },
    {
      id: 1,
      type: "Guest",
      name: "Kshitij Rasal",
      Vehicle_Number: "MH55R5555",
      in_date: "28/05/2024",
      in_time: "06:02 PM	",
      out_date: "28/05/2024",
      out_time: "07:00 PM	",
    },
  
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <Passes />
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
          <span className="flex gap-4">
            <Link
              to={"/admin/add-gvehicles"}
              className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
              style={{ height: "1cm" }}
            >
              <PiPlusCircle size={20} />
              Add
            </Link>
            {/* <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                Import
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                Filter
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                History
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                All
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                In
            </button>
            <button className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center" style={{ height: '1cm' }}>
                Out
            </button> */}
          </span>
        </div>
        <Table
          responsive
          //   selectableRows
          columns={columns}
          data={data}
          isPagination={true}
          pagination
        />
      </div>
    </section>
  );
};

export default GVehicles;
