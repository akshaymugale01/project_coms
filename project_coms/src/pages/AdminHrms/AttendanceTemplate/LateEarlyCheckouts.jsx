import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

const LateEarlyCheckouts = ({ handleNextStep, handleCancel, handleBack }) => {
  const [checkInGrace, setCheckInGrace] = useState(10);
  const [checkOutGrace, setCheckOutGrace] = useState(1);
  const [maxLateMinutes, setMaxLateMinutes] = useState(45);
  const [daysToDeduct, setDaysToDeduct] = useState("Half Day");
  const [clearLateEarlyMark, setClearLateEarlyMark] = useState(true);
  const [fullDayHours, setFullDayHours] = useState({ hours: 0, minutes: 0 });
  const [halfDayHours, setHalfDayHours] = useState({ hours: 0, minutes: 0 });

  const handleHoursChange = (type, field, value) => {
    if (type === "full") {
      setFullDayHours((prev) => ({ ...prev, [field]: parseInt(value) || 0 }));
    } else {
      setHalfDayHours((prev) => ({ ...prev, [field]: parseInt(value) || 0 }));
    }
  };

  const [deductionType, setDeductionType] = useState("individual");
  const [individualLatePolicies, setIndividualLatePolicies] = useState([
    { frequency: "Every", days: "", deduction: "Full Day" },
    { frequency: "After", days: "", deduction: "Select" },
    { frequency: "Every", days: "", deduction: "Select" },
  ]);
  const [individualEarlyPolicies, setIndividualEarlyPolicies] = useState([
    { frequency: "On", days: "", deduction: "Select" },
    { frequency: "On", days: "", deduction: "Select" },
  ]);
  const [combinationPolicies, setCombinationPolicies] = useState([
    { frequency: "On", days: "", deduction: "Select" },
    { frequency: "On", days: "", deduction: "Select" },
  ]);

  const handleIndividualLateChange = (index, field, value) => {
    const newPolicies = [...individualLatePolicies];
    newPolicies[index][field] = value;
    setIndividualLatePolicies(newPolicies);
  };

  const handleIndividualEarlyChange = (index, field, value) => {
    const newPolicies = [...individualEarlyPolicies];
    newPolicies[index][field] = value;
    setIndividualEarlyPolicies(newPolicies);
  };

  const handleCombinationChange = (index, field, value) => {
    const newPolicies = [...combinationPolicies];
    newPolicies[index][field] = value;
    setCombinationPolicies(newPolicies);
  };

  const addIndividualLatePolicy = () => {
    setIndividualLatePolicies([
      ...individualLatePolicies,
      { frequency: "Every", days: "", deduction: "Select" },
    ]);
  };

  const addIndividualEarlyPolicy = () => {
    setIndividualEarlyPolicies([
      ...individualEarlyPolicies,
      { frequency: "On", days: "", deduction: "Select" },
    ]);
  };

  const addCombinationPolicy = () => {
    setCombinationPolicies([
      ...combinationPolicies,
      { frequency: "On", days: "", deduction: "Select" },
    ]);
  };

  const removeIndividualLatePolicy = (index) => {
    setIndividualLatePolicies(
      individualLatePolicies.filter((_, i) => i !== index)
    );
  };

  const removeIndividualEarlyPolicy = (index) => {
    setIndividualEarlyPolicies(
      individualEarlyPolicies.filter((_, i) => i !== index)
    );
  };

  const removeCombinationPolicy = (index) => {
    setCombinationPolicies(combinationPolicies.filter((_, i) => i !== index));
  };
  return (
    <div className="flex flex-col gap-2 mb-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How many grace minutes do you grant the employee relative to his/her
          check in time?
        </label>
        <p className="text-xs text-gray-500 mb-2">
          (i.e. if you put in 15 minutes and shift starts at 9:30am, then
          employee can check in up to 9:45am and no late mark will be marked for
          that day)
        </p>
        <div className="flex items-center">
          <input
            type="number"
            value={checkInGrace}
            onChange={(e) => setCheckInGrace(e.target.value)}
            className="block border p-1 rounded-l-md w-96 border-gray-300"
          />
          <span className="p-1 border bg-gray-200 rounded-r-md">Minutes</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How many grace minutes do you grant the employee relative to his/her
          check out time?
        </label>
        <p className="text-xs text-gray-500 mb-2">
          (i.e. if you put in 15 minutes and shift ends at 6:00pm, then employee
          can check out up to 5:45pm and no early mark will be marked for that
          day)
        </p>
        <div className="flex items-center">
          <input
            type="number"
            value={checkOutGrace}
            onChange={(e) => setCheckOutGrace(e.target.value)}
            className="block border p-1 rounded-l-md w-96 border-gray-300"
          />
          <span className="p-1 border bg-gray-200 rounded-r-md">Minutes</span>
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Additional Late Mark Policies
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum no. of minutes employee can come late from the shift
              starting time to avoid a force full penalty
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={maxLateMinutes}
                onChange={(e) => setMaxLateMinutes(e.target.value)}
                className="block border p-1 rounded-l-md w-96 border-gray-300"
              />
              <span className="p-1 border bg-gray-200 rounded-r-md">
                Minutes
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Days to deduct
            </label>
            <select
              value={daysToDeduct}
              onChange={(e) => setDaysToDeduct(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>Half Day</option>
              <option>Full Day</option>
            </select>
          </div>

          <p className="text-sm text-gray-600">
            Example: If shift start at 9am, & max minute cap is 60 minutes then
            if employee comes post 10am he/she would be penalized but late mark
            won't be counted
          </p>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Would you like to clear the late/early mark if the employee
              completes a certain number of hours in the day?
            </p>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  checked={clearLateEarlyMark}
                  onChange={() => setClearLateEarlyMark(true)}
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  checked={!clearLateEarlyMark}
                  onChange={() => setClearLateEarlyMark(false)}
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {clearLateEarlyMark && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum hours for a Full Day Shift
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={fullDayHours.minutes}
                    onChange={(e) =>
                      handleHoursChange("full", "minutes", e.target.value)
                    }
                    className="w-52 p-2 rounded-md border border-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum hours for a Half Day Shift
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={fullDayHours.minutes}
                    onChange={(e) =>
                      handleHoursChange("full", "minutes", e.target.value)
                    }
                    className="w-52 p-2 rounded-md border border-gray-400"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="">
        <div>
          <h2 className="text-lg font-semibold mb-2">
            How do you treat late and early mark deduction ?
          </h2>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={deductionType === "individual"}
                onChange={() => setDeductionType("individual")}
              />
              <span className="ml-2">Individual</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio "
                checked={deductionType === "combination"}
                onChange={() => setDeductionType("combination")}
              />
              <span className="ml-2 ">Combination</span>
            </label>
          </div>
        </div>

        {deductionType === "individual" && (
          <>
            <div>
              <h3 className="text-md font-semibold my-2">
                Please select the logic upon which late marks will affect
                attendance?
              </h3>
              {individualLatePolicies.map((policy, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-2 mb-2 "
                >
                  <select
                    value={policy.frequency}
                    onChange={(e) =>
                      handleIndividualLateChange(
                        index,
                        "frequency",
                        e.target.value
                      )
                    }
                    className="form-select rounded-md border-gray-300 border p-1 px-2"
                  >
                    <option>On</option>
                    <option>Every</option>
                    <option>After</option>
                  </select>
                  <div className="space-x-2">
                    <input
                      type="text"
                      value={policy.days}
                      onChange={(e) =>
                        handleIndividualLateChange(
                          index,
                          "days",
                          e.target.value
                        )
                      }
                      placeholder="No. of Days"
                      className="form-select rounded-md border-gray-300 border p-1"
                    />
                    <span>Late Days</span>
                  </div>
                  <div className="space-x-2">
                    <span>deduct</span>
                    <select
                      value={policy.deduction}
                      onChange={(e) =>
                        handleIndividualLateChange(
                          index,
                          "deduction",
                          e.target.value
                        )
                      }
                      className="form-select rounded-md border-gray-300 border p-1 px-2"
                    >
                      <option>Select</option>
                      <option>Full Day</option>
                      <option>Half Day</option>
                    </select>
                  </div>

                  <button
                    onClick={() => removeIndividualLatePolicy(index)}
                    className="text-red-400"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={addIndividualLatePolicy}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Late Mark Policy
              </button>
            </div>

            <div className="mt-2">
              <h3 className="text-md font-semibold mb-2">
                Please select the logic upon which early marks will affect
                attendance?
              </h3>
              {individualEarlyPolicies.map((policy, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-2 mt-1 "
                >
                  <select
                    value={policy.frequency}
                    onChange={(e) =>
                      handleIndividualEarlyChange(
                        index,
                        "frequency",
                        e.target.value
                      )
                    }
                    className="form-select rounded-md border-gray-300 border p-1 px-2"
                  >
                    <option>On</option>
                    <option>After</option>
                    <option>Every</option>
                  </select>
                  <div className="space-x-2">
                    <input
                      type="text"
                      value={policy.days}
                      onChange={(e) =>
                        handleIndividualEarlyChange(
                          index,
                          "days",
                          e.target.value
                        )
                      }
                      placeholder="No. of Days"
                      className="form-select rounded-md border-gray-300 border p-1 px-2"
                    />
                    <span>Early Days</span>
                  </div>
                  <div className="space-x-2">
                    <span>deduct</span>
                    <select
                      value={policy.deduction}
                      onChange={(e) =>
                        handleIndividualEarlyChange(
                          index,
                          "deduction",
                          e.target.value
                        )
                      }
                      className="form-select rounded-md border-gray-300 border p-1 px-2"
                    >
                      <option>Select</option>
                      <option>Full Day</option>
                      <option>Half Day</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeIndividualEarlyPolicy(index)}
                    className="text-red-500"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={addIndividualEarlyPolicy}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Early Mark Policy
              </button>
            </div>
          </>
        )}
        {deductionType === "combination" && (
          <div className="mt-5">
            <h3 className="text-md font-semibold mb-2">
              Please select the logic upon which late and early marks will
              affect attendance?
            </h3>
            {combinationPolicies.map((policy, index) => (
              <div
                key={index}
                className="flex items-center justify-between space-x-2 mb-2"
              >
                <select
                  value={policy.frequency}
                  onChange={(e) =>
                    handleCombinationChange(index, "frequency", e.target.value)
                  }
                  className="form-select rounded-md border-gray-300 border p-1 px-2"
                >
                  <option>On</option>
                  <option>After</option>
                  <option>Every</option>
                </select>
                <input
                  type="text"
                  value={policy.days}
                  onChange={(e) =>
                    handleCombinationChange(index, "days", e.target.value)
                  }
                  placeholder="No. of Days"
                  className="form-select rounded-md border-gray-300 border p-1 px-2"
                />
                <span>Late & Early Days</span>
                <span>deduct</span>
                <select
                  value={policy.deduction}
                  onChange={(e) =>
                    handleCombinationChange(index, "deduction", e.target.value)
                  }
                  className="form-select rounded-md border-gray-300 border p-1 px-2"
                >
                  <option>Select</option>
                  <option>Full Day</option>
                  <option>Half Day</option>
                </select>
                <button
                  onClick={() => removeCombinationPolicy(index)}
                  className="text-red-500"
                >
                  <FaTrash className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              onClick={addCombinationPolicy}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Late and Early Mark Policy
            </button>
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded mr-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded"
          onClick={handleBack}
          disabled={false} // Disable back button on first step if needed
        >
          Back
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleNextStep}
        >
          Save & Proceed
        </button>
      </div>
    </div>
  );
};

export default LateEarlyCheckouts;
