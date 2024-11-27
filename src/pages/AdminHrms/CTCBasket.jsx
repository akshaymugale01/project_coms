import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";

import { BiEdit } from "react-icons/bi";

import EmployeeDetailsList from "./EmployeeDetailsList";
import { FaChevronDown } from "react-icons/fa";

const CTCBasket = () => {
  const [page, setPage] = useState("Pending");

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const columns = [
    {
      name: "view",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link
          //   to={`/admin/edit-templates/${row.id}`}
          >
            <BiEdit size={15} />
          </Link>
        </div>
      ),
    },
    {
      name: "Employee Name	",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Initiated By",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Submitted Date",
      selector: (row) => row.City,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  const data = [
    {
      Name: "Mittu Panda",
      Label: "Ramesh Nayak",
      City: "2/2/2024",
      // State: "Maharashtra",
      status: "pending",
      // Country:"India",
    },
  ];
  const data1 = [
    {
      Name: "Mittu Panda",
      Label: "Ramesh Nayak",
      City: "2/2/2024",
      // State: "Maharashtra",
      status: "completed",
      // Country:"India",
    },
  ];

  return (
    <section className="flex ml-20">
      <EmployeeDetailsList />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex gap-2 p-2 pb-0 border-b-2 border-gray-200 w-full">
          <h2
            className={`p-1 ${
              page === "Pending" &&
              `bg-white font-medium text-blue-500 shadow-custom-all-sides`
            } rounded-t-md px-4 cursor-pointer text-center transition-all duration-300 ease-linear`}
            onClick={() => setPage("Pending")}
          >
            Pending Reports
          </h2>
          <h2
            className={`p-1 ${
              page === "Completed" &&
              "bg-white font-medium text-blue-500 shadow-custom-all-sides"
            } rounded-t-md px-4 cursor-pointer transition-all duration-300 ease-linear`}
            onClick={() => setPage("Completed")}
          >
            Completed Reports
          </h2>
        </div>
        {page === "Pending" && (
          <div>
            <div className=" flex gap-2 mr-4 justify-end my-5">
              <input
                type="text"
                placeholder="Search by name "
                className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
              />
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className="inline-flex justify-center w-full items-center gap-2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                >
                  Actions
                  <FaChevronDown />
                </button>
              </div>{" "}
            </div>
            <Table columns={columns} data={data} isPagination={true} />
          </div>
        )}
        {page === "Completed" && (
          <div>
            <div className=" flex gap-2 mr-4 justify-end my-5">
              <input
                type="text"
                placeholder="Search by name "
                className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
              />
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className="inline-flex justify-center w-full items-center gap-2 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                >
                  Actions
                  <FaChevronDown/>
                </button>
              </div>{" "}
            </div>
            <Table columns={columns} data={data1} isPagination={true} />
          </div>
        )}
        {/* <div className=" flex gap-2 mr-4 justify-end my-5">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
           
          />
         
       
        <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        Actions
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 01.707 1.707L6.414 9.586a1 1 0 01-1.414 0L.293 5.707A1 1 0 011.707 4.293L6 8.586 9.293 5.293A1 1 0 0110 3z"
            clipRule="evenodd"
          />
        </svg>
      </button></div> </div> */}
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-10 z-20 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {/* Upload Statutory Settings */}
                <button onClick={() => setIsModalOpen(true)}>
                  Bulk Approve
                </button>
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                {/* Upload Documents */}
                <button onClick={() => setIsModalOpen1(true)}>
                  Bulk Reject
                </button>
              </a>
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
            <div className="bg-white p-5 rounded-md shadow-md w-1/3">
              <h1 className="text-xl font-bold mb-4">Are you sure?</h1>
              <div className="mb-4">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Are you sure you would like to approve the selected requests?
                </label>
                <p>Approver's comment</p>
                <textarea
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  // onClick={handleAddDepartment}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {isModalOpen1 && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
            <div className="bg-white p-5 rounded-md shadow-md w-1/3">
              <h1 className="text-xl font-bold mb-4">Are you sure?</h1>
              <div className="mb-4">
                <label
                  htmlFor="headOfDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Are you sure you would like to reject the selected requests?
                </label>
                <p>Approver's comment</p>
                <textarea
                  id="headOfDepartment"
                  // value={headOfDepartment}
                  // onChange={(e) => setHeadOfDepartment(e.target.value)}
                  className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen1(false)}
                  className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  // onClick={handleAddDepartment}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {/* <Table columns={columns} data={data} isPagination={true} /> */}
      </div>
    </section>
  );
};

export default CTCBasket;
