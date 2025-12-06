import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Table from "../../../components/table/Table"
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";


const EmployeeRVehiclesTable = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const themeColor = useSelector((state) => state.theme.color);
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/rvehicles-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/employee/rvehicles-edit/${row.id}`}>
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Vehicle Number",
      selector: (row) => row.Vehicle_Number,
      sortable: true,
    },
    {
      name: "Parking Slot",
      selector: (row) => row.Parking_Slot,
      sortable: true,
    },
    {
      name: "Vehicle Category",
      selector: (row) => row.Vehicle_Category,
      sortable: true,
    },

    {
      name: "Vehicle Type",
      selector: (row) => row.Vehicle_Type,
      sortable: true,
    },

      {
        name: "Sticker Number",
        selector: (row) => row.Sticker_Number,
        sortable: true,
      },
      {
        name: "Category",
        selector: (row) => row.Category,
        sortable: true,
      },
      {
        name: "Registration Number",
        selector: (row) => row.Registration_Number,
        sortable: true,
      },
      {
        name: "Active/Inactive",
        selector: (row) => row.ActiveInactive,
        sortable: true,
      },
      {
        name: "Insurance Number",
        selector: (row) => row.Insurance_Number,
        sortable: true,
      },

      {
        name: "Insurance Valid Till",
        selector: (row) => row.Insurance_Valid_Till,
        sortable: true,
      },
      {
        name: "Staff Name",
        selector: (row) => row.Staff_Name,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
      },
      {
        name: "Qr Code",
        selector: (row) => row.Qr_Code,
        sortable: true,
      },


    // {
    //   name: "Cancellation",
    //   selector: (row) => (row.status === "Upcoming" && <button className="text-red-400 font-medium">Cancel</button>),
    //   sortable: true,
    // },
  ];

 
  const data = [
    {
        id: 1,
        Vehicle_Number: '5000',
    Parking_Slot: '12',
    Vehicle_Category: '4 Wheeler',
    Vehicle_Type: 'Hatchback',
    Sticker_Number: '11',
    Category: 'Owned',
    Registration_Number: '	5646456',
    ActiveInactive: 'Active',
    Insurance_Number: '55555555',
    Insurance_Valid_Till: '23/05/2024',
    Staff_Name: 'Mittu Panda',
    status: 'Active',
    Qr_Code: '45'
    },
    {
        id: 2,
        Vehicle_Number: '789',
    Parking_Slot: '45',
    Vehicle_Category: '2 wheeler',
    Vehicle_Type: 'SUV',
    Sticker_Number: '78',
    Category: 'Staff',
    Registration_Number: '456',
    ActiveInactive: 'Active',
    Insurance_Number: '45',
    Insurance_Valid_Till: '23/05/2024',
    Staff_Name: 'Rohit Sharma',
    status: 'completed',
    Qr_Code: '45'
    },
    {
        id: 3,
        Vehicle_Number: '789',
        Parking_Slot: '45',
        Vehicle_Category: '2 wheeler',
        Vehicle_Type: 'SUV',
        Sticker_Number: '78',
        Category: 'Staff',
        Registration_Number: '456',
        ActiveInactive: 'Active',
        Insurance_Number: '45',
        Insurance_Valid_Till: '23/05/2024',
        Staff_Name: 'shrikant mohite',
        status: 'completed',
        Qr_Code: '45'
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
            <Link
                to={"/employee/addrvehicles"}
                className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
               
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
         
        />
      </div>
    </section>
  );
};

export default EmployeeRVehiclesTable