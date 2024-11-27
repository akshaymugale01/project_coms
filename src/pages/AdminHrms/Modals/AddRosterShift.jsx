import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { postRosterShift } from "../../../api";
import toast from "react-hot-toast";
import { getItemInLocalStorage } from "../../../utils/localStorage";

const AddRosterShift = ({ handleCloseModal, fetchRosterShifts }) => {
  const [fullDayHours, setFullDayHours] = useState({ hours: "", minutes: "" });
  const [halfDayHours, setHalfDayHours] = useState({ hours: "", minutes: "" });
  const [isBreakShift, setIsBreakShift] = useState(false);
  const [breakStartTime, setBreakStartTime] = useState("");
  const [breakEndTime, setBreakEndTime] = useState("");
  const [formData, setFormData] = useState({
    shiftName: "",
    startTime: "",
    endTime: "",
    isBreakShift: false,
    breakStartTime: "",
    breakEndTime: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const hrmsOrgId = getItemInLocalStorage("HRMSORGID");
  const handleAddShift = async () => {
    if (!formData.shiftName.trim()) {
      toast.error("Please assign a Shift Name");
      return;
    }

    if (!formData.startTime || !formData.endTime) {
      toast.error("Please provide Shift Timings");
      return;
    }

    const postData = new FormData();
    postData.append("name", formData.shiftName);
    postData.append("start_time", formData.startTime);
    postData.append("end_time", formData.endTime);
    postData.append("is_break_applicable", formData.isBreakShift);
    postData.append("break_start_time", formData.breakStartTime);
    postData.append("break_end_time", formData.breakEndTime);
    postData.append("organization", hrmsOrgId);
    try {
      const res = await postRosterShift(postData);
      handleCloseModal();
      fetchRosterShifts();
      toast.success("New Shift Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="z-10 fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Shift</h2>
        <div className="max-h-96 overflow-y-auto p-2">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              Please Assign a Shift Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border p-2 w-full rounded-md"
              placeholder="Enter Shift Name"
              value={formData.shiftName}
              onChange={handleChange}
              name="shiftName"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              What are the Shift Timings?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 w-full">
              <div className="w-full">
                <label>From:</label>
                <input
                  type="time"
                  className="border p-2 w-full rounded-md"
                  value={formData.startTime}
                  onChange={handleChange}
                  name="startTime"
                />
              </div>
              <div className="w-full">
                <label>Till:</label>
                <input
                  type="time"
                  className="border p-2 w-full rounded-md"
                  value={formData.endTime}
                  onChange={handleChange}
                  name="endTime"
                />
              </div>
            </div>
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              What are minimum hours for Full Day
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                className="border p-2 w-full rounded"
                placeholder="Hours"
                value={fullDayHours.hours}
                onChange={(e) =>
                  setFullDayHours({ ...fullDayHours, hours: e.target.value })
                }
              />
              <input
                type="number"
                className="border p-2 w-full rounded"
                placeholder="Minutes"
                value={fullDayHours.minutes}
                onChange={(e) =>
                  setFullDayHours({
                    ...fullDayHours,
                    minutes: e.target.value,
                  })
                }
              />
            </div>
          </div> */}
          {/* <div className="mb-4">
            <label className="block text-gray-700 font-medium">
              What are minimum hours for Half Day
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                className="border p-2 w-full rounded"
                placeholder="Hours"
                value={halfDayHours.hours}
                onChange={(e) =>
                  setHalfDayHours({ ...halfDayHours, hours: e.target.value })
                }
              />
              <input
                type="number"
                className="border p-2 w-full rounded"
                placeholder="Minutes"
                value={halfDayHours.minutes}
                onChange={(e) =>
                  setHalfDayHours({
                    ...halfDayHours,
                    minutes: e.target.value,
                  })
                }
              />
            </div>
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Is Break shift Applicable in this shift?
            </label>
            <div className="flex gap-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="breakShift"
                  className="mr-2"
                  checked={formData.isBreakShift === true}
                  onChange={() =>
                    setFormData({ ...formData, isBreakShift: true })
                  }
                />
                Yes
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="breakShift"
                  className="mr-2"
                  checked={formData.isBreakShift === false}
                  onChange={() =>
                    setFormData({ ...formData, isBreakShift: false })
                  }
                />
                No
              </label>
            </div>
          </div>
          {formData.isBreakShift && (
            <div className="mb-4">
              {/* <label className="block text-gray-700">Break Timings</label> */}
              <div className="flex gap-2">
                <div className="w-full">
                  <label className="font-medium">Break From:</label>
                  <input
                    type="time"
                    className="border p-2 w-full rounded"
                    value={formData.breakStartTime}
                    onChange={handleChange}
                    name="breakStartTime"
                  />
                </div>
                <div className="w-full">
                  <label className="font-medium">Break Till:</label>
                  <input
                    type="time"
                    className="border p-2 w-full rounded"
                    value={formData.breakEndTime}
                    onChange={handleChange}
                    name="breakEndTime"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-4 mt-2 border-t p-1">
          <button
            className="border-2 rounded-full flex items-center gap-2 border-red-500 text-red-500 p-1 px-4"
            onClick={handleCloseModal}
          >
            <MdClose /> Cancel
          </button>
          <button
            className="border-2 rounded-full flex items-center gap-2 border-green-500 text-green-500 p-1 px-4"
            onClick={handleAddShift}
          >
            <FaCheck /> Add Shift
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRosterShift;
