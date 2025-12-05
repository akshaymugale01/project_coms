import React, { useState } from "react";
import MultiSelect from "../Components/MultiSelect";

const TemplateGeneralSetting = ({
  handleNextStep,
  handleCancel,
  handleBack,
}) => {
  const options = [
    { value: "1", label: "Web Checkin" },
    { value: "2", label: "Biometric" },
    { value: "3", label: "Manually upload" },
    { value: "4", label: "Mobile" },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">General Template Settings</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Custom Label</label>
        <input
          type="text"
          className="mt-1 block w-full border border-gray-300 rounded-md  p-2"
          placeholder="Enter custom label"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Timezone</label>
        <select className="mt-1 block w-full border border-gray-300 rounded-md  p-2">
          <option>Asia/Kolkata (UTC +05:30)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Mode of Capturing Attendance
        </label>
        <MultiSelect
          options={options}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Handle Missing Check In/Out
        </label>
        <select className="mt-1 block w-full border border-gray-300 rounded-md  p-2">
          <option value="">Select</option>
          <option selected="selected" value="invalid_record">
            Consider as invalid record
          </option>
          <option value="shift_start_and_end_time">
            Regularize Check in and Check out to default Shift Start and End
            Time
          </option>
          <option value="shift_end_time">
            Regularize only Check out to default Shift End Time
          </option>
          <option value="deduct_based_on_hierarchy">
            Deduct based on hierarchy
          </option>
          <option value="half_day_and_deduct_based_on_hierarchy">
            Consider the day as Half Day Present and deduct the other half as
            per the attendance hierarchy
          </option>
          <option value="single_check_in_as_present">
            Consider Single Check In as Present
          </option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Late Marks / Early Checkouts Applicable
        </label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input type="radio" name="lateEarly" className="form-radio" />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input type="radio" name="lateEarly" className="form-radio" />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Overtime ("OT") Applicable
        </label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input type="radio" name="overtime" className="form-radio" />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input type="radio" name="overtime" className="form-radio" />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Half Day Working Hours Exemption
        </label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="halfDayExemption"
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="halfDayExemption"
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Include Weekly Off in LOP</label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input type="radio" name="weeklyOff" className="form-radio" />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input type="radio" name="weeklyOff" className="form-radio" />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Include Holiday in LOP</label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input type="radio" name="holidayLOP" className="form-radio" />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input type="radio" name="holidayLOP" className="form-radio" />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Minimum Minutes Per Day to Avoid Prefix Suffix Leave Deduction
        </label>
        <input
          type="number"
          className="mt-1 block w-full border border-gray-300 rounded-md  p-2"
          defaultValue="30"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Comment Mandatory for Regularisation Request
        </label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="commentMandatory"
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="commentMandatory"
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Levels of Approvals</label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="levelsOfApprovals"
              className="form-radio"
            />
            <span className="ml-2">1 Level</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="levelsOfApprovals"
              className="form-radio"
            />
            <span className="ml-2">2 Levels</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Assign Approvers</label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input type="radio" name="assignApprovers" className="form-radio" />
            <span className="ml-2">Template Wise</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input type="radio" name="assignApprovers" className="form-radio" />
            <span className="ml-2">Employee Wise</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Parallel Approvers</label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="parallelApprovers"
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="parallelApprovers"
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Primary Approver</label>
        <select className="mt-1 block w-full border border-gray-300 rounded-md  p-2">
          <option>Approver 1</option>
          <option>Approver 2</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">
          Hierarchy for Absent/Half Days Treatment
        </label>
        <select className="mt-1 block w-full border border-gray-300 rounded-md  p-2">
          <option>Hierarchy 1</option>
          <option>Hierarchy 2</option>
        </select>
      </div>

      <div className="mt-6 flex justify-center">
        {/* <button
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
          onClick={handleBack}
          disabled={false} // Disable back button on first step if needed
        >
          Back
        </button> */}
        <div>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded mr-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleNextStep}
          >
            Save & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateGeneralSetting;
