import React, { useEffect, useState } from "react";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { GrHelpBook } from "react-icons/gr";
import {
  editPayrollGratuity,
  getPayrollGratuity,
  getVariableAllowance,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import MultiSelect from "./Components/MultiSelect";

const Gratuity = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [variableAllowances, setVariableAllowances] = useState([]);
  const [filteredVariableAllowances, setFilteredVariableAllowances] = useState(
    []
  );
  const [formData, setFormData] = useState({
    eligibleForGratuity: false,
    eligibilityPeriod: "",
    gratuityPercentage: "",
    componentsForCalculation: "",
    id: "",
  });
  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchGratuity = async () => {
    try {
      const response = await getPayrollGratuity(hrmsOrgId);
      const res = response[0];
      setFormData({
        ...formData,
        eligibleForGratuity: res.company_eligible_for_gratuity,
        eligibilityPeriod: res.eligibility_period,
        componentsForCalculation: res.components_for_calculation,
        gratuityPercentage: res.gratuity_percentage,
        id: res.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGratuity();
    fetchVariableAllowances();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditGratuity = async () => {
    const editData = new FormData();
    editData.append(
      "company_eligible_for_gratuity",
      formData.eligibleForGratuity
    );
    editData.append("eligibility_period", formData.eligibilityPeriod);
    editData.append("gratuity_percentage", formData.gratuityPercentage);
    editData.append(
      "components_for_calculation",
      formData.componentsForCalculation
    );
    editData.append("organization", hrmsOrgId);
    try {
      const res = await editPayrollGratuity(formData.id, editData);
      toast.success("Payroll gratuity setting updated successfully");
      fetchGratuity();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const fetchVariableAllowances = async () => {
    try {
      const res = await getVariableAllowance(hrmsOrgId);
      const options = res.map((option) => ({
        value: option.id,
        label: option.head_name,
      }));
      setVariableAllowances(options);
      setFilteredVariableAllowances(options);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between gap-4 ml-20">
      <PayrollSettingDetailsList />
      <div className="w-2/3 p-8 bg-white rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">Gratuity</h2>
          {isEditing ? (
            <div className="flex gap-2 justify-center my-2">
              <button
                className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                onClick={handleEditGratuity}
              >
                <FaCheck /> Save
              </button>
              <button
                className="border-2 border-red-400 text-red-400 rounded-full p-1 px-4 flex items-center gap-2"
                onClick={() => setIsEditing(false)}
              >
                <MdClose /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md flex gap-2 items-center"
            >
              <BiEdit /> Edit
            </button>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label className="block font-semibold">
              Is your company elgible for Gratuity?
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                name="esic"
                checked={formData.eligibleForGratuity === true}
                onChange={() =>
                  setFormData({ ...formData, eligibleForGratuity: true })
                }
                className="mr-2"
                disabled={!isEditing}
              />{" "}
              Yes
              <input
                type="radio"
                name="esic"
                checked={formData.eligibleForGratuity === false}
                onChange={() =>
                  setFormData({ ...formData, eligibleForGratuity: false })
                }
                className="ml-4 mr-2"
                disabled={!isEditing}
              />{" "}
              No
            </div>
          </div>
          {formData.eligibleForGratuity && (
            <>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-medium">
                  When is an active employee eligible for gratuity?
                </label>
                <select
                  value={formData.eligibilityPeriod}
                  name="eligibilityPeriod"
                  onChange={handleChange}
                  id=""
                  className="border border-gray-400 p-2 rounded-md w-full"
                  disabled={!isEditing}
                >
                  <option value="">Select gratuity eligibility</option>
                  <option value="4 years 240 days">
                    After completing 4 years 240 days
                  </option>
                  <option value="5 years">After completing 5 years</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-medium">
                  Enter Percentage for Gratuity
                </label>
                <input
                  type="number"
                  value={formData.gratuityPercentage || ""}
                  name="gratuityPercentage"
                  onChange={handleChange}
                  id=""
                  className="border border-gray-400 p-2 rounded-md w-full"
                  placeholder="%"
                  readOnly={!isEditing}
                />
              </div>
              <div className="flex flex-col gap-2">
                
                <MultiSelect
                  options={variableAllowances}
                  title={"Select Components on which Gratuity is calculated"}
                  handleSelect={handleSelect}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  disabled={!isEditing}
                  setOptions={setVariableAllowances}
                  searchOptions={filteredVariableAllowances}
                />
              </div>
            </>
          )}
        </div>
        {/* <button className="w-full p-2 bg-blue-500 text-white font-semibold rounded">Submit</button> */}
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className="">
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    To enable gratuity first select Gratuity in Payroll General
                    Setting What additional components do you want to show in
                    the CTC structure?{" "}
                  </li>{" "}
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Then select the require configuration as per your Company
                    Policy{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    Based on configuration Gratuity will be calculated
                    automatically for eligible employee at the time of F&F, you
                    can view and pay the calculated value in Settlement and
                    Recovery step while running payroll.
                  </li>
                </ul>
              </li>

              {/* <li>
                  <p>
                    <a href="#" className="text-blue-400">
                      Click Here{" "}
                    </a>
                    You can also set password for your salary register and the password will be suffix (@MMYYYY) with your entered password. E.g. If you enter password as abcd in Payroll Setting then password for salary register for month of April 2022 would be abcd@042022
                  </p>
                </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gratuity;
