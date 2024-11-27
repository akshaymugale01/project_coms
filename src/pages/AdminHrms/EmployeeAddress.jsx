import React, { useState } from "react";

import { Link } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";

import Table from "../../components/table/Table";

import { BiEdit } from "react-icons/bi";

import OrganisationSetting from "./OrganisationSetting";
import HRMSHelpCenter from "./HRMSHelpCenter";
import { FaCheck, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const EmployeeAddress = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);

  const [selectedOption, setSelectedOption] = useState("existing");
  const addField = () => {
    setFields([...fields, { name: "", type: "text", mandatory: false }]);
  };

  const handleFieldChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  const handleMandatoryChange = (index) => {
    const values = [...fields];
    values[index].mandatory = !values[index].mandatory;
    setFields(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields);
  };
  const columns = [
    {
      name: "Field",
      selector: (row) => row.Field,
      sortable: true,
    },
    {
      name: "Requirement",
      selector: (row) => row.Requirement,
      sortable: true,
    },
    {
      name: "Access",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Sensitive Data",
      selector: (row) => row.Sensitive_Data,
      sortable: true,
    },
    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button onClick={() => setShowModal1(true)}>
            <BiEdit size={15} />
          </button>
          <FaTrash size={15} />
        </div>
      ),
    },
  ];

  const data = [
    {
      Field: "Employee Code",
      Requirement: "Mandatory",
      City: "No",
      State: "No",

      Sensitive_Data: "India",
    },
  ];
  const columns1 = [
    {
      name: "Field",
      selector: (row) => row.Field,
      sortable: true,
    },
    {
      name: "Requirement",
      selector: (row) => row.Requirement,
      sortable: true,
    },
    {
      name: "Access",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Sensitive Data",
      selector: (row) => row.Sensitive_Data,
      sortable: true,
    },
    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <Link onClick={() => setShowModal1(true)}>
            <BiEdit size={15} />
          </Link>
          <FaTrash size={15} />
        </div>
      ),
    },
  ];

  const data1 = [
    {
      Field: "Skill Level",
      Requirement: "Mandatory",
      City: "No",
      State: "No",

      Sensitive_Data: "India",
    },
  ];

  const [newFields, setNewFields] = useState([
    {
      fieldName: "",
      requirement: "",
      access: "",
      isSensitive: false,
    },
  ]);

  const handleAddNewFields = () => {
    setNewFields((prevFields) => [
      ...prevFields,
      {
        fieldName: "",
        requirement: "",
        access: "",
        isSensitive: false,
      },
    ]);
  };

  const handleDeleteNewFields = (index) => {
    setNewFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleNewFieldChange = (index, field, value) => {
    setNewFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index] = { ...updatedFields[index], [field]: value };
      return updatedFields;
    });
  };

  return (
    <section className="flex ml-20">
      <OrganisationSetting />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex gap-2 justify-end mt-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-400 rounded-full text-white flex items-center gap-2 p-1 px-2 font-medium pr-3"
          >
            <PiPlusCircle size={20} />
            Add Field
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-xl w-2/3">
              {/* <h2 className="text-lg font-bold mb-4">Edit Regularization Request</h2> */}
              <h1 className="text-xl font-semibold mb-4 border-b">
                Add Employee Fields
              </h1>
              <div className="max-h-96 overflow-y-auto p-1">
                <div className="mb-4">
                  <label className="inline-flex items-center">
                    <p className="mr-4 font-medium">For</p>
                    <input
                      type="radio"
                      className="form-radio"
                      name="option"
                      value="existing"
                      checked={selectedOption === "existing"}
                      onChange={() => setSelectedOption("existing")}
                    />
                    <span className="ml-2">Existing Section</span>
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
                    <span className="ml-2">New Section</span>
                  </label>
                </div>
                {selectedOption === "existing" ? (
                  <select className="border border-gray-300 p-2 mb-2 rounded-md w-full">
                    <option value="">Select existing section</option>
                    <option value="option1">Basic Information</option>
                    <option value="option2">Family Information</option>
                    <option value="option3">Address Information</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    className="border border-gray-300 p-2 mb-2 rounded-md w-full placeholder:text-sm"
                    placeholder="Enter New Section name"
                  />
                )}
                {newFields.map((field, index) => (
                  <div
                    key={index}
                    className="mb-2 grid grid-col-2 md:grid-cols-4 gap-2"
                  >
                    <div className="flex flex-col">
                      <label className="block text-gray-700 font-medium">
                        Field Name
                      </label>
                      <input
                        type="fieldName"
                        name="name"
                        className="border border-gray-300 p-2  rounded-md w-full"
                        placeholder="Enter field"
                        value={field.fieldName}
                        onChange={(e) =>
                          handleNewFieldChange(
                            index,
                            "fieldName",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-gray-700 font-medium">
                        Requirement
                      </label>
                      <select
                        name="requirement"
                        className="border border-gray-300 p-2 rounded-md w-full"
                        value={field.requirement}
                        onChange={(e) =>
                          handleNewFieldChange(
                            index,
                            "requirement",
                            e.target.value
                          )
                        }
                      >
                        <option value="optional">Optional</option>
                        <option value="mandatory">Mandatory</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-gray-700 font-medium">
                        Access
                      </label>
                      <select
                        name="access"
                        className="border border-gray-300 p-2  rounded-md w-full"
                        value={field.access}
                        onChange={(e) =>
                          handleNewFieldChange(index, "access", e.target.value)
                        }
                      >
                        <option value="text">Manage</option>
                        <option value="number">All</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 justify-center">
                      <label className="block text-gray-700 font-medium">
                        Sensitive data
                      </label>
                      <div className="flex gap-4 justify-between">
                        <div className="flex gap-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`isSensitive-${index}`}
                              checked={field.isSensitive === true}
                              onChange={() =>
                                handleFieldChange(index, "isSensitive", true)
                              }
                            />
                            <label htmlFor="">Yes</label>
                          </div>
                          <div className="flex gap-2 items-center">
                            <input
                              type="radio"
                              name={`isSensitive-${index}`}
                              checked={field.isSensitive === false}
                              onChange={() =>
                                handleFieldChange(index, "isSensitive", false)
                              }
                            />
                            <label htmlFor="">No</label>
                          </div>
                        </div>
                        <div className="flex justify-end items-start">
                          <button
                            className="bg-red-400 text-white p-2 rounded-md"
                            onClick={() => handleDeleteNewFields(index)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleAddNewFields}
                  className="bg-green-400 rounded-full px-4 text-white flex items-center gap-2 p-1 font-medium"
                >
                  <PiPlusCircle /> Add
                </button>
              </div>
              <div className="flex justify-center my-2 border-t p-1">
                <button
                  type="button"
                  onClick={addField}
                  className="bg-green-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2"
                >
                  <FaCheck /> Submit
                </button>

                <button
                  className="ml-2 border-red-500 border-2 text-red-500  py-2 px-6 rounded-full flex items-center gap-2"
                  onClick={() => setShowModal(false)}
                >
                  <MdClose /> Close
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal1 && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-96">
              <h1 className="text-xl font-semibold mb-3">
                Edit Employee Fields
              </h1>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Field Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="border border-gray-300 p-2 rounded w-full"
                  placeholder="Field name"
                />
                <label className="block text-gray-700 mt-2 font-medium">
                  Requirement
                </label>
                <select
                  name="type"
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  <option value="text">Optional</option>
                  <option value="number">Mandatory</option>
                </select>
                <label className="block text-gray-700 mt-2 font-medium">
                  Access
                </label>
                <select
                  name="type"
                  className="border border-gray-300 p-2 rounded w-full"
                >
                  <option value="text">Manage</option>
                  <option value="number">All</option>
                </select>
                <label className="block text-gray-700 mt-2 font-medium">
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
              </div>
              <div className="flex justify-center gap-2 border-t p-1">
                <button className=" ml-2 bg-green-500 text-white py-1 px-4 flex gap-2 items-center rounded-full">
                  <FaCheck /> Save
                </button>

                <button
                  className=" ml-2 border-2 border-red-500 text-red-500 py-1 px-4 rounded-full flex gap-2 items-center"
                  onClick={() => setShowModal1(false)}
                >
                  <MdClose /> Close
                </button>
              </div>
            </div>
          </div>
        )}
        <p className="font-bold mb-2 border-b">Employee Details</p>
        <p className="font-semibold mb-2">General Employment Information</p>
        <Table columns={columns} data={data} isPagination={true} />
        <p className="font-semibold mt-2 mb-2">Job Information</p>
        <Table columns={columns1} data={data1} isPagination={true} />
      </div>
      <HRMSHelpCenter help={"personal"} showModal={() => setShowModal(true)} />
    </section>
  );
};

export default EmployeeAddress;
