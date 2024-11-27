import React, { useState } from "react";

import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { BsEye } from "react-icons/bs";

const OnBoardingTable = () => {
  const columns = [
    {
      name: "View",
      selector: (row) => (
        <div>
          <Link to={"/admin/edit-employee/basics"}>
            <BsEye />
          </Link>
        </div>
      ),
    },
    {
      name: "Employee Name",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Joining Date",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Onboarding Status",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Onboarding Checklist",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Portal Activation",
      selector: (row) => row.Country,
      sortable: true,
    },
    {
      name: "Pending Letters Awaiting Signatures	",
      selector: (row) => row.Leave_Days,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-2">
          <button className="bg-green-400 text-white rounded-full p-1 px-4">
            <FaCheck />
          </button>
          <button className="bg-red-400 text-white rounded-full p-1 px-4">
            <MdClose size={20} />
          </button>
        </div>
      ),
      sortable: true,
    },
  ];

  const data = [
    {
      Name: "person 1",
      Location: "Mittu Panda",
      City: "pending",
      State: "abc",
      Label: "5/5/2024",
      Country: "yes",
    },
  ];
  const themeColor = useSelector((state) => state.theme.color);
  return (
    <section className="flex">
      <div className=" w-full flex  flex-col overflow-hidden">
        <div className=" flex justify-between my-2">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-[30rem] placeholder:text-sm rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
          <div className="flex justify-end">
            <Link
              to={"/admin/add-employee/basics"}
              style={{ background: themeColor }}
              className="border-2 font-semibold w-full hover:bg-black hover:text-white duration-150 transition-all border-white p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
            >
              <PiPlusCircle size={20} />
              Add Employee
            </Link>
          </div>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
    </section>
  );
};

export default OnBoardingTable;
