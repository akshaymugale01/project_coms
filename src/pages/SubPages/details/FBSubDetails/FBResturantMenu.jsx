import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
//import Navbar from "../../../components/Navbar";
import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import Table from "../../../../components/table/Table";
import { BiEdit } from "react-icons/bi";

const FBRestaurtantMenu = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state)=> state.theme.color)

  const columns = [
    {
      name: "Action",
      cell: (row) => (

        <div className="flex items-center gap-4">
             <Link to={`/admin/fb-resmenudetails/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-resmenu/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "SKU",
      selector: (row) => row.SKU,
      sortable: true,
    },

      {
        name: "Products",
        selector: (row) => row.Products,
        sortable: true,
      },

      {
        name: "Master Price",
        selector: (row) => row.Master_Price,
        sortable: true,
      },
      {
        name: "Display Price",
        selector: (row) => row.Display_Price,
        sortable: true,
      },

      {
        name: "Category",
        selector: (row) => row.Category,
        sortable: true,
      },
      {
        name: "SubCategory",
        selector: (row) => row.Category,
        sortable: true,
      },
      {
        name: "Created On",
        selector: (row) => row.Created_On,
        sortable: true,
      },
      {
        name: "Updated On",
        selector: (row) => row.Updated_On,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.Status,
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
        Vehicle_Number: '789',
        Name:"mp",
        Booked_on:"23/4/2024",
        Schedule_on:"23/4/2024",
        Guest:4,
        Status:"pending",
        Additional_Request:"seat book",


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
                  selectedStatus === "upcoming" ||
                  selectedStatus === "upcoming"
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
                to={"/admin/fb-res-menu"}
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ height: '1cm' }}
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

          columns={columns}
          data={data}

          isPagination={true}

        />
      </div>
    </section>
  );
};

export default FBRestaurtantMenu