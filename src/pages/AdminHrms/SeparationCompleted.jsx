import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";

// Modal Component
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Initiate Separation</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Employee Name *</label>
            <select className="border border-gray-300 rounded-lg p-2 w-full">
              <option>Please Select Employee</option>
              {/* Add employee options here */}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SeparationCompleted = () => {
  const themeColor = useSelector((state) => state.theme.color);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const columns = [
    {
      name: "Employee Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Resignation Date",
      selector: (row) => row.Label,
      sortable: true,
    },
    {
      name: "Last Working Date",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Separation Reason",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Separation Status",
      selector: (row) => row.Country,
      sortable: true,
    },
    {
      name: "FnF Status",
      selector: (row) => row.Leave_Days,
      sortable: true,
    },
  ];

  const data = [
    {
      Name: "person 1",
      Label: "2/2/2023",
      City: "2/2/2023",
      State: "abc",
      Country: "Approved",
    },
  ];

  return (
    <section className="flex">
      <div className="w-full flex m-3 flex-col overflow-hidden">
        <div className="flex gap-2 justify-end my-5">
          <input
            type="text"
            placeholder="Search by name"
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
          />
           <button
           onClick={() => setIsModalOpen1(true)}
           style={{background:themeColor}}
            className="bg-black text-white hover:bg-gray-700 font-semibold py-2 px-4 rounded"
          >
            Filter
          </button>
          <button
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center gap-2 justify-center"
            onClick={() => setIsModalOpen(true)}
          >
            <PiPlusCircle size={20} />
            Initiate Separation
          </button>
        </div>
        {isModalOpen1 && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex z-10 justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-md w-1/3">
          {/* <h1 className="text-xl font-bold mb-4">Bulk Upload Contract Agreement Document</h1> */}
          <div className="mb-4">
              <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700">
              Separation Reason
              </label>
              <select
                type="text"
                id="departmentName"
              
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                placeholder=""
              ><option value="">Better Opportunity-compensation</option>
              <option value="">Better Opportunity-Job Role</option></select>
            </div>
            <div className="mb-4">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Separation Status
              </label>
              <select
                type="text"
                id="departmentName"
              
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
                placeholder=""
              ><option value="">Level 1 Approval Pending</option>
              <option value="">Level 2 Approval Pending</option></select>
            </div>
            <div className="mb-4">
              <label htmlFor="headOfDepartment" className="block text-sm font-medium text-gray-700">
              Branch Location
              </label>
              <select
                id="headOfDepartment"
               
                className="mt-1 block w-full border border-gray-400 p-2 rounded-md"
              >
               
              <option value="">Mumbai</option>
              </select>
            </div>
           
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen1(false)}
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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </section>
  );
};

export default SeparationCompleted
