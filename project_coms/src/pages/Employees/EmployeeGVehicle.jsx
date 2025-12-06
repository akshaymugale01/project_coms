import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";

import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import EmployeePasses from "./EmployeePasses";

const EmployeeGuestVehicle = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const [userType, setUserType] = useState("occupant");

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/passes/gvehicles-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <button onClick={() => setIsModalOpen1(true)}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row) => row.Type,
      sortable: true,
    },
    {
      name: " Name",
      selector: (row) => row.Staff_Name,
      sortable: true,
    },
    {
      name: "Vehicle Number",
      selector: (row) => row.Vehicle_Number,
      sortable: true,
    },

    {
      name: "Mobile Number",
      selector: (row) => row.Mobile_Number,
      sortable: true,
    },
    {
      name: "Purpose",
      selector: (row) => row.Purpose,
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
      Type: "Guest",
      Vehicle_Number: "DD55GG5555",

      Mobile_Number: "8169182385",
      Purpose: "Personal",
      Staff_Name: "Mittu Panda",
      in_date: "25/05/2024",
      in_time: "2:00PM",
      out_date: "25/05/2024",
      out_time: "5:00PM",
    },
    {
      id: 2,
      Type: "Host",
      Vehicle_Number: "MH12T7898",

      Mobile_Number: "8169182385",
      Purpose: "Meeting",
      Staff_Name: "Rajnish Patil",
      in_date: "25/05/2024",
      in_time: "2:00PM",
      out_date: "25/05/2024",
      out_time: "5:00PM",
    },
    {
      id: 3,
      Type: "Staff",
      Vehicle_Number: "MH12T7898",

      Mobile_Number: "8169182385",
      Purpose: "Meeting",

      Staff_Name: "Dinesh Shinde",
      in_date: "25/05/2024",
      in_time: "2:00PM",
      out_date: "25/05/2024",
      out_time: "5:00PM",
    },
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <EmployeePasses />
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
            <input
              type="text"
              className="border border-black p-2 rounded-md placeholder:text-sm"
              placeholder="Search"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              // to={"/employee/addgvehicles"}
              className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
            >
              <PiPlusCircle size={20} />
              Add
            </button>
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
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
            <div className="bg-white p-5 rounded-md shadow-md w-1/3">
              <h2
                className="text-center md:text-xl font-bold p-2 bg-black rounded-full mb-4 text-white"
                style={{ background: themeColor }}
              >
                Add G Vehicles
              </h2>
              <form>
                <div className="flex gap-4 items-center mb-4">
                  <p className="font-bold">For</p>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="occupant"
                      className="mt-1"
                      checked={userType === "occupant"}
                      onChange={handleUserTypeChange}
                    />
                    <label className="text-center font-bold">Occupants</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="guest"
                      className="mt-1"
                      checked={userType === "guest"}
                      onChange={handleUserTypeChange}
                    />
                    <label className="text-center font-bold"> Guest</label>
                  </div>
                </div>
              </form>
              <div className="grid md:grid-cols-2 gap-5">
                {userType === "occupant" && (
                  <div className="grid gap-2 items-center w-full">
                    <label htmlFor="occupantUser" className="font-semibold">
                      Occupant User:
                    </label>

                    <input
                      type="text"
                      id="occupantUser"
                      name="occupantUser"
                      className="border p-2 rounded-md border-black"
                    />
                  </div>
                )}

                {userType === "guest" && (
                  <div className="grid gap-2 items-center w-full">
                    <label htmlFor="guestName" className="font-semibold">
                      Guest Name:
                    </label>
                    <input
                      type="text"
                      id="guestName"
                      name="guestName"
                      className="border p-2 rounded-md border-black"
                    />
                  </div>
                )}
                <div className="grid gap-2 items-center w-full">
                  <label htmlFor="slotNumber" className="font-semibold">
                    Slot Number
                  </label>
                  <input
                    type="text"
                    id="slotNumber"
                    name="slotNumber"
                    placeholder="Enter Slot Number"
                    className="border p-2 rounded-md border-black"
                  />
                </div>
                <div className="grid gap-2 items-center w-full">
                  <label htmlFor="vehicleCategory" className="font-semibold">
                    Parking Slot
                  </label>
                  <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                    <option>Select Parking Slot</option>
                    {/* Add options here */}
                  </select>
                </div>
                <div className="grid gap-2 items-center w-full">
                  <label htmlFor="vehicleType" className="font-semibold">
                    Entry Gate
                  </label>
                  <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                    <option>Select Entry Gate</option>
                    {/* Add options here */}
                  </select>
                </div>
              </div>
              <div className="mt-2 flex justify-center gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
                >
                  Close
                </button>
                <button
                  // onClick={handleAddDepartment}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        {isModalOpen1 && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
            <div className="bg-white p-5 rounded-md shadow-md w-1/3">
              <h2
                className="text-center md:text-xl font-bold p-2 bg-black rounded-full mb-4 text-white"
                style={{ background: themeColor }}
              >
                Edit G Vehicles
              </h2>
              <form>
                <div className="flex gap-4 items-center mb-4">
                  <p className="font-bold">For</p>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="occupant"
                      className="mt-1"
                      checked={userType === "occupant"}
                      onChange={handleUserTypeChange}
                    />
                    <label className="text-center font-bold">Occupants</label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="userType"
                      value="guest"
                      className="mt-1"
                      checked={userType === "guest"}
                      onChange={handleUserTypeChange}
                    />
                    <label className="text-center font-bold"> Guest</label>
                  </div>
                </div>
              </form>
              <div className="grid md:grid-cols-2 gap-5">
                {userType === "occupant" && (
                  <div className="grid gap-2 items-center w-full">
                    <label htmlFor="occupantUser" className="font-semibold">
                      Occupant User:
                    </label>

                    <input
                      type="text"
                      id="occupantUser"
                      name="occupantUser"
                      className="border p-2 rounded-md border-black"
                    />
                  </div>
                )}

                {userType === "guest" && (
                  <div className="grid gap-2 items-center w-full">
                    <label htmlFor="guestName" className="font-semibold">
                      Guest Name:
                    </label>
                    <input
                      type="text"
                      id="guestName"
                      name="guestName"
                      className="border p-2 rounded-md border-black"
                    />
                  </div>
                )}
                <div className="grid gap-2 items-center w-full">
                  <label htmlFor="slotNumber" className="font-semibold">
                    Slot Number
                  </label>
                  <input
                    type="text"
                    id="slotNumber"
                    name="slotNumber"
                    placeholder="Enter Slot Number"
                    className="border p-2 rounded-md border-black"
                  />
                </div>
                <div className="grid gap-2 items-center w-full">
                  <label htmlFor="vehicleCategory" className="font-semibold">
                    Parking Slot
                  </label>
                  <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                    <option>Select Parking Slot</option>
                    {/* Add options here */}
                  </select>
                </div>
                <div className="grid gap-2 items-center w-full">
                  <label htmlFor="vehicleType" className="font-semibold">
                    Entry Gate
                  </label>
                  <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                    <option>Select Entry Gate</option>
                    {/* Add options here */}
                  </select>
                </div>
              </div>
              <div className="mt-2 flex justify-center gap-2">
                <button
                  onClick={() => setIsModalOpen1(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
                >
                  Close
                </button>
                <button
                  // onClick={handleAddDepartment}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
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

export default EmployeeGuestVehicle;
