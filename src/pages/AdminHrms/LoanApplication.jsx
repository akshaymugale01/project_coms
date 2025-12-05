import React, { useState } from "react";

import { Link } from "react-router-dom";

import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { BiEdit } from "react-icons/bi";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { useSelector } from "react-redux";

const LoanApplication = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const themeColor = useSelector((state) => state.theme.color);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const columns = [
    {
      name: "Actions",

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
      name: "Employee",
      selector: (row) => row.Location,
      sortable: true,
    },
    {
      name: "Loan Number",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Loan Category",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Loan Amount",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Loan Status",
      selector: (row) => row.Country,
      sortable: true,
    },
  ];

  const data = [
    {
      Label: "567",
      Location: "Mittu Panda	",
      City: "personal",
      State: "50000",

      Country: "Pending",
    },
  ];

  return (
    <section className=" ml-20">
      <AdminHRMS />
      <div className="  flex m-2 flex-col  ">
        <div className=" flex justify-end gap-2  my-5">
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
                className="-mr-1 mt-1 ml-2 h-5 w-5"
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
            </button>
          </div>
          {isOpen && (
            <div className="origin-top-right z-30 absolute right-0 mt-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem"> */}
                {/* <button >Add Loan</button> */}
                <Link
                  to={`/admin/loan-app/add-loan`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Add Loan
                </Link>
                {/* </a> */}
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {/* Upload Statutory Settings */}
                  <button onClick={() => setIsModalOpen1(true)}>
                    Bulk Approve{" "}
                  </button>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {/* Upload Documents */}
                  <button onClick={() => setIsModalOpen2(true)}>
                    Bulk Reject
                  </button>
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {/* Bulk Update Employee Data */}
                  <button onClick={() => setIsModalOpen3(true)}>
                    Bulk Upload Loan{" "}
                  </button>
                </a>
              </div>
            </div>
          )}
          {isModalOpen1 && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3  sm:mt-0 sm:ml-1 ">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 mb-4"
                      id="modal-headline"
                    >
                      Are you sure?
                    </h3>

                    <p>Do you really want to approve this loan?</p>
                    <div className="mb-4">
                      <label
                        htmlFor="reason"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Approver Comment
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows="3"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        // placeholder="Enter your reason for leave"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
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
            </div>
          )}
          {isModalOpen2 && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3  sm:mt-0 sm:ml-1 ">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 mb-4"
                      id="modal-headline"
                    >
                      Are you sure?
                    </h3>

                    <p>Do you really want to reject this loan?</p>
                    <div className="mb-4">
                      <label
                        htmlFor="reason"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Approver Comment
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        rows="3"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        // placeholder="Enter your reason for leave"
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => setIsModalOpen2(false)}
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
            </div>
          )}
          {isModalOpen3 && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="">
                  <div className="mt-3  sm:mt-0 sm:ml-1 ">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900 mb-4"
                      id="modal-headline"
                    >
                      Upload Loan Information
                    </h3>

                    <p>
                      Step 1: Download loan application information global
                      format Includes all your Employees with their available
                      details.
                    </p>
                    <button
                      //  onClick={() => setIsModalOpen(true)}
                      style={{ background: themeColor }}
                      className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
                    >
                      Download
                    </button>
                    <div className="mb-4">
                      <label
                        htmlFor="reason"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Step 2: Make necessary changes in the downloaded file or
                        add new row(s) to create new loan application(s) and
                        upload *
                      </label>
                      <FileInputBox />
                    </div>
                  </div>
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => setIsModalOpen3(false)}
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
            </div>
          )}
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
    </section>
  );
};

export default LoanApplication;
