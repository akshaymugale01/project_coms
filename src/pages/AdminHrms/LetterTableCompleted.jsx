import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import AdminHRMS from "./AdminHrms";
import { BiEdit } from "react-icons/bi";

import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

const LetterTableCompleted = () => {
  const themeColor = useSelector((state) => state.theme.color);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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
      name: "Employee Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Document Id	",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Letter Template",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) => row.State,
      sortable: true,
    },
    {
        name: "Status",
        selector: (row) => row.Country,
        sortable: true,
      },
    {
        name: "Signed By Company",
        selector: (row) => row.Leave_Days,
        sortable: true,
      },
      {
        name: "Signed By Employee	",
        selector: (row) => row.Comment,
        sortable: true,
      },
 
    {
        name: "Approval",
        selector: (row) => (
        <div className="flex justify-center gap-2">
            <button className="text-green-400 font-medium hover:bg-green-400 hover:text-white transition-all duration-200 p-1 rounded-full"><TiTick size={20} /></button>
            <button className="text-red-400 font-medium hover:bg-red-400 hover:text-white transition-all duration-200 p-1 rounded-full"><IoClose size={20}  /></button>
        </div>
      ),
        sortable: true,
      },
  ];

  const data = [
    {
      Name: "Mittu Panda",
      Location: "abc",
      City: "abc",
      State: "Mittu",
      id:"201",
      Country:"completed",

    },

  ];

  return (
    <section className="flex">
    
      <div className=" w-full flex m-3 flex-col overflow-hidden">
      
        <div className=" flex justify-end gap-2 my-5">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
           
          />
          <Link
            to={"/admin/generation-letter"}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </Link>
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
          <button
           onClick={() => setIsModalOpen(true)}
           style={{ background: themeColor }}
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Filter
          </button>
        </div>
        {isOpen && (
        <div className="origin-top-right z-30 absolute right-0 mt-20 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <button >Bulk Approve Letters</button>
              
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              {/* Upload Statutory Settings */}
              <button >Bulk Reject Letters</button>
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              {/* Upload Documents */}
              <button >Bulk Company Signatory Signature</button>
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              {/* Bulk Update Employee Data */}
              <button >Bulk Send for Signature from Employee </button>

            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              {/* Bulk Add New Employees */}
              <button >Bulk Verify Letter</button>
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              
              <button>Bulk Send Letters to Employees</button>

            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
             
              <button >Bulk Publish Letters to Employees</button>

            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              {/* Bulk Update Payment Information */}
              <button >Bulk Unpublish Letters to Employees</button>

            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              {/* Bulk Add Employees Contract */}
              <button >Bulk Letters Download</button>

            </a>
           
          </div>
        </div>
      )}
        {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-2/3">
            {/* <h2 className="text-xl font-semibold mb-4">Add Department</h2> */}
            <div className="grid md:grid-cols-3 gap-5 mt-5">
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">
              Letter Template
              </label>
              <select
                type="text"
                id="departmentName"
                // value={departmentName}
                // onChange={(e) => setDepartmentName(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                placeholder="Enter Department Name"
              />
            </div>
            <div className="grid gap-2 items-center w-full ">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Published/Unpublished Letter
              </label>
              <select
                id="headOfDepartment"
                // value={headOfDepartment}
                // onChange={(e) => setHeadOfDepartment(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
                <option value="" disabled>Published</option>
                <option value="" disabled>UnPublished</option>
              </select>
            </div>
            <div className="grid gap-2 items-center w-full ">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
               Status
              </label>
              <select
                id="headOfDepartment"
                // value={headOfDepartment}
                // onChange={(e) => setHeadOfDepartment(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
                <option value="" disabled>Pendingt</option>
              
              </select>
            </div>
            <div className="grid gap-2 items-center w-full ">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Employee Status
              </label>
              <select
                id="headOfDepartment"
                // value={headOfDepartment}
                // onChange={(e) => setHeadOfDepartment(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
                <option value="" disabled>Active</option>
                <option value="" disabled>Hold</option>
                <option value="" disabled>Incomplete</option>
                <option value="" disabled>Onhold</option>
              </select>
            </div>
            <div className="grid gap-2 items-center w-full ">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Signed by Company
              </label>
              <select
                id="headOfDepartment"
                // value={headOfDepartment}
                // onChange={(e) => setHeadOfDepartment(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
                <option value="" disabled>Yes</option>
              
              </select>
            </div>
            <div className="grid gap-2 items-center w-full ">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Signed By Employee
              </label>
              <select
                id="headOfDepartment"
                // value={headOfDepartment}
                // onChange={(e) => setHeadOfDepartment(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
                <option value="" disabled>Yes</option>
              
              </select>
            </div>
            <div className="grid gap-2 items-center w-full ">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Created By
              </label>
              <select
                id="headOfDepartment"
               
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
                <option value="" disabled>Mittu Panda</option>
              
              </select>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Date of Creation(From)
              </label>
              <input
              type="date"
               
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
              </input>
            </div>
            <div className="grid gap-2 items-center w-full">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Date of Creation(To)
              </label>
              <input
              type="date"
               
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
              </input>
            </div>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 p-2 rounded-md mr-2"
              >
                Clear
              </button>
              <button
                // onClick={handleAddDepartment}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
        <Table columns={columns} data={data} isPagination={true} />
      </div>
    </section>
  );
};

export default LetterTableCompleted;