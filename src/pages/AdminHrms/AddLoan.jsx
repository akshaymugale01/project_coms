// src/components/LoanForm.js
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminHRMS from "./AdminHrms";
import { getItemInLocalStorage } from "../../utils/localStorage";
import Select from "react-select";
import {
  getMyHRMSEmployees,
  getMyOrganizationLocations,
  getMyOrgDepartments,
  getVariableAllowance,
  postPayrollLoanCategory,
} from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AddLoan = () => {
  const [allowanceRequired, setAllowanceRequired] = useState(false);
  const [perqsApplicable, setPerqsApplicable] = useState(false);
  const [employeeRestrictions, setEmployeeRestrictions] = useState([]);

  const [employeeCondition, setEmployeeCondition] = useState({
    condition: "",
    value: "",
  });
  const [appliesTo, setAppliesTo] = useState("All Employees");
  const [employees, setEmployees] = useState([]);
  const [locations, setLocations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [variableAllowances, setVariableAllowances] = useState([]);
  const [formData, setFormData] = useState({
    labelName: "",
    termOfLoan: "",
    disbursementMode: "",
    linkedAllowance: "",
    modeOfRecovery: "",
    prefixText: "",
    startingNumber: "",
    suffixText: "",
    annualIntRate: "",
    intCalculationMethod: "",
    intCalculationStart: "",
    applicableForPreq: false,
    preqCalculationStart: "",
    maxAmountEmployeeApply: "",
    canEmployeeApply: false,
    applicableEmployees: "",
  });

  const [dropdowns, setDropdowns] = useState([
    { id: 1, select1: "", select2: "", selectedEmployees: [], daysInput: "" },
  ]);

  const handleAddCondition = () => {
    setEmployeeRestrictions([...employeeRestrictions, employeeCondition]);
    setEmployeeCondition({ condition: "", value: "" });
  };

  const handleRemoveCondition = (index) => {
    const newRestrictions = [...employeeRestrictions];
    newRestrictions.splice(index, 1);
    setEmployeeRestrictions(newRestrictions);
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  useEffect(() => {
    const fetchVariableAllowances = async () => {
      try {
        const res = await getVariableAllowance(hrmsOrgId);
        setVariableAllowances(res);
      } catch (error) {
        console.log(error);
      }
    };
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
    fetchVariableAllowances();
    fetchAllEmployees();
    fetchLocation();
    fetchDepartments();
  }, []);

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

  const [marketRates, setMarketRates] = useState([
    { rate: "", effectiveFrom: "", effectiveTo: "" },
  ]);

  const handleAddRow = () => {
    setMarketRates([
      ...marketRates,
      { rate: "", effectiveFrom: "", effectiveTo: "" },
    ]);
  };

  const handleRemoveRow = (index) => {
    const updatedRates = marketRates.filter((_, i) => i !== index);
    setMarketRates(updatedRates);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRates = [...marketRates];
    updatedRates[index][name] = value;
    setMarketRates(updatedRates);
  };

  const handleChangeFields = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleAddLoanCategory = async () => {
    if (!formData.labelName) {
      return toast.error("Please provide category label");
    }
    if (!formData.termOfLoan) {
      return toast.error("Please provide term of loan");
    }
    if (!formData.linkedAllowance) {
      return toast.error("Please select select linked variable allowance");
    }
    if (
      !formData.prefixText ||
      !formData.startingNumber ||
      !formData.suffixText
    ) {
      return toast.error("Please define the Loan number series format");
    }
    if (!formData.annualIntRate) {
      return toast.error("Please Provide Default Annual Interest Rate ");
    }

    const postData = new FormData();
    postData.append("label_name", formData.labelName);
    postData.append("term_of_loan_months", formData.termOfLoan);
    postData.append("loan_disbursement_mode", formData.disbursementMode);
    postData.append("linked_variable_allowance", formData.linkedAllowance);
    postData.append("mode_of_emi_recovery", formData.modeOfRecovery);
    postData.append("prefix_text", formData.prefixText);
    postData.append("series_starting_number", formData.startingNumber);
    postData.append("suffix_text", formData.suffixText);
    postData.append("default_annual_interest_rate", formData.annualIntRate);
    postData.append(
      "interest_calculation_method",
      formData.intCalculationMethod
    );
    postData.append("interest_calculation_start", formData.intCalculationStart);
    postData.append("applicable_for_perquisites", formData.applicableForPreq);
    postData.append("organization", hrmsOrgId);
    try {
      const res = await postPayrollLoanCategory(postData);
      toast.success("Loan category created successfully");
      navigate("/admin/loans");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="">
      <AdminHRMS />
      <div className="ml-24 mb-10">
        <h1 className="text-2xl text-center font-bold m-1">
          Add New Loan or Advance
        </h1>
        <p className="text-center">
          You can give loans or advances for Company's Employees
        </p>
        <div className="space-y-4 ">
          <p className="font-bold">General Information</p>
          <div className="flex flex-col  gap-5 w-full">
            <div className="grid grid-cols-2 items-center gap-2">
              <label className="  font-semibold">
                Category Label <span className="text-red-500">*</span>
              </label>
              <input
                className="w-96 border p-2  border-black rounded-md"
                type="text"
                placeholder="Label Name"
                value={formData.labelName}
                name="labelName"
                onChange={handleChangeFields}
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <div>
                <label className=" font-semibold">
                  Term of Loan in months <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">
                  Admin will be able to change the term of loan while approving
                  the loan application
                </p>
              </div>
              <input
                className="w-96 border p-2  border-black rounded-md"
                type="number"
                placeholder="Term of Loan"
                name="termOfLoan"
                value={formData.termOfLoan}
                onChange={handleChangeFields}
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-2">
              <div>
                <label className="font-semibold">
                  Mode of Loan Disbursement
                </label>
                <p className="text-sm text-gray-500">
                  This field can be edited by Admin while adding/approving Loan
                  Application
                </p>
              </div>
              <select
                className="w-96 border p-2  border-black rounded-md"
                value={formData.disbursementMode}
                name="disbursementMode"
                onChange={handleChangeFields}
              >
                <option value="offline">Offline</option>
                <option value="salary">with Salary in Payroll</option>
              </select>{" "}
            </div>

            <div className="grid grid-cols-2 items-center gap-2">
              <div>
                <label className=" font-semibold">
                  Variable Allowance this category is linked to{" "}
                  <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500">
                  This is required if loan disbursement mode with Salary in
                  Payroll. Make sure Tax deduction is disabled in Variable
                  allowance
                </p>
              </div>
              <select
                className="w-96 border p-2  border-black rounded-md"
                value={formData.linkedAllowance}
                onChange={handleChangeFields}
                name="linkedAllowance"
              >
                <option>Select Allowance</option>
                {variableAllowances.map((allowance) => (
                  <option value={allowance.id} key={allowance.id}>
                    {allowance.head_name}
                  </option>
                ))}
              </select>{" "}
            </div>

            <div className="grid grid-cols-2 items-center gap-2">
              <div>
                <label className="font-semibold">Mode of EMI Recovery</label>
                <p className="text-sm text-gray-500">
                  EMI for loans with mode of payment as Salary will be deducted
                  automatically in Payroll and will show up in Payslip
                </p>
              </div>
              <select
                className="w-96 border p-2  border-black rounded-md"
                value={formData.modeOfRecovery}
                name="modeOfRecovery"
                onChange={handleChangeFields}
              >
                <option value="">Select Mode</option>
                <option value="salary">Salary</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
                <option value="other">Other</option>
              </select>{" "}
            </div>
          </div>

          <div className="grid grid-cols-2 items-center gap-2">
            <label className="block text-sm font-medium">
              Please define the Loan number series format for this category{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              <input
                className="border p-2 w-96 border-black rounded-md"
                type="text"
                placeholder="Prefix Text"
                value={formData.prefixText}
                name="prefixText"
                onChange={handleChangeFields}
              />
              <input
                className="border p-2 w-96 border-black rounded-md"
                type="number"
                placeholder="Series Starting number"
                value={formData.startingNumber}
                name="startingNumber"
                onChange={handleChangeFields}
              />
              <input
                className="border p-2 w-96 border-black rounded-md"
                type="text"
                placeholder="Suffix Text"
                value={formData.suffixText}
                name="suffixText"
                onChange={handleChangeFields}
              />
            </div>
          </div>
          <div>
            <label className=" text-lg font-bold">Interest Calculation</label>
            <div className="mt-1 grid grid-cols-2 items-center gap-2">
              <label className="">
                Default Annual Interest Rate{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                className="border p-2 w-96 border-black rounded-md"
                type="number"
                value={formData.annualIntRate}
                name="annualIntRate"
                onChange={handleChangeFields}
                placeholder="Annual Interest Rate"
              />
            </div>
            <div className="mt-1 grid grid-cols-2 items-center gap-2">
              <label className="">How is the interest calculated?</label>
              <select
                className="border p-2 w-96 border-black rounded-md"
                value={formData.intCalculationMethod}
                name="intCalculationMethod"
                onChange={handleChangeFields}
              >
                <option value="simple">
                  Simple Interest (only on Principal)
                </option>
                <option value="compound">
                  Compound Interest(on both Principal and Previous Interest
                  Deficit)
                </option>
              </select>
            </div>
            <div className="mt-1 grid grid-cols-2 items-center gap-2">
              <label className="">
                When does the interest calculation begin?
              </label>
              <select
                className="border p-2 w-96 border-black rounded-md"
                value={formData.intCalculationStart}
                name="intCalculationStart"
                onChange={handleChangeFields}
              >
                <option value="from_grant">From Loan Grant Date</option>
                <option value="from_first_date">
                  From 1st date of the First EMI month
                </option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-lg font-medium">
              Perqs Information
            </label>
            <div className="grid grid-cols-2 items-center gap-2">
              <p>Is this category applicable for perquisites?</p>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="perqs"
                    checked={formData.applicableForPreq === true}
                    onClick={() =>
                      setFormData({ ...formData, applicableForPreq: true })
                    }
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="perqs"
                    checked={formData.applicableForPreq === false}
                    onClick={() =>
                      setFormData({ ...formData, applicableForPreq: false })
                    }
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>

            {formData.applicableForPreq && (
              <div>
                <div className="grid grid-cols-2 gap-2 my-4">
                  <label className="">
                    When does the perq calculation begin?
                  </label>
                  <select
                    className="border p-2 w-96 border-black rounded-md"
                    value={formData.preqCalculationStart}
                    name="preqCalculationStart"
                    onChange={handleChangeFields}
                  >
                    <option value="loan-grant">From Loan Grant</option>
                    <option value="first date">
                      From 1st date of the First EMI month
                    </option>
                  </select>
                </div>
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="px-4 py-2 border">Market Rate</th>
                      <th className="px-4 py-2 border">Effective From</th>
                      <th className="px-4 py-2 border">Effective To</th>
                      <th className="px-4 py-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketRates.map((row, index) => (
                      <tr key={index} className="text-center">
                        <td className="px-4 py-2 border">
                          <input
                            type="text"
                            name="rate"
                            value={row.rate}
                            onChange={(e) => handleChange(index, e)}
                            className="w-full border rounded px-2 py-1"
                            placeholder="Market Rate"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="date"
                            name="effectiveFrom"
                            value={row.effectiveFrom}
                            onChange={(e) => handleChange(index, e)}
                            className="w-full border rounded px-2 py-1"
                            placeholder="Effective From"
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <input
                            type="date"
                            name="effectiveTo"
                            value={row.effectiveTo}
                            onChange={(e) => handleChange(index, e)}
                            className="w-full border rounded px-2 py-1"
                            placeholder="Effective To"
                            disabled={!row.effectiveFrom}
                          />
                        </td>
                        <td className="px-4 py-2 border">
                          <button
                            className="bg-red-500 text-white p-2 rounded"
                            onClick={() => handleRemoveRow(index)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  onClick={handleAddRow}
                  className="mt-4 bg-teal-500 text-white py-2 px-4 rounded"
                >
                  Add Market Rate
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="font-semibold mb-2">Employee Restrictions</label>
            <p>What is the maximum amount that employee can apply?</p>

            <div className="mt-2 space-y-2">
              {employeeRestrictions.map((restriction, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border p-2 rounded-md"
                >
                  <div className="grid grid-cols-4 gap-4">
                    <input
                      className="border p-2  border-black rounded-md"
                      type="number"
                      placeholder="Max Amount"
                    />
                    <select
                      name=""
                      id=""
                      className="border p-2  border-black rounded-md"
                    >
                      <option value="">CTC Monthly</option>
                    </select>
                    <select
                      name=""
                      id=""
                      className="border p-2  border-black rounded-md"
                    >
                      <option>Greater than</option>
                      <option>Less than</option>
                      <option>Equal to</option>
                    </select>
                    <input
                      className="border p-2  border-black rounded-md"
                      type="text"
                      placeholder="Value"
                    />{" "}
                  </div>
                  <button
                    type="button"
                    className=""
                    onClick={() => handleRemoveCondition(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleAddCondition}
          >
            Add Rule
          </button>
          <div className=" grid grid-cols-2 items-center gap-2">
            <div>
              <label className="block text-sm font-medium">
                Can employees apply for this category?
              </label>
              <p className="text-gray-500 text-sm">
                If No, only Admin will be able to add loan for this category on
                behalf of employee
              </p>
            </div>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="apply"
                  checked={formData.canEmployeeApply === true}
                  onChange={() =>
                    setFormData({ ...formData, canEmployeeApply: true })
                  }
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="apply"
                  checked={formData.canEmployeeApply === false}
                  onChange={() =>
                    setFormData({ ...formData, canEmployeeApply: false })
                  }
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          <div className="my-2 grid grid-cols-2">
            <label className="block text-sm font-medium text-gray-700">
              Which employees is this category applicable to?
            </label>
            <select
              className="mt-1 block w-96 p-2 border border-gray-300 rounded-md"
              value={appliesTo}
              onChange={(e) => setAppliesTo(e.target.value)}
              required
            >
              <option value="">Select Applies To</option>
              <option value="All Employees">All Employees</option>
              <option value="Some Employees">Some Employees</option>
              <option value="Specific Employees">Specific Employees</option>
            </select>
          </div>
          {appliesTo === "Specific Employees" && (
            <div className="my-2 px-4">
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

          <div className="flex justify-center">
            <button
              className="border-2 rounded-full font-medium hover:bg-green-400 hover:bg-opacity-30 border-green-500 text-green-500 px-4 p-2"
              onClick={handleAddLoanCategory}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLoan;
