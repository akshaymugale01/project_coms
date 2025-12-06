import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";

import Table from "../../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";

const EmployeeRVehiclesHistory = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);

  const columns = [
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <div className="flex items-center gap-4">
    //       <Link to={`/employee/rvehicleshistdetails/${row.id}`}>
    //         <BsEye size={15} />
    //       </Link>
    //     </div>
    //   ),
    // },
    {
      name: "Vehicle Number",
      selector: (row) => row.Vehicle_Number,
      sortable: true,
    },

      {
        name: "Category",
        selector: (row) => row.Category,
        sortable: true,
      },

      {
        name: "Staff Name",
        selector: (row) => row.Staff_Name,
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


   
  ];


  const data = [
    {
        id: 1,
        Vehicle_Number: '5000',

    Category: 'Owned',

    Staff_Name: 'Mittu Panda',
    in_date:"25/05/2024",
    in_time:"2:00PM",
    out_date:"25/05/2024",
    out_time:"5:00PM",


    },
    {
        id: 2,
        Vehicle_Number: '789',

    Category: 'Staff',

    Staff_Name: 'Mittu Panda',
    in_date:"25/05/2024",
    in_time:"2:00PM",
    out_date:"25/05/2024",
    out_time:"5:00PM",
    },
    {
        id: 3,
        Vehicle_Number: '789',

        Category: 'Warehouse',

        Staff_Name: 'Mittu Panda',
        in_date:"25/05/2024",
        in_time:"2:00PM",
        out_date:"25/05/2024",
        out_time:"5:00PM",
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
          <input type="text"                 className="border border-black p-2 rounded-md placeholder:text-sm"
          placeholder="Search"        />
            {/* <Link
                to={"/employee/addrvehicles"}
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
                style={{ height: '1cm' }}
            >
                <PiPlusCircle size={20} />
                Add
            </Link> */}
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
        
        />
      </div>
    </section>
  );
};

export default EmployeeRVehiclesHistory