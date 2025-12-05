import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'
import { getMyHRMSEmployees, getMyOrganizationLocations, getMyOrgDepartments, getVariableAllowance } from '../../../api';
import { getItemInLocalStorage } from '../../../utils/localStorage';

const EditVariableAllowanceModal = ({closeModal }) => {
    const [formData, setFormData] = useState({
        showCTC: false,
        hasEndingPeriod: "",
        enterAmount: "",
        appliesTo: "",
        headName: "",
        affectPF: false,
        affectESIC: false,
        affectLWF: false,
        affectPT: false,
        affectIT: false,
        incomeTaxDeductionMethod: "",
        auto_process_in_payroll: false,
        paymentFrequency: "",
        effectivePeriodStart: "",
        hasEndPeriod: false,
        manualEntry: true,
        applicableTo: "",
        autoProcess: false,
      });

     
    
      const fetchVariableAllowance = async () => {
        try {
          const res = await getVariableAllowance(hrmsOrgId);
          setFilteredVariableAllowances(res);
          setVariableAllowance(res);
        } catch (error) {
          console.log(error);
        }
      };
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
        fetchVariableAllowance();
      }, []);
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const [dropdowns, setDropdowns] = useState([
        { id: 1, select1: "", select2: "", selectedEmployees: [], daysInput: "" },
      ]);
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
      const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  return (
    <div className="fixed inset-0 z-50 flex items-center overflow-y-auto justify-center bg-black bg-opacity-50">
    <div className="max-h-[100%] bg-white p-8 w-2/3 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-bold border-b mb-2">
        Add New Variable Allowance
      </h2>
      <div>
        <div></div>
        <div className="grid md:grid-cols-2 gap-5 my-5 max-h-96 overflow-y-auto p-1">
          <div className="grid gap-2 items-center w-full">
            <label className="block mb-1 font-semibold">
              What is the label of this variable allowance?{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.headName}
              name="headName"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Variable Head Name"
            />
          </div>
          <div className="grid gap-2 items-center w-full">
            <label className="block font-semibold">
              Does this allowance affect Provident Fund?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="affectPF"
                checked={formData.affectPF === true}
                onChange={() =>
                  setFormData({ ...formData, affectPF: true })
                }
                className="mr-2"
              />
              Yes
              <input
                type="radio"
                name="affectPF"
                checked={formData.affectPF === false}
                onChange={() =>
                  setFormData({ ...formData, affectPF: false })
                }
                className="ml-4 mr-2"
              />
              No
            </div>
          </div>
          <div className="grid gap-2 items-center w-full">
            <label className="block font-semibold">
              Does this allowance affect ESIC?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="affectESIC"
                checked={formData.affectESIC === true}
                onChange={() =>
                  setFormData({ ...formData, affectESIC: true })
                }
                className="mr-2"
              />
              Yes
              <input
                type="radio"
                name="affectESIC"
                checked={formData.affectESIC === false}
                onChange={() =>
                  setFormData({ ...formData, affectESIC: false })
                }
                className="ml-4 mr-2"
              />
              No
            </div>
          </div>
          <div className="grid gap-2 items-center w-full">
            <label className="block font-semibold">
              Does this allowance affect LWF?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="affectLWF"
                checked={formData.affectLWF === true}
                onChange={() =>
                  setFormData({ ...formData, affectLWF: true })
                }
                className="mr-2"
              />
              Yes
              <input
                type="radio"
                name="affectLWF"
                checked={formData.affectLWF === false}
                onChange={() =>
                  setFormData({ ...formData, affectLWF: false })
                }
                className="ml-4 mr-2"
              />
              No
            </div>
          </div>
          <div className="grid gap-2 items-center w-full">
            <label className="block font-semibold">
              Does this allowance affect Professional Tax?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="affectPT"
                checked={formData.affectPT === true}
                onChange={() =>
                  setFormData({ ...formData, affectPT: true })
                }
                className="mr-2"
              />
              Yes
              <input
                type="radio"
                name="affectPT"
                checked={formData.affectPT === false}
                onChange={() =>
                  setFormData({ ...formData, affectPT: false })
                }
                className="ml-4 mr-2"
              />
              No
            </div>
          </div>
          <div className="grid gap-2 items-center w-full">
            <label className="block font-semibold">
              Does this variable allowance affect Income Tax?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="affectIT"
                checked={formData.affectIT === true}
                onChange={() =>
                  setFormData({ ...formData, affectIT: true })
                }
                className="mr-2"
              />
              Yes
              <input
                type="radio"
                name="affectIT"
                checked={formData.affectIT === false}
                onChange={() =>
                  setFormData({ ...formData, affectIT: false })
                }
                className="ml-4 mr-2"
              />
              No
            </div>
          </div>
          {formData.affectIT === true && (
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                If applicable, how would you want to deduct Income Tax on
                this Variable Allowance?
              </label>
              <select className="border border-gray-400 rounded p-2">
                <option value="Annual Calculations">
                  Deduct as per Annual Calculations (Pro-Rata)
                </option>
                <option value="Deduct Upfront">Deduct Upfront</option>
              </select>
            </div>
          )}
          {formData.affectIT === true && (
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                For which Tax Regimes will the Income Tax be calculated?
              </label>
              <select className="border border-gray-400 rounded p-2">
                <option value="New Regime">New Regime</option>
                <option value="Old Regime">Old Regime</option>
              </select>
            </div>
          )}
          <div className="grid gap-2 items-center w-full">
            <label className="block font-semibold">
              Does this variable allowance show up in CTC structure?
              <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="showCTC"
                checked={formData.showCTC === true}
                onChange={() =>
                  setFormData({ ...formData, showCTC: true })
                }
                className="mr-2"
              />
              Yes
              <input
                type="radio"
                name="showCTC"
                checked={formData.showCTC === false}
                onChange={() =>
                  setFormData({ ...formData, showCTC: false })
                }
                className="ml-4 mr-2"
              />
              No
            </div>
          </div>
          {formData.showCTC && (
            <div className="grid gap-2 items-center w-full">
              <label className="block font-semibold">
                Do you want to automatically process this variable amount
                in the payroll process?
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="autoProcess"
                  checked={formData.autoProcess === true}
                  onChange={() =>
                    setFormData({ ...formData, autoProcess: true })
                  }
                  className="mr-2"
                />
                Yes
                <input
                  type="radio"
                  name="autoProcess"
                  checked={formData.autoProcess === false}
                  onChange={() =>
                    setFormData({ ...formData, autoProcess: false })
                  }
                  className="ml-4 mr-2"
                />
                No
              </div>
            </div>
          )}
          <div className="grid gap-2 items-center w-full">
            <label className="block font-semibold">
              How frequently does employee pay this variable allowance?
            </label>
            <select className="border border-gray-400 rounded p-2">
              <option value="Monthly">Monthly</option>
              <option value="Bi-Monthly">Bi-Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <div className="flex flex-col justify-between gap-2 w-full">
            <label className="block font-semibold">
              From what period is this variable allowance effective?
            </label>
            <input
              type="month"
              name=""
              id=""
              className="p-2 rounded border border-gray-400"
            />
          </div>
          <div className="flex flex-col justify-between   col-span-1">
            <label className="block font-semibold">
              Does this variable allowance have an ending period?
            </label>
            <select
              className="border border-gray-400 rounded p-2 w-full"
              value={formData.hasEndingPeriod}
              onChange={handleChange}
              name="hasEndingPeriod"
            >
              <option value="No. It is Continual">
                No. It is Continual
              </option>
              <option value="Yes. It has an End Period">
                Yes. It has an End Period
              </option>
            </select>
          </div>
          {formData.hasEndingPeriod === "Yes. It has an End Period" && (
            <div className="grid gap-2 items-center col-span-1">
              <label className="block font-semibold">
                From when do you wish to stop applying this variable
                allowance?
              </label>
              <input
                type="month"
                name=""
                id=""
                className="border border-gray-400 rounded p-2"
              />
            </div>
          )}
          <div className="grid gap-2 items-center col-span-1">
            <label className="block font-semibold">
              How would you like to enter the amount for this variable
              allowance?
            </label>
            <select
              className="border border-gray-400 rounded p-2 w-full"
              value={formData.enterAmount}
              onChange={handleChange}
              name="enterAmount"
            >
              <option value="manually">
                Manually, at the time of running payroll
              </option>
              <option value="fixed">Fixed Amount</option>
              <option value="percent-basic-da">
                Percentage of (Basic + DA) paid (or Basic if DA is not
                applicable)
              </option>
              <option value="percent-gross">
                Percentage of gross salary paid
              </option>
            </select>
          </div>
          {formData.enterAmount === "fixed" && (
            <div className="grid gap-2 items-center col-span-1">
              <label className="block font-semibold">
                Provide the Amount
              </label>
              <input
                type="text"
                name=""
                id=""
                className="border border-gray-400 rounded p-2 w-full"
                placeholder="Enter amount"
              />
            </div>
          )}
          {formData.enterAmount === "percent-basic-da" && (
            <div className="grid gap-2 items-center col-span-1">
              <label className="block font-semibold">
                Provide the Percentage
              </label>
              <input
                type="number"
                name=""
                id=""
                className="border border-gray-400 rounded p-2 w-full"
                placeholder="Enter percentage"
              />
            </div>
          )}
          {formData.enterAmount === "percent-gross" && (
            <div className="grid gap-2 items-center col-span-1">
              <label className="block font-semibold">
                Provide the Percentage
              </label>
              <input
                type="number"
                name=""
                id=""
                className="border border-gray-400 rounded p-2 w-full"
                placeholder="Enter percentage"
              />
            </div>
          )}
          <div className="flex flex-col justify-between">
            <label className="block font-medium ">
              Which employees does this variable allowance apply to?
            </label>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={formData.appliesTo}
              onChange={handleChange}
              name="appliesTo"
            >
              <option value="">Select Applies To</option>
              <option value="All Employees">All Employees</option>
              <option value="Some Employees">Some Employees</option>
              <option value="Specific Employees">
                Specific Employees
              </option>
            </select>
          </div>
          {formData.appliesTo === "Specific Employees" && (
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
          {formData.appliesTo === "Some Employees" && (
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
        <div className="flex mt-2 justify-end gap-2 p-1 border-t">
          <button
            type="button"
            onClick={closeModal}
            className="border-2 font-semibold hover:bg-red-400 hover:text-red-500 hover:bg-opacity-30 flex items-center gap-2 duration-150 transition-all border-red-400 rounded-full p-1 px-3 text-red-400"
          >
            <MdClose /> Cancel
          </button>
          <button
            type="button"
            // onClick={handleAddVariableAllowance}
            className="border-2 font-semibold hover:bg-green-400 hover:text-green-500 hover:bg-opacity-30 flex items-center gap-2  duration-150 transition-all border-green-400 rounded-full p-1 px-3 text-green-400"
          >
            <FaCheck /> Save
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EditVariableAllowanceModal
