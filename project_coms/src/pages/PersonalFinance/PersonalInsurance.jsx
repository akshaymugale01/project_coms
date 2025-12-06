import React, { useState, useEffect } from "react";
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
import { Link, NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { PiPlusCircle } from "react-icons/pi";
import Table from "../../components/table/Table";
import { BsEye } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

const PersonalInsurance = () => {
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/personal-insurance-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
          {/* <Link to={`/admin/edit-rvehicles/${row.id}`}>
                    <BiEdit size={15} />
                  </Link> */}
        </div>
      ),
    },
    // {
    //   name: "Name",
    //   selector: (row) => row.Name,
    //   sortable: true,
    // },
    {
      name: "Age",
      selector: (row) => row.Age,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Martial Status ",
      selector: (row) => row.saving,
      sortable: true,
    },

    {
      name: "Dependent Information ",
      selector: (row) => row.Allocation,
      sortable: true,
    },
    {
      name: "Current Insurance Coverage",
      selector: (row) => row.current,
      sortable: true,
    },
    {
      name: "Desired Coverage Amounts ",
      selector: (row) => row.portfolio,
      sortable: true,
    },
    {
      name: "Premium Amount",
      selector: (row) => row.portfolio,
      sortable: true,
    },
    {
      name: "Policy Details",
      selector: (row) => row.policy,
      sortable: true,
    },
  ];
  const data = [
    {
      Age: "56",
      Name: "Mittu ",
      goals: "abc",
      saving: "Single",
      current: "45",
      Allocation: "456",
      amount: "Male",
      portfolio: "789",
    },
  ];

  return (
    <div className="flex">
      <Navbar />
      <div className=" w-full my-2 flex md:mx-2 overflow-hidden flex-col">
        <div className="flex justify-center w-full">
          <div className="sm:flex grid grid-cols-2 mt-2 mb-2 text-sm md:text-base sm:flex-row gap-5 font-medium p-2 sm:rounded-full rounded-md opacity-90 bg-gray-200 ">
            <NavLink
              to={"/personal-finance"}
              className={({ isActive }) =>
                `  md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Individual Financial Budgeting
            </NavLink>
            <NavLink
              to={"/emergency-fund"}
              className={({ isActive }) =>
                ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Emergency Fund
            </NavLink>
            <NavLink
              to={"/personal-investment"}
              className={({ isActive }) =>
                ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Investment
            </NavLink>
            <NavLink
              to={"/goal-plan"}
              className={({ isActive }) =>
                ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Goal Planning
            </NavLink>
            <NavLink
              to={"/personal-insurance"}
              className={({ isActive }) =>
                ` md:rounded-full px-4 cursor-pointer text-center transition-all duration-300 ease-linear ${
                  isActive && "bg-white text-blue-500 shadow-custom-all-sides"
                }`
              }
            >
              Insurance
            </NavLink>
          </div>
        </div>

        {/* <div className="ml-10 mt-3 flex w-full bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mb-6">
            <div id="expenses-chart" style={{ width: '500px', height: '300px' }}></div>
          </div>
          <div className="ml-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mb-6">
            <div id="income-expenses-chart" style={{ width: '500px', height: '300px' }}></div>
          </div>
        </div> */}
        <div className="flex justify-end gap-5 mr-2 mb-2">
          <input
            type="text"
            placeholder="Search by employee Name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
          <Link
            to={"/add-insurance"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
        </div>
        <div className="ml-3">
          <Table columns={columns} data={data} isPagination={true} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInsurance;
