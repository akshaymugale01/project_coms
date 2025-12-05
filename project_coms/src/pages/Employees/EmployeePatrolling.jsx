import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
//import Navbar from "../../../components/Navbar";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import Navbar from "../../components/Navbar";
import EmployeePasses from "./EmployeePasses";

const EmployeePatrolling = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/passes/patrolling-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <button  onClick={() => {
                      setModalVisible1(true);
                    }}>
            <BiEdit size={15} />
          </button>
        </div>
      ),
    },
    {
      name: "Location",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Scheduled Time",
      selector: (row) => row.Scheduled_Time,
      sortable: true,
    },
    {
      name: "Created On",
      selector: (row) => row.Created_On,
      sortable: true,
    },

    {
      name: "Start Date",
      selector: (row) => row.Start_Date,
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => row.End_Date,
      sortable: true,
    },

    {
      name: "Active/Inactive",
      selector: (row) => row.ActiveInactive,
      sortable: true,
    },

    {
      name: "Qr Code",
      selector: (row) => row.Qr_Code,
      sortable: true,
    },

  
  ];

 
  const data = [
    {
      id: 1,
      Location: "Mumbai",
      Scheduled_Time: "9:10AM",
      Created_On: "30/5/2024",
      Start_Date: "30/5/2024",
      End_Date: "30/5/2024",
      ActiveInactive: "Active",
      Qr_Code: "45",
    },
    {
      id: 2,
      Location: "Mumbai",
      Scheduled_Time: "9:10AM",
      Created_On: "30/5/2024",
      Start_Date: "30/5/2024",
      End_Date: "30/5/2024",
      ActiveInactive: "Active",
      Qr_Code: "45",
    },
    {
      id: 3,
      Location: "Mumbai",
      Scheduled_Time: "9:10AM",
      Created_On: "30/5/2024",
      Start_Date: "30/5/2024",
      End_Date: "30/5/2024",
      ActiveInactive: "Active",
      Qr_Code: "45",
    },
  ];

  return (
    <section className="flex">
      <Navbar/>
      <div className=" w-full flex mx-3 flex-col overflow-hidden">
        <EmployeePasses/>
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
          <input type="text"                 className="border w-64  border-black p-2 rounded-md placeholder:text-sm"
          placeholder="Search"        />
            <div
              onClick={openModal}
              className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
             
            >
              <PiPlusCircle size={20} />
              Add
            </div>

            {modalVisible && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={closeModal}
              >
                <div
                  className="bg-white p-4 rounded-md w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="text-gray-500 float-right text-2xl leading-none font-semibold"
                    onClick={closeModal}
                  >
                    &times;
                  </button>
                  <div className="flex justify-center items-center my-5 w-full p-2">
                    <form className="border border-gray-300 rounded-lg p-2 w-full mx-4">
                      <h2 style={{ background: themeColor }} className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white" >
                        Add
                      </h2>

                      <div className="grid grid-cols-1 gap-5 mt-2">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="flex flex-col">
                            <label htmlFor="building" className="font-semibold">
                              Building
                            </label>
                            <select
                              name="building"
                              placeholder="Enter Building Name"
                              className="border p-2 rounded-md border-black"
                            ><option value="">Building1</option></select>
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="wing" className="font-semibold">
                              Wing
                            </label>
                            <select
                              name="wing"
                              placeholder="Enter Wing"
                              className="border p-2 rounded-md border-black"
                            ><option value="">Wing1</option></select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="flex flex-col">
                            <label htmlFor="floor" className="font-medium">
                              Floor
                            </label>
                            <select
                              name="floor"
                              className="border p-2 rounded-md border-black"
                            ><option value="">Floor1</option></select>
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="room" className="font-medium">
                              Room
                            </label>
                            <select
                              name="room"
                              className="border p-2 rounded-md border-black"
                            ><option value="">Room1</option></select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="flex flex-col">
                            <label htmlFor="startTime" className="font-medium">
                              Start Time
                            </label>
                            <input
                              type="time"
                              name="startTime"
                              className="border p-2 rounded-md border-black"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="endTime" className="font-medium">
                              End Time
                            </label>
                            <input
                              type="time"
                              name="endTime"
                              className="border p-2 rounded-md border-black"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-5 justify-center items-center my-4">
                        <button
                          style={{ background: themeColor }}
                          className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            {modalVisible1 && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={() => {
                  setModalVisible1(false);
                }}
              >
                <div
                  className="bg-white p-4 rounded-md w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="text-gray-500 float-right text-2xl leading-none font-semibold"
                    onClick={() => {
                      setModalVisible1(false);
                    }}
                  >
                    &times;
                  </button>
                  <div className="flex justify-center items-center my-5 w-full p-2">
                    <form className="border border-gray-300 rounded-lg p-2 w-full mx-4">
                      <h2 className="text-center md:text-xl font-bold p-2 bg-black rounded-full text-white" style={{ background: themeColor }}>
                        Edit Patrolling
                      </h2>

                      <div className="grid grid-cols-1 gap-5 mt-2">
                        <div className="grid grid-cols-2 gap-5">
                          <div className="flex flex-col">
                            <label htmlFor="building" className="font-semibold">
                              Building
                            </label>
                            <select
                              name="building"
                              placeholder="Enter Building Name"
                              className="border p-2 rounded-md border-black"
                            ><option value="">Building1</option></select>
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="wing" className="font-semibold">
                              Wing
                            </label>
                            <select
                              name="wing"
                              placeholder="Enter Wing"
                              className="border p-2 rounded-md border-black"
                            ><option value="">Wing1</option></select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="flex flex-col">
                            <label htmlFor="floor" className="font-medium">
                              Floor
                            </label>
                            <select
                              name="floor"
                              className="border p-2 rounded-md border-black"
                            ><option value="">Floor1</option></select>
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="room" className="font-medium">
                              Room
                            </label>
                            <select
                              name="room"
                              className="border p-2 rounded-md border-black"
                            ><option value="">Room1</option></select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                          <div className="flex flex-col">
                            <label htmlFor="startTime" className="font-medium">
                              Start Time
                            </label>
                            <input
                              type="time"
                              name="startTime"
                              className="border p-2 rounded-md border-black"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="endTime" className="font-medium">
                              End Time
                            </label>
                            <input
                              type="time"
                              name="endTime"
                              className="border p-2 rounded-md border-black"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-5 justify-center items-center my-4">
                        <button
                          style={{ background: themeColor }}
                          className="text-white bg-black hover:bg-white hover:text-black border-2 border-black font-semibold py-2 px-4 rounded transition-all duration-300"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            
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

export default EmployeePatrolling;