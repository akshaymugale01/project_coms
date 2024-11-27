import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import Table from "../components/table/Table";
import ToggleSwitch from "../Buttons/ToggleSwitch";
import Pantry from "./Pantry";

const FoodsBeverage = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const [page, setPage] = useState("F&B")

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/fb-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/fb-edit/${row.id}`}>
            <BiEdit size={15} />
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
      name: "Open Days",
      selector: (row) => row.Open_Days,
      sortable: true,
    },



    {
      name: "Booking Allowed",
      selector: (row) => row.Booking_Allowed,
      sortable: true,
    },

    {
      name: "Order Allowed",
      selector: (row) => row.Order_allow,
      sortable: true,
    },
    {
        name: "Active",
        selector: (row) => row.active,
        sortable: true,
      },

    {
      name: "Cancellation",
      selector: (row) =>
        row.status === "Upcoming" && (
          <button className="text-red-400 font-medium">Cancel</button>
        ),
      sortable: true,
    },
    {
      name: "Approval",
      selector: (row) =>
        row.status === "Upcoming" && (
          <div className="flex justify-center gap-2">
            <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <TiTick size={20} />
            </button>
            <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <IoClose size={20} />
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
      name: "Haven Cafe",
      Open_Days:"M T W T F S S",
      Booking_Allowed: <ToggleSwitch/>,
      Order_allow:<ToggleSwitch/>,
      active: <ToggleSwitch/>,

    },
    {
        id: 2,
        name: "Haven Cafe",
        Open_Days:"M T W T F S S",
        Booking_Allowed: <ToggleSwitch/>,
        Order_allow:<ToggleSwitch/>,
        active: <ToggleSwitch/>,

    },
    {
        id: 3,
        name: "Haven Cafe",
        Open_Days:"M T W T F S S",
        Booking_Allowed: <ToggleSwitch/>,
        Order_allow:<ToggleSwitch/>,
        active: <ToggleSwitch/>,
    },
  ];

  return (
    <section className="flex">
      <Navbar/>
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
      <div className="flex justify-center my-2 w-full">
      <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-1 sm:rounded-full rounded-md bg-gray-200">
            <h2
              className={`p-1 ${
                page === "F&B" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
              onClick={() => setPage("F&B")}
            >
              F&B
            </h2>
            <h2
              className={`p-1 ${
                page === "pantry" &&
                "bg-white text-blue-500 shadow-custom-all-sides"
              } rounded-full px-4 cursor-pointer transition-all duration-300 ease-linear`}
              onClick={() => setPage("pantry")}
            >
              Pantry
            </h2>
          </div>
        </div>
        {page === "F&B" && <>
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
              to={"/admin/add-fb"}
              className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
              style={{ height: "1cm" }}
            >
              <PiPlusCircle size={20} />
              Add
            </Link>

            <input
            type="text"
            placeholder="Search  "
            className="border border-gray-400 w-96 placeholder:text-xs rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          // onClick={exportToExcel}
          >
          Export
        </button>
          </span>
        </div>
        <Table
          responsive
          //   selectableRows
          columns={columns}
          data={data}
          isPagination={true}
        />
         </>}
         {page === "pantry" && <Pantry/>}
      </div>
    </section>
  );
};

export default FoodsBeverage;