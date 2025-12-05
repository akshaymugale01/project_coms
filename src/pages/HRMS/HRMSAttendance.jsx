import { useState } from "react";
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
import HRMS from "./HRMS";
const HRMSAttendance = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/hrms-attendance-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          {/* <Link 
          to={`/admin/employee-onboarding-edit/${row.id}`}
          >
            <BiEdit size={15} />
          </Link> */}
        </div>
      ),
    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.Department,
      sortable: true,
    },
    {
      name: "Time in",
      selector: (row) => row.time_in,
      sortable: true,
    },

    {
      name: "Time Out",
      selector: (row) => row.time_out,
      sortable: true,
    },

    {
      name: "Total Hours Worked",
      selector: (row) => row.work,
      sortable: true,
    },
    // {
    //   name: "Email Address",
    //   selector: (row) => row.Email_Address,
    //   sortable: true,
    // },

    // {
    //   name: "Phone Number",
    //   selector: (row) => row.Phone_Number,
    //   sortable: true,
    // },
    // {
    //   name: "Permanent Address",
    //   selector: (row) => row.Permanent_Address,
    //   sortable: true,
    // },

    // {
    //   name: "Current Address",
    //   selector: (row) => row.Current_Address,
    //   sortable: true,
    // },
    // {
    //   name: "Status",
    //   selector: (row) => row.status,
    //   sortable: true,
    // },

    // {
    //   name: "Cancellation",
    //   selector: (row) =>
    //     row.status === "Upcoming" && (
    //       <button className="text-red-400 font-medium">Cancel</button>
    //     ),
    //   sortable: true,
    // },
    // {
    //   name: "Approval",
    //   selector: (row) =>
    //     row.status === "Upcoming" && (
    //       <div className="flex justify-center gap-2">
    //         <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
    //           <TiTick size={20} />
    //         </button>
    //         <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
    //           <IoClose size={20} />
    //         </button>
    //       </div>
    //     ),
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
      name: "Mittu",
      Department:"IT",
      date: "03/02/2004",
      time_in:"4:00pm",
      time_out:"5:00pm",
      work:"5",
    },
    {
      id: 2,
      name: "Mittu",
      Department:"IT",
      date: "03/02/2004",
      time_in:"4:00pm",
      time_out:"5:00pm",
      work:"5",


    },
    {
      id: 3,
      name: "Mittu",
      Department:"IT",
      date: "03/02/2004",
      time_in:"4:00pm",
      time_out:"5:00pm",
      work:"5",


    },
  ];

  return (
    <section className="flex">
        <HRMS/>
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

          <span className="flex gap-4">
          <input
            type="text"
            placeholder="Search"
            className="border-2 p-2 w-96 border-gray-300 rounded-lg"
            // value={searchText}
            // onChange={handleSearch}
          />
          {/* <Link
            to={"/admin/add-employee-onboarding"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link> */}
            <button
              className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
              style={{ height: "1cm" }}
            >
              Filter
            </button>
          </span>
        </div>
        <Table
          columns={columns}
          data={data}
        //   customStyles={customStyle}
          isPagination={true}
        />
      </div>
    </section>
  );
};

export default HRMSAttendance;