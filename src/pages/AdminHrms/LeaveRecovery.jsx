import React, { useEffect, useState } from "react";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
const options = [
  { value: "basic", label: "Basic" },
  { value: "hra", label: "HRA" },
  { value: "other", label: "Other" },
  { value: "special", label: "Special" },
  { value: "monthly-retainer-fee", label: "Monthly Retainer Fee" },
];
import { GrHelpBook } from "react-icons/gr";
import {
  editLeaveEncashment,
  getFixedAllowance,
  getLeaveEncashment,
  getVariableAllowance,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import MultiSelect from "./Components/MultiSelect";

const LeaveRecovery = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    payoutMonth: "",
    EncashmentDenominator: "",
    recoveryDenominator: "",
    id: "",
  });

  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedRecoveryOptions, setSelectedRecoveryOptions] = useState([]);

  const [fixedAllowances, setFixedAllowances] = useState([]);
  const [filteredFixedAllowances, setFilteredFixedAllowances] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const fetchLeaveEncashment = async () => {
    try {
      const res = await getLeaveEncashment(hrmsOrgId);
      const data = res[0];
      setFormData({
        ...formData,
        EncashmentDenominator: data.encashment_denominator,
        payoutMonth: data.payout_month,
        recoveryDenominator: data.recovery_denominator,
        id: data.id,
      });
      setSelectedOptions(data.encashment_calculation_method);
      setSelectedRecoveryOptions(data.recovery_calculation_method);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFixedAllowances = async () => {
    try {
      const res = await getFixedAllowance(hrmsOrgId);
      const options = res.map((option) => ({
        value: option.id,
        label: option.custom_label,
      }));
      setFixedAllowances(options);
      setFilteredFixedAllowances(options);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLeaveEncashment();
    fetchFixedAllowances();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditLeaveEncashment = async () => {
    const editData = new FormData();
    editData.append("encashment_denominator", formData.EncashmentDenominator);
    editData.append("payout_month", formData.payoutMonth);
    editData.append("recovery_denominator", formData.recoveryDenominator);
    editData.append("organization", hrmsOrgId);
    const encashmentMethod = selectedOptions.map((item) => item);
    encashmentMethod.forEach((method) => {
      editData.append("encashment_calculation_method", method);
    });
    const recoveryMethod = selectedRecoveryOptions.map((item) => item);
    recoveryMethod.forEach((method) => {
      editData.append("recovery_calculation_method", method);
    });
    try {
      const res = await editLeaveEncashment(formData.id, editData);
      toast.success("Leave encashment & recovery updated successfully");
      fetchLeaveEncashment();
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
  const handleRecoverySelect = (option) => {
    if (selectedRecoveryOptions.includes(option)) {
      setSelectedRecoveryOptions(
        selectedRecoveryOptions.filter((item) => item !== option)
      );
    } else {
      setSelectedRecoveryOptions([...selectedRecoveryOptions, option]);
    }
  };

  return (
    <div className="flex justify-between gap-4 ml-20">
      <PayrollSettingDetailsList />
      <div className="w-2/3 py-8  bg-white rounded-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">
            Leave Encashment & Recovery
          </h2>{" "}
          <div className="flex justify-end">
            {isEditing ? (
              <div className="flex gap-2 justify-center my-2">
                <button
                  className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                  onClick={handleEditLeaveEncashment}
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
        </div>
        <MultiSelect
          options={fixedAllowances}
          title={"How would you like to calculate Leave Encashment?"}
          handleSelect={handleSelect}
          // handleSelectAll={handleSelectAll}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          disabled={!isEditing}
          setOptions={setFixedAllowances}
          searchOptions={filteredFixedAllowances}
        />
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            What is the denominator for calculating the Encashment?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            disabled={!isEditing}
            value={formData.EncashmentDenominator}
            name="EncashmentDenominator"
            onChange={handleChange}
          >
            <option value="">Select denominator</option>
            <option value="30">30</option>
            <option value="26">26</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            In which month do you wish to pay out rollover leave encashment for
            employees? <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.payoutMonth}
            onChange={handleChange}
            name="payoutMonth"
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            disabled={!isEditing}
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <MultiSelect
          options={fixedAllowances}
          title={"How would you like to calculate Leave Encashment?"}
          handleSelect={handleRecoverySelect}
          // handleSelectAll={handleSelectAll}
          selectedOptions={selectedRecoveryOptions}
          setSelectedOptions={setSelectedRecoveryOptions}
          disabled={!isEditing}
          setOptions={setFixedAllowances}
          searchOptions={filteredFixedAllowances}
        />
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            What is the denominator for calculating the Leave Recovery?{" "}
            <span className="text-red-500">*</span>
          </label>
          <select
            className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
              !isEditing ? "bg-gray-200" : ""
            }`}
            disabled={!isEditing}
            value={formData.recoveryDenominator}
            name="recoveryDenominator"
            onChange={handleChange}
          >
            <option value="">Select denominator</option>
            <option value="30">30</option>
            <option value="26">26</option>
          </select>
        </div>
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
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

export default LeaveRecovery;
