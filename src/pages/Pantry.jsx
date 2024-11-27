import React from "react";

import DataTable from "react-data-table-component";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PiPlusCircle } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import Table from "../components/table/Table";

const Pantry = () => {
  const columns = [
    {
      name: "Action",
      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/employees/pantry-details/${row.id}`}>
            <BsEye size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Item Name",
      selector: (row) => row.item_name,
      sortable: true,
    },
    {
      name: "Ordered by",
      selector: (row) => row.employee_name,
      sortable: true,
    },
    {
      name: "stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) =>
        row.stock !== 0 && (
          <div className="flex justify-center gap-2">
            <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <TiTick size={20} />
            </button>
            <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full">
              <IoClose size={20} />
            </button>
          </div>
        ),
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      item_name: "Item 1",
      employee_name: "emp 1",
      stock: 1,
    },
    {
      id: 2,
      item_name: "Item 2",
      employee_name: "emp 1",
      stock: 0,
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
      {/* <Navbar /> */}
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-between my-5">
          <input
            type="text"
            placeholder="Search by Item Name, employee Name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
            //   value={searchText}
            //   onChange={handleSearch}
          />
          <Link
            to={"/admin/add-pantry"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add new Items
          </Link>
        </div>
        <Table
          responsive
          columns={columns}
          data={data}
          // customStyles={customStyle}
          // pagination
          // fixedHeader
          // // fixedHeaderScrollHeight="450px"
          // selectableRowsHighlight
          // highlightOnHover
        />
      </div>
    </section>
  );
};

export default Pantry;
