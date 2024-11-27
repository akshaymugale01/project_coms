import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import AttendanceDetailsList from "./AttendanceDetailsList";
import { useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
const AttendanceTemplate = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const columns = [
    {
      name: "Template Name",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "No. Of Active Employees Covered",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Employee TimeClock",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Late/Early Mark",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <button>
            <BiEdit size={15} />
          </button>
          <button className="text-red-400">
            <FaTrash size={15} />
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      Label: "17",
      Location: "Attendance Policy",
      City: <input type="checkbox" />,
      State: <input type="checkbox" />,
    },
    {
      Label: "15",
      Location: "WORK FROM HOME",
      City: <input type="checkbox" />,
      State: <input type="checkbox" />,
    },
    {
      Label: "15",
      Location: "TEMPLATE FOR DRIVER",
      City: <input type="checkbox" />,
      State: <input type="checkbox" />,
    },
  ];

  return (
    <section className="flex ml-20">
      {/* <OrganisationSetting/> */}
      {/* <AdminHRMS/> */}
      <AttendanceDetailsList />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-between my-2 gap-2">
          <input
            type="text"
            name=""
            id=""
            className="border rounded-md p-2 w-full border-gray-300"
            placeholder="Search by template name"
          />
          <Link
            to={"/admin/att/template/add"}
            style={{ background: themeColor }}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all p-2 rounded-md text-white cursor-pointer text-center flex items-center gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
    </section>
  );
};

export default AttendanceTemplate;
