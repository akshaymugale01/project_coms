import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import { IoVideocam } from "react-icons/io5";

const EmployeeMeeting = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleStatusChange = (status) => {
    setSelectedStatus(status);

    if (status === "all") {
      setFilteredData(complaints);
    } else {
      const filteredResults = complaints.filter(
        (item) => item.issue_status.toLowerCase() === status.toLowerCase()
      );

      setFilteredData(filteredResults);
    }
  };
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/meeting-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
    },
    {
      name: "No. of Attendees ",
      selector: (row) => row.attendees,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Join",
      selector: (row) =>
        row.status === "Upcoming" && (
          <button className="p-1 px-4 bg-green-400 rounded-full hover:bg-green-600 text-white font-medium flex justify-center items-center gap-2 transition-all ease-in-out duration-300">
            <IoVideocam /> Join
          </button>
        ),
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "website Discussion",
      date: "21/05/2024",
      time: "12:20 PM",
      attendees: 3,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Sales Discussion",
      date: "21/05/2024",
      time: "12:20 PM",
      attendees: 3,
      status: "Completed",
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
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 my-5 flex-col overflow-hidden">
        <h2 className="font-semibold text-xl">Meetings</h2>
        <div className=" flex justify-between items-center">
          <div className="flex sm:flex-row flex-col justify-between w-full my-5">
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
                  checked={selectedStatus === "upcoming"}
                  onChange={() => handleStatusChange("upcoming")}
                />
                <label htmlFor="upcoming" className="text-sm">
                  Upcoming
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
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by Title "
                className="border border-gray-400 w-96 placeholder:text-xs rounded-lg p-2"
                //   value={searchText}
                //   onChange={handleSearch}
              />
              <Link
                to={"/employee/meetings/create-meeting"}
                className="border-2 font-semibold hover:bg-black hover:text-white duration-300 ease-in-out transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center px-4 gap-2 justify-center"
                // onClick={() => setShowCountry(!showCountry)}
              >
                <PiPlusCircle size={20} />
                Meeting Invite
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4  mb-5">
          <DataTable
            responsive
            columns={columns}
            data={data}
            customStyles={customStyle}
            pagination
            fixedHeader
            // fixedHeaderScrollHeight="420px"
            //   selectableRowsHighlight
            //   highlightOnHover
          />
        </div>
      </div>
    </section>
  );
};

export default EmployeeMeeting;
