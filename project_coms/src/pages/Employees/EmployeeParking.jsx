import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import DataTable from "react-data-table-component";
import Table from "../../components/table/Table";

const EmployeeParking = () => {
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    {
      name: "Parking Level",
      selector: (row) => row.level,
      sortable: true,
    },
    {
      name: "Tower",
      selector: (row) => row.tower,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => row.from,
      sortable: true,
    },
    {
      name: "To",
      selector: (row) => row.to,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) =>
        row.status !== "Expired" && (
          <button className="text-red-500">Cancel</button>
        ),
      sortable: true,
    },
  ];

  const data = [
    {
      tower: "tower 1",
      level: 1,
      from: "09:30 AM",
      to: "11:30 AM",
      status: "Upcoming",
    },
    {
      level: 2,
      from: "09:30 AM",
      to: "11:30 AM",
      status: "Expired",
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
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-between my-5">
          <input
            type="text"
            placeholder="Search by level "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
          <Link
            to={"/employees/book-parking"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Book
          </Link>
        </div>
        <Table
          responsive
          columns={columns}
          data={data}
          
        />
      </div>
    </section>
  );
};

export default EmployeeParking;
