import React, { useState } from "react";
import AdminHRMS from "./AdminHrms";
import Table from "../../components/table/Table";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import FileInputBox from "../../containers/Inputs/FileInputBox";
import { useSelector } from "react-redux";

const PendingContract = () => {
  const [isOpen, setIsOpen] = useState(false);
  const themeColor = useSelector((state) => state.theme.color);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row.name,
      sortable: true,
    },

    {
      name: "Contract Start Date",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "Contract End Date",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: "Contract Approval",
      selector: (row) => row.approval,
      sortable: true,
    },
    {
      name: "Contract Agreement",
      selector: (row) => row.approval,
      sortable: true,
    },
    {
      name: "Remark",
      selector: (row) => row.remark,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex gap-2">
          <div className="flex items-center gap-4 bg-green-300 p-1 rounded-full ">
            <Link to={``} className="text-white">
              <TiTick size={20} />
            </Link>
          </div>
          <div className="flex items-center gap-4 bg-red-400 p-1 rounded-full ">
            <Link to={``} className="text-white">
              <IoClose size={20} />
            </Link>
          </div>
        </div>
      ),
    },
  ];
  const data = [
    {
      name: "Mittu",
      start_date: "01/06/2024",
      end_date: "31/07/2024",
      approval: "NA",
      remark: "test",
    },
  ];

  return (
    <div className="flex ml-20">
      <AdminHRMS />

      <div className=" w-full flex mx-3 my-5 flex-col overflow-hidden">
         
      <div className=" flex justify-end gap-2 mt-2 mr-2 ">
          <input
            type="text"
            placeholder="Search by Employee name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
           
          />
           <button
           onClick={() => setIsModalOpen2(true)}
           style={{background:themeColor}}
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Filter
          </button>
           <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
      >
        Actions
        <svg
          className="-mr-1 ml-2 mt-1 h-5 w-5"
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
      </button></div></div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-10 z-20 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              {/* Upload Statutory Settings */}
              <button >Bulk Add Employee Contract</button>
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              {/* Upload Statutory Settings */}
              <button onClick={() => setIsModalOpen(true)}>Bulk Upload Contract Approval Proof</button>
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              {/* Upload Documents */}
              <button onClick={() => setIsModalOpen1(true)}>Bulk Upload Contract Agreement</button>
            </a>
         
            </div>
            </div>)}
            {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3">
          <h1 className="text-xl font-bold mb-4">Bulk Upload Contract Approval Proof Document</h1>
          <div className="flex flex-col mb-4">
              <label htmlFor="headOfDepartment" className="font-bold mb-2">
              Document name format *
              </label>
              {/* <p>Approver's comment</p> */}
             <select name="" id="" className="border p-2 border-black rounded-md mb-2"><option value="">PAN</option></select>
               <div className="mb-4">
              <label className="font-bold m-2 " htmlFor="">Upload Documents </label>
              <FileInputBox/>
              <p>Uploaded file format should be .zip, Internal files should be either .pdf, .doc or .docx only.</p>
              </div>
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
          <h1 className="text-xl font-bold mb-4">Bulk Upload Contract Agreement Document</h1>
          <div className="flex flex-col mb-4">
              <label htmlFor="headOfDepartment" className="font-bold mb-2">
              Document name format *
              </label>
              {/* <p>Approver's comment</p> */}
             <select name="" id="" className="border p-2 border-black rounded-md mb-2"><option value="">PAN</option></select>
               <div className="mb-4">
              <label className="font-bold m-2 " htmlFor="">Upload Documents </label>
              <FileInputBox/>
              <p>Uploaded file format should be .zip, Internal files should be either .pdf, .doc or .docx only.</p>
              </div>
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
             {isModalOpen2 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3">
            {/* <h2 className="text-xl font-semibold mb-4">Add Department</h2> */}
            <div className="mb-4">
              <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">
              Contract Start Date
              </label>
              <input
                type="text"
                id="departmentName"
              
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                placeholder="Contract Start Date"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Contract End Date
              </label>
              <input
                id="headOfDepartment"
                // value={headOfDepartment}
                // onChange={(e) => setHeadOfDepartment(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
               
              
              </input>
            </div>
            <div className="mb-4">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Work Location
              </label>
              <select
                id="headOfDepartment"
               
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
               
              <option value="">Mumbai</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Employee Department
              </label>
              <select
                id="headOfDepartment"
               
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
               
              <option value="">HR</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Supervisor
              </label>
              <select
                id="headOfDepartment"
                // value={headOfDepartment}
                // onChange={(e) => setHeadOfDepartment(e.target.value)}
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
                <option value="" disabled>Mittu Panda</option>
              
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen2(false)}
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
        <p className="font-bold mb-2">Pending Employment Contract</p>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default PendingContract;
