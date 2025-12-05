import React, { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import Table from "../../components/table/Table";
import Select from "react-select";
import { BiEdit } from "react-icons/bi";
import { GrHelpBook } from "react-icons/gr";

import DocumentDetailsList from "./DocumentDetailsList";
import { FaTrash } from "react-icons/fa";
import {
  getMyHRMSEmployees,
  getMyOrganizationLocations,
  getMyOrgDepartments,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";

const CompanyDocuments = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [appliesTo, setAppliesTo] = useState("All Employees");
  const [dropdowns, setDropdowns] = useState([
    { id: 1, select1: "", select2: "", selectedEmployees: [], daysInput: "" },
  ]);
  const [employees, setEmployees] = useState([]);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await getMyHRMSEmployees(hrmsOrgId);

        const employeesList = res.map((emp) => ({
          value: emp.id,
          label: `${emp.first_name} ${emp.last_name}`,
        }));

        setEmployees(employeesList);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchLocation = async () => {
      try {
        const res = await getMyOrganizationLocations(hrmsOrgId);
        const locationList = res.map((location) => ({
          value: location.id,
          label: `${location.location}, ${location.city}, ${location.state}`,
        }));
        setLocations(locationList);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDepartments = async () => {
      try {
        const res = await getMyOrgDepartments(hrmsOrgId);
        const departmentList = res.map((department) => ({
          value: department.id,
          label: department.name,
        }));
        setDepartments(departmentList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllEmployees();
    fetchLocation();
    fetchDepartments();
  }, []);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");

  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: "Employee Permissions",
      selector: (row) => row.p,
      sortable: true,
    },
    {
      name: "Applies To	",
      selector: (row) => row.City,
      sortable: true,
    },
    {
      name: "Last Updated On",
      selector: (row) => row.State,
      sortable: true,
    },
    {
      name: "Actions",

      cell: (row) => (
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowModal1(true)}
            //   to={`/admin/edit-templates/${row.id}`}
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
      Name: "HR Policy",
      Location: "Mittu",
      p: "No",
      City: "Mittu",
      State: "24/10/2023",

      Country: "India",
    },
  ];

  const getThirdDropdownOptions = (select1Value) => {
    switch (select1Value) {
      case "Branch Location":
        return locations;
      case "Department":
        return departments;
      case "Gender":
        return genderOptions;
      // case "Days Completed in Company":
      //   return daysInCompanyOptions;
      case "Employment Type":
        return employmentTypeOptions;
      default:
        return [];
    }
  };
  const handleAddDropdown = () => {
    setDropdowns([
      ...dropdowns,
      {
        id: dropdowns.length + 1,
        select1: "",
        select2: "",
        selectedEmployees: [],
        daysInput: "",
      },
    ]);
  };
  const handleUserChangeSelect = (selectedOption, id) => {
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return { ...dropdown, selectedEmployees: selectedOption };
      }
      return dropdown;
    });
    setDropdowns(updatedDropdowns);
  };
  const handleDaysInputChange = (e, id) => {
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return { ...dropdown, daysInput: e.target.value };
      }
      return dropdown;
    });
    setDropdowns(updatedDropdowns);
  };

  // Handle delete dropdown
  const handleDeleteDropdown = (id) => {
    setDropdowns(dropdowns.filter((dropdown) => dropdown.id !== id)); // Delete specific dropdown
  };
  const handleSelect1Change = (e, id) => {
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return { ...dropdown, select1: e.target.value, selectedEmployees: [] }; // Reset third dropdown on select1 change
      }
      return dropdown;
    });
    setDropdowns(updatedDropdowns);
  };
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const employmentTypeOptions = [
    { value: "full_time", label: "Full Time" },
    { value: "part_time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "intern", label: "Intern" },
    { value: "consultant", label: "Consultant" },
  ];
  const handleSelect2Change = (e, id) => {
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return { ...dropdown, select2: e.target.value };
      }
      return dropdown;
    });
    setDropdowns(updatedDropdowns);
  };

  return (
    // <div className="mt-2">
    //   <OrganisationPage/>
    <section className="flex ml-20">
      <DocumentDetailsList />
      <div className=" w-full flex m-3 flex-col overflow-hidden">
        <div className=" flex justify-end gap-2 my-5">
          <input
            type="text"
            placeholder="Search by name "
            className="border border-gray-400 w-96 placeholder:text-sm rounded-lg p-2"
          />
          <button
            onClick={() => setShowModal(true)}
            className="border-2 font-semibold hover:bg-black hover:text-white duration-150 transition-all border-black p-2 rounded-md text-black cursor-pointer text-center flex items-center  gap-2 justify-center"
          >
            <PiPlusCircle size={20} />
            Add
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-2xl w-[50rem]">
              <h1 className="text-2xl font-bold mb-4">Add Company Document</h1>
              <div className="max-h-96 overflow-scroll p-1">
                <div className="mb-4 grid grid-cols-2 gap-4 ">
                  <div>
                    <label className="block text-gray-700 font-medium text-sm">
                      Name :
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Document name"
                      name="name"
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </div>
                  <div className="">
                    <label className="block text-gray-700 font-medium text-sm">
                      Employee Permission:
                    </label>
                    <select className="border border-gray-300 p-2  rounded w-full">
                      <option value="">Select Permission</option>
                      <option value="Invisible">Invisible</option>
                      <option value="View Only">View Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Applies To <span className="text-red-500">*</span>
                    </label>
                    <select
                      className=" block w-full p-2 border border-gray-300 rounded-md"
                      value={appliesTo}
                      onChange={(e) => setAppliesTo(e.target.value)}
                      required
                    >
                      <option value="">Select Applies To</option>
                      <option value="All Employees">All Employees</option>
                      <option value="Some Employees">Some Employees</option>
                      <option value="Specific Employees">
                        Specific Employees
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Document
                    </label>
                    <input
                      type="file"
                      name=""
                      id=""
                      className=" block w-full p-[5px] border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="my-2">
                  {appliesTo === "Specific Employees" && (
                    <div className="my-2">
                      <Select
                        isMulti
                        menuPlacement="top"
                        closeMenuOnSelect={false}
                        options={employees}
                        noOptionsMessage={() => "No Employee Available"}
                        onChange={handleUserChangeSelect}
                        placeholder="Select Employees"
                      />
                    </div>
                  )}

                  {appliesTo === "Some Employees" && (
                    <div className="my-2">
                      {dropdowns.map((dropdown, index) => (
                        <div
                          key={dropdown.id}
                          className="mb-4 grid grid-cols-3 gap-2 border-t py-1"
                        >
                          <select
                            className="border p-2 w-full rounded-md col-span-2"
                            value={dropdown.select1}
                            onChange={(e) =>
                              handleSelect1Change(e, dropdown.id)
                            }
                          >
                            <option value="">Select</option>
                            <option value="Branch Location">
                              Branch Location
                            </option>
                            <option value="Department">Department</option>
                            <option value="Gender">Gender</option>
                            <option value="Days Completed in Company">
                              Days Completed in Company
                            </option>
                            <option value="Employment Type">
                              Employment Type
                            </option>
                          </select>

                          <select
                            className="border p-2 w-full rounded-md"
                            value={dropdown.select2}
                            onChange={(e) =>
                              handleSelect2Change(e, dropdown.id)
                            }
                          >
                            <option value="is">is</option>
                            <option value="is not">is not</option>
                          </select>
                          {dropdown.select1 === "Days Completed in Company" ? (
                            <input
                              type="number"
                              placeholder="Days greater than"
                              className="border p-2 w-full col-span-2 rounded-md"
                              value={dropdown.daysInput}
                              onChange={(e) =>
                                handleDaysInputChange(e, dropdown.id)
                              }
                            />
                          ) : (
                            <div className="col-span-2">
                              <Select
                                isMulti
                                closeMenuOnSelect={false}
                                menuPlacement="top"
                                options={getThirdDropdownOptions(
                                  dropdown.select1
                                )}
                                noOptionsMessage={() => "No Options Available"}
                                onChange={(selectedOption) =>
                                  handleUserChangeSelect(
                                    selectedOption,
                                    dropdown.id
                                  )
                                }
                                placeholder={`Select based on ${
                                  dropdown.select1 || "selection"
                                }`}
                                className="w-full"
                                value={dropdown.selectedEmployees}
                              />
                            </div>
                          )}
                          <div className="flex justify-end">
                            <button
                              className="bg-red-500 text-white p-1 px-3 rounded-md"
                              onClick={() => handleDeleteDropdown(dropdown.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        className="bg-green-500 text-white p-2 rounded-md mt-2"
                        onClick={handleAddDropdown}
                      >
                        Add Employee Sector Rule
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
        {showModal1 && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-2xl w-[50rem]">
              <h1 className="text-2xl font-bold mb-4">Edit Company Document</h1>
              <div className="max-h-96 overflow-scroll p-1">
                <div className="mb-4 grid grid-cols-2 gap-4 ">
                  <div>
                    <label className="block text-gray-700 font-medium">
                      Name :
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Document name"
                      name="name"
                      className="border border-gray-300 p-2 rounded w-full"
                    />
                  </div>
                  <div className="">
                    <label className="block text-gray-700 font-medium">
                      Employee Permission:
                    </label>
                    <select className="border border-gray-300 p-2  rounded w-full">
                      <option value="">Select Permission</option>
                      <option value="Invisible">Invisible</option>
                      <option value="View Only">View Only</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Applies To <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      value={appliesTo}
                      onChange={(e) => setAppliesTo(e.target.value)}
                      required
                    >
                      <option value="">Select Applies To</option>
                      <option value="All Employees">All Employees</option>
                      <option value="Some Employees">Some Employees</option>
                      <option value="Specific Employees">
                        Specific Employees
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Document
                    </label>
                    <input
                      type="file"
                      name=""
                      id=""
                      className=" block w-full p-[5px] border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="my-2">
                  {appliesTo === "Specific Employees" && (
                    <div className="my-2">
                      <Select
                        isMulti
                        menuPlacement="top"
                        closeMenuOnSelect={false}
                        options={employees}
                        noOptionsMessage={() => "No Employee Available"}
                        onChange={handleUserChangeSelect}
                        placeholder="Select Employees"
                      />
                    </div>
                  )}

                  {appliesTo === "Some Employees" && (
                    <div className="my-2">
                      {dropdowns.map((dropdown, index) => (
                        <div
                          key={dropdown.id}
                          className="mb-4 grid grid-cols-3 gap-2 border-t py-1"
                        >
                          <select
                            className="border p-2 w-full rounded-md col-span-2"
                            value={dropdown.select1}
                            onChange={(e) =>
                              handleSelect1Change(e, dropdown.id)
                            }
                          >
                            <option value="">Select</option>
                            <option value="Branch Location">
                              Branch Location
                            </option>
                            <option value="Department">Department</option>
                            <option value="Gender">Gender</option>
                            <option value="Days Completed in Company">
                              Days Completed in Company
                            </option>
                            <option value="Employment Type">
                              Employment Type
                            </option>
                          </select>

                          <select
                            className="border p-2 w-full rounded-md"
                            value={dropdown.select2}
                            onChange={(e) =>
                              handleSelect2Change(e, dropdown.id)
                            }
                          >
                            <option value="is">is</option>
                            <option value="is not">is not</option>
                          </select>
                          {dropdown.select1 === "Days Completed in Company" ? (
                            <input
                              type="number"
                              placeholder="Days greater than"
                              className="border p-2 w-full col-span-2 rounded-md"
                              value={dropdown.daysInput}
                              onChange={(e) =>
                                handleDaysInputChange(e, dropdown.id)
                              }
                            />
                          ) : (
                            <div className="col-span-2">
                              <Select
                                isMulti
                                closeMenuOnSelect={false}
                                menuPlacement="top"
                                options={getThirdDropdownOptions(
                                  dropdown.select1
                                )}
                                noOptionsMessage={() => "No Options Available"}
                                onChange={(selectedOption) =>
                                  handleUserChangeSelect(
                                    selectedOption,
                                    dropdown.id
                                  )
                                }
                                placeholder={`Select based on ${
                                  dropdown.select1 || "selection"
                                }`}
                                className="w-full"
                                value={dropdown.selectedEmployees}
                              />
                            </div>
                          )}
                          <div className="flex justify-end">
                            <button
                              className="bg-red-500 text-white p-1 px-3 rounded-md"
                              onClick={() => handleDeleteDropdown(dropdown.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        className="bg-green-500 text-white p-2 rounded-md mt-2"
                        onClick={handleAddDropdown}
                      >
                        Add Employee Sector Rule
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                  onClick={() => setShowModal1(false)}
                >
                  Close
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        <Table columns={columns} data={data} isPagination={true} />
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className=" ">
            {/* <p className="font-medium">Help Center</p> */}
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can store your company documents like HR policy, forms,
                    etc under one roof.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can also manage document visibility permissions to
                    employees{" "}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyDocuments;
