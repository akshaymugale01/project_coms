import React, { useEffect, useState } from "react";
import PayrollSettingDetailsList from "./PayrollSettingDetailsList";
import { GrHelpBook } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {
  editNoticePeriodRecovery,
  getFixedAllowance,
  getNoticePeriodRecovery,
  getVariableAllowance,
} from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import MultiSelect from "./Components/MultiSelect";
import toast from "react-hot-toast";

const NoticeRecovery = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [fixedAllowance, setFixedAllowances] = useState([]);
  const [filteredFixedAllowances, setFilteredFixedAllowances] = useState(
    []
  );
  const [formData, setFormData] = useState({
    recoveryApplicable: false,
    recoveryDenominator: "",
    id: "",
  });

  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const listItemStyle = {
    listStyleType: "disc",
    color: "black",
    fontSize: "14px",
    fontWeight: 500,
  };
  const [isEditing, setIsEditing] = useState(false);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchNoticeRecovery = async () => {
    try {
      const res = await getNoticePeriodRecovery(hrmsOrgId);
      const data = res[0];
      console.log(data);
      setFormData({
        ...formData,
        recoveryApplicable: data.is_applicable,
        recoveryDenominator: data.recovery_denominator,
        id: data.id,
      });
      setSelectedOptions(data.calculation_method)
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
    fetchNoticeRecovery();
    fetchFixedAllowances();
  }, []);

  const handleEditNoticeRecovery = async () => {
    const editData = new FormData();
    editData.append("recovery_denominator", formData.recoveryDenominator);
    editData.append("is_applicable", formData.recoveryApplicable);
    editData.append("organization", hrmsOrgId);
    const recCalculationMethod = selectedOptions.map(item => item)
    recCalculationMethod.map((method)=>{
      editData.append("calculation_method", method)
    })
    try {
      const res = await editNoticePeriodRecovery(formData.id, editData);
      toast.success("Notice period setting updated successfully");
      fetchNoticeRecovery();
      setIsEditing(false)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex gap-4 ml-20">
      <PayrollSettingDetailsList />
      <div className="w-2/3 py-8  bg-white  rounded-lg">
        {/* <h2 className="text-2xl font-bold mb-6">Notice Period Recovery</h2> */}
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-6">Notice Period Recovery</h2>
          <div className="flex justify-end">
            {isEditing ? (
              <div className="flex gap-2 justify-center my-2">
                <button
                  className="border-2 border-green-400 text-green-400 rounded-full p-1 px-4 flex items-center gap-2"
                  onClick={handleEditNoticeRecovery}
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

        <div className="mb-4">
          <label className="block font-semibold">
            Is Notice Period Recovery applicable?{" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="recoveryApplicable"
              checked={formData.recoveryApplicable === true}
              onChange={() =>
                setFormData({ ...formData, recoveryApplicable: true })
              }
              className="mr-2"
              disabled={!isEditing}
            />{" "}
            Yes
            <input
              type="radio"
              name="recoveryApplicable"
              checked={formData.recoveryApplicable === false}
              onChange={() =>
                setFormData({ ...formData, recoveryApplicable: false })
              }
              className="ml-4 mr-2"
              disabled={!isEditing}
            />{" "}
            No
          </div>
        </div>
        {formData.recoveryApplicable && (
          <>
            <div className="mb-4">
              <MultiSelect
                options={fixedAllowance}
                title={
                  "How would you like to calculate Notice Period Recovery?"
                }
                handleSelect={handleSelect}
                // handleSelectAll={handleSelectAll}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                disabled={!isEditing}
                setOptions={setFixedAllowances}
                searchOptions={filteredFixedAllowances}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                What is the denominator for calculating the Notice Recovery?{" "}
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
          </>
        )}
      </div>
      <div className="my-4 mx-2 w-fit">
        <div className="flex flex-col  bg-gray-50 rounded-md text-wrap  gap-4 my-2 py-2 pl-5 pr-2 w-[18rem]">
          <div className="flex  gap-4 font-medium">
            <GrHelpBook size={20} />
            <h2>Help Center</h2>
          </div>
          <div className=" ">
            <ul style={listItemStyle} className="flex flex-col gap-2">
              <li>
                <ul style={listItemStyle}>
                  <li>
                    If your company has a Notice Period policy where short fall
                    in notice period need to be recovery from F&F salary then
                    same can be configure here.{" "}
                  </li>{" "}
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    You can also set how the notice period recovery has to be
                    calculated along with the denominator for calculating this.{" "}
                  </li>
                </ul>
              </li>
              <li>
                <ul style={listItemStyle}>
                  <li>
                    While running Payroll you can view the calculated value in
                    Settlement and Recovery step and confirm to considered the
                    same in salary
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeRecovery;
