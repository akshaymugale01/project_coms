import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MultiSelect from "../Components/MultiSelect";
import { getFixedAllowance, getFixedDeductions } from "../../../api";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const ComponentCTCTemplate = ({
  onBack,
  onNext,
  selectedOptions,
  setSelectedOptions,
  selectedDeductions,
  setSelectedDeductions,
}) => {
  const themeColor = useSelector((state) => state.theme.color);
  const [fixedAllowances, setFixedAllowances] = useState([]);
  const [filteredFixedAllowances, setFilteredFixedAllowances] = useState([]);
  const [fixedDeductions, setFixedDeductions] = useState([]);
  const [filteredFixedDeductions, setFilteredFixedDeductions] = useState([]);
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
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
  const fetchFixedDeductions = async () => {
    try {
      const res = await getFixedDeductions(hrmsOrgId);
      const options = res.map((option) => ({
        value: option.id,
        label: option.custom_label,
      }));
      setFixedDeductions(options);
      setFilteredFixedDeductions(options);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFixedAllowances();
    fetchFixedDeductions();
  }, []);
  console.log("tempId", selectedDeductions);
  console.log("tempId", selectedOptions);

  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const handleFixedDeductionSelect = (option) => {
    if (selectedDeductions.includes(option)) {
      setSelectedDeductions(
        selectedDeductions.filter((item) => item !== option)
      );
    } else {
      setSelectedDeductions([...selectedDeductions, option]);
    }
  };

  return (
    <div className="my-10 p-2 w-full">
      <p className="font-bold mb-4">Component & Hierarchy Selection</p>
      <div className="flex flex-col w-96 ">
        <MultiSelect
          title={"Fixed Salary Allowances"}
          options={fixedAllowances}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          setOptions={setFixedAllowances}
          searchOptions={filteredFixedAllowances}
          handleSelect={handleSelect}
        />
        <MultiSelect
          title={"Employer Contributions"}
          options={fixedAllowances}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          setOptions={setFixedAllowances}
          searchOptions={filteredFixedAllowances}
        />
        <MultiSelect
          title={"Fixed Salary Deductions"}
          options={fixedDeductions}
          selectedOptions={selectedDeductions}
          setSelectedOptions={setSelectedDeductions}
          setOptions={setFixedDeductions}
          searchOptions={filteredFixedDeductions}
          handleSelect={handleFixedDeductionSelect}
        />
      </div>
      {/* <div className="flex justify-center m-4 gap-6">
        <button
          //  onClick={}

          className="bg-red-400 text-white hover:bg-gray-700 font-medium py-2 px-4 rounded"
        >
          Cancel
        </button>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
        >
          Back
        </button>
        <button
          onClick={onNext}
          style={{ background: themeColor }}
          className="bg-black text-white hover:bg-gray-700 font-medium py-2 px-4 rounded"
        >
          Proceed
        </button>
      </div> */}
    </div>
  );
};

export default ComponentCTCTemplate;
