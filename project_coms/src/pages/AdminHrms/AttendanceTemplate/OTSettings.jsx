import React, { useState } from "react";

const OTSettings = ({handleCancel, handleBack }) => {
  const [overtimeCalculation, setOvertimeCalculation] = useState(
    "After Total shift hours have been completed"
  );
  const [baseUnit, setBaseUnit] = useState("Minutes");
  const [fullDayHours, setFullDayHours] = useState(8);
  const [halfDayHours, setHalfDayHours] = useState(5);
  const [smallestUnit, setSmallestUnit] = useState("Half an Hour");
  const [roundUpMinutes, setRoundUpMinutes] = useState("");
  const [fullDayMinutes, setFullDayMinutes] = useState(8);
  const [halfDayMinutes, setHalfDayMinutes] = useState(5);
  const [fullDayOvertime, setFullDayOvertime] = useState("8");
  const [halfDayOvertime, setHalfDayOvertime] = useState("5");


const handleSave = async()=>{

}

  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2 className="block text-sm font-medium text-gray-700 mb-1">
          How is Overtime calculated?
        </h2>
        <select
          value={overtimeCalculation}
          onChange={(e) => setOvertimeCalculation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option
            selected="selected"
            value="After Total shift hours have been completed"
          >
            After Total shift hours have been completed
          </option>
          <option value="After shift hours have been completed + grace period">
            After shift hours have been completed + grace period
          </option>
        </select>
      </div>

      <div>
        <h2 className="block text-sm font-medium text-gray-700 mb-1">
          What is the base unit for calculating Overtime?
        </h2>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              checked={baseUnit === "Minutes"}
              onChange={() => setBaseUnit("Minutes")}
            />
            <span className="ml-2">Minutes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              checked={baseUnit === "Hours"}
              onChange={() => setBaseUnit("Hours")}
            />
            <span className="ml-2">Hours</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              checked={baseUnit === "Days"}
              onChange={() => setBaseUnit("Days")}
            />
            <span className="ml-2">Days</span>
          </label>
        </div>
      </div>

      {baseUnit === "Minutes" && (
        <>
          <div>
            <h2 className="block text-sm font-medium text-gray-700 mb-1">
              What are the minimum minutes per day that the employee should work
              to get credit for a Full Day of Overtime?
            </h2>
            <div className="flex items-center ">
              <input
                type="number"
                value={fullDayMinutes}
                onChange={(e) => setFullDayMinutes(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-l-md"
              />
              <span className="bg-gray-200 px-3 py-2 rounded-r-md">Minutes</span>
            </div>
          </div>

          <div>
            <h2 className="block text-sm font-medium text-gray-700 mb-1">
              What are the minimum minutes per day that the employee should work
              to get credit for a Half Day of Overtime?
            </h2>
            <div className="flex items-center ">
              <input
                type="number"
                value={halfDayMinutes}
                onChange={(e) => setHalfDayMinutes(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-l-md"
              />
              <span className="bg-gray-200 px-3 py-2 rounded-r-md">Minutes</span>
            </div>
          </div>
        </>
      )}
      {baseUnit === "Hours" && (
        <>
          <div>
            <h2 className="block text-sm font-medium text-gray-700 mb-1">
              What are the minimum hours per day that the employee should work
              to get credit for a Full Day of Overtime?
            </h2>
            <div className="flex items-center">
              <input
                type="number"
                value={fullDayHours}
                onChange={(e) => setFullDayHours(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-l-md"
              />
              <span className="bg-gray-200 px-3 py-2 rounded-r-md">Hours</span>
            </div>
          </div>

          <div>
            <h2 className="block text-sm font-medium text-gray-700 mb-1">
              What are the minimum hours per day that the employee should work
              to get credit for a Half Day of Overtime?
            </h2>
            <div className="flex items-center">
              <input
                type="number"
                value={halfDayHours}
                onChange={(e) => setHalfDayHours(e.target.value)}
                className="w-48 p-2 border border-gray-300 rounded-l-md"
              />
              <span className="bg-gray-200 px-3 py-2 rounded-r-md">Hours</span>
            </div>
          </div>

          <div>
            <h2 className="block text-sm font-medium text-gray-700 mb-1">
              What is the smallest unit to for OT calculation?
            </h2>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={smallestUnit === "Half an Hour"}
                  onChange={() => setSmallestUnit("Half an Hour")}
                />
                <span className="ml-2">Half an Hour</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  checked={smallestUnit === "One Hour"}
                  onChange={() => setSmallestUnit("One Hour")}
                />
                <span className="ml-2">One Hour</span>
              </label>
            </div>
          </div>

          <div>
            <h2 className="block text-sm font-medium text-gray-700 mb-1">
              Upto how many minutes of shortfall in meeting the smallest unit
              can be rounded up to the nearest unit?
            </h2>
            <div className="flex items-center">
              <input
                type="number"
                value={roundUpMinutes}
                onChange={(e) => setRoundUpMinutes(e.target.value)}
                placeholder="Enter Minutes"
                className="w-40 p-2 border border-gray-300 rounded-l-md"
              />
              <span className="bg-gray-200 px-3 py-2 rounded-r-md">Minutes</span>
            </div>
          </div>
        </>
      )}
      {baseUnit === "Days" && (
        <>
          <div>
            <label
              htmlFor="fullDayOvertime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              What are the minimum days that the employee should work to get
              credit for a Full Day of Overtime?
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="fullDayOvertime"
                value={fullDayOvertime}
                onChange={(e) => setFullDayOvertime(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md"
              />
              <span>Days</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="halfDayOvertime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              What are the minimum days that the employee should work to get
              credit for a Half Day of Overtime?
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                id="halfDayOvertime"
                value={halfDayOvertime}
                onChange={(e) => setHalfDayOvertime(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md"
              />
              <span>Days</span>
            </div>
          </div>
        </>
      )}

      <div className="flex justify-center space-x-4">
        <button className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-100" onClick={handleCancel}>
          Cancel
        </button>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400" onClick={handleBack}>
          Back
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSave}>
          Save & Proceed
        </button>
      </div>
    </div>
  );
};

export default OTSettings;
