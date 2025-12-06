import React, { useEffect, useState } from "react";
import {
  getMyHRMSEmployees,
  getMyOrganizationLocations,
  getMyOrgDepartments,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import Select from "react-select";
import { FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
const RequestEmployeeInfoModal = ({ showModal, setShowModal }) => {
  const [employeeSelection, setEmployeeSelection] = useState("all");
  const [fields, setFields] = useState([
    { section: "", field: "", hideIfExists: false, mandatory: false },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);

  const handleAddField = () => {
    setFields([
      ...fields,
      { section: "", field: "", hideIfExists: false, mandatory: false },
    ]);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };

  const handleDeleteField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      employeeSelection,
      fields,
      showPopup,
      sendEmail,
    });
  };

  const [appliesTo, setAppliesTo] = useState("All Employees");
  const [employees, setEmployees] = useState([]);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);

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

  // Handle second dropdown (select2)
  const handleSelect2Change = (e, id) => {
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return { ...dropdown, select2: e.target.value };
      }
      return dropdown;
    });
    setDropdowns(updatedDropdowns);
  };

  // Handle third dropdown (react-select)
  const handleUserChangeSelect = (selectedOption, id) => {
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return { ...dropdown, selectedEmployees: selectedOption };
      }
      return dropdown;
    });
    setDropdowns(updatedDropdowns);
  };

  // Get options for third dropdown based on first dropdown selection
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
  const [dropdowns, setDropdowns] = useState([
    { id: 1, select1: "", select2: "", selectedEmployees: [], daysInput: "" },
  ]);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-xl w-[50rem] max-h-[90%] ">
        <h2 className="text-xl font-semibold mb-4">
          Request Employee Information
        </h2>
        <div className="max-h-96 overflow-y-auto p-1 border-t">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please select which employee
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
              <option value="Specific Employees">Specific Employees</option>
            </select>
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
                      onChange={(e) => handleSelect1Change(e, dropdown.id)}
                    >
                      <option value="">Select</option>
                      <option value="Branch Location">Branch Location</option>
                      <option value="Department">Department</option>
                      <option value="Gender">Gender</option>
                      <option value="Days Completed in Company">
                        Days Completed in Company
                      </option>
                      <option value="Employment Type">Employment Type</option>
                    </select>

                    <select
                      className="border p-2 w-full rounded-md"
                      value={dropdown.select2}
                      onChange={(e) => handleSelect2Change(e, dropdown.id)}
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
                        onChange={(e) => handleDaysInputChange(e, dropdown.id)}
                      />
                    ) : (
                      <div className="col-span-2">
                        <Select
                          isMulti
                          closeMenuOnSelect={false}
                          menuPlacement="top"
                          options={getThirdDropdownOptions(dropdown.select1)}
                          noOptionsMessage={() => "No Options Available"}
                          onChange={(selectedOption) =>
                            handleUserChangeSelect(selectedOption, dropdown.id)
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Please select the fields within the section which you would like to
            update <span className="text-red-500">*</span>
          </label>
          <div className="mb-4">
            {fields.map((field, index) => (
              <div key={index} className="mb-2 p-2 border rounded-md">
                <div className=" flex items-center gap-2 w-full my-2">
                  <select
                    value={field.section}
                    onChange={(e) =>
                      handleFieldChange(index, "section", e.target.value)
                    }
                    className="p-2 border rounded w-1/2"
                  >
                    <option value="">Choose Section</option>
                  </select>

                  <select name="" id="" className="p-2 border rounded w-1/2">
                    <option value="">Choose Fields</option>
                  </select>
                </div>
                <div className="mb-2 flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <label> Hide if value already exists</label>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="group1" />
                      <label> Yes</label>
                      <input type="radio" name="group1" />
                      <label> No</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <label> Mandatory?</label>
                    <div className="flex items-center gap-2">
                      <input type="radio" name="group2" />
                      <label> Yes</label>
                      <input type="radio" name="group2" />
                      <label> No</label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDeleteField(index)}
                    className=" text-red-500 "
                  >
                    <MdClose size={20} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddField}
              className="p-1 px-2 bg-blue-500 text-white rounded"
            >
              + Add Section
            </button>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Show pop-up on web?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={true}
                    checked={showPopup === true}
                    onChange={() => setShowPopup(true)}
                  />
                  <label> Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={false}
                    checked={showPopup === false}
                    onChange={() => setShowPopup(false)}
                  />
                  <label> No</label>
                </div>
              </div>
            </div>
          </div>

          {showPopup && (
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency of Pop-Up Reminders
                </label>
                <select
                  name=""
                  id=""
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnight">Fortnight</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you want to request popup to be sticky?
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={true}
                      // checked={showPopup === true}
                      // onChange={() => setShowPopup(true)}
                    />
                    <label> Yes</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={false}
                      // checked={showPopup === false}
                      // onChange={() => setShowPopup(false)}
                    />
                    <label> No</label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="my-4">
            <div className="grid grid-cols-2 gap-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you want to send an email request to employees?
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={true}
                    checked={sendEmail === true}
                    onChange={() => setSendEmail(true)}
                  />
                  <label> Yes</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={false}
                    checked={sendEmail === false}
                    onChange={() => setSendEmail(false)}
                  />
                  <label> No</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center my-2 gap-4 border-t p-1">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className=" p-2 px-4 border-red-500 border text-red-500 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 px-4 bg-green-500 text-white rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestEmployeeInfoModal;
