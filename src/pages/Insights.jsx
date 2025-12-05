import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Table from "../components/table/Table";
import { BsEye } from "react-icons/bs";
import { MdOutlineEdit } from "react-icons/md";
import { BiEdit, BiFilterAlt } from "react-icons/bi";

const Insights = () => {
  const [filter, setFilter] = useState(false);
  const column = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link to={`/admin/insights-detail/${row.id}`}>
            <BsEye size={15} />
          </Link>
          <Link to={`/admin/edit-insight/${row.id}`}>
          <BiEdit size={15}/>
          </Link>
        </div>
      ),
    },
    { name: "Id", selector: (row) => row.Id, sortable: true },
    { name: "Date", selector: (row) => row.Date, sortable: true },
    { name: "Site", selector: (row) => row.Site, sortable: true },
    { name: "Zone", selector: (row) => row.InvoiceNumber, sortable: true },
    { name: "Created by", selector: (row) => row.Createdby, sortable: true },
    { name: "location", selector: (row) => row.location, sortable: true },
    { name: "Observation", selector: (row) => row.Observation, sortable: true },
    {
      name: "Recommendation",
      selector: (row) => row.Recommendation,
      sortable: true,
    },
    { name: "Category", selector: (row) => row.Category, sortable: true },
    {
      name: "Sub category",
      selector: (row) => row.Subcategory,
      sortable: true,
    },
    {
      name: "Categorization",
      selector: (row) => row.Categorization,
      sortable: true,
    },
    { name: "Tag", selector: (row) => row.Tag, sortable: true },
  ];

  const data = [
    {
      id: 1,
      Id: 3386,
      Date: "03/06/2024",
      Site: "Panchshil Test",
      Zone: "",
      Createdby: "Abdul Ghaffar",
      location: "mumbai",
      Observation: " abc",
      Recommendation: "cde",
      Category: "b",
      Subcategory: "c",
      Categorization: "Safety",
      Tag: "Workaround",
      action: <BsEye />,
      edit: <MdOutlineEdit />,
    },
  ];
  return (
    <section className="flex">
      <Navbar />
      <div className="p-4 w-full my-2 flex mx-3 overflow-hidden flex-col">
        <h2 className="text-xl font-semibold mx-5 my-5">DESIGN INSIGHTS</h2>
        {filter && (
          <div className='className="flex flex-col-3 md:flex-row mt-1 items-center justify-center gap-2'>
            <div className="flex justify-center my-5">
              <input
                type="text"
                placeholder="Date Range"
                className="border-2 p-2 w-70 border-gray-300 rounded-lg mx-2 "
              />
              <select
                name=""
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md mx-2"
              >
                <option value="">Select Zone</option>
                <option value="">mumbai</option>
              </select>
              <select
                name=""
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md mx-2"
              >
                <option value=""> Selcet Category</option>
                <option value="">a</option>
                <option value="">b</option>
              </select>
              <select
                name=""
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md mx-2"
              >
                <option value=""> Selcet Sub Category</option>
                <option value="">a</option>
                <option value="">b</option>
              </select>
              <select
                name=""
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md mx-2"
              >
                <option value="">Must Have</option>
                <option value="">a</option>
                <option value="">b</option>
              </select>
              <select
                name=""
                id=""
                className="border p-1 px-4 border-gray-500 rounded-md mx-2"
              >
                <option value="">Created by</option>
                <option value="">a</option>
                <option value="">b</option>
              </select>
              <button className="bg-black p-1 px-5 py-2 text-white rounded-md mx-2">
                Apply
              </button>
            </div>
          </div>
        )}
        <div className="md:flex grid grid-cols-2 sm:flex-row my-2 flex-col gap-2 justify-between">
          <input
            type="text"
            placeholder="search"
            className="border-2 p-2 w-70 border-gray-300 rounded-lg mx-2"
          />
          <div className="flex gap-2">
            <Link
              to=""
              className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
              onClick={() => setFilter(!filter)}
            >
              <BiFilterAlt /> Filter
            </Link>
            <Link
              to="/admin/Add-insights"
              className=" font-semibold border-2 border-black px-4 p-1 flex gap-2 items-center rounded-md"
            >
              <IoMdAdd /> Add
            </Link>
            <Link
              to=""
              className=" font-semibold border-2 text-white px-4 p-1 flex gap-2 items-center rounded-md bg-blue-600"
            >
              Export
            </Link>
          </div>
        </div>
        <div>
          <Table columns={column} data={data} isPagination={true} />
        </div>
      </div>
    </section>
  );
};

export default Insights;
