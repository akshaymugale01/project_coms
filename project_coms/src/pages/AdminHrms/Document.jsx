import React, { useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import { FaTrash } from "react-icons/fa";

import { BiEdit } from "react-icons/bi";

import OrganisationSetting from "./OrganisationSetting";
import HRMSHelpCenter from "./HRMSHelpCenter";

const Document = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const [selectedOption, setSelectedOption] = useState("existing");
  const addField = () => {
    setFields([...fields, { name: "", type: "text", mandatory: false }]);
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Location,
      sortable: true,
    },
    // {
    //   name: "Leave Label",
    //   selector: (row) => row.Label,
    //   sortable: true,
    // },
    {
      name: "Applies To",
      selector: (row) => row.to,
      sortable: true,
    },
    {
      name: "Employee Permissions",
      selector: (row) => row.Employee,
      sortable: true,
    },
    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button
            //   to={`/admin/edit-templates/${row.id}`}
            onClick={() => setShowModal1(true)}
          >
            <BiEdit size={15} />
          </button>
          <FaTrash size={15} />
        </div>
      ),
    },
  ];

  const data = [
    {
      Name: "person 1",
      Location: "abc",
      to: "all",
      State: "abc",

      Country: "India",
    },
  ];

  return (
    <section className="flex ml-20">
      <OrganisationSetting />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-between my-2">
          <div className=" flex gap-2 justify-between w-full mt-2">
            <p className="font-bold mb-2">Documents</p>
            <button
              disabled
              onClick={() => setShowModal(true)}
              className="bg-blue-400 rounded-full text-white flex items-center gap-2 p-1 px-2 font-medium pr-3 cursor-not-allowed"
            >
              <PiPlusCircle size={20} />
              Add Field
            </button>
          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg w-96">
                {/* <h2 className="text-lg font-bold mb-4">Edit Regularization Request</h2> */}
                <h1 className="text-2xl font-bold mb-4">Add Employee Fields</h1>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <p className="mr-4">For</p>&nbsp;
                    <input
                      type="radio"
                      className="form-radio"
                      name="option"
                      value="existing"
                      checked={selectedOption === "existing"}
                      onChange={() => setSelectedOption("existing")}
                    />
                    <span className="ml-2">Existing Table</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="radio"
                      className="form-radio"
                      name="option"
                      value="new"
                      checked={selectedOption === "new"}
                      onChange={() => setSelectedOption("new")}
                    />
                    <span className="ml-2">New Table</span>
                  </label>
                </div>

                {selectedOption === "existing" ? (
                  <select className="border border-gray-300 p-2 rounded w-full">
                    <option value="">Select Existing Table</option>
                    <option value="option1">Basic Information</option>
                    <option value="option2">Family Information</option>
                    <option value="option3">Address Information</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded w-full"
                    placeholder="Enter New Table name"
                  />
                )}
                <div className="mb-4">
                  <label className="block text-gray-700">Field Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                  <label className="block text-gray-700 mt-2">
                    Requirement:
                  </label>
                  <select
                    name="type"
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value="text">Optional</option>
                    <option value="number">Mandatory</option>
                  </select>
                  <label className="block text-gray-700 mt-2">Access:</label>
                  <select
                    name="type"
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value="text">Manage</option>
                    <option value="number">All</option>
                  </select>
                  <label className="block text-gray-700 mt-2">
                    Sensitive data:
                  </label>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <input type="radio" />
                      <label htmlFor="">Yes</label>
                    </div>
                    <div className="flex gap-2">
                      <input type="radio" />
                      <label htmlFor="">No</label>
                    </div>
                  </div>
                  <div className="flex items-center mt-2"></div>
                </div>

                <button
                  type="button"
                  // onClick={addField}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Field
                </button>

                <button
                  className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {showModal1 && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-lg w-96">
                {/* <h2 className="text-lg font-bold mb-4">Edit Regularization Request</h2> */}
                <h1 className="text-2xl font-bold mb-4">
                  Edit Employee Fields
                </h1>
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <p className="mr-4">For</p>&nbsp;
                    <input
                      type="radio"
                      className="form-radio"
                      name="option"
                      value="existing"
                      checked={selectedOption === "existing"}
                      onChange={() => setSelectedOption("existing")}
                    />
                    <span className="ml-2">Existing Table</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="radio"
                      className="form-radio"
                      name="option"
                      value="new"
                      checked={selectedOption === "new"}
                      onChange={() => setSelectedOption("new")}
                    />
                    <span className="ml-2">New Table</span>
                  </label>
                </div>

                {selectedOption === "existing" ? (
                  <select className="border border-gray-300 p-2 rounded w-full">
                    <option value="">Select Existing Table</option>
                    <option value="option1">Basic Information</option>
                    <option value="option2">Family Information</option>
                    <option value="option3">Address Information</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    className="border border-gray-300 p-2 rounded w-full"
                    placeholder="Enter New Table name"
                  />
                )}
                <div className="mb-4">
                  <label className="block text-gray-700">Field Name:</label>
                  <input
                    type="text"
                    name="name"
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                  <label className="block text-gray-700 mt-2">
                    Requirement:
                  </label>
                  <select
                    name="type"
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value="text">Optional</option>
                    <option value="number">Mandatory</option>
                  </select>
                  <label className="block text-gray-700 mt-2">Access:</label>
                  <select
                    name="type"
                    className="border border-gray-300 p-2 rounded w-full"
                  >
                    <option value="text">Manage</option>
                    <option value="number">All</option>
                  </select>
                  <label className="block text-gray-700 mt-2">
                    Sensitive data:
                  </label>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <input type="radio" />
                      <label htmlFor="">Yes</label>
                    </div>
                    <div className="flex gap-2">
                      <input type="radio" />
                      <label htmlFor="">No</label>
                    </div>
                  </div>
                  <div className="flex items-center mt-2"></div>
                </div>

                <button
                  className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                  // onClick={() => setShowModal1(false)}
                >
                  Update
                </button>

                <button
                  className="mt-4 ml-2 bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={() => setShowModal1(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <Table columns={columns} data={data} isPagination={true} />
      </div>
      <HRMSHelpCenter help={"personal"} showModal={() => setShowModal(true)} />
    </section>
  );
};

export default Document;
