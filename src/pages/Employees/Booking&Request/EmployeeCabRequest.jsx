import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Table from "../../../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import Navbar from "../../../components/Navbar";

const EmployeeCabRequest = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);

  const CustomNavLink = ({ to, children }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `p-1 rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive
              && "bg-white text-blue-500 shadow-custom-all-sides"
              
          }`
        }
      >
        {children}
      </NavLink>
    );
  };

  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employee/cab-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Employee ID",
      selector: (row) => row.Id,
      sortable: true,
    },
    {
      name: "Employee Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Pickup Location",
      selector: (row) => row.Pickup_Location,
      sortable: true,
    },
    {
      name: "Drop-off Location",
      selector: (row) => row.Dropoff_location,
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
      name: "Number of Passengers",
      selector: (row) => row.noofpassenger,
      sortable: true,
    },
    {
      name: "Driver Information",
      selector: (row) => row.driver,
      sortable: true,
    },
    {
      name: "Transportation Type",
      selector: (row) => row.type,
      sortable: true,
    },
    {
      name: "Class",
      selector: (row) => row.Class,
      sortable: true,
    },
    {
      name: "Special Requirements",
      selector: (row) => row.req,
      sortable: true,
    },
    {
      name: "Vehicle Details",
      selector: (row) => row.Passport_Information,
      sortable: true,
    },
    {
      name: "Manager Approval",
      selector: (row) => row.Manager_Approval,
      sortable: true,
    },
    {
      name: "Booking Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Confirmation Email",
      selector: (row) => row.email,
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
  ];

  // Custom style for the table
  // const customStyle = {
  //   headRow: {
  //     style: {
  //       backgroundColor: themeColor,
  //       color: "white",
  //       fontSize: "10px",
  //     },
  //   },
  //   headCells: {
  //     style: {
  //       textTransform: "uppercase",
  //     },
  //   },
  // };

  const data = [
    {
      id: 1,
      Id: "55",
      name: "Mi",
      Pickup_Location: "Mumbai",
      Dropoff_location: "abc",
      date: "15/02/2024",
      time: "7:00pm",
      noofpassenger: "4",
      driver: "abc",
      type: "Cab",
      Ticket_number: "89",
      booking_email: "jkl",
      Class: "Economy",
      Passenger_Name: "abc",
      Passport_Information: "ab",
      Manager_Approval: "Upcoming",
      status: "pending",
    },
    // Add more data entries as needed
  ];

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex justify-center w-full my-2">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200">
            <CustomNavLink to="/employee/booking-request/hotel-request">
              Hotel Request
            </CustomNavLink>
            <CustomNavLink to="/employee/booking-request/flight-ticket-request">
              Flight Ticket Request
            </CustomNavLink>
            <CustomNavLink to="/employee/booking-request/cab-bus-request">
              Cab/Bus Request
            </CustomNavLink>
            <CustomNavLink to="/employee/booking-request/transportation-request">
              Transportation Request
            </CustomNavLink>
            <CustomNavLink to="/employee/booking-request/traveling-allowance-request">
               Traveling Allowance Request
            </CustomNavLink>
          </div>
        </div>

      <div className="w-full flex mx-3 flex-col overflow-hidden">
        <div className="flex md:flex-row flex-col gap-5 justify-between mt-10 my-2">
          <div className="sm:flex grid grid-cols-2 items-center justify-center gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="all"
                name="status"
                checked={selectedStatus === "all"}
                onChange={() => setSelectedStatus("all")}
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
                onChange={() => setSelectedStatus("upcoming")}
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
                onChange={() => setSelectedStatus("completed")}
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
                onChange={() => setSelectedStatus("cancelled")}
              />
              <label htmlFor="cancelled" className="text-sm">
                Cancelled
              </label>
            </div>
          </div>
          <span className="mr-4">
            <Link
              to="/employee/add-cab-request"
              className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
              style={{ height: "1cm" }}
            >
              <PiPlusCircle size={20} />
              Add
            </Link>
          </span>
        </div>
        <div className="w-full flex mx-3 flex-col overflow-hidden">
          <Table
            responsive
            columns={columns}
            data={data}
            // customStyles={customStyle}
            pagination
            fixedHeader
            selectableRowsHighlight
            highlightOnHover
          />
        </div>
      </div></div>
    </section>
  );
};

export default EmployeeCabRequest;