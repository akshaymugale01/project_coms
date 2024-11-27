import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import Table from "../../../components/table/Table";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import Navbar from "../../../components/Navbar";

const EmployeeTravellingAllowanceRequest = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const themeColor = useSelector((state) => state.theme.color);

  const CustomNavLink = ({ to, children }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `p-1 rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
            isActive && 'bg-white text-blue-500 shadow-custom-all-sides' 
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
          <Link to={`/employee/travelling-details/${row.id}`}>
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
      name: "Expense Category",
      selector: (row) => row.Expense_Category,
      sortable: true,
    },
    {
      name: "Date of Expense",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Description of Expense",
      selector: (row) => row.expense,
      sortable: true,
    },
    {
      name: "Amount Spent",
      selector: (row) => row.spent,
      sortable: true,
    },
    {
      name: "Supporting Documents",
      selector: (row) => row.document,
      sortable: true,
    },
    {
      name: "Reimbursement Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Reimbursement Method",
      selector: (row) => row.method,
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
      name: "Reimbursement Confirmation Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Cancellation",
      selector: (row) => (row.status === "Upcoming" && <button className="text-red-400 font-medium">Cancel</button>),
      sortable: true,
    },
  ];

  // Custom table styles
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

  // Dummy data for demonstration
  const data = [
    {
      id: 1,
      Id: "55",
      name: "Mi",
      Expense_Category: "Meals",
      Arrival_City: "abc",
      Departure: "",
      date: "15/02/2024",
      time: "5:00pm",
      expense: "ghj",
      spent: "jkl",
      amount: "567",
      document: "abc",
      method: "ab",
      Manager_Approval: "Upcoming",
      status: "pending",
    },
  ];

  // Function to handle status change (e.g., all, upcoming, completed, cancelled)
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // Additional logic can be added here if needed
  };

  return (
    <section className="flex">
      <Navbar />
      <div className="w-full flex mx-3 flex-col overflow-hidden">
        {/* Navigation links */}
        <div className="flex justify-center w-full my-2">
          <div className="sm:flex grid grid-cols-2 sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200">
            <CustomNavLink to="/employee/booking-request/hotel-request">Hotel Request</CustomNavLink>
            <CustomNavLink to="/employee/booking-request/flight-ticket-request">Flight Ticket Request</CustomNavLink>
            <CustomNavLink to="/employee/booking-request/cab-bus-request">Cab/Bus Request</CustomNavLink>
            <CustomNavLink to="/employee/booking-request/transportation-request">Transportation Request</CustomNavLink>
            <CustomNavLink to="/employee/booking-request/traveling-allowance-request">Traveling Allowance Request</CustomNavLink>
          </div>
        </div>
        {/* Filter and Add section */}
        <div className="w-full flex md:flex-row flex-col gap-5 justify-between mt-10 my-2">
          <div className="sm:flex grid grid-cols-2 items-center justify-center gap-4 border border-gray-300 rounded-md px-3 p-2 w-auto">
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
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="cancelled"
                name="status"
                checked={selectedStatus === "cancelled"}
                onChange={() => handleStatusChange("cancelled")}
              />
              <label htmlFor="cancelled" className="text-sm">
                Cancelled
              </label>
            </div>
          </div>
          {/* Add button */}
          <span className="flex gap-4">
            <Link
              to={"/employee/add-travelallowance-request"}
              className="border-2 font-semibold hover:bg-black hover:text-white transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
              style={{ height: '1cm' }}
            >
              <PiPlusCircle size={20} />
              Add
            </Link>
            {/* Additional buttons can be added here */}
          </span>
        </div>
        {/* Table section with right-side scrolling */}
        <div className="w-full overflow-x-auto">
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
      </div>
    </section>
  );
};

export default EmployeeTravellingAllowanceRequest;